// testing libraries:
var expect = require('chai').expect;
var assert = require('chai').assert;
var _ = require('lodash');
var fs = require('fs');

describe('data.json', function () {
    var json = undefined;

    before( function() {
        json = fs.readFileSync( './data/data.json', 'utf8');
        assert( typeof json === "string" );
    } );

    it('it should parse', function () {
        var json = fs.readFileSync( './data/data.json', 'utf8');
        assert( typeof json === "string" );
        data = JSON.parse(json);

        assert( typeof data === "object" );
        expect( _.keys( data ) ).to.have.lengthOf.above(120);
    });

    it( 'entries should follow defined format', function() {
        entries = _.values( JSON.parse(json) );

        for( i = 0; i < entries.length; i++ )
        {
            var entry = entries[ i ];
            expect( entry ).to.have.property( 'status' );
            expect( entry.status.toLowerCase() ).to.be.oneOf([ 'active', 'inactive', 'closed' ]);
            expect( entry ).to.have.property( 'region' );
            expect( entry ).to.have.property( 'name' );
            expect( entry ).to.have.property( 'type' );
            expect( entry.type ).to.be.oneOf([ 'Single Malt', 'Gin', 'Rye', 'Bourbon', 'Grain', 'Armagnac', 'Cognac', 'Rum' ]);
        }
    } );
});