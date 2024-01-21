const { expect} = require('@playwright/test');
const { test } = require('../lambdatest-setup')
test('Test Scenario 3', async ({page, baseURL}) => {

    await test.step('Open LambdaTest’s Selenium Playground from', async () => {
        await page.goto(baseURL, {waitUntil: 'networkidle'});
    });

    await test.step('Click on "Input Form Submit"', async () => {
        await page.locator('//a[contains(text(), "Input Form Submit")]').click({timeout: 30000});
    });

    await test.step('Submit form without filling any value and verify error message', async () => {
        await page.waitForSelector('#seleniumform button', {timeout: 30000});
        await page.locator('#seleniumform button').click();
        const validationMessage = await page.locator('#name').evaluate((nameField) => {
            return nameField.validationMessage
        });
        expect([
            "Please fill in this field.",
            "Please fill out this field.",
            "Fill out this field"
        ]).toContain(validationMessage);
    });

    await test.step('Fill all the fields and submit form', async () => {
        await page.locator('#name').pressSequentially('Harsha');
        await page.locator('#inputEmail4').pressSequentially('harshamanoj912@gmail.com');
        await page.locator('#inputPassword4').pressSequentially('Harsha@123');
        await page.locator('#company').pressSequentially('Wiley');
        await page.locator('#websitename').pressSequentially('https://harshasuraweera.com');
        await page.locator('#seleniumform select').selectOption('United States');
        await page.locator('#inputCity').pressSequentially('Colombo');
        await page.locator('#inputAddress1').pressSequentially('D60');
        await page.locator('#inputAddress2').pressSequentially('Battaramulla');
        await page.locator('#inputState').pressSequentially('Western');
        await page.locator('#inputZip').pressSequentially('71700');
    });

    await test.step('Submit form and validate success message', async () => {
        await page.locator('#seleniumform button').click();
        await expect(page.getByText('Thanks for contacting us, we will get back to you shortly.')).toBeVisible({timeout: 10000});
    });

});