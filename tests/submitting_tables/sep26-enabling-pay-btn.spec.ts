import {test} from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { completeStartApplication, fillOutCardDetails } from "../../utilities/app-setup"; 
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { selectPaymentPlan } from "../../utilities/app-setup";
import { StartApplicationPage } from "../../pages/StartApplicationPage";


test.describe('User Story: @sep026: Enabling the Pay button on the Review Payment page',async () => {
    test.beforeEach(async ({ page }) => {
       await completeStartApplication(page);
       await selectPaymentPlan(page);
    }); 
    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('TC: @sep26: Verify Pay button is clickable after agreeing to terms and conditions', async ({ page }) => {
        // The pay button is disabled and terms & conditions checkbox is unchecked by default
        
        const reviewPaymentPage = new ReviewPaymentPage(page);
        await expect(reviewPaymentPage.termsAndConditionsCheckBox).not.toBeChecked();
        await expect(reviewPaymentPage.payButton).toBeDisabled();
        // When the user checks the terms and conditions checkbox
        await reviewPaymentPage.termsAndConditionsCheckBox.check();
        // Then the pay button should become enabled
        await expect(reviewPaymentPage.payButton).toBeEnabled();
    });
    test('TC: @sep27:Verify that error message is dispalyed if the card number is invalid', async ({ page }) => {
        const reviewPaymentPage = new ReviewPaymentPage(page);
        await reviewPaymentPage.cardNumberInput.fill("1312 3121 2312 3123");
        await page.keyboard.press('Tab');
        await expect(reviewPaymentPage.cardNumberErrorMessage).toBeVisible();
    });
    test('TC: @sep28: Verify that the error message is displayed when the CVC number is too short.', async ({ page }) => {
        const reviewPaymentPage = new ReviewPaymentPage(page);
        await reviewPaymentPage.cvcInput.fill("12");
        await page.keyboard.press('Tab');
        await expect(reviewPaymentPage.cardCVCErrorMessage).toBeVisible();
    });

    test('TC: @sep29: Verify that the error message is displayed when the card expiry date is in the past.', async ({ page }) => {
        const reviewPaymentPage = new ReviewPaymentPage(page);
        await reviewPaymentPage.expiryDateInput.fill("01/20");
        await page.keyboard.press('Tab');
        await expect(reviewPaymentPage.cardExpiryErrorMessage).toBeVisible();
    });

    test('TC: @sep23: Successful enrollment with valid card', async ({page}) =>{
        const reviewPaymentPage = new ReviewPaymentPage(page);
        const startApp = new StartApplicationPage(page);

        await fillOutCardDetails(page);
        await reviewPaymentPage.termsAndConditionsCheckbox.check();
        await reviewPaymentPage.payButton.click();

    });
});