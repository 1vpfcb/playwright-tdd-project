import { test } from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { LeftMainPage } from "../../pages/LeftMainPage";
import { DataReader } from "../../utilities/qa_data_reader";
import process from "process";

test.describe("User Story @sep07: Product landing page", () => {
    test.afterEach(async ({ page }) => {
        await page.close();
    });
test('TC: @sep12-1, Verify all static UI elements of the left main page are displayed correctly', async ({ page }) => {
    await page.goto(process.env.SEP_QA_URL!);
    const leftMenu = new LeftMainPage(page);
    const datareader = DataReader.getQaData();
await test.step("Verify the product name and secure checkout text are displayed correctly", async()=>{    
    await expect(leftMenu.secureCheckout).toHaveText(datareader.course.secureCheckout);
    await expect(leftMenu.programName).toHaveText(datareader.course.programName);
});
await test.step("Verify the footer links are displayed correctly", async()=>{ 
    await expect(leftMenu.footerLinks).toHaveText([
        "",
        "Terms and conditions", 
        "Privacy Policy", 
        "Disclaimer", 
        "Cookie Policy"
    ]);
});
});
});