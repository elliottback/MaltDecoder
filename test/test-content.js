// testing libraries:
var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');
var replacer = require('../src/replace');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('data.json', function () {
    var json = undefined;

    before( function() {
        json = JSON.parse( fs.readFileSync( './data/data.json', 'utf8') );
    } );

    var driver = function( input, expected )
    {
        var html = '<p class="product-page--title flush"><span class="new">NEW</span> '+input+'</p>';

        var dom = new JSDOM(html);
        global.document = dom.window.document;

        replacer.replaceDistilleryNames( json );

        var result = document.getElementsByTagName("p")[0];
        assert.equal( result.textContent, "NEW " + expected );
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