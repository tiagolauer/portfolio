import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const BLOCKING_IMPACTS = new Set(["serious", "critical"]);
const MIN_TOUCH_TARGET_PX = 44;
const MAX_HEADER_HEIGHT_PX = 64;
const SECTION_LINK = /^\/?#(.+)$/;

const blockingViolations = async (page: Page): Promise<string[]> => {
  const { violations } = await new AxeBuilder({ page }).analyze();
  return violations
    .filter((violation) => BLOCKING_IMPACTS.has(violation.impact ?? ""))
    .map((violation) => `${violation.id}: ${violation.help}`);
};

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the name as the main heading", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tiago Lauer");
  });

  test("every section link points to an existing section", async ({ page }) => {
    const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    const ids = hrefs.flatMap((href) => SECTION_LINK.exec(href ?? "")?.slice(1, 2) ?? []);
    expect(ids.length).toBeGreaterThan(0);

    for (const id of new Set(ids)) {
      await expect(page.locator(`[id="${id}"]`), `missing target for #${id}`).toHaveCount(1);
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

    await page.locator("footer").last().scrollIntoViewIfNeeded();
    const scrolled = await header.boundingBox();
    expect(scrolled?.y).toBe(0);
  });

  test("navigation links are comfortable to tap", async ({ page }) => {
    const links = page.getByRole("navigation", { name: "Sections" }).getByRole("link");
    for (const height of await links.evaluateAll((items) => items.map((item) => item.getBoundingClientRect().height))) {
      expect(height).toBeGreaterThanOrEqual(MIN_TOUCH_TARGET_PX);
    }
  });

  test("the code sample fits without sideways scrolling", async ({ page }) => {
    const overflow = await page.locator(".code").evaluate((element) => element.scrollWidth - element.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("has no serious accessibility violations", async ({ page }) => {
    expect(await blockingViolations(page)).toEqual([]);
  });
});

test.describe("blog", () => {
  test("the index renders with a heading", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");
    expect(await blockingViolations(page)).toEqual([]);
  });

  test("every listed post opens with its title as the heading", async ({ page }) => {
    await page.goto("/blog");
    const hrefs = await page
      .locator(".posts h2 a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));

    for (const href of hrefs) {
      await page.goto(href ?? "");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(await blockingViolations(page)).toEqual([]);
    }
  });

  test("the navigation links to the blog only when there are posts", async ({ page }) => {
    await page.goto("/blog");
    const postCount = await page.locator(".posts li").count();
    const blogLinks = page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: "Blog" });
    await expect(blogLinks).toHaveCount(postCount > 0 ? 1 : 0);
  });

  test("the RSS feed is served", async ({ request }) => {
    const response = await request.get("/rss.xml");
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain("<rss");
  });
});
