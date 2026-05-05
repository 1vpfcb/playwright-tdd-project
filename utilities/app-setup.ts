import {Page} from "@playwright/test";
import { StartApplicationPage } from "../pages/StartApplicationPage";
import { Applicant, generateApplicant } from "./data-factory";
import { PaymentPlanPage } from "../pages/PaymentPlanPage";
import { CardDetails, generateCardDetails } from "./data-factory";
import { ReviewPaymentPage } from "../pages/ReviewPaymentPage";


// creating an interface 
export interface fillOutApplication{
   overrides? : Partial<Applicant>;
   clickNext? : boolean
}

export async function completeStartApplication(page: Page, option: fillOutApplication = {}){
   const defaultApplicant = generateApplicant();
   // Inside the function, I generate my perfect default data. 
   // Then, I use the Spread Operator (...) to merge the default data with whatever the user passed in. 
   // The rule of the spread operator is: The last one in the curly braces wins.
   const finalApplicant = {...defaultApplicant, ...option.overrides};
   const startApp = new StartApplicationPage(page);

   await startApp.enterFirstName(finalApplicant.firstName);
   await startApp.enterLastName(finalApplicant.lastName);
   await startApp.enterPhoneNumber(finalApplicant.phone);
   await startApp.enterEmail(finalApplicant.email);
   await startApp.selectHowDidYouHearAboutUs(finalApplicant.hearAboutUs);

   if (option.clickNext !== false){
       await startApp.clickNextButton();
   }
}


export async function selectPaymentPlan(page: Page, planName: string ="upfront"){
   const paymentPlanPage = new PaymentPlanPage(page);
   await paymentPlanPage.selectPaymentPlan(planName);
   await paymentPlanPage.activeNextButton.click();
}

export interface fillOutCardDetailsOption {
   overrides? : Partial<CardDetails>;
}

export async function fillOutCardDetails(page: Page, option: fillOutCardDetailsOption = {}){
   const defaultCardDetails = generateCardDetails();
   const finalCardDetails = {...defaultCardDetails, ...option.overrides};
   const reviewPaymentPage = new ReviewPaymentPage(page);

   await reviewPaymentPage.cardNumberInput.fill(finalCardDetails.cardNumber);
   await reviewPaymentPage.expiryDateInput.fill(finalCardDetails.expiryDate);
   await reviewPaymentPage.cvcInput.fill(finalCardDetails.cvc);
   await reviewPaymentPage.zipCodeInput.fill(finalCardDetails.zipCode);

   }
