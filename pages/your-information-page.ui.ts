import { expect, Locator, Page } from '@playwright/test';

export class YourInformationPage {
    readonly page: Page;
    readonly FIRST_NAME: Locator;
    readonly LAST_NAME: Locator;
    readonly POSTAL_CODE: Locator;
    readonly CONTINUE_BUTTON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.FIRST_NAME = page.locator('#first-name');
        this.LAST_NAME = page.locator('#last-name');
        this.POSTAL_CODE = page.locator('#postal-code');
        this.CONTINUE_BUTTON = page.locator('input[value="CONTINUE"]');
    }

    async validateYourInformationPage() {
        const pageUrl = this.page.url();
        expect(pageUrl).toContain('/checkout-step-one.html');

        // Check if the first name input is visible
        const isFirstNameVisible = await this.FIRST_NAME.isVisible();
        expect(isFirstNameVisible).toBe(true);
        await this.FIRST_NAME.fill('Test'); // Example input for first name

        // Check if the last name input is visible
        const isLastNameVisible = await this.LAST_NAME.isVisible();
        expect(isLastNameVisible).toBe(true);
        await this.LAST_NAME.fill('User'); // Example input for last name   
        // Check if the postal code input is visible
        const isPostalCodeVisible = await this.POSTAL_CODE.isVisible();
        expect(isPostalCodeVisible).toBe(true);

        await this.POSTAL_CODE.fill('12345'); // Example input for postal code  
    }

    async clickContinueButton() {
        // Check if the continue button is visible
        const isContinueButtonVisible = await this.CONTINUE_BUTTON.isVisible();
        expect(isContinueButtonVisible).toBe(true);
        await this.CONTINUE_BUTTON.click(); // Click the continue button to proceed 
    }
}   