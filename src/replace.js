const selectors = [
    "span.product-box--title",              // SMWS Japan - browsing grid
    "p.product-page--title",                // SMWS Japan - individual product
    "h1.product-page--title",               // SMWS Japan - new individual product
    ".caskNo",                              // SMWS UK - Individual Product Recommendations
    "h1.page-title",                        // SMWS USA - title
    "div.product-description > p > strong", // SMWS USA - desc
    "span.search-title"                     // SMWS USA - search desc
];

const regex = /([GABCNRW]{0,2}[0-9]{1,3})\\.[0-9]/

exports.regex = regex;

exports.replaceDistilleryNames = function( data ) {
    var elems = document.querySelectorAll( selectors.join(",") );

    for( var idx = 0 ; idx < elems.length; idx++ )
    {
        var elem = elems[idx];
        var text = elem.textContent.replace(/CASK[\s]*No.[\s]*/ig,'').trim();

        if( regex.test( text ) )
        {
            var match = text.match( regex )[1].toUpperCase();

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