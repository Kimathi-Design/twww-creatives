import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, isAbsolute } from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;
const screenshotType = (process.env.SCREENSHOT_TYPE ?? "jpeg").toLowerCase();
const jpegQuality = Number(process.env.JPEG_QUALITY ?? 92);
const deviceScaleFactor = Number(process.env.DEVICE_SCALE_FACTOR ?? 2);
const defaultOut = "public/TWWW_MediaPal_Proposal.pdf";
const outputPath = (() => {
  const raw = process.env.OUTPUT_PATH ?? defaultOut;
  return isAbsolute(raw) ? raw : join(process.cwd(), raw);
})();
const port = Number(process.env.DECK_PORT ?? 3061);
const baseUrl = process.env.DECK_URL ?? `http://localhost:${port}`;
const printUrl = `${baseUrl.replace(/\/$/, "")}/deck/print`;

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
    env: { ...process.env, PORT: String(port) },
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
    `Rendering crisp PDF (${screenshotType}, dsf=${deviceScaleFactor}) from ${printUrl}...`,
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
  await page.waitForTimeout(3500);

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
    await page.waitForTimeout(i === 0 ? 800 : 200);

    const target = slide.locator("section.ats-slide").first();
    const hasSlide = (await target.count()) > 0;
    const shotOpts =
      screenshotType === "png"
        ? { type: "png", animations: "disabled" }
        : { type: "jpeg", quality: jpegQuality, animations: "disabled" };
    const imageBytes = await (hasSlide ? target : slide).screenshot(shotOpts);

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
    console.log(`  ✓ slide ${i + 1}/${slideCount}`);
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
