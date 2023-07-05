const assert = require('assert');
const puppeteer = require('puppeteer');

const extensionPath = process.cwd() + "/dist";
const urlPath = "file://" + process.cwd() + "/test/test-extension-"

let page = null;
let browser = null;

async function boot() {
    console.log("Extension path is: " + extensionPath);

    browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXEC_PATH, 	// set by docker container in github CI environment
        headless: false, 									// extension are allowed only in headful mode
        // devtools: true,                                     // Enable DevTools for debugging
        args: [
          `--no-sandbox`,									//Required for this to work in github CI environment
          `--disable-extensions-except=${extensionPath}`,
          `--load-extension=${extensionPath}`
        ]
    });

    page = await browser.newPage();
}

describe('Extension UI Testing', function() {
	this.timeout(50000);

	before(async function() {
		await boot();
	});

	describe('Page rewrite', async function() {
	    // JAPAN
		it('Rewrite target 1', async function() {
		    await page.goto(urlPath + "1.html");
            const element = await page.waitForSelector("h1");
            const value = await element.evaluate(el => el.textContent);
			assert.equal(value, '105.31 (Tormore, Speyside)');
			await page.screenshot({ path: extensionPath + `/test-extension-1.png` });
		});

        it('Rewrite target 2', async function() {
            await page.goto(urlPath + "2.html");
            const element = await page.waitForSelector(".product-box--title");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '68.59 (Blair Athol, Highlands)');
            await page.screenshot({ path: extensionPath + `/test-extension-2.png` });
        });

        it('Rewrite target 6', async function() {
            await page.goto(urlPath + "6.html");
            const element = await page.waitForSelector(".product-box--title");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '151.3 (Mackmyra, Sweden)');
            await page.screenshot({ path: extensionPath + `/test-extension-6.png` });
        })

        // USA
        it('Rewrite target 3', async function() {
            await page.goto(urlPath + "3.html");
            const element = await page.waitForSelector("h1");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '7.264 (Longmorn, Speyside)');
            await page.screenshot({ path: extensionPath + `/test-extension-3.png` });
        });

        // UK
        it('Rewrite target 4', async function() {
            await page.goto(urlPath + "4.html");
            const element = await page.waitForSelector(".caskNo");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '6.55 (Glen Deveron / Macduff, Speyside)');
            await page.screenshot({ path: extensionPath + `/test-extension-4.png` });
        })

        it('Rewrite target 5', async function() {
            await page.goto(urlPath + "5.html");
            const element = await page.waitForSelector(".caskNo");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '4.305 (Highland Park, Highlands)');
            await page.screenshot({ path: extensionPath + `/test-extension-5.png` });
        })
	});

	after(async function() {
		await browser.close(); // comment for dev
	});
});