import assert from 'assert';
import puppeteer from 'puppeteer';

const extensionPath = process.cwd() + "/dist";
const urlPath = "file://" + process.cwd() + "/test/test-extension-"
const gotoOpts = {waitUntil: ['domcontentloaded', "networkidle2"]};

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
        /**
         * Waits for an element's textContent to match the expected text.
         * This is more reliable for dynamic content changes than waiting for the selector alone.
         * @param {string} selector - The CSS selector for the element.
         * @param {string} text - The expected text content.
         */
        const waitForText = (selector, text) => {
            return page.waitForFunction(
                (sel, txt) => document.querySelector(sel)?.textContent === txt,
                {}, // Options like timeout can be passed here
                selector,
                text
            );
        };

        // JAPAN
        it('Rewrite target 1', async function() {
            await page.goto(urlPath + "1.html", gotoOpts);
            await waitForText('h1', '105.31 (Tormore, Speyside)');
            await page.screenshot({ path: extensionPath + `/test-extension-1.png` });
        });

        it('Rewrite target 2', async function() {
            await page.goto(urlPath + "2.html", gotoOpts);
            await waitForText('.product-box--title', '68.59 (Blair Athol, Highlands)');
            await page.screenshot({ path: extensionPath + `/test-extension-2.png` });
        });

        it('Rewrite target 6', async function() {
            await page.goto(urlPath + "6.html", gotoOpts);
            await waitForText('.product-box--title', '151.3 (Mackmyra, Sweden)');
            await page.screenshot({ path: extensionPath + `/test-extension-6.png` });
        })

        // USA
        it('Rewrite target 3', async function() {
            await page.goto(urlPath + "3.html", gotoOpts);
            await waitForText('h1', '7.264 (Longmorn, Speyside)');
            await page.screenshot({ path: extensionPath + `/test-extension-3.png` });
        });

        // UK
        it('Rewrite target 4', async function() {
            await page.goto(urlPath + "4.html", gotoOpts);
            await waitForText('.caskNo', '6.55 (Glen Deveron / Macduff, Speyside)');
            await page.screenshot({ path: extensionPath + `/test-extension-4.png` });
        })

        it('Rewrite target 5', async function() {
            await page.goto(urlPath + "5.html", gotoOpts);
            await waitForText('.caskNo', '4.305 (Highland Park, Highlands)');
            await page.screenshot({ path: extensionPath + `/test-extension-5.png` });
        })
    });

    after(async function() {
        await browser.close(); // comment for dev
    });
});