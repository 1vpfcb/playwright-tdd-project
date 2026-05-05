import {test} from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { completeStartApplication } from "../../utilities/app-setup";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";  
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { DataReader } from "../../utilities/qa_data_reader";

test.describe('User Story: Sep017: Verify the payment plaan options are displayed on step2',async () => {
    test.beforeEach(async ({ page }) => {
       await completeStartApplication(page);
    });
    
    test.afterEach(async ({ page }) => {
        await page.close();
    });

test('@sep17-1: Verify Upfront payment card displays correct text and dynamic prices', async({page})=>{
    const paymentPlanPage = new PaymentPlanPage(page);

    // fetching data from JSON
    const expectedData = DataReader.getQaData();
    const expectedPrice = expectedData["course-prices"].upfrontPrice;

    await test.step('Verify the Upfront card exists and displays correct static text', async () => {
    // counting 
    await expect(paymentPlanPage.upfrontPaymentOption).toBeVisible();
    await expect(paymentPlanPage.upfrontPaymentOption).toHaveCount(1);
    // checking upfront text 
    await expect(paymentPlanPage.UpfrontText).toHaveText("Upfront");
    });

    await test.step('Verify the Upfront card displays the correct dynamic price', async () => {
    await expect(paymentPlanPage.upfrontPaymentAmount).toContainText(expectedPrice);
    await expect(paymentPlanPage.upfrontPaymentAmount).toContainText('pay once');
    });
});

test('@sep17-2: Verify Installments payment card displays correct text and dynamic prices', async({page})=>{
  const paymentPlanPage = new PaymentPlanPage(page);
    const QaData = DataReader.getQaData();
    const prices = QaData["course-prices"];

    await expect(paymentPlanPage.installmentsPaymentOption).toBeVisible();

    const totalNumOfPlans = 1;
    // AC 2.1: Checking total num of plans
    await expect(paymentPlanPage.installmentsPaymentOption).toHaveCount(totalNumOfPlans);

    // We use a loop to check each card one by one
    for (let i = 0; i < totalNumOfPlans; i++) {
        
        // ROW 1 TESTING
        await test.step(`Verify Row 1 for installment plan ${i + 1}`, async () => {
            const numOfIntsallments = prices.installmentCount;
            const expectedInstallmentText = `${numOfIntsallments} Installments`;
            
            // Using .nth(i) ensures we are looking at Row 1 of the i-th card
            await expect(paymentPlanPage.installmentsTextUnderInstallments.nth(i))
                .toHaveText(expectedInstallmentText);
        });

        // ROW 2 TESTING
        await test.step(`Verify Row 2 for installment plan ${i + 1}`, async () => {
            const expectedMonthlyPrice = prices.pricePerInstallment;
            
            // Using .nth(i) ensures we are looking at Row 2 of the i-th card
            await expect(paymentPlanPage.installmentsPaymentAmount.nth(i))
                .toContainText(expectedMonthlyPrice);
            await expect(paymentPlanPage.installmentsPaymentAmount.nth(i))
                .toContainText('per month');
        });
    }
});

});