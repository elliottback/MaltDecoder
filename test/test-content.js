import {assert} from 'chai';
import fs from 'fs';
import { replaceDistilleryNames } from '../src/replace.js';
import { JSDOM } from 'jsdom';

describe('data.json', function () {
    let json = undefined;

    const html = {
        '<p class="product-page--title flush"><span class="new">NEW</span> %REPLACE%</p>': 'p',
        '<h1 class="product-page--title inline-title flush"> %REPLACE%</h1>': 'h1',
        '<p class="caskNo">CASK NO. %REPLACE%</p>': 'p'
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

            replaceDistilleryNames( json );

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

    it( 'USA archives', function(){
        driver( "149.4", "149.4 (Ardnamurchan, Highland)");
    } );
});

describe('SMWS Japan 2025', function () {
    let json = undefined;

    before( function() {
        json = JSON.parse( fs.readFileSync( './dist/data.json', 'utf8') );
    } );

    it( 'should have the distillery name', function(){
        const html = `<h3 class="c-product-body__title-name"><a href="https://smwsjapan.com/36%EF%BC%8E230/product/036230/"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">36.230</font></font></a></h3>`;
        let dom = new JSDOM( html );
        global.document = dom.window.document;

        replaceDistilleryNames( json );

        let result = document.querySelector( "h3.c-product-body__title-name > a" );
        assert.include( result.textContent, "36.230 (Benrinnes, Speyside)" );
    } );

    it( 'should have the distillery name on individual product page', function(){
        const html = `<div class="p-productDetaiMain-head p-productDetaiMain-title"><div class="p-productDetaiMain-head__status"><ul class="c-product-sIcon"><li class="c-product-sIcon__item"><img src="https://smwsjapan.com/assets/img/product/product_icon1.png"></li><!--v-if--></ul></div><div class="p-productDetaiMain-head__title"><p class="p-productDetaiMain-head__flavor" data-flavor="5"><span class="p-productDetaiMain-head__flavor-name"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Deep, Rich &amp; Dried Fruits</font></font></span></p><h1 class="p-productDetaiMain-head__title-name"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">76.156</font></font></h1></div></div>`;
        let dom = new JSDOM( html );
        global.document = dom.window.document;

        replaceDistilleryNames( json );

        let result = document.querySelector( "h1.p-productDetaiMain-head__title-name" );
        assert.include( result.textContent, "76.156 (Mortlach, Speyside)" );
    } );
});