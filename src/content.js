const url = chrome.runtime.getURL('data/data.json');

const selectors = [
    "span.product-box--title", // SMWS Japan - browsing grid
    "p.product-page--title" // SMWS Japan - individual product
];

function replaceDistilleryNames( data ) {
    var elems = [];

    for( var idx = 0; idx < selectors.length; idx++ )
    {
        var items = document.querySelectorAll( selectors[ idx ] );
        if( items )
            elems.append( items );
    }

    for( var idx = 0 ; idx < elems.length; idx++ )
    {
        var elem = elems[idx];

        for( const [key, value] of Object.entries(data) )
        {
            var text = elem.innerText;

            if( text.match(/key\./) )
            {
                var newText = text + " (" + value.name + ", " + value.region + ")";
                if( value.status.toUpperCase() != 'ACTIVE' )
                    newText += " [" + value.status.toUpperCase() + "]";

                elem.innerText = newText;
                break;
            }
        }
    }
};

fetch( url, { mode: 'same-origin' } )
    .then( (response) => response.json() )
    .then( (json) => replaceDistilleryNames( json ) )
    .catch(rejected => {
        console.log(rejected);
    });