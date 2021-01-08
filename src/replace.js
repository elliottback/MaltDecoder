const selectors = [
    "span.product-box--title",              // SMWS Japan - browsing grid
    "p.product-page--title",                // SMWS Japan - individual product
    "span.product-box--cask",               // SMWS - browsing grid
    "p.product-page--cask-no > span",       // SMWS - Individual Product
    "span.inc_caskNo",                      // SMWS - Individual Product Recommendations
    "h1.page-title",                        // SMWS USA - title
    "div.product-description > p > strong", // SMWS USA - desc
    "span.search-title"                     // SMWS USA - search desc
];

exports.replaceDistilleryNames = function( data ) {
    var elems = document.querySelectorAll( selectors.join(",") );

    for( var idx = 0 ; idx < elems.length; idx++ )
    {
        var elem = elems[idx];
        var text = elem.textContent.replace(/CASK[\s]*No.[\s*]/ig,'').trim();
        var reg = new RegExp("([a-zA-Z]*[0-9]+)\\.[0-9]+");

        if( reg.test( text ) )
        {
            var match = text.match( reg )[1].toUpperCase();

            if( match in data )
            {
                var value = data[ match ];
                var newText = text + " (" + value.name + ", " + value.region + ")";

                if( value.status.toUpperCase() != 'ACTIVE' )
                    newText += " [" + value.status.toUpperCase() + "]";

                elem.textContent = newText;
            }
        }
    }
};