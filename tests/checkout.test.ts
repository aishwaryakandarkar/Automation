import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CheckoutPage from '../pages/checkoutPage';
import { loginData, checkoutData } from '../utils/testData';

test('@checkout Checkout process', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login first
  await loginPage.goto();
  await loginPage.login(loginData.validUser.username, loginData.validUser.password);
  await expect(page).toHaveURL(/inventory/);

  // Go to cart and checkout
  await checkoutPage.gotoCheckout();
  await checkoutPage.fillCheckoutForm(
    checkoutData.firstName,
    checkoutData.lastName,
    checkoutData.postalCode
  );
  await checkoutPage.finishCheckout();

  // Verify order confirmation
  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toBe('Thank you for your order!');
});
