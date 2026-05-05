import { test } from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { LeftMainPage } from "../../pages/LeftMainPage";
import { DataReader } from "../../utilities/qa_data_reader";
import process from "process";

test.describe('User Story @sep11: Program start dates and Refund dates are displayed correctly', () => {
    test.afterEach(async ({ page }) => {
        await page.close();
    });

test('TC: @sep11-1: Verify that the program start date and refund end date are displayed correctly', async ({ page }) => {
    const startApp = new StartApplicationPage(page);
    const datareader = DataReader.getQaData();
    await page.goto(process.env.SEP_QA_URL!)
    
  
    await expect(startApp.programStartDate).toHaveText(datareader.course.startDate);

    await expect(startApp.refundEndDate).toHaveText(datareader.course.refundDate);

});
});