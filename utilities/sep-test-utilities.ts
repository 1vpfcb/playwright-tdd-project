import { Page, test as base, TestInfo, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import process from "process";
import { Buffer } from "buffer";

//Extends the base test with custom UI setup for SEP application.
export const test = base.extend({page: async ({ page }, use: Function, testInfo: TestInfo) => {

    const authToken = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${authToken}` });
    await page.goto(process.env.SEP_QA_URL as string);
    await page.waitForLoadState("networkidle");
    expect(await page.title()).toBe("Checkout | Cydeo");

    BasePage.setPage(page); // Set the page in BasePage for global access

    await use(page); // Use the page in the test functions

    await takeScreenshotIfFailed(page, testInfo); // After the test, take a screenshot if it failed

}
});

function takeScreenshotIfFailed(page: Page, testInfo: TestInfo) {
    // We will add screenshot logic here later!
}
