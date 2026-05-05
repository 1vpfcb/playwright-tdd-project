import { BasePage } from "./BasePage";
import {Locator} from '@playwright/test';

// creaing a new class for the Left main page
// this class will extend the BasePage class to inherit its properties and methods

export class LeftMainPage extends BasePage {
    // addidng locators for the elements on the left main page

    public readonly cydeoImageAtLeftWindow : Locator =
    this.locator("(//img[@src = 'assets/images/logo.svg'])[2]");

    public readonly secureCheckout: Locator =
    this.locator("//p[@class='checkout-title']");

    public readonly footerElements: Locator =
    this.locator("//a[contains(@href, 'https://cydeo.com/')]");
    
    public readonly programName: Locator 
    = this.locator("//p[@class='course-name']/a");

    public readonly footerLogo: Locator = this.locator("img[src*='logo.svg']");

    public readonly termsAndConditionsLink: Locator =
    this.locator("//a[@href='https://cydeo.com/terms-conditions/']");

    public readonly privacyPolicy: Locator =
    this.locator("//a[@href='https://cydeo.com/privacy-policy/']")
    // 
    public readonly disclaimer: Locator =
    this.locator("//a[@href='https://cydeo.com/disclaimer/']");

    public readonly cookiePolicy: Locator =
    this.locator("//a[@href='https://cydeo.com/cookie-policy/']");

    public readonly footerLinks: Locator =
    this.locator(".row.footer-row a");
}
