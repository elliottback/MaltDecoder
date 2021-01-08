/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/replace.js":
/*!************************!*\
  !*** ./src/replace.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
var replacer = __webpack_require__(/*! ./replace */ "./src/replace.js");

const url = chrome.runtime.getURL('data.json');

fetch( url, { mode: 'same-origin' } )
    .then( (response) => response.json() )
    .then( (json) => replacer.replaceDistilleryNames( json ) )
    .catch(rejected => {
        console.log(rejected);
    });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWx0ZGVjb2Rlci8uL3NyYy9yZXBsYWNlLmpzIiwid2VicGFjazovL21hbHRkZWNvZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21hbHRkZWNvZGVyLy4vc3JjL2NvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCOztBQUVBLHNCQUFzQixvQkFBb0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7VUNwQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7QUNyQkEsZUFBZSxtQkFBTyxDQUFDLG1DQUFXOztBQUVsQzs7QUFFQSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssRSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VsZWN0b3JzID0gW1xyXG4gICAgXCJzcGFuLnByb2R1Y3QtYm94LS10aXRsZVwiLCAgICAgICAgICAgICAgLy8gU01XUyBKYXBhbiAtIGJyb3dzaW5nIGdyaWRcclxuICAgIFwicC5wcm9kdWN0LXBhZ2UtLXRpdGxlXCIsICAgICAgICAgICAgICAgIC8vIFNNV1MgSmFwYW4gLSBpbmRpdmlkdWFsIHByb2R1Y3RcclxuICAgIFwic3Bhbi5wcm9kdWN0LWJveC0tY2Fza1wiLCAgICAgICAgICAgICAgIC8vIFNNV1MgLSBicm93c2luZyBncmlkXHJcbiAgICBcInAucHJvZHVjdC1wYWdlLS1jYXNrLW5vID4gc3BhblwiLCAgICAgICAvLyBTTVdTIC0gSW5kaXZpZHVhbCBQcm9kdWN0XHJcbiAgICBcInNwYW4uaW5jX2Nhc2tOb1wiLCAgICAgICAgICAgICAgICAgICAgICAvLyBTTVdTIC0gSW5kaXZpZHVhbCBQcm9kdWN0IFJlY29tbWVuZGF0aW9uc1xyXG4gICAgXCJoMS5wYWdlLXRpdGxlXCIsICAgICAgICAgICAgICAgICAgICAgICAgLy8gU01XUyBVU0EgLSB0aXRsZVxyXG4gICAgXCJkaXYucHJvZHVjdC1kZXNjcmlwdGlvbiA+IHAgPiBzdHJvbmdcIiwgLy8gU01XUyBVU0EgLSBkZXNjXHJcbiAgICBcInNwYW4uc2VhcmNoLXRpdGxlXCIgICAgICAgICAgICAgICAgICAgICAvLyBTTVdTIFVTQSAtIHNlYXJjaCBkZXNjXHJcbl07XHJcblxyXG5leHBvcnRzLnJlcGxhY2VEaXN0aWxsZXJ5TmFtZXMgPSBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9ycy5qb2luKFwiLFwiKSApO1xyXG5cclxuICAgIGZvciggdmFyIGlkeCA9IDAgOyBpZHggPCBlbGVtcy5sZW5ndGg7IGlkeCsrIClcclxuICAgIHtcclxuICAgICAgICB2YXIgZWxlbSA9IGVsZW1zW2lkeF07XHJcbiAgICAgICAgdmFyIHRleHQgPSBlbGVtLnRleHRDb250ZW50LnJlcGxhY2UoL0NBU0tbXFxzXSpOby5bXFxzKl0vaWcsJycpLnRyaW0oKTtcclxuICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihbYS16QS1aXSpbMC05XSspXFxcXC5bMC05XStcIik7XHJcblxyXG4gICAgICAgIGlmKCByZWcudGVzdCggdGV4dCApIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IHRleHQubWF0Y2goIHJlZyApWzFdLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiggbWF0Y2ggaW4gZGF0YSApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGFbIG1hdGNoIF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3VGV4dCA9IHRleHQgKyBcIiAoXCIgKyB2YWx1ZS5uYW1lICsgXCIsIFwiICsgdmFsdWUucmVnaW9uICsgXCIpXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIHZhbHVlLnN0YXR1cy50b1VwcGVyQ2FzZSgpICE9ICdBQ1RJVkUnIClcclxuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0ICs9IFwiIFtcIiArIHZhbHVlLnN0YXR1cy50b1VwcGVyQ2FzZSgpICsgXCJdXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IG5ld1RleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgcmVwbGFjZXIgPSByZXF1aXJlKCcuL3JlcGxhY2UnKTtcclxuXHJcbmNvbnN0IHVybCA9IGNocm9tZS5ydW50aW1lLmdldFVSTCgnZGF0YS5qc29uJyk7XHJcblxyXG5mZXRjaCggdXJsLCB7IG1vZGU6ICdzYW1lLW9yaWdpbicgfSApXHJcbiAgICAudGhlbiggKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkgKVxyXG4gICAgLnRoZW4oIChqc29uKSA9PiByZXBsYWNlci5yZXBsYWNlRGlzdGlsbGVyeU5hbWVzKCBqc29uICkgKVxyXG4gICAgLmNhdGNoKHJlamVjdGVkID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZWplY3RlZCk7XHJcbiAgICB9KTsiXSwic291cmNlUm9vdCI6IiJ9