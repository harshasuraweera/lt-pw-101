const {test, expect} = require('@playwright/test');

test.only('Test Scenario 2', async ({page, baseURL}) => {

    await test.step('Open LambdaTest’s Selenium Playground from', async () => {
        await page.goto(baseURL, {waitUntil: 'networkidle'});
    });

    await test.step('Click on "Drag & Drop Sliders"', async () => {
        await page.locator('//a[contains(text(), "Drag & Drop Sliders")]').click({timeout: 30000});
    });

    await test.step('Set slider value to 95', async () => {
        let targetValue = 95;
        let isCompleteDrag = false;
        await page.waitForSelector('//*[@id="slider3"]/div/input', {timeout: 30000});
        const element = await page.locator('//*[@id="slider3"]/div/input');
        const rangeText = await page.locator('//*[@id="rangeSuccess"]');
        if (element) {
            if (element) {
                while (!isCompleteDrag) {
                    let boundingBox = await element.boundingBox();
                    if (boundingBox) {
                        await element.click();
                        await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
                        await page.mouse.down();
                        await page.mouse.move(boundingBox.x + 465, boundingBox.y + boundingBox.y + boundingBox.height / 2);
                        await page.mouse.up();
                        let currentValue = await element.inputValue();
                        if (currentValue === targetValue.toString()) {
                            isCompleteDrag = true;
                        }
                    }
                }
            }
        }
        let rangeTextValue = await rangeText.textContent()
        await expect(rangeTextValue).toEqual(targetValue.toString());
    });
});