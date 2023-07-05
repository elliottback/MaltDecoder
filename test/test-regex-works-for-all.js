const expect = require('chai').expect;
const assert = require('chai').assert;
const fs = require('fs');
const replacer = require('../src/replace');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Regex Covers All Defined Keys', function () {
    let json = undefined;

    before( function() {
        json = JSON.parse( fs.readFileSync( './dist/data.json', 'utf8') );
    } );

    it( 'working for all', function(){
        for (let key in json) {
            //we need to give it a bottle code, so let's say 150
            let hypotheticalRelease = key + ".150";
            console.log( "hypotheticalRelease=" + hypotheticalRelease);

            let match = hypotheticalRelease.match( replacer.regex );
            console.log( "regex=", replacer.regex, "; match=", match);

            expect(match).to.be.an('array').and.to.have.lengthOf(2);
            expect(match[0]).to.equal(hypotheticalRelease);
            expect(match[1]).to.equal(key);
        }
    } );
});