import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page-ui';
import { YourCartPage } from '../pages/your-cart-page-ui';  
import { YourInformationPage } from '../pages/your-information-page.ui';
import { OverviewPage } from '../pages/overview-page-ui'; 
import { InventoryPage } from '../pages/inventory-page-ui';
import { FinishPage } from '../pages/finish-page-ui'; // Assuming you have a FinishPage class for the finish page

test.describe('E2E for saucedemo online shoipping', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage; // Assuming you have an InventoryPage class for product
  let yourCartPage: YourCartPage;
  let yourInformationPage: YourInformationPage;
  let overviewPage: OverviewPage;
  let finishPage: FinishPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    yourCartPage = new YourCartPage(page);
    yourInformationPage = new YourInformationPage(page);
    overviewPage = new OverviewPage(page);
    finishPage = new FinishPage(page); // Initialize the FinishPage class
    await loginPage.navigateToLoginPage('https://www.saucedemo.com/v1/index.html');
  });

  test('Should login to add products to basket and complete the purchase', async () => {
    const username = await loginPage.getRandonAcceptedUsername();
    const password = await loginPage.getPasswordForAllUsers();
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();
    // Add assertions to verify successful login, e.g., check for a specific element on the landing page
    const inventoryPageTitle = await loginPage.page.title();
    expect(inventoryPageTitle).toContain('Swag Labs');
    await inventoryPage.addRandomProductToBasket();
    await inventoryPage.clickOnCartIcon();
    // Validate the cart page
    await yourCartPage.validateYourCartPage();
    // Click the checkout button to proceed with the purchase
    await yourCartPage.clickCheckoutButton();
    
    // Validate the Your Information page
    await yourInformationPage.validateYourInformationPage();
    // Fill in the information and click continue
    await yourInformationPage.clickContinueButton();

    await overviewPage.validateOverviewPage();
    // Click the finish button to complete the purchase
    await overviewPage.clickFinishButton();
    // Validate the Finish page
    await finishPage.validateFinishPage();
    
    //Validate the logout functionality
    await finishPage.clickOpenMenu();

    await finishPage.clickLogOutLink();

    await loginPage.validateLoginPage();
  });

  // Additional tests can be added here

}); 