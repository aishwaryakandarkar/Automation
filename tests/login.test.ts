import { test, expect, Browser, chromium, Page } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import { loginData } from '../utils/testData';

test.describe('Login Tests @Login', () => {

    let browser: Browser;
    let page: Page;

    test.beforeEach(async () => {
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage();
    });
    test('Valid login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.pause();
        await loginPage.login(loginData.validUser.username, loginData.validUser.password);
        await expect(page).toHaveURL(/inventory/);
        console.log ('Login successful');
    });

    test('Invalid login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
        await expect(loginPage.errorMessage).toBeVisible();
        console.log ('Login failed as expected');
    });

    test.afterEach(async () => {
        await page.close();
    })
});
