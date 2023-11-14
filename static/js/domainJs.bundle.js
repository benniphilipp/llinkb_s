/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/domain/domain.js":
/*!************************************!*\
  !*** ./assets/js/domain/domain.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_DomainCrund__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/DomainCrund */ \"./assets/js/domain/module/DomainCrund.js\");\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const domaincrund = new _module_DomainCrund__WEBPACK_IMPORTED_MODULE_0__[\"default\"](); \n});\n\n//# sourceURL=webpack://src/./assets/js/domain/domain.js?");

/***/ }),

/***/ "./assets/js/domain/module/DomainCrund.js":
/*!************************************************!*\
  !*** ./assets/js/domain/module/DomainCrund.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linkinbio_module_getCookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../linkinbio/module/getCookie */ \"./assets/js/linkinbio/module/getCookie.js\");\n\n\nclass DomainCrud {\n\n\n    // https://api.ote-godaddy.com/v1/domain\n\n    constructor(){\n        this.csrftoken = (0,_linkinbio_module_getCookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)('csrftoken');\n        const SerachDomainBtn = document.querySelector('#SerachDomain');\n        if(SerachDomainBtn){\n            SerachDomainBtn.addEventListener('click', this.DomainSearch.bind(this));\n        }\n\n        const autocompleteInput = document.querySelector('#autocomplete');\n        if (autocompleteInput) {\n            const self = this;\n            autocompleteInput.addEventListener('input', function(event) {\n                const value = event.target.value;\n                self.AutocompleteLts(value);\n            });\n        }\n\n    }\n\n\n\n\n    AutocompleteLts() {\n\n        this.autocompleteInstance = new Autocomplete('#autocomplete', {\n            search: input => {\n                if (input.length < 1) {\n                    return Promise.resolve([]);\n                }\n    \n                const DataURL = document.querySelector('#SearchDomainView').value;\n\n                return fetch(DataURL, {\n                    method: 'POST',\n                    headers: {\n                        'X-CSRFToken': this.csrftoken,\n                    },\n                })\n                .then(response => response.json())\n                .then(data => {\n                    // Extrahiere die relevanten Daten für Autocomplete\n                    const autocompleteData = data.map(item => item.name); // Passe dies entsprechend deiner Datenstruktur an\n                    // return autocompleteData;\n\n                    const filteredData = autocompleteData.filter(item => {\n                        return item.toLowerCase().includes(input.toLowerCase());\n                    });\n    \n                    return filteredData;\n\n                })\n                .catch(error => {\n                    console.error('Fehler beim Abrufen der Daten:', error);\n                    return [];\n                });\n            },\n\n            getResultValue: result => result,\n\n\n        });\n    }\n    \n\n\n\n    DomainSearch(){\n        \n        const SearchValue = document.querySelector('#SearchValue').value;\n\n        const tlsValue = document.querySelector('#tls').value;\n\n        const SearchDomainView = document.querySelector('#SearchDomainView');\n        const DataURL = SearchDomainView.value;\n        \n        const fd = new FormData();\n        fd.append('url', SearchValue);\n        fd.append('lts', tlsValue);\n\n        $.ajax({\n            url: DataURL,\n            type: 'POST',\n            dataType: 'json',\n            data: fd,\n            cache: false,\n            contentType: false,\n            processData: false,\n            headers: {\n                'X-CSRFToken': this.csrftoken,\n            },\n            success: (data) => {\n                console.log(data);\n            },\n            error: (error) => {\n                console.log(error);\n            }\n        });\n\n    }\n\n\n    Test(){\n\n        $.ajax({\n            url: 'http://127.0.0.1:8000/domain/list/',\n            type: 'GET',\n            dataType: 'json', // Wenn Ihre Ansicht JSON zurückgibt\n            success: (response) => {\n                //console.log(response);\n\n                setTimeout(()=>{\n\n                    const domainText = document.querySelector('#domainText');\n                    domainText.classList.add('d-none');\n\n                    const waitImage = document.querySelector('#waitImage');\n                    waitImage.classList.add('d-none');\n\n                    const domainContainer = document.querySelector('#domainContainer');\n                    domainContainer.classList.remove('d-none');\n\n                    const table = document.getElementById(\"domainTable\");\n                    const domains = response;\n                    \n                    domains.forEach((domainData) => {\n                        const row = table.insertRow(-1);\n                        const domainCell = row.insertCell(0);\n                        domainCell.innerHTML = domainData.domain; // Hier den Domänennamen einfügen\n    \n                        // Verfügbarkeits-Spalte\n                        const availabilityCell = row.insertCell(1);\n                        availabilityCell.innerHTML = \"Verfügbar\";\n    \n                        // Button-Spalte\n                        const actionCell = row.insertCell(2);\n                        const button = document.createElement(\"button\");\n                        button.type = \"button\";\n                        button.className = \"btn btn-primary btn-sm\";\n                        button.textContent = \"Aktion ausführen\";\n                        actionCell.className = \"d-flex justify-content-start\";\n                        actionCell.appendChild(button);\n\n                    });\n                }, 2000)\n\n\n            },\n            error: (error) => {\n              console.error('Fehler:', error);\n            }\n          });\n\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomainCrud);\n\n//# sourceURL=webpack://src/./assets/js/domain/module/DomainCrund.js?");

/***/ }),

/***/ "./assets/js/linkinbio/module/getCookie.js":
/*!*************************************************!*\
  !*** ./assets/js/linkinbio/module/getCookie.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCookie: () => (/* binding */ getCookie)\n/* harmony export */ });\n\nfunction getCookie(name) {\n    let cookieValue = null;\n    if (document.cookie && document.cookie !== '') {\n        const cookies = document.cookie.split(';');\n        for (let i = 0; i < cookies.length; i++) {\n            const cookie = cookies[i].trim();\n            // Does this cookie string begin with the name we want?\n            if (cookie.substring(0, name.length + 1) === (name + '=')) {\n                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));\n                break;\n            }\n        }\n    }\n    return cookieValue;\n}\n\n//# sourceURL=webpack://src/./assets/js/linkinbio/module/getCookie.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/js/domain/domain.js");
/******/ 	
/******/ })()
;