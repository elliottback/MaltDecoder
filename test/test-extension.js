const assert = require('assert');
const puppeteer = require('puppeteer');
const imageToAscii = require("image-to-ascii");

const extensionPath = process.cwd() + "/dist";
const urlPath = "file://" + process.cwd() + "/test/test-extension-"

let page = null;
let browser = null;

async function boot() {
    console.log("Extension path is: " + extensionPath);

    browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXEC_PATH, 	// set by docker container in github CI environment
        headless: false, 									// extension are allowed only in headful mode
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
			imageToAscii( extensionPath + `/test-extension-1.png`, (err, converted) => { console.log(err || converted); });
		});

        it('Rewrite target 2', async function() {
            await page.goto(urlPath + "2.html");
            const element = await page.waitForSelector(".product-box--title");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '68.59 (Blair Athol, Highlands)');
            await page.screenshot({ path: extensionPath + `/test-extension-2.png` });
            imageToAscii( extensionPath + `/test-extension-2.png`, (err, converted) => { console.log(err || converted); });
        });

        // USA
        it('Rewrite target 3', async function() {
            await page.goto(urlPath + "3.html");
            const element = await page.waitForSelector("h1");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '7.264 (Longmorn, Speyside)');
            await page.screenshot({ path: extensionPath + `/test-extension-3.png` });
            imageToAscii( extensionPath + `/test-extension-3.png`, (err, converted) => { console.log(err || converted); });
        });

        // UK
        it('Rewrite target 4', async function() {
            await page.goto(urlPath + "4.html");
            const element = await page.waitForSelector(".caskNo");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '6.55 (Glen Deveron / Macduff, Speyside)');
            await page.screenshot({ path: extensionPath + `/test-extension-4.png` });
            imageToAscii( extensionPath + `/test-extension-4.png`, (err, converted) => { console.log(err || converted); });
        })

        it('Rewrite target 5', async function() {
            await page.goto(urlPath + "5.html");
            const element = await page.waitForSelector(".caskNo");
            const value = await element.evaluate(el => el.textContent);
            assert.equal(value, '4.305 (Highland Park, Highlands)');
            await page.screenshot({ path: extensionPath + `/test-extension-5.png` });
            imageToAscii( extensionPath + `/test-extension-5.png`, (err, converted) => { console.log(err || converted); });
        })
	});

	after(async function() {
		await browser.close();
	});
});