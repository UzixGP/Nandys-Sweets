// End-to-end QA for the built site, driven through Chrome's DevTools protocol (no extra dependencies).
//
// Usage:
//   npm run build && npx next start -p 3124      (in another terminal / background)
//   node scripts/qa.mjs [screenshotDir]           (default: .qa/)
//
// Env: QA_BASE (default http://localhost:3124), CHROME (path to Chrome/Edge if not auto-detected).
// Prints PASS/FAIL per check, saves screenshots, exits 1 if anything failed.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.QA_BASE ?? "http://localhost:3124";
const OUT = path.resolve(process.argv[2] ?? ".qa");
const PORT = 9333;
const CHROME =
  process.env.CHROME ??
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => existsSync(p));

if (!CHROME) throw new Error("Chrome/Edge not found. Set CHROME=/path/to/browser.");
await mkdir(OUT, { recursive: true });

let failures = 0;
const check = (ok, label, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  →  ${detail}` : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- HTTP checks (no browser) ---
const head = async (p) => fetch(BASE + p, { redirect: "manual" });
const root = await head("/");
check(root.status === 307 && root.headers.get("location")?.endsWith("/es"), "/ redirects to /es");
for (const lang of ["es", "en"]) {
  for (const page of ["", "/menu", "/gallery", "/custom-cakes", "/about", "/contact"]) {
    const res = await head(`/${lang}${page}`);
    check(res.status === 200, `GET /${lang}${page}`, String(res.status));
  }
}
check((await head("/og.png")).status === 200, "GET /og.png (share image)");

// --- Browser checks ---
const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${path.join(OUT, ".chrome-profile")}`, "about:blank",
]);
let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try {
    target = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((t) => t.type === "page");
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let msgId = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg), pending.delete(msg.id);
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const id = ++msgId;
    pending.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
const js = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
const viewport = (width, height, mobile) =>
  send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
const go = async (p) => {
  await send("Page.navigate", { url: BASE + p });
  await sleep(2500);
};
const shot = async (name) => {
  const height = await js("document.documentElement.scrollHeight");
  const width = await js("document.documentElement.clientWidth");
  const { result } = await send("Page.captureScreenshot", {
    format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 },
  });
  await writeFile(path.join(OUT, `${name}.png`), Buffer.from(result.data, "base64"));
};
// Sets a React-controlled input's value the way a user would.
const setValue = (id, value) =>
  js(`(() => { const el = document.getElementById(${JSON.stringify(id)});
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set.call(el, ${JSON.stringify(value)});
    el.dispatchEvent(new Event('input', { bubbles: true })); return true })()`);
const errorIds = () =>
  js("[...document.querySelectorAll('[id$=-error]')].map(e => e.id.replace('cake-','').replace('-error',''))");

await send("Page.enable");
await send("Runtime.enable");

// Mobile layout: no sideways scroll on any page.
await viewport(375, 812, true);
for (const p of ["/es", "/es/menu", "/es/gallery", "/es/custom-cakes", "/es/contact", "/en/about"]) {
  await go(p);
  const [scroll, client] = await js("[document.documentElement.scrollWidth, document.documentElement.clientWidth]");
  check(scroll <= client, `no horizontal scroll at 375px: ${p}`, `${scroll} vs ${client}`);
  await shot(`mobile${p.replaceAll("/", "-")}`);
}

// Custom-cake form.
await go("/es/custom-cakes");
await js("window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }; true");
const submit = () => js("document.querySelector('form button[type=submit]').click(); new Promise(r => setTimeout(r, 400))");
await submit();
const pickupErrors = await errorIds();
check(
  ["name", "date", "time", "servings", "flavor"].every((f) => pickupErrors.includes(f)),
  "empty form shows required errors", pickupErrors.join(", "),
);
const minDate = await js("document.getElementById('cake-date').min");
check(/^\d{4}-\d{2}-\d{2}$/.test(minDate), "date picker has an earliest date", minDate);
await setValue("cake-date", new Date().toISOString().slice(0, 10));
await submit();
check(
  (await js("document.getElementById('cake-date-error')?.textContent || ''")).length > 0,
  "today's date is rejected (order notice)",
);
await js("document.querySelector('input[value=delivery]').click(); new Promise(r => setTimeout(r, 300))");
await submit();
check((await errorIds()).includes("address"), "delivery requires an address");
await setValue("cake-name", "QA Test");
await setValue("cake-date", minDate);
await setValue("cake-time", "15:30");
await setValue("cake-address", "123 Main St, East Orange, NJ 07017");
await setValue("cake-servings", "20");
await setValue("cake-flavor", "Tres leches");
await setValue("cake-budget", "$80");
await submit();
const opened = await js("window.__opened[0] || ''");
const message = opened ? decodeURIComponent(new URL(opened).searchParams.get("text")) : "";
check(opened.startsWith("https://wa.me/"), "valid form opens WhatsApp");
check(message.includes("3:30 PM"), "message has 12h time");
check(message.includes("$80") && !message.includes("$$"), "budget sent once as $80");
check(message.includes("123 Main St"), "message includes delivery address");
console.log("\n--- WhatsApp message ---\n" + message + "\n------------------------\n");

// Gallery lightbox.
await viewport(1280, 900, false);
await go("/es/gallery");
await shot("desktop-gallery");
await js("document.querySelector('ul button').click(); new Promise(r => setTimeout(r, 1200))");
const wantThis = await js("document.querySelector('dialog a[href*=\"wa.me\"]')?.href || ''");
check(decodeURIComponent(wantThis).includes("/images/products/"), "lightbox 'Quiero uno así' shares the photo link");

// Home slideshow advances on its own.
await go("/es");
await shot("desktop-home");
const currentSlide = () =>
  js(`[...document.querySelectorAll('div[aria-hidden].pointer-events-none')]
      .find(e => e.querySelector('img'))?.querySelector('img.opacity-100')?.src || ''`);
const first = await currentSlide();
await sleep(4600);
const second = await currentSlide();
check(first && second && first !== second, "promo slideshow changes photo (~4s)");

ws.close();
chrome.kill();
console.log(`\n${failures ? `✗ ${failures} check(s) failed` : "✓ All checks passed"} · screenshots in ${OUT}`);
process.exit(failures ? 1 : 0);
