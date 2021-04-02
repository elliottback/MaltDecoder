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
    "h1.product-page--title",               // SMWS Japan - new individual product
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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWx0ZGVjb2Rlci8uL3NyYy9yZXBsYWNlLmpzIiwid2VicGFjazovL21hbHRkZWNvZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21hbHRkZWNvZGVyLy4vc3JjL2NvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUI7O0FBRUEsc0JBQXNCLG9CQUFvQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztVQ3JDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsZUFBZSxtQkFBTyxDQUFDLG1DQUFXOztBQUVsQzs7QUFFQSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssRSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2VsZWN0b3JzID0gW1xyXG4gICAgXCJzcGFuLnByb2R1Y3QtYm94LS10aXRsZVwiLCAgICAgICAgICAgICAgLy8gU01XUyBKYXBhbiAtIGJyb3dzaW5nIGdyaWRcclxuICAgIFwicC5wcm9kdWN0LXBhZ2UtLXRpdGxlXCIsICAgICAgICAgICAgICAgIC8vIFNNV1MgSmFwYW4gLSBpbmRpdmlkdWFsIHByb2R1Y3RcclxuICAgIFwiaDEucHJvZHVjdC1wYWdlLS10aXRsZVwiLCAgICAgICAgICAgICAgIC8vIFNNV1MgSmFwYW4gLSBuZXcgaW5kaXZpZHVhbCBwcm9kdWN0XHJcbiAgICBcInNwYW4ucHJvZHVjdC1ib3gtLWNhc2tcIiwgICAgICAgICAgICAgICAvLyBTTVdTIC0gYnJvd3NpbmcgZ3JpZFxyXG4gICAgXCJwLnByb2R1Y3QtcGFnZS0tY2Fzay1ubyA+IHNwYW5cIiwgICAgICAgLy8gU01XUyAtIEluZGl2aWR1YWwgUHJvZHVjdFxyXG4gICAgXCJzcGFuLmluY19jYXNrTm9cIiwgICAgICAgICAgICAgICAgICAgICAgLy8gU01XUyAtIEluZGl2aWR1YWwgUHJvZHVjdCBSZWNvbW1lbmRhdGlvbnNcclxuICAgIFwiaDEucGFnZS10aXRsZVwiLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNNV1MgVVNBIC0gdGl0bGVcclxuICAgIFwiZGl2LnByb2R1Y3QtZGVzY3JpcHRpb24gPiBwID4gc3Ryb25nXCIsIC8vIFNNV1MgVVNBIC0gZGVzY1xyXG4gICAgXCJzcGFuLnNlYXJjaC10aXRsZVwiICAgICAgICAgICAgICAgICAgICAgLy8gU01XUyBVU0EgLSBzZWFyY2ggZGVzY1xyXG5dO1xyXG5cclxuZXhwb3J0cy5yZXBsYWNlRGlzdGlsbGVyeU5hbWVzID0gZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICB2YXIgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvcnMuam9pbihcIixcIikgKTtcclxuXHJcbiAgICBmb3IoIHZhciBpZHggPSAwIDsgaWR4IDwgZWxlbXMubGVuZ3RoOyBpZHgrKyApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGVsZW0gPSBlbGVtc1tpZHhdO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gZWxlbS50ZXh0Q29udGVudC5yZXBsYWNlKC9DQVNLW1xcc10qTm8uW1xccypdL2lnLCcnKS50cmltKCk7XHJcbiAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoW2EtekEtWl0qWzAtOV0rKVxcXFwuWzAtOV0rXCIpO1xyXG5cclxuICAgICAgICBpZiggcmVnLnRlc3QoIHRleHQgKSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSB0ZXh0Lm1hdGNoKCByZWcgKVsxXS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYoIG1hdGNoIGluIGRhdGEgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhWyBtYXRjaCBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1RleHQgPSB0ZXh0ICsgXCIgKFwiICsgdmFsdWUubmFtZSArIFwiLCBcIiArIHZhbHVlLnJlZ2lvbiArIFwiKVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCB2YWx1ZS5zdGF0dXMudG9VcHBlckNhc2UoKSAhPSAnQUNUSVZFJyApXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGV4dCArPSBcIiBbXCIgKyB2YWx1ZS5zdGF0dXMudG9VcHBlckNhc2UoKSArIFwiXVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBuZXdUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgcmVwbGFjZXIgPSByZXF1aXJlKCcuL3JlcGxhY2UnKTtcclxuXHJcbmNvbnN0IHVybCA9IGNocm9tZS5ydW50aW1lLmdldFVSTCgnZGF0YS5qc29uJyk7XHJcblxyXG5mZXRjaCggdXJsLCB7IG1vZGU6ICdzYW1lLW9yaWdpbicgfSApXHJcbiAgICAudGhlbiggKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkgKVxyXG4gICAgLnRoZW4oIChqc29uKSA9PiByZXBsYWNlci5yZXBsYWNlRGlzdGlsbGVyeU5hbWVzKCBqc29uICkgKVxyXG4gICAgLmNhdGNoKHJlamVjdGVkID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZWplY3RlZCk7XHJcbiAgICB9KTsiXSwic291cmNlUm9vdCI6IiJ9