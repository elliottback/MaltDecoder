import {expect} from 'chai';
import fs from 'fs';
import { regex } from '../src/replace.js';

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

            let match = hypotheticalRelease.match( regex );
            console.log( "regex=", regex, "; match=", match);

            expect(match).to.be.an('array').and.to.have.lengthOf(3);
            expect(match[0]).to.equal(hypotheticalRelease);
            expect(match[1]).to.equal(key);
        }
    } );
});