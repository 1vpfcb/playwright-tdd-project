import {test} from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { LeftMainPage } from "../../pages/LeftMainPage";
import { DataReader } from "../../utilities/qa_data_reader";
import process from "process";


test.describe("User Story @sep09: Display the product information", () => {
   
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    

test('TC: @sep09-1, Verify all product information is displayed accurately on the card', async ({ page }) => {
  
    const startApp = new StartApplicationPage(page);
    const leftMainPage = new LeftMainPage(page);
    const datareader = DataReader.getQaData();

    await page.goto(process.env.SEP_QA_URL!);
    
    await expect(startApp.programNameOnInfoCard).toHaveText(datareader.course.courseName);
    await expect(leftMainPage.programName).toHaveText(datareader.course.courseName);
    //base price and discount price
    await expect(startApp.programPrice).toHaveText(datareader.course.discountedPrice);
    await expect(startApp.flexiblePaymentsPlanAvailableText).toBeVisible();
    //return policy and the final day of return available
    await expect(startApp.refundEndDate).toHaveText(datareader.course.refundDate);
    await expect(startApp.returnPolicyText).toBeVisible();
   

    });
});