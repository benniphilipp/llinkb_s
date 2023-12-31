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

/***/ "./assets/js/linkinbio/linkinbio-view.js":
/*!***********************************************!*\
  !*** ./assets/js/linkinbio/linkinbio-view.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nclass LinkInBioView {\n    constructor(){\n        \n        const dataUrl = document.querySelector('#LinkInBioDeatilePage');\n        if(dataUrl){\n            this.ajaxView(dataUrl);\n        }\n    }\n\n\n    ajaxView(dataUrl){\n        let image;\n        const self = this;\n        $.ajax({\n            url: dataUrl.value,\n            type: 'GET',\n            dataType: 'json',\n            success: function(data) {\n            //console.log(data)\n            \n            $('#descriptionPageValue').text(data.context_json.description);\n            $('#titelpageValue').text(data.context_json.title);\n\n            // Rendern der URL-Social-Profile\n            const urlSocialProfilesContainer = $('#urlSocialProfilesContainer');\n            urlSocialProfilesContainer.empty();\n\n\n            data.social_media_data.forEach((profile) => {\n                const profileElement = `\n                <li>\n                    <a href=\"${profile.url}\">\n                        <i class=\"fa-brands ${profile.platform}\"></i>\n                    </a>\n                </li>\n                `;\n                urlSocialProfilesContainer.append(profileElement);\n            });\n            \n            // Rendern der Link-in-Bio-Links\n            const linkInBioLinksContainer = $('#linkInBioLinksContainer');\n            linkInBioLinksContainer.empty();\n            \n            data.links.forEach((link) => {\n\n                if(link.image){\n                    image = `<img class=\"img-fluid-shortcode\" src=\"${link.image}\"\n                    style=\"\n                    position: absolute;\n                    left: 0.4rem;\n                    top: 50%;\n                    transform: translateY(-50%);\n                    height: 2rem;\n                    width: 2rem;\n                    object-fit: cover;\n                    object-position: center;\n                    \">`\n                }else{\n                    image = '';\n                }\n\n                const linkElement = `\n                    <a class=\"link-page-btn link-btn-color position-relative\" href=\"${link.url_destination}\">${image}${link.button_label}</a>\n                `;\n                linkInBioLinksContainer.append(linkElement);\n            });\n\n            //Image\n            const pageImage = document.querySelector('.page-image');\n            const newImageUrl = data.image[0].profile_image;\n            if(newImageUrl){\n                pageImage.src = newImageUrl;\n            }\n\n        \n            // Background Image\n            const bg_image = data.image_bg[0].image_bg;\n            if(bg_image){\n                \n                self.handleBlurEffect(bg_image);\n\n                const pageOne = document.querySelector('#pageOne');\n                pageOne.style.backgroundImage = `url(${bg_image})`;\n                pageOne.style.backgroundSize = 'cover';\n                pageOne.style.backgroundRepeat = 'no-repeat';\n                pageOne.style.backgroundPosition = 'center center';\n                pageOne.style.zIndex = '99'; \n            }\n\n            const cssStyles  = data['settings_json_data'];\n\n\n            for (const className in cssStyles) {\n                const elementInfo = cssStyles[className];\n                const elements = document.getElementsByClassName(className);\n            \n                for (const element of elements) {\n                    const defaultStyles = elementInfo.default;\n                    for (const styleName in defaultStyles) {\n                        element.style[styleName] = defaultStyles[styleName];\n                    }\n            \n                    // Fügen Sie den Hover-Effekt hinzu\n                    element.addEventListener('mouseenter', () => {\n                        const hoverStyles = elementInfo.hover;\n                        if (hoverStyles) {\n                            for (const styleName in hoverStyles) {\n                                element.style[styleName] = hoverStyles[styleName];\n                            }\n                        }\n                    });\n\n                    // Entfernen Sie den Hover-Effekt\n                    element.addEventListener('mouseleave', () => {\n                        for (const styleName in defaultStyles) {\n                            element.style[styleName] = defaultStyles[styleName];\n                        }\n                    });\n            \n                    // Prüfen, ob mobile Stile verfügbar sind und den Bildschirm überwachen\n                    const mobileStyles = elementInfo.mobile;\n                    \n                    if (mobileStyles) {\n                        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Hier an die gewünschte Bildschirmbreite anpassen\n                        const applyMobileStyles = () => {\n                            for (const styleName in mobileStyles) {\n                                element.style[styleName] = mobileStyles[styleName];\n                            }\n                        };\n            \n                        if (mediaQuery.matches) {\n                            applyMobileStyles(); // Wenn die Bildschirmgröße passt, wende mobile Stile an\n                        }\n            \n                        mediaQuery.addListener((e) => {\n                            if (e.matches) {\n                                applyMobileStyles();\n                            } else {\n                                // Wenn der Bildschirm größer ist, wende die Standardstile an\n                                for (const styleName in defaultStyles) {\n                                    element.style[styleName] = defaultStyles[styleName];\n                                }\n                            }\n                        });\n                    }\n                }\n            }\n\n            },\n            error: function(error) {\n              console.error('Fehler beim Abrufen der Daten: ' + error);\n            }\n        });\n    }\n\n\n    handleBlurEffect(bg_image) {\n        console.log('run');\n        const pageUserBg = document.querySelector('#pageUserBg');\n        const viewportWidth = window.innerWidth;\n    \n        if (viewportWidth >= 168) {\n            if (pageUserBg) {\n                pageUserBg.style.backgroundImage = `url(${bg_image})`;\n                pageUserBg.style.backgroundSize = 'cover';\n                pageUserBg.style.backgroundRepeat = 'no-repeat';\n                pageUserBg.style.backgroundPosition = 'center center';\n                pageUserBg.style.filter = 'blur(4px)';\n                pageUserBg.style.zIndex = '0';\n                pageUserBg.style.position = 'absolute';\n                pageUserBg.style.height = '100%';\n                pageUserBg.style.width = '100%';\n            }\n        } else {\n            if (pageUserBg) {\n                pageUserBg.style.backgroundImage = 'none';\n                pageUserBg.style.filter = 'none';\n                pageUserBg.style.backgroundSize = 'none';\n                pageUserBg.style.backgroundRepeat = 'none';\n                pageUserBg.style.backgroundPosition = 'none';\n                pageUserBg.style.filter = 'none';\n                pageUserBg.style.zIndex = 'none';\n                pageUserBg.style.position = 'none';\n                pageUserBg.style.height = 'none%';\n                pageUserBg.style.width = 'none';\n            }\n        }\n    }\n      \n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkInBioView);\n\nconst linkinbioview = new LinkInBioView();\n// window.addEventListener('resize', linkinbioview.handleBlurEffect);\n\nwindow.addEventListener('resize', () => {\n    linkinbioview.ajaxView(document.querySelector('#LinkInBioDeatilePage'));\n  });\n\n//# sourceURL=webpack://src/./assets/js/linkinbio/linkinbio-view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/linkinbio/linkinbio-view.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;