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

/***/ "./assets/js/shortcode/module/ViewShort.js":
/*!*************************************************!*\
  !*** ./assets/js/shortcode/module/ViewShort.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nclass ViewShort{\n    constructor(){\n        this.ShortccodeEvents();\n        this.ShortcodeAjaxView();\n    }\n\n    //Event\n    ShortccodeEvents(){\n        const crateFormShortcode = document.querySelector('#crate-form-shortcode');\n        if (crateFormShortcode) {\n            crateFormShortcode.addEventListener('click', this.ShortcodeCrateView.bind(this))\n        }\n    }\n\n    // Craete\n    ShortcodeCrateView(event){\n        event.preventDefault();\n        const dataInput = document.querySelector('input[name=\"data\"]');\n\n        const url_destination = document.getElementById('id_url_destination');\n        const url_titel = document.getElementById('id_url_titel');\n        const url_medium = document.getElementById('id_url_medium');\n        const url_source = document.getElementById('id_url_source');\n        const url_term = document.getElementById('id_url_term');\n        const url_content = document.getElementById('id_url_content');\n        const url_campaign = document.getElementById('id_url_campaign');\n        const csrf = document.getElementsByName('csrfmiddlewaretoken');\n        const url_creator = document.getElementById('url_creator');\n    \n        const fd = new FormData();\n        fd.append('csrfmiddlewaretoken', csrf[0].value)\n        fd.append('url_destination', url_destination.value);\n        fd.append('url_titel', url_titel.value);\n        fd.append('url_source', url_source.value);\n        fd.append('url_medium', url_medium.value);\n        fd.append('url_term', url_term.value);\n        fd.append('url_campaign', url_campaign.value);\n        fd.append('url_creator', url_creator.value);\n        fd.append('url_content', url_content.value);\n\n        $.ajax({\n            type: 'POST',\n            url: dataInput.value,\n            data: fd,\n            dataType: 'json',\n            success: (response) => {\n                console.log('RUN DATA' + response);\n            },\n            error: (xhr, textStatus, errorThrown) => {\n                console.error('Fehler:', errorThrown);\n            },\n            cache: false,\n            contentType: false,\n            processData: false,\n        })\n        \n    }\n\n    // View\n    ShortcodeAjaxView(){\n        const dataInput = document.querySelector('input[name=\"data\"]');\n        const gifLoad = document.querySelector('#gif-load');\n\n        let start_index; \n        var currentPage = 1;  \n        var totalShortcodes = 0; \n\n        $.ajax({\n            url: `${dataInput.value}?page=${currentPage}`,\n            data: { page: currentPage  },\n            dataType: 'json',\n            success: (response) => {\n\n                const shortcodeList = document.querySelector('#shortcode-list');\n                const serialized_data = response.data;\n                gifLoad.classList.remove('d-none');\n\n\n                setTimeout(function(){\n\n                    serialized_data.forEach(function(item) {\n           \n                        // Kürzen der URL und der Ziel-URL\n                        const shortUrl = item.get_short_url.length > 90 ? item.get_short_url.substring(0, 90) + '...' : item.get_short_url;\n                        const shortDestination = item.url_destination.length > 90 ? item.url_destination.substring(0, 90) + '...' : item.url_destination;\n\n                        // Extrahieren der benötigten Werte aus item\n                        const short_id = item.short_id;\n                        const url_create_date = item.url_create_date;\n                        const click_count = item.click_count;\n                        const shortcode = item.shortcode;\n                        const tags = item.tags;\n                        const url_titel = item.url_titel;\n                        \n                        let faviconPath = item.favicon_path;\n                        if (faviconPath === 'null' || faviconPath === null) {\n                            faviconPath = document.querySelector('#favicon-path').value;\n                        }\n\n                        const editTrans = gettext('edit');\n                        const clicksTrans = gettext('clicks');\n                        const copy = gettext('copy');\n                        \n                        // Erstellen eines DIV-Elements und Hinzufügen der HTML-Struktur\n                        const shortcodeItem = document.createElement('div');\n                        shortcodeItem.innerHTML = `\n                            <div class=\"card p-3 my-3 border border-0\">\n                                <div class=\"card-header header-elements\">\n                                    <form id=\"shortcode-form\">\n                                        <input type=\"checkbox\" name=\"selected_shortcodes\" value=\"shortcode_id_${short_id}\">\n                                    </form>\n                                    <img src=\"${faviconPath}\" class=\"img-thumbnail favicon-img\" alt=\"favicon.ico\">\n                                    <h5 class=\"card-title\">${url_titel}</h5>\n                                    <div class=\"card-header-elements ms-auto\">\n                                        <span class=\"d-none\" id=\"short${short_id}\">${shortUrl}</span>\n                                        <button data-button=\"short${short_id}\" type=\"button\" class=\"btn btn-secondary btn-copy colorshort${short_id} btn-sm\">\n                                            <i class=\"fa-regular fa-copy\"></i> copy\n                                        </button>\n                                        <a data-shortcode=\"${short_id}\" data-shortname=\"${shortcode}\" class=\"shortcode-class short-name btn btn-xs btn-primary btn-sm\">\n                                            <i class=\"fa-solid fa-pencil\"></i> ${editTrans}\n                                        </a>\n                                    </div>\n                                </div>\n                                <div class=\"card-body\">\n                                    <a href=\"${shortUrl}\">${shortUrl}</a><br>\n                                    <a class=\"text-muted\" href=\"${shortDestination}\">${shortDestination}</a>\n                                </div>\n                                <div class=\"card-footer\">\n                                    <small class=\"text-muted short-links-footer\">\n                                        <span class=\"short-calendar\"><i class=\"fa-regular fa-calendar orb-icon\"></i> ${url_create_date} </span>\n                                        <span class=\"short-chart\" data-anaylyse=\"${short_id}\">\n                                            <i class=\"fa-solid fa-chart-line orb-icon\"></i> ${click_count} ${clicksTrans}\n                                        </span>\n                                        <span class=\"short-tags\"><i class=\"fa-solid fa-tag orb-icon\"></i> ${tags.join(', ')} Tags</span>\n                                    </small>\n                                </div>\n                            </div>\n                        `;\n\n                        // Hinzufügen des Elements zur Seite\n                        shortcodeList.appendChild(shortcodeItem);\n\n                    });\n\n                    // Gif\n                    gifLoad.classList.add('d-none');\n\n                    // Load Button\n                    const loadButton = document.querySelector('#load-more-button');\n                    loadButton.classList.remove('d-none');\n\n                    if (totalShortcodes === 0) {\n                        totalShortcodes = response.total_shortcodes;\n                    }\n\n                    if (serialized_data.length === 0 || response.page * response.per_page >= totalShortcodes) {\n                        loadButton.classList.add('d-none');\n                    } else {\n                        loadButton.classList.remove('d-none');\n                    }\n\n                    currentPage += 1; \n                    start_index = response.start_index;\n\n                }, 1000)\n\n            },\n            error: (xhr, status, error) => {\n                console.error(error);\n            }\n\n        });\n\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewShort);\n\n//# sourceURL=webpack://src/./assets/js/shortcode/module/ViewShort.js?");

/***/ }),

/***/ "./assets/js/shortcode/shortcode.js":
/*!******************************************!*\
  !*** ./assets/js/shortcode/shortcode.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CloseShortcodeForm: () => (/* binding */ CloseShortcodeForm),\n/* harmony export */   OpenSortcodeForm: () => (/* binding */ OpenSortcodeForm)\n/* harmony export */ });\n/* harmony import */ var _module_ViewShort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/ViewShort */ \"./assets/js/shortcode/module/ViewShort.js\");\n\n\n\n//Class\n// LimitationShort\n// GeoTargetingShort\n// AndroidShort\n// IosShort\n// TagsShort\n// ArchiveShort\n// ShortcodeShort\n// AnalyticsDashboardShort\n\n\n\ndocument.addEventListener('DOMContentLoaded', function() {\n    // ViewShort\n    const viewShort = new _module_ViewShort__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n});\n\n//Open CreateForm\nfunction OpenSortcodeForm(){\n    const asideForm = document.querySelector('#aside-form');\n    const archiveBtn = document.querySelector('#archive-btn');\n    const updateFormShortcode = document.querySelector('#update-form-shortcode');\n    const openForm = document.querySelector('#openForm');\n    const overlayOpen = document.querySelector('#overlay-open');\n    const pillsProfileTab = document.querySelector('#pills-profile-tab');\n    const limitationForm = document.querySelector('#limitation-form');\n    const mobileTab = document.querySelector('#mobile-tab');\n    const iosTargetingFrom = document.querySelector('#ios-targeting-from');\n    const androidTargetingForm = document.querySelector('#android-targeting-form');\n    const geoTargetingTab = document.querySelector('#geo-targeting-tab');\n    const geoTargetingForm = document.querySelector('#geo-targeting-form');\n\n    asideForm.classList.add('toggle');\n    archiveBtn.classList.add('d-none');\n    updateFormShortcode.classList.add('d-none');\n    openForm.classList.add('disabled');\n    overlayOpen.classList.add('overlay-open');\n\n    pillsProfileTab.classList.add('disabled');\n    limitationForm.display = 'none';\n\n    mobileTab.classList.add('disabled');\n    iosTargetingFrom.display = 'none';\n    androidTargetingForm.display = 'none';\n\n    geoTargetingTab.classList.add('disabled');\n    geoTargetingForm.display = 'none';\n\n}\n\nconst openForm = document.querySelector('#openForm');\nif(openForm){\n    openForm.addEventListener('click', OpenSortcodeForm);\n}\n\n\nfunction CloseShortcodeForm(){\n\n    const asideForm = document.querySelector('#aside-form');\n    const archiveBtn = document.querySelector('#archive-btn');\n    const updateFormShortcode = document.querySelector('#update-form-shortcode');\n    const openForm = document.querySelector('#openForm');\n    const overlayOpen = document.querySelector('#overlay-open');\n    const pillsProfileTab = document.querySelector('#pills-profile-tab');\n    const limitationForm = document.querySelector('#limitation-form');\n    const mobileTab = document.querySelector('#mobile-tab');\n    const iosTargetingFrom = document.querySelector('#ios-targeting-from');\n    const androidTargetingForm = document.querySelector('#android-targeting-form');\n    const geoTargetingTab = document.querySelector('#geo-targeting-tab');\n    const geoTargetingForm = document.querySelector('#geo-targeting-form');\n    const shortcodeId = document.querySelector('#shortcode_id');\n\n    asideForm.classList.remove('toggle');\n    archiveBtn.classList.remove('d-none');\n    updateFormShortcode.classList.remove('d-none');\n    openForm.classList.remove('disabled');\n    overlayOpen.classList.remove('overlay-open');\n    shortcodeId.innerHTML = '';\n\n    pillsProfileTab.classList.remove('disabled');\n    limitationForm.display = 'block';\n\n    mobileTab.classList.remove('disabled');\n    iosTargetingFrom.display = 'block';\n    androidTargetingForm.display = 'block';\n\n    geoTargetingTab.classList.remove('disabled');\n    geoTargetingForm.display = 'block';\n\n}\n\nconst closeForm = document.querySelector('#closeForm');\nif(closeForm){\n    closeForm.addEventListener('click', CloseShortcodeForm);\n}\n\n//# sourceURL=webpack://src/./assets/js/shortcode/shortcode.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/js/shortcode/shortcode.js");
/******/ 	
/******/ })()
;