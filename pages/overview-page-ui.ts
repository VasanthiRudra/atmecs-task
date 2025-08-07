import { expect, Locator, Page } from '@playwright/test';

export class OverviewPage {
    readonly page: Page;
    readonly PRODUCT_PRICE: Locator;
    readonly TOTAL_PRICE: Locator;
    readonly FINISH_BUTTON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.PRODUCT_PRICE = page.locator('.inventory_item_price');
        this.TOTAL_PRICE =  page.locator('.summary_subtotal_label');
        this.FINISH_BUTTON = page.locator('a.btn_action');
    }

    async validateOverviewPage() {
        const pageUrl = this.page.url();
        //expect(pageUrl).toContain('/checkout-step-two.html');
        await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);

        // check the sum of all products price listed on the page is equal to the total price displayed


        // Get total number of price elements
        const count = await this.PRODUCT_PRICE.count();

        let calculatedTotal = 0;

        for (let i = 0; i < count; i++) {
            const priceText = await this.PRODUCT_PRICE.nth(i).innerText();
            const numericPrice = parseFloat(priceText.replace('$', ''));
            calculatedTotal += numericPrice;
        }

        console.log(`Total calculated price: $${calculatedTotal.toFixed(2)}`);
        // Step 2: Get the displayed item total from the summary section
        await this.TOTAL_PRICE.waitFor({ state: 'visible' });
        const displayedTotalText = await this.TOTAL_PRICE.innerText(); 
        const displayedTotal = parseFloat(displayedTotalText.replace('Item total: $', ''));
        console.log(`Displayed total price: $${displayedTotal.toFixed(2)}`);
        expect(displayedTotal).toBeCloseTo(calculatedTotal, 2);
    }

    async clickFinishButton() {
        // Check if the finish button is visible
        const isFinishButtonVisible = await this.FINISH_BUTTON.isVisible();
        expect(isFinishButtonVisible).toBe(true);
        await this.FINISH_BUTTON.click(); // Click the finish button to complete the checkout
    }

}   