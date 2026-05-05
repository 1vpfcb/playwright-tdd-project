import {Locator} from '@playwright/test';
import { BasePage } from "./BasePage";

export class StartApplicationPage extends BasePage {
    // creating locators 
    public readonly stepOneText: Locator =
    this.locator("//div[@class='step-title'][text()='Start Application']"); 

    public readonly stepTwoText: Locator =
    this.locator("//div[@class='step-title'][text()='Payment plan']");

    public readonly stepThreeText: Locator =
    this.locator("//div[@class='step-title'][text()='Review']");
    
    public readonly startApplicationText: Locator =
    this.locator("(//div[@class = 'step-title'])[1]");

    public readonly firstNameInputBox : Locator =
    this.locator("//input[@formcontrolname='firstName']");

    public readonly lastNameInputBox : Locator = 
    this.locator("//input[@formcontrolname='lastName']")

    public readonly phoneNumberInputBox : Locator =
    this.locator("//input[@formcontrolname='phoneNumber']")

    public readonly emailInputBox : Locator =
    this.locator("//input[@formcontrolname='email']")


    // dropdown locators
    public readonly dropBox : Locator =
    this.locator("//mat-label[text()='How did you hear about us?']")

    public readonly emailOption : Locator =
    this.locator("//mat-option/span[contains(text(), 'Email')]")

    public readonly facebookOption: Locator = 
    this.locator("//mat-option/span[contains(text(), 'Facebook')]");

    public readonly googleOption: Locator =
    this.locator("//mat-option/span[contains(text(), 'Google')]");

     public readonly instagramOptionDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Instagram')]"
  );

   public readonly linkedInOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'LinkedIN')]"
  );

  public readonly twitterOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Twitter')]"
  );

  public readonly referredByFriendOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Referred by a friend')]"
  );

  public readonly otherOptionFromDropDown: Locator = this.locator(
    "//mat-option/span[contains(text(), 'Other')]"
  );


     public readonly nextButton: Locator = this.locator(
    "//button[@class = 'next-button'][contains(text(), 'Next')]");

    
    public readonly step1Container: Locator 
    = this.locator("//div[@class='step-circle'][contains(.,'1')]");

    public readonly step2Container: Locator 
    = this.locator("//div[@class='step-circle'][contains(.,'2')]");

    public readonly step3Container: Locator 
    = this.locator("//div[@class='step-circle'][contains(.,'3')]");
   
    public readonly flexiblePaymentsPlanAvailableText: Locator = this.locator(
    "//p[text() = 'Flexible payments plan available']"
  );

  public readonly programStartDate: Locator = this.locator(
    "//div[contains(text(), 'Program Start Date')]/b[@class='info-value']"
  );

  public readonly refundEndDate: Locator = this.locator(
    "(//b[@class='info-value'])[2]"
  );

  public readonly programNameOnInfoCard: Locator = this.locator(
    "//p[@class='program-title primary-color']"
  );

  public readonly programPrice: Locator = this.locator(
    "//div[@class='col-sm']/b[@class = 'info-primary']"
  );

  public readonly footer: Locator = this.locator(
    "//p[@class = 'footer-text' and contains(text(), 'Need help?')]"
  );

  public readonly programBasePrice: Locator = this.locator(
    "//span[@class='ng-star-inserted']/s"
  );

  public readonly enterPersonalDetails: Locator = this.locator(
    "//b[contains(.,'Enter personal details')]"
  );

  public readonly discountedPrice: Locator = this.locator(
    "//b[@class='info-primary']"
  );

  public readonly originalPrice: Locator = this.locator("//s[contains(.,'$')]");

  public readonly returnPolicyText: Locator =
  this.locator("//span[contains(.,'refund')]/following::b[@class='info-value'][1]")

  

    
    // Methods ONLY

    public async enterFirstName(firstName:string) {
        await this.firstNameInputBox.fill(firstName);   
    }

    public async enterLastName(lastName:string) {
        await this.lastNameInputBox.fill(lastName);
    }

    public async fillFullName( firstName: string, lastName: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
    }
    
    public async enterPhoneNumber(phoneNumber:string) {
        await this.phoneNumberInputBox.fill(phoneNumber);
    }

    public async enterEmail (email:string) {
        await this.emailInputBox.fill(email)
    }

    public async selectHowDidYouHearAboutUs(option:string) {
        await this.dropBox.click();
        option = option.toLowerCase();
        switch(true) {
            case option.includes('email'):
                await this.emailOption.click();
                break;
            case option.includes('facebook'):
                await this.facebookOption.click();
                break;
            case option.includes('google'):
                await this.googleOption.click();
                break;
            case option.includes('instagram'):
                await this.instagramOptionDropDown.click();
                break;  
            case option.includes('linkedin'):
                await this.linkedInOptionFromDropDown.click();
                break;
            case option.includes('twitter'):
                await this.twitterOptionFromDropDown.click();
                break;
            case option.includes('friend'):
                await this.referredByFriendOptionFromDropDown.click();
                break;
            case option.includes('other'):
                await this.otherOptionFromDropDown.click();
                break;
            default:
                throw new Error(`Invalid option: ${option}`);

        }
    }
    public async clickNextButton() {
        await this.nextButton.click();
    }
}

