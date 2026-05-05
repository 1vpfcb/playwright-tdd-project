import {test} from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { completeStartApplication } from "../../utilities/app-setup";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";  
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe('User Story @sep016- Next button on selecting payment page', () => {
    test.beforeEach(async ({ page }) => {
       await completeStartApplication(page);
    
    });
    
    test.afterEach(async ({ page }) => {
    await page.close(); 
})


test('TC: @sep16-1: Verify selecting a plan activates the "Next" button on Step 2', async({page})=>{  
        const paymentPlanPage = new PaymentPlanPage(page);

        const paymentPlanOptions = [paymentPlanPage.upfrontPaymentOption, paymentPlanPage.installmentsPaymentOption];
        for (let option of paymentPlanOptions){
            await option.click();
            await expect(paymentPlanPage.activeNextButton).toBeEnabled();
        }
    });
test('TC: @sep16-2: Verify Step 3 displays the correct stepper state and UI components', async({page})=>{
     
        const paymentPlanPage = new PaymentPlanPage(page);
        const startApp = new StartApplicationPage(page);
        const reviewPayment = new ReviewPaymentPage(page);

       
        await paymentPlanPage.upfrontPaymentOption.click();

        
        await test.step('Navigate to Step 3 and verify payment form is visible', async()=>{
            await paymentPlanPage.activeNextButton.click();
            await expect(reviewPayment.cardNumberInput).toBeVisible();
        }); 

        await test.step('TC: @sep16-3: Verify that steps one and two are green, and step 3 is blue', async()=>{
            await expect(startApp.step1Container).toHaveCSS("background-color", 'rgb(172, 245, 138)');
            await expect(startApp.step2Container).toHaveCSS("background-color", 'rgb(172, 245, 138)');
            await expect(startApp.step3Container).toHaveCSS("background-color", 'rgb(1, 201, 255)');
        }); 

        
        await test.step('TC: @sep16-4: Verify that price summary is displayed', async()=>{
            await expect(reviewPayment.totalAmount).toBeVisible();
        });

        
        await test.step('TC: @sep16-5: Verify that Back button is visible', async()=>{
            await expect(reviewPayment.backButton).toBeVisible();
        });

    }); 
});