const {defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.js',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [
        ['html', {open: "never"}]
    ],
    timeout: 200000, //increased due to the queued jobs

    use: {
        baseURL: 'https://www.lambdatest.com/selenium-playground',
        trace: 'on',
        video: 'on',
        screenshot: 'on',
        headless: true
    },

    projects: [
        // {
        //     name: 'chromium',
        //     use: {...devices['Desktop Chrome'], viewport: {width: 1920, height: 1080}},
        // },
        {
            name: 'chrome:latest:Windows 10@lambdatest',
            use: {
                viewport: {width: 1920, height: 1080}
            }
        },
        {
            name: 'pw-webkit:latest:MacOS Ventura@lambdatest',
            use: {
                viewport: {width: 1920, height: 1080}
            }
        }
    ],
});

