import { Page, expect } from '@playwright/test';

export class CoffeeCartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://coffee-cart.app/');
    }

    async addCoffee(coffeeName: string) {
        // Find the specific coffee cup on the page and click it
        await this.page.locator(`[data-test="${coffeeName}"]`).click();
    }

    async acceptPromoPopup() {
        // Wait for the bonus promo popup to show up after adding 3 items, then click Yes
        const acceptBtn = this.page.getByRole('button', { name: 'Yes, of course!' });
        await acceptBtn.waitFor({ state: 'visible' });
        await acceptBtn.click();
    }

    async proceedToCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }

    async submitPayment(name: string, email: string) {
        await this.page.locator('input[name="name"]').fill(name);
        await this.page.locator('input[name="email"]').fill(email);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async verifySuccessMessage() {
        // Check the screen to make sure the green "Thanks for your purchase" banner appears
        const successMsg = this.page.locator('.snackbar.success');
        await expect(successMsg).toBeVisible();
        await expect(successMsg).toContainText('Thanks for your purchase');
    }
}