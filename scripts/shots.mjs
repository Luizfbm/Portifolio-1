// Inspeção visual local: abre as rotas, tira captura de desktop e mobile,
// e imprime o console do browser. Não faz parte do site publicado.
import { chromium } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://127.0.0.1:5178';
const OUT = process.env.OUT ?? '/tmp/shots';
const EXECUTABLE =
  process.env.CHROME ??
  `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const targets = JSON.parse(process.env.TARGETS ?? '[]');

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});

for (const target of targets) {
  const context = await browser.newContext({
    viewport: { width: target.width ?? 1512, height: target.height ?? 950 },
    deviceScaleFactor: 1,
    colorScheme: target.scheme ?? 'dark',
    reducedMotion: target.reduced ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();
  const logs = [];
  page.on('console', (m) => logs.push(`${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`));

  await page.goto(BASE + (target.path ?? '/'), { waitUntil: 'networkidle' });
  if (target.theme) {
    await page.evaluate((t) => localStorage.setItem('luz:theme', t), target.theme);
    await page.reload({ waitUntil: 'networkidle' });
  }
  if (target.hover) await page.hover(target.hover);
  if (target.scrollTo) {
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ block: 'start' }), target.scrollTo);
  }
  await page.waitForTimeout(target.wait ?? 1600);
  await page.screenshot({ path: `${OUT}/${target.name}.png`, fullPage: Boolean(target.full) });
  if (logs.length) console.log(`[${target.name}]`, logs.join(' | '));
  else console.log(`[${target.name}] ok`);
  await context.close();
}

await browser.close();
