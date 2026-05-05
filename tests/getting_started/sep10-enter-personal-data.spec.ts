import { test } from "../../utilities/sep-test-utilities";
import { expect } from "@playwright/test";
import {Locator} from '@playwright/test'
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { invalidEmails } from "../../utilities/data-factory";
import process from "process";
import { completeStartApplication } from "../../utilities/app-setup";

test.describe('User Story @sep10: Enter my personal details', () => {
    test.afterEach(async ({ page }) => {
        await page.close();
    });

test('TC: @sep10-1: Verify all data boxes are visible', async({page})=>{
    //creating new objects 
    const startApp = new StartApplicationPage(page);
    await page.goto(process.env.SEP_QA_URL!)

    let dataFields: Locator[] = [startApp.firstNameInputBox,startApp.lastNameInputBox,
        startApp.phoneNumberInputBox, startApp.emailInputBox]
    for (let field of dataFields){
        await expect(field).toBeVisible();
    }
    });

  // The loop wraps AROUND the test block
for (let badEmail of invalidEmails) {

    // Inject the email into the title so your report shows exactly which one failed!
    test(`TC: @sep10-2: Verify email rejects invalid format: ${badEmail}`, async({page})=>{
        const startApp = new StartApplicationPage(page);
        await page.goto(process.env.SEP_QA_URL!)
        
        await completeStartApplication(page, {
            overrides : {email : badEmail},
            clickNext : true
        });
        
        await expect(startApp.step1Container).toHaveCSS("background-color", 'rgb(1, 201, 255)');
    });
}

test('TC: @sep10-3: Verify that phone number only accepts numeric input', async({page})=>{
    const startApp = new StartApplicationPage(page);
    await page.goto(process.env.SEP_QA_URL!)
    await completeStartApplication(page,
        {
            overrides: {phone: "ABC"},
            clickNext : true
        }
      
    );
     await expect(startApp.step1Container).toHaveCSS("background-color", 'rgb(1, 201, 255)');
});
});
