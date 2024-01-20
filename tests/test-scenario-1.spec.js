const {test, expect} = require('@playwright/test');

let WELCOME_LT_TEXT = "Welcome to LambdaTest";

test('Test Scenario 1', async ({page, baseURL}) => {

    await test.step('Open LambdaTest’s Selenium Playground from', async () => {
        await page.goto(baseURL, {waitUntil: 'networkidle'});
    });

    await test.step('Click “Simple Form Demo” under Input Forms', async () => {
        await page.locator('//a[contains(text(), "Simple Form Demo")]').click({timeout: 30000});
    });

    await test.step('Validate that the URL', async () => {
        await page.waitForLoadState('networkidle');
        await expect(page.url()).toContain("simple-form-demo");
    });

    await test.step('Enter values to enter message text box and click button', async () => {
        await page.locator('//*[@id="user-message"]').first().pressSequentially(WELCOME_LT_TEXT);
        await page.locator('//*[@id="showInput"]').click();
    });

    await test.step('Verify message text', async () => {
        await expect(page.locator('//*[@id="message"]')).toBeVisible({timeout: 10000});
        await expect(page.locator('//*[@id="message"]')).toContainText("Welcome to LambdaTest");
    });

});