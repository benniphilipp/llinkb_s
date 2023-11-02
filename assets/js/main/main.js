// Main JS 


// Menu Siedbar Close Open
let resizeTimeout;

function siedbar() {
    const screenSize = window.innerWidth;
    const mainSidebar = document.getElementById('main-sidebar');
    const navbarMain = document.getElementById('navbar-main');
    const bodyMain = document.getElementById('body-main');

    if (screenSize <= 992) {
        // Der Bildschirm ist kleiner oder gleich 992px
        mainSidebar.classList.remove('bd-aside');
        mainSidebar.classList.add('d-none');
        navbarMain.classList.add('main-navbar');
        bodyMain.classList.add('main-body');

    } else {
        // Der Bildschirm ist größer als 992px
        mainSidebar.classList.add('bd-aside');
        mainSidebar.classList.remove('d-none');
        navbarMain.classList.add('main-navbar');
        bodyMain.classList.remove('main-body');
    }
}

function handleResize() {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(siedbar, 200);
}

window.addEventListener('resize', handleResize);
siedbar(); 


// Open Menu Mobile
export function siedbarMobile(){
    const body = document.querySelector('body');
    body.classList.add('body-mobile');
    document.getElementById('navbar-mobile').classList.toggle('d-none');
    document.getElementById('navbar-mobile').classList.toggle('navbar-mobile-menu');
    document.getElementById('navbar-mobile').classList.toggle('toggle');
    
}
const openMobileNavbar = document.querySelector('#navbar-mobile-open');
if(openMobileNavbar){
    openMobileNavbar.addEventListener('click', siedbarMobile)
}

// Close Menu Mobile
export function mobileMenuClose(){
    const body = document.querySelector('body');
    body.classList.remove('body-mobile');
    document.getElementById('navbar-mobile').classList.toggle('d-none');
    document.getElementById('navbar-mobile').classList.toggle('toggle');
    document.getElementById('navbar-mobile').classList.toggle('navbar-mobile-menu');
}
const closeMobileMenu = document.querySelector('#close-navbar-mobile');
if(closeMobileMenu){
    closeMobileMenu.addEventListener('click', mobileMenuClose)
}
