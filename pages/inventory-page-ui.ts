import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage{
    readonly page: Page;
    readonly ADD_TO_CART_BUTTON: Locator;
    readonly CART_ICON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ADD_TO_CART_BUTTON = page.locator('button.btn_inventory');
        this.CART_ICON = page.locator('#shopping_cart_container a');
    }

    async addRandomProductToBasket() {
        // Implementation for adding a random product to the basket
        // This would typically involve selecting a product from the inventory page
        // and clicking an "Add to Cart" button.
        const addToCartButtons = this.ADD_TO_CART_BUTTON;
        const totalButtons = await addToCartButtons.count();
    
        // Choose 3 unique random indexes
        const randomIndexes = new Set<number>();
        while (randomIndexes.size < 3 && randomIndexes.size < totalButtons) {
          const randomIndex = Math.floor(Math.random() * totalButtons);
          randomIndexes.add(randomIndex);
        }
        // Click each randomly selected button
        for (const index of randomIndexes) {
          await addToCartButtons.nth(index).click();
        }
      }
      
      async clickOnCartIcon() {
        // Click on the cart icon to view the items in the cart
        await this.CART_ICON.click();
      }
}
