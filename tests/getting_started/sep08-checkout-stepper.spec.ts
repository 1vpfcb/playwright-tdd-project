import {test} from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { completeStartApplication } from "../../utilities/app-setup";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";  
import { generateApplicant } from "../../utilities/data-factory";


test.describe("User Story @sep08: Verify the checkout stepper is displayed correctly", () => {
    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test("TC: @sep08-1: Verify the checkout stepper displays the correct text", async ({ page }) => {

     const startApp = new StartApplicationPage(page);
     await completeStartApplication(page);
     await startApp.nextButton.click();

     await expect(startApp.stepOneText).toBeVisible();
     await expect(startApp.stepTwoText).toBeVisible();
     await expect(startApp.stepThreeText).toBeVisible();
});

    test(" TC: @sep08-2: Verify the current step is highlighted in blue, and other plans are grey ", async ({ page }) => {
    const applicant = generateApplicant();
    const startApp = new StartApplicationPage(page)
    const paymentPlanPage = new PaymentPlanPage(page);
    
    await startApp.enterFirstName(applicant.firstName);
    await startApp.enterLastName(applicant.lastName);
    await startApp.enterPhoneNumber(applicant.phone);
    await startApp.enterEmail(applicant.email);
    await startApp.selectHowDidYouHearAboutUs("email");
       

    await expect(startApp.step1Container).toHaveCSS("background-color", 'rgb(1, 201, 255)');
    await expect(startApp.step2Container).toHaveCSS("background-color", 'rgba(0, 0, 0, 0)');
    await expect(startApp.step3Container).toHaveCSS("background-color", 'rgba(0, 0, 0, 0)');
});

});