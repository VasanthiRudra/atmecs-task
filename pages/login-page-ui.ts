import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly ACCEPTED_USERNAMES: Locator
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly PASWWORD_FOR_ALL_USERS: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.ACCEPTED_USERNAMES = page.locator('#login_credentials');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.PASWWORD_FOR_ALL_USERS = page.locator('.login_password');
   
  }

  async navigateToLoginPage(url: string) {
    await this.page.goto(url);
  }

  async isLoginPageVisible() {
    // Check if the login page is visible by checking the URL
    const pageUrl = this.page.url();
    return pageUrl.includes('/index.html') || pageUrl.includes('/v1/index.html');
  }

  async validateLoginPage() {

    // Check if the username input is visible
    const isUsernameVisible = await this.usernameInput.isVisible();
    expect(isUsernameVisible).toBe(true);

    // Check if the password input is visible
    const isPasswordVisible = await this.passwordInput.isVisible();
    expect(isPasswordVisible).toBe(true);

    // Check if the login button is visible
    const isLoginButtonVisible = await this.loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
  }

  async getRandonAcceptedUsername(): Promise<string> {
    const rawText = await this.ACCEPTED_USERNAMES.innerText();
    // Extract usernames from the raw text
    const usernames = rawText
      .replace('Accepted usernames are:', '') // remove the heading
      .split('\n')                            // split by line
      .map(line => line.trim())               // trim each line
      .filter(line => line && line !== 'locked_out_user');                      

    return usernames[Math.floor(Math.random() * usernames.length)];

  }
  async getPasswordForAllUsers(): Promise<string> {
    const password = await this.PASWWORD_FOR_ALL_USERS.evaluate((el) => {
      // Remove the h4 content
      const h4 = el.querySelector('h4');
      if (h4) h4.remove();
      return el.textContent?.trim();
    });
    return password || '';
  }
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
 
}