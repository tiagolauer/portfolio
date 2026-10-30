import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const BLOCKING_IMPACTS = new Set(["serious", "critical"]);

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

test("has no serious accessibility violations", async ({ page }) => {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const blocking = violations.filter((violation) => BLOCKING_IMPACTS.has(violation.impact ?? ""));
  expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
});
