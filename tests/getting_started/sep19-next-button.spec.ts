import { test } from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { completeStartApplication } from "../../utilities/app-setup";
import { generateApplicant } from "../../utilities/data-factory";

test.describe("User Story @sep19: Click on the next button on step 1",  () => {
// no hook cus my test is onlu one step to enter all fields and click next button

test.afterEach(async ({ page }) => {
    await page.close();
});

test("TC: @sep19-1 , Verify that the user can click on the next button after filling out all required fields on step 1", async ({ page }) => {
    const startApp = new StartApplicationPage(page);
    await completeStartApplication(page);

    await expect(startApp.nextButton).toBeEnabled();
    await startApp.nextButton.click();

});

test("TC: @sep19-2 , Verify that the user cannot click on the next button if any required field is left empty on step 1", async ({ page }) => {
    const startApp = new StartApplicationPage(page);
    const applicant = generateApplicant();

    await startApp.enterFirstName(applicant.firstName);
    await startApp.enterLastName(applicant.lastName);
    await startApp.enterPhoneNumber(applicant.phone); 
    await startApp.enterEmail(applicant.email);  
    
    
    await startApp.nextButton.click({ force: true });
    
});
});
