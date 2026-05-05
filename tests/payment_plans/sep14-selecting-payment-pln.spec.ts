import {test} from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { completeStartApplication } from "../../utilities/app-setup";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";  


test.describe('User Story @sep014- Selecting a payment plan', () => {
    test.beforeEach(async ({ page }) => {
       await completeStartApplication(page);
    });
    
    test.afterEach(async ({ page }) => {
    await page.close(); 
});

test('TC:@sep14-1: Verify no payment plans are selected by default', async({page})=>{
    const paymentPlanPage = new PaymentPlanPage(page);

    const paymentOptions = [paymentPlanPage.upfrontPaymentOption, paymentPlanPage.installmentsPaymentOption];
    for ( let option of paymentOptions){
        await expect(option).toBeVisible();
        await expect(option).toHaveAttribute('aria-expanded', 'false');
    }
});

test('TC: @sep14-2, Verify that payment option is highlighted when selected', async({page})=>{
     const paymentPlanPage = new PaymentPlanPage(page);
     const paymentOptions = [paymentPlanPage.upfrontPaymentOption, paymentPlanPage.installmentsPaymentOption];
     
     for (let option of paymentOptions){
         await option.click();
         await expect(option).toHaveAttribute('aria-expanded', 'true');
         await expect(paymentPlanPage.activeNextButton).toBeEnabled();
     }

});
test('TC: @sep14-3: Verify that user can change their paln selection and the UI updates accordingly', async({page})=>{
    const paymentPlanPage = new PaymentPlanPage(page);
    const paymentOptions = [paymentPlanPage.upfrontPaymentOption, paymentPlanPage.installmentsPaymentOption];
    // Click the first option
await test.step('Select the first payment option and verify it is expanded', async()=>{
    await paymentOptions[0].click();
    await expect(paymentOptions[0]).toHaveAttribute('aria-expanded', 'true');
    await expect(paymentOptions[1]).toHaveAttribute('aria-expanded', 'false');
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});   // Click the second option
await test.step('Select the second payment option and verify it is expanded', async()=>{
    await paymentOptions[1].click();
    await expect(paymentOptions[1]).toHaveAttribute('aria-expanded', 'true');
    await expect(paymentOptions[0]).toHaveAttribute('aria-expanded', 'false');
    
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});
    
});

});