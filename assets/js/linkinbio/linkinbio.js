import { getCookie } from './module/getCookie';
import { openForm, closeForm } from './module/sidebarSwitcher';

const csrftoken = getCookie('csrftoken');

// Linkinbiolink Links Javascript
import crateFormLink from './module/linkCrate';
import createFormLinks from './module/updateFormLinks';
import linkDelete from './module/linkDelete';

const crateformlink = new crateFormLink();
const createformlinks = new createFormLinks();
const linkdelete = new linkDelete();

// LinkInBio Page
import linkPageUpdate from './module/linkPageUpdate';
import linkPageDelete from './module/linkPageDelete';

const linkpageupdate = new linkPageUpdate();
const linkpagedelete = new linkPageDelete();

// Customizations
import adjustmentAddImg from './module/adjustmentAddImg'; // Add Image
import adjustmentRemoImg from './module/adjustmentRemoImg'; // adjustment remove Image * adjustmentRemoImg.js
import adjustmentViewImg from './module/adjustmentViewImg'; // adjustmentViewImg.js
import adjustmentTexDesc from './module/adjustmentTexDesc'; // Crate and titel, description * adjustmentTexDesc.js
import adjustmentSocial from './module/adjustmentSocial'; // Add Social media and Remove Social media * adjustmentSocial.js
import adjustmentColor from './module/adjustmentColor'; // Color Button * adjustmentColor.js
import adjustmentFonts from './module/adjustmentFonts'; // Fonts * adjustmentFonts.js 
import BackgroundImage from './module/backgroundImage';

const backgroundimage = new BackgroundImage();
const adjustmentaddimg = new adjustmentAddImg();
const adjustmentremoimg = new adjustmentRemoImg();
const adjustmentviewimg = new adjustmentViewImg();
const adjustmenttexdesc = new adjustmentTexDesc();
const adjustmentsocial = new adjustmentSocial();
const adjustmentcolor = new adjustmentColor();
const adjustmentfonts = new adjustmentFonts();


// Handle Titel Länge


const inputTitel = document.querySelector('#id_title');
if(inputTitel){
    inputTitel.addEventListener('input', () => {
        const titel = inputTitel.value;
        const Characters = 34 - titel.length;
        const characterCountElement = document.querySelector('.character-count');

        if(Characters < 0){
            inputTitel.value = titel.slice(0, 34);
            characterCountElement.textContent = `${Characters} / 34 characters`;
        }else{
            characterCountElement.textContent = `${Characters} / 34 characters`;
        }
})
}



// Sidebar Open & Close
const openFormButton = document.querySelector("#openForm");
const closeFormButton = document.querySelector("#closeForm");

if (openFormButton) {
    openFormButton.addEventListener('click', openForm);
}

if (closeFormButton) {
    closeFormButton.addEventListener('click', closeForm);
}