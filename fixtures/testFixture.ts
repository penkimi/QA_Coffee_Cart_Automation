import { test as base } from '@playwright/test';
import { CoffeeCartPage } from '../pages/coffeeCartPage';

type CustomFixtures = {
    coffeeCartPage: CoffeeCartPage;
};

// This setup automatically opens the browser and goes to the coffee cart website before every test
export const test = base.extend<CustomFixtures>({
    coffeeCartPage: async ({ page }, use) => {
        const coffeeCartPage = new CoffeeCartPage(page);
        await coffeeCartPage.goto();
        
        // Hand the ready-to-use page over to the test script
        await use(coffeeCartPage);
    },
});

export { expect } from '@playwright/test';