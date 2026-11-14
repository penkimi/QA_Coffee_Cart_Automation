import { test } from '../fixtures/testFixture';
import { customerData } from '../data/mockData';

test('Automated Flow: Add products, handle promo, and checkout', async ({ coffeeCartPage }) => {
    
    // 1. Add 3 items to trigger the bonus promo popup
    await coffeeCartPage.addCoffee('Espresso');
    await coffeeCartPage.addCoffee('Espresso_Macchiato');
    await coffeeCartPage.addCoffee('Cappuccino');

    // 2. Handle the Promo Popup (Bonus Point Requirement)
    await coffeeCartPage.acceptPromoPopup();

    // 3. Checkout and Submit Payment using isolated test data
    await coffeeCartPage.proceedToCheckout();
    await coffeeCartPage.submitPayment(customerData.name, customerData.email);

    // 4. Verify Success
    await coffeeCartPage.verifySuccessMessage();
});