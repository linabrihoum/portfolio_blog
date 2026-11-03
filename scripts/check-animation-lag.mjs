// Flags pages whose animations make the site laggy.
//
// Opens each page in Chrome slowed down to roughly phone speed, lets the intro
// animations finish, then records every "long animation frame" (a frame that
// took over 50 ms, which people see as stutter) while idling and scrolling.
//
// Usage: start the site (npm run build && npm start), then
//   node scripts/check-animation-lag.mjs [baseUrl]
import { chromium } from "playwright";

const BASE_URL = process.argv[2] || "http://localhost:3000";
const CPU_SLOWDOWN = 4; // same slowdown Lighthouse uses for its mobile test
const MEASURE_MS = 5000;

// Limits per page. Over them, the check fails.
const BUDGET = {
  laggyShare: 0.25, // at most 25% of the measured time spent in long frames
  worstFrameMs: 400, // no single frame slower than this
};

const SCENARIOS = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "projects", path: "/projects" },
  // Used to stutter 97% of the time (full-screen blurs on the Vortex every frame).
  { name: "contact", path: "/contact" },
  { name: "blog post", path: "/blogs/gitops" },
  // Leaving Contact must not leave its particle animation running behind.
  { name: "home after visiting contact", path: "/contact", thenClick: "Home" },
];

async function measure(page) {
  await page.evaluate(() => {
    window.__longFrames = [];
  });
  await page.waitForTimeout(MEASURE_MS / 2); // idle: only the animations run
  const stopAt = Date.now() + MEASURE_MS / 2;
  while (Date.now() < stopAt) {
    await page.mouse.wheel(0, 250); // scroll like a reader would
    await page.waitForTimeout(100);
  }
  return page.evaluate(() => window.__longFrames);
}

async function runScenario(browser, scenario) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU_SLOWDOWN });
  await page.addInitScript(() => {
    window.__longFrames = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__longFrames.push(entry.duration);
    }).observe({ type: "long-animation-frame" });
  });

  await page.goto(BASE_URL + scenario.path, { waitUntil: "load" });
  if (scenario.thenClick) {
    await page.waitForTimeout(2000);
    await page.getByRole("link", { name: scenario.thenClick, exact: true }).first().click();
    await page.waitForURL(BASE_URL + "/");
  }
  await page.waitForTimeout(3000); // let intro animations finish

  const frames = await measure(page);
  await page.close();

  const laggyMs = frames.reduce((sum, ms) => sum + ms, 0);
  return {
    name: scenario.name,
    knownLaggy: scenario.knownLaggy,
    longFrames: frames.length,
    laggyShare: laggyMs / MEASURE_MS,
    worstFrameMs: frames.length ? Math.max(...frames) : 0,
  };
}

const browser = await chromium.launch();
const results = [];
for (const scenario of SCENARIOS) results.push(await runScenario(browser, scenario));
await browser.close();

let failed = false;
console.log(`Animation lag at ${CPU_SLOWDOWN}x CPU slowdown, ${MEASURE_MS / 1000}s idle + scroll per page:\n`);
for (const r of results) {
  const tooLaggy = r.laggyShare > BUDGET.laggyShare || r.worstFrameMs > BUDGET.worstFrameMs;
  failed ||= tooLaggy && !r.knownLaggy;
  const label = !tooLaggy ? "ok   " : r.knownLaggy ? "KNOWN" : "LAGGY";
  console.log(
    `${label}  ${r.name.padEnd(28)} ` +
      `${String(r.longFrames).padStart(3)} long frames, ` +
      `${Math.round(r.laggyShare * 100)}% of the time stuttering, ` +
      `worst frame ${Math.round(r.worstFrameMs)} ms`
  );
}
console.log(
  `\nLimits: at most ${BUDGET.laggyShare * 100}% of the time stuttering, no frame over ${BUDGET.worstFrameMs} ms.` +
    "\nKNOWN = over the limit, but a known issue that doesn't fail the check yet."
);
process.exit(failed ? 1 : 0);
