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

/***/ "./assets/js/main/main.js":
/*!********************************!*\
  !*** ./assets/js/main/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mobileMenuClose: () => (/* binding */ mobileMenuClose),\n/* harmony export */   siedbarMobile: () => (/* binding */ siedbarMobile)\n/* harmony export */ });\n// Main JS \n\n\n// Menu Siedbar Close Open\nlet resizeTimeout;\n\nfunction siedbar() {\n    const screenSize = window.innerWidth;\n    const mainSidebar = document.getElementById('main-sidebar');\n    const navbarMain = document.getElementById('navbar-main');\n    const bodyMain = document.getElementById('body-main');\n\n    if (screenSize <= 992) {\n        // Der Bildschirm ist kleiner oder gleich 992px\n        mainSidebar.classList.remove('bd-aside');\n        mainSidebar.classList.add('d-none');\n        navbarMain.classList.add('main-navbar');\n        bodyMain.classList.add('main-body');\n\n    } else {\n        // Der Bildschirm ist größer als 992px\n        mainSidebar.classList.add('bd-aside');\n        mainSidebar.classList.remove('d-none');\n        navbarMain.classList.add('main-navbar');\n        bodyMain.classList.remove('main-body');\n    }\n}\n\nfunction handleResize() {\n    if (resizeTimeout) {\n        clearTimeout(resizeTimeout);\n    }\n\n    resizeTimeout = setTimeout(siedbar, 200);\n}\n\nwindow.addEventListener('resize', handleResize);\nsiedbar(); \n\n\n// Open Menu Mobile\nfunction siedbarMobile(){\n    const body = document.querySelector('body');\n    body.classList.add('body-mobile');\n    document.getElementById('navbar-mobile').classList.toggle('d-none');\n    document.getElementById('navbar-mobile').classList.toggle('navbar-mobile-menu');\n    document.getElementById('navbar-mobile').classList.toggle('toggle');\n    \n}\nconst openMobileNavbar = document.querySelector('#navbar-mobile-open');\nif(openMobileNavbar){\n    openMobileNavbar.addEventListener('click', siedbarMobile)\n}\n\n// Close Menu Mobile\nfunction mobileMenuClose(){\n    const body = document.querySelector('body');\n    body.classList.remove('body-mobile');\n    document.getElementById('navbar-mobile').classList.toggle('d-none');\n    document.getElementById('navbar-mobile').classList.toggle('toggle');\n    document.getElementById('navbar-mobile').classList.toggle('navbar-mobile-menu');\n}\nconst closeMobileMenu = document.querySelector('#close-navbar-mobile');\nif(closeMobileMenu){\n    closeMobileMenu.addEventListener('click', mobileMenuClose)\n}\n\n\n//# sourceURL=webpack://src/./assets/js/main/main.js?");

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
/******/ 	__webpack_modules__["./assets/js/main/main.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;