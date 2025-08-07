import { expect, Locator, Page } from '@playwright/test';

export class YourCartPage {
  readonly page: Page;
  readonly REMOVE_BUTTON: Locator;
  readonly CHECKOUT_BUTTON: Locator;
  readonly CONTINUE_SHOPPING_BUTTON

  constructor(page: Page) {
    this.page = page;
    this.REMOVE_BUTTON = page.locator('button.cart_button');
    this.CHECKOUT_BUTTON = page.locator('a.checkout_button');
    this.CONTINUE_SHOPPING_BUTTON = page.locator('a.btn_secondary');
  }

  async validateYourCartPage() {
   const pageUrl = this.page.url();
   expect(pageUrl).toContain('/cart.html');
   //check the count of remove buttons to be more than 0
   const removeButtonsCount = await this.REMOVE_BUTTON.count();
   expect(removeButtonsCount).toBeGreaterThan(0);   

   // Check if the checkout button is visible
   const isCheckoutButtonVisible = await this.CHECKOUT_BUTTON.isVisible();
   expect(isCheckoutButtonVisible).toBe(true);  

   //check if the continue shopping button is visible
   const isContinueShoppingButtonVisible = await this.CONTINUE_SHOPPING_BUTTON.isVisible();
    expect(isContinueShoppingButtonVisible).toBe(true);
  }

  async clickCheckoutButton() {
    console.log('Clicking on the checkout button');
    await Promise.all([
        this.page.waitForURL('**/checkout-step-one.html'),
        await this.CHECKOUT_BUTTON.click({force: true}) 
      ]);
    
  }
}       