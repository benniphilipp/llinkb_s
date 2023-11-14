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

/***/ "./assets/js/linkinbio/module/getCookie.js":
/*!*************************************************!*\
  !*** ./assets/js/linkinbio/module/getCookie.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCookie: () => (/* binding */ getCookie)\n/* harmony export */ });\n\nfunction getCookie(name) {\n    let cookieValue = null;\n    if (document.cookie && document.cookie !== '') {\n        const cookies = document.cookie.split(';');\n        for (let i = 0; i < cookies.length; i++) {\n            const cookie = cookies[i].trim();\n            // Does this cookie string begin with the name we want?\n            if (cookie.substring(0, name.length + 1) === (name + '=')) {\n                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));\n                break;\n            }\n        }\n    }\n    return cookieValue;\n}\n\n//# sourceURL=webpack://src/./assets/js/linkinbio/module/getCookie.js?");

/***/ }),

/***/ "./assets/js/linkinbio/module/lsToast.js":
/*!***********************************************!*\
  !*** ./assets/js/linkinbio/module/lsToast.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearContent: () => (/* binding */ clearContent),\n/* harmony export */   lsToast: () => (/* binding */ lsToast)\n/* harmony export */ });\n/* Alert Box Close */\nfunction clearContent() {\n    setTimeout(function() {\n        $('#toast-alert').html('');\n    }, 4000);\n}\n\n/* Alert Box */\nfunction lsToast(parmToast) {\n    const Report = gettext('Report');\n    $('#toast-alert').html(`\n        <div class=\"ls-toast\" id=\"ls-toas\">\n            <div class=\"ls-toas-header d-flex justify-content-start align-items-center px-2 py-2\">\n                <svg class=\"bd-placeholder-img rounded me-2\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" preserveAspectRatio=\"xMidYMid slice\" focusable=\"false\"><rect width=\"100%\" height=\"100%\" fill=\"#007aff\"></rect></svg>\n                <span><b>${Report}</b></span>\n                <i class=\"fa-solid fa-xmark ms-auto\"></i>\n            </div>\n            <hr>\n            <div class=\"ls-toas-body p-2\">\n                ${parmToast}\n            </div>\n        </div>\n    `);\n    clearContent();\n}\n\n//# sourceURL=webpack://src/./assets/js/linkinbio/module/lsToast.js?");

/***/ }),

/***/ "./assets/js/recommended/recommended.js":
/*!**********************************************!*\
  !*** ./assets/js/recommended/recommended.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _linkinbio_module_getCookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../linkinbio/module/getCookie */ \"./assets/js/linkinbio/module/getCookie.js\");\n/* harmony import */ var _linkinbio_module_lsToast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../linkinbio/module/lsToast */ \"./assets/js/linkinbio/module/lsToast.js\");\n\n\n\nclass Recommended {\n    constructor(){\n        this.csrftoken = (0,_linkinbio_module_getCookie__WEBPACK_IMPORTED_MODULE_0__.getCookie)('csrftoken');\n        this.events();\n    }\n\n    events(){\n        const recommendedForm = document.querySelector('#recommendedForm');\n        if(recommendedForm){\n            recommendedForm.addEventListener('submit', (event) => {\n                this.Save(event);\n            });\n        }\n\n        const openModel = document.querySelector('#openModelInfo');\n        if(openModel){\n            openModel.addEventListener('click', this.openModelInfo.bind(this));\n        }\n\n        const CloseInfo = document.querySelector('#CloseInfo');\n        if(CloseInfo){\n            CloseInfo.addEventListener('click', this.closeModelInfo.bind(this));\n        }\n\n    }\n\n\n    RecommendedInfo(){\n\n        const dataURL = document.querySelector('#RecommendationView');\n\n        $.ajax({\n            url: dataURL.value,\n            type: 'GET',\n            dataType: 'json',\n            success: (data) => {\n\n                const table = document.getElementById(\"RecommendedInfo\");\n                const tbody = table.getElementsByTagName('tbody')[0];\n\n                for (const row of data.recommendation) {\n                    const newRow = tbody.insertRow(tbody.rows.length);\n                    const cell1 = newRow.insertCell(0);\n                    const cell2 = newRow.insertCell(1);\n                    cell1.innerHTML = row.email;\n                    // cell2.innerHTML = row.status;\n\n                    if (row.status === true) {\n                        cell2.innerHTML = 'Confirmed';\n                    } else if (row.status === false) {\n                        cell2.innerHTML = 'Not confirmed';\n                    } else {\n                        cell2.innerHTML = 'Unknown';\n                    }\n\n                }\n\n\n            },\n            error: (error) => {\n                console.error('Fehler beim Abrufen der Daten: ' + error);\n            }\n        });\n\n    }\n\n\n\n    Save(event){\n        event.preventDefault();\n\n        const dataUrl = document.querySelector('#RecommendationSend');\n        const UserRecommend = document.querySelector('#UserRecommend');\n        const emailHelp = document.querySelector('#emailHelp');\n\n        const formData = new FormData();\n        formData.append('email', UserRecommend.value);\n\n        $.ajax({\n            url: dataUrl.value,\n            type: 'POST',\n            data: formData,\n            processData: false,\n            contentType: false,\n            headers: {\n                'X-CSRFToken': this.csrftoken, \n            },\n            success: (data) => {\n                console.log(data.success)\n\n                if(data.success == true){\n\n                    (0,_linkinbio_module_lsToast__WEBPACK_IMPORTED_MODULE_1__.lsToast)(data.message);\n                    UserRecommend.value = '';\n                    emailHelp.classList.remove('text-muted');\n                    emailHelp.classList.add('text-success');\n                    emailHelp.innerHTML = 'Thank you, as soon as the user has confirmed and you can use everything free of charge for 1 year.';\n            \n                    setTimeout(() => {\n                        emailHelp.classList.add('text-muted');\n                        emailHelp.classList.remove('text-success');\n                        emailHelp.innerHTML = 'Recommend us and you will receive all functions free of charge for 1 year.';\n                    }, 2000);\n\n                }else{\n\n                    (0,_linkinbio_module_lsToast__WEBPACK_IMPORTED_MODULE_1__.lsToast)(data.message);\n                    UserRecommend.value = '';\n                    emailHelp.classList.remove('text-muted');\n                    emailHelp.classList.add('text-danger');\n                    emailHelp.innerHTML = 'We re sorry, this user is already executing.';\n\n                    setTimeout(() => {\n                        emailHelp.classList.add('text-muted');\n                        emailHelp.classList.remove('text-success');\n                        emailHelp.innerHTML = 'Recommend us and you will receive all functions free of charge for 1 year.';\n                    }, 2000);\n\n                }\n                \n\n\n            },\n            error: (xhr, textStatus, errorThrown) => {\n                console.error('Fehler bei der Ajax-Anfrage:', errorThrown);\n            }\n        });\n    }\n\n\n    openModelInfo(){\n        $('#exampleModal').modal('show');\n        this.RecommendedInfo();\n    }\n\n    closeModelInfo(){\n        $('#exampleModal').modal('hide') \n    }\n\n\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recommended);\n\nconst recommended = new Recommended();\n\n//# sourceURL=webpack://src/./assets/js/recommended/recommended.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/js/recommended/recommended.js");

/******/ 	
/******/ })()
;