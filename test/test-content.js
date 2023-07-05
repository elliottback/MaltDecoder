const expect = require('chai').expect;
const assert = require('chai').assert;
const fs = require('fs');
const replacer = require('../src/replace');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('data.json', function () {
    let json = undefined;

    const html = {
        '<p class="product-page--title flush"><span class="new">NEW</span> %REPLACE%</p>': 'p',
        '<h1 class="product-page--title inline-title flush"> %REPLACE%</h1>': 'h1'
    };

    before( function() {
        json = JSON.parse( fs.readFileSync( './dist/data.json', 'utf8') );
    } );

    let driver = function( input, expected )
    {
        for( const [h, selector] of Object.entries(html) )
        {
            let dom = new JSDOM( h.replace("%REPLACE%", input) );
            global.document = dom.window.document;

            replacer.replaceDistilleryNames( json );

            let result = document.querySelector(selector);
            assert.include( result.textContent, expected );
        }
    }

    it( 'working basic', function(){
        driver( "140.1", "140.1 (Balcones, Texas, USA)");
    } );

    it( 'replacements shouldn\'t wrap around', function(){
        driver("999.1", "999.1");
    });

    it( '40 or 140', function(){
        driver("40.1", "40.1 (Balvenie, Speyside)");
    });
});