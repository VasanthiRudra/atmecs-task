import { expect, Locator, Page } from '@playwright/test';

export class FinishPage{
    readonly page: Page;
    readonly THANK_YOU_MESSAGE: Locator;
    readonly OPEN_MENU: Locator;
    readonly LOG_OUT_LINK: Locator;

    constructor(page: Page) {
        this.page = page;
        this.THANK_YOU_MESSAGE = page.locator('.complete-header');
        this.OPEN_MENU = page.locator('.bm-burger-button button');
        this.LOG_OUT_LINK = page.locator('#logout_sidebar_link');
    }

    async validateFinishPage() {
        const pageUrl = this.page.url();
        expect(pageUrl).toContain('/checkout-complete.html');

        // Check if the thank you message is visible
        const isThankYouMessageVisible = await this.THANK_YOU_MESSAGE.isVisible();
        expect(isThankYouMessageVisible).toBe(true);

        // Optionally, you can also check the text of the thank you message
        const thankYouText = await this.THANK_YOU_MESSAGE.innerText();
        expect(thankYouText).toContain('THANK YOU FOR YOUR ORDER');
    }

    async clickOpenMenu() {
        // Check if the open menu button is visible
        const isOpenMenuVisible = await this.OPEN_MENU.isVisible();
        expect(isOpenMenuVisible).toBe(true);
        await this.OPEN_MENU.click(); // Click the open menu button to navigate to the menu
    }   

    async clickLogOutLink() {
        // Check if the log out link is visible
        const isLogOutLinkVisible = await this.LOG_OUT_LINK.isVisible();
        expect(isLogOutLinkVisible).toBe(true);
        await this.LOG_OUT_LINK.click(); // Click the log out link to log out
    }   
}