import {Locator, Page, FrameLocator} from '@playwright/test';

export class BasePage {
    protected static page: Page;

    constructor (page: Page) {
        BasePage.page = page; 
    }

    protected locator(selector:string): Locator {
        return BasePage.page.locator(selector);
    }

    protected frameLocator(selector:string) : FrameLocator {
        return BasePage.page.frameLocator(selector);
    }

    public static setPage(page: Page) {
        BasePage.page = page;
    }
}






