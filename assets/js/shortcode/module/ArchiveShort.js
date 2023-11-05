import { clearContent, lsToast } from '../../linkinbio/module/lsToast';
import { getCookie } from '../../linkinbio/module/getCookie';
import ShortcodeAjaxView from './ViewShort';

class ShortcodeArchive{
    constructor(){
        this.csrftoken = getCookie('csrftoken');
        this.events();
    }

    events(){
        const self = this;
        const archiveBtn = document.querySelector('#archive-btn');
        if(archiveBtn){
            archiveBtn.addEventListener('click', function(event){
                if(event.target.classList.contains('archive-class-btn')) {
                    const archiveItem = event.target;
                    const buttonId = archiveItem.getAttribute('data-archive');
                    self.ShortcodeArchiveren(buttonId);
                } 
            });
        }
    }

    ShortcodeArchiveren(buttonId){

        const self = this;
        const urlData = document.getElementById('ShortcodeAcivieren').value.replace(/0/g, buttonId);
        

        $.ajax({
            type: 'GET',
            url: urlData,
            headers: {
                'X-CSRFToken': this.csrftoken
            },
            success: (response) => {

                const shortcodeList = document.querySelector('#shortcode-list');
                while (shortcodeList.firstChild) {
                    shortcodeList.removeChild(shortcodeList.firstChild);
                }

                setTimeout(()=>{
                    const overlayOpen = document.querySelector('#overlay-open');
                    const asideForm = document.querySelector('#aside-form');
                    const crateFormShortcode = document.querySelector('#crate-form-shortcode');
            
                    crateFormShortcode.classList.remove('d-none')
                    overlayOpen.classList.remove('overlay-open')
                    asideForm.classList.remove('toggle');
                    
                }, 300);

                setTimeout(()=>{
                    this.shortcodeview = new ShortcodeAjaxView();
                    self.shortcodeview.ShortcodeAjaxView();
                }, 1000);

                lsToast(response.success);

            },
            error: (error) => {
                console.log(error);
            }
        });

    }

}

export default ShortcodeArchive;