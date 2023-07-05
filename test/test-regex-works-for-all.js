var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require('fs');
var replacer = require('../src/replace');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Regex Covers All Defined Keys', function () {
    var json = undefined;

    before( function() {
        json = JSON.parse( fs.readFileSync( './dist/data.json', 'utf8') );
    } );

    it( 'working for all', function(){
        for (let key in json) {
            //we need to give it a bottle code, so let's say 150
            var hypotheticalRelease = key + ".150";
            console.log( "hypotheticalRelease=" + hypotheticalRelease);

            var match = hypotheticalRelease.match( replacer.regex );
            console.log( "regex=", replacer.regex, "; match=", match);

            expect(match).to.be.an('array').and.to.have.lengthOf(2);
            expect(match[0]).to.equal(hypotheticalRelease);
            expect(match[1]).to.equal(key);
        }
    } );
});