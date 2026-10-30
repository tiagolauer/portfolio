import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const BLOCKING_IMPACTS = new Set(["serious", "critical"]);
const MIN_TOUCH_TARGET_PX = 44;
const MAX_HEADER_HEIGHT_PX = 64;

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
});

test("renders the name as the main heading", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tiago Lauer");
});

test("every in-page link points to an existing section", async ({ page }) => {
  const hashes = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
  expect(hashes.length).toBeGreaterThan(0);

  for (const hash of new Set(hashes)) {
    await expect(page.locator(hash), `missing target for ${hash}`).toHaveCount(1);
  }
});

test("offers a way to send an email", async ({ page }) => {
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
});

test("does not overflow horizontally", async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("keeps the navigation on one row and pinned while scrolling", async ({ page }) => {
  const header = page.locator(".site-header");
  const initial = await header.boundingBox();
  expect(initial?.height ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(MAX_HEADER_HEIGHT_PX);

  await page.locator("footer").scrollIntoViewIfNeeded();
  const scrolled = await header.boundingBox();
  expect(scrolled?.y).toBe(0);
});

test("navigation links are comfortable to tap", async ({ page }) => {
  const links = page.getByRole("navigation", { name: "Sections" }).getByRole("link");
  for (const box of await links.evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height))) {
    expect(box).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET_PX);
  }
});

test("the code sample fits without sideways scrolling", async ({ page }) => {
  const overflow = await page.locator(".code").evaluate((element) => element.scrollWidth - element.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("has no serious accessibility violations", async ({ page }) => {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const blocking = violations.filter((violation) => BLOCKING_IMPACTS.has(violation.impact ?? ""));
  expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
});
