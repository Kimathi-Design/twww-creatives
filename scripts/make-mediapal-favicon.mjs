import { chromium } from "playwright";
import fs from "node:fs";

const svg = fs.readFileSync("public/twww/mediapal-logo.svg", "utf8");
const b64 = Buffer.from(svg).toString("base64");
const html = `<!DOCTYPE html>
<html><body style="margin:0;width:512px;height:512px;background:#007683;overflow:hidden;position:relative">
  <img
    src="data:image/svg+xml;base64,${b64}"
    alt=""
    style="position:absolute;height:78%;width:auto;right:-6%;top:11%"
  />
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: "public/twww/mediapal-icon.png", type: "png" });
await browser.close();
console.log("wrote public/twww/mediapal-icon.png");
