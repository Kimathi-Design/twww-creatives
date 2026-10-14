import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, isAbsolute } from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import { PDFDocument, PDFName, PDFArray, PDFString } from "pdf-lib";

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;
const screenshotType = (process.env.SCREENSHOT_TYPE ?? "jpeg").toLowerCase();
/** Keep the slides PDF light — 1× raster + mid JPEG quality is enough for links. */
const jpegQuality = Number(process.env.JPEG_QUALITY ?? 74);
const deviceScaleFactor = Number(process.env.DEVICE_SCALE_FACTOR ?? 1);
const defaultOut = "public/TWWW_Creatives_Slides.pdf";
const outputPath = (() => {
  const raw = process.env.OUTPUT_PATH ?? defaultOut;
  return isAbsolute(raw) ? raw : join(process.cwd(), raw);
})();
const port = Number(process.env.DECK_PORT ?? 3061);
const baseUrl = process.env.DECK_URL ?? `http://localhost:${port}`;
const printUrl = `${baseUrl.replace(/\/$/, "")}/deck/print`;
const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://twww-creatives.vercel.app"
).replace(/\/$/, "");

function addUriLink(page, uri, rect) {
  const linkRef = page.doc.context.register(
    page.doc.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: rect,
      Border: [0, 0, 0],
      A: {
        Type: "Action",
        S: "URI",
        URI: PDFString.of(uri),
      },
    }),
  );
  let annots = page.node.lookup(PDFName.of("Annots"), PDFArray);
  if (!annots) {
    annots = page.doc.context.obj([]);
    page.node.set(PDFName.of("Annots"), annots);
  }
  annots.push(linkRef);
}

async function waitForServer(url, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not become ready at ${url}`);
}

let serverProcess;
if (!process.env.DECK_URL) {
  serverProcess = spawn("npm", ["start", "--", "--port", String(port)], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: String(port),
      NEXT_PUBLIC_SITE_URL: siteOrigin,
    },
    stdio: "inherit",
  });
  await waitForServer(baseUrl);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: SLIDE_WIDTH, height: SLIDE_HEIGHT },
  deviceScaleFactor,
});

try {
  console.log(
    `Rendering creatives slides PDF (${screenshotType}, dsf=${deviceScaleFactor}) from ${printUrl}...`,
  );
  await page.emulateMedia({ media: "screen" });
  await page.goto(printUrl, { waitUntil: "networkidle", timeout: 180_000 });
  await page.addStyleTag({
    content:
      "nextjs-portal, [data-next-badge-root], #__next-build-watcher { display: none !important; }",
  });
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForFunction(
    () => document.documentElement.dataset.atsExport === "true",
  );
  // Let live banner iframes settle before capture.
  await page.waitForTimeout(5000);

  const slideLocators = page.locator(".ats-print-slide");
  const slideCount = await slideLocators.count();
  if (slideCount === 0) {
    throw new Error("No .ats-print-slide elements found on /deck/print");
  }
  console.log(`Capturing ${slideCount} slides as ${screenshotType} screenshots...`);

  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < slideCount; i++) {
    const slide = slideLocators.nth(i);
    await slide.scrollIntoViewIfNeeded();
    await page.waitForTimeout(i === 0 ? 1200 : 400);

    const target = slide.locator("section.ats-slide").first();
    const hasSlide = (await target.count()) > 0;
    const shotTarget = hasSlide ? target : slide;
    const shotOpts =
      screenshotType === "png"
        ? { type: "png", animations: "disabled" }
        : { type: "jpeg", quality: jpegQuality, animations: "disabled" };
    const imageBytes = await shotTarget.screenshot(shotOpts);

    const image =
      screenshotType === "png"
        ? await pdfDoc.embedPng(imageBytes)
        : await pdfDoc.embedJpg(imageBytes);
    const pdfPage = pdfDoc.addPage([SLIDE_WIDTH, SLIDE_HEIGHT]);
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
    });

    const slideBox = await shotTarget.boundingBox();
    const links = slide.locator("a[data-banner-standalone]");
    const linkCount = await links.count();
    if (slideBox && linkCount > 0) {
      for (let li = 0; li < linkCount; li++) {
        const link = links.nth(li);
        const href =
          (await link.getAttribute("data-banner-standalone")) ||
          (await link.getAttribute("href"));
        const box = await link.boundingBox();
        if (!href || !box) continue;
        const scaleX = SLIDE_WIDTH / slideBox.width;
        const scaleY = SLIDE_HEIGHT / slideBox.height;
        const x = (box.x - slideBox.x) * scaleX;
        const yTop = (box.y - slideBox.y) * scaleY;
        const w = box.width * scaleX;
        const h = box.height * scaleY;
        const y = SLIDE_HEIGHT - yTop - h;
        const pad = 2;
        addUriLink(pdfPage, href, [
          x - pad,
          y - pad,
          x + w + pad,
          y + h + pad,
        ]);
      }
      console.log(`  ✓ slide ${i + 1}/${slideCount} (+${linkCount} links)`);
    } else {
      console.log(`  ✓ slide ${i + 1}/${slideCount}`);
    }
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, await pdfDoc.save());
  console.log(`Saved ${outputPath}`);
} finally {
  await browser.close();
  if (serverProcess) {
    serverProcess.kill("SIGTERM");
  }
}
