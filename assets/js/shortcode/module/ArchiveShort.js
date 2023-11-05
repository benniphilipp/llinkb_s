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

        // Archive list View
        const ifData = document.querySelector('#ArchivListLiftView');
        if(ifData){
            this.ArchiveListView(ifData);
        }

        // Shortcode Delete
        const deleteButton = document.querySelector('#delete-button');
        if(deleteButton){
            deleteButton.addEventListener('click', this.ShortcodeDelete.bind(this));
        }

        // Unarchive
        const archiveButton = document.querySelector('#archive-button');
        if(archiveButton){
            archiveButton.addEventListener('click', this.ShortcodeUnarchive.bind(this));
        }

    }

    // Unarchive
    ShortcodeUnarchive(){
        const ShortcodeUnarchived = document.querySelector('#ShortcodeUnarchived');
        if(ShortcodeUnarchived){
            
            const dataURL = ShortcodeUnarchived.value;

            const selectedShortcodes = [];
            $('input[type="checkbox"]:checked').each(function() {
                const shortcodeID = $(this).closest('tr').data('shortcode');
                selectedShortcodes.push(shortcodeID);
            });

            $.ajax({
                type: 'POST',
                url: dataURL,
                data: {
                    selected_shortcodes: selectedShortcodes,
                },
                headers: {
                    'X-CSRFToken': this.csrftoken
                },
                success: (data) => {
                    lsToast(data.message);
                    const urlDataFunc = document.querySelector('#ArchivListLiftView').value;
                    this.ArchiveListView(urlDataFunc);
                },
                error: (error) => {
                    console.log(error);
                }
            });

            
        }
    }

    // Shortcode Delete
    ShortcodeDelete(){
        const selectedShortcodeIds = [];

        $('input[type="checkbox"]:checked').each(function() {
            const checkboxId = $(this).attr('id');
            const shortcodeId = checkboxId.split('-')[1];
            selectedShortcodeIds.push(shortcodeId);
        });

        const urlData = document.querySelector('#ArchivListLiftView').value;
        const selectTrans = gettext('Please select at least one shortcode to delete.')

        if (selectedShortcodeIds.length === 0) {
            lsToast(selectTrans);
            return;
        }

        $.ajax({
            type: 'POST',
            url: urlData,
            data: {
                'shortcode_ids[]': selectedShortcodeIds,
            },
            headers: {
                'X-CSRFToken': this.csrftoken
            },
            success: (response) => {
                lsToast(response.message);
                this.ArchiveListView(urlData);
            },
            error: (error) =>{
                console.log(error);
            }
        });

    }


    // Archive list View
    ArchiveListView(ifData){
        const dataURL = ifData.value;
        $.ajax({
            type: 'GET',
            url: dataURL,
            dataType: 'json',
            success: (response) =>{
                const archivedShortcodes = response.archived_shortcodes;
    
                const archivedShortcodeTable = $('#archived-shortcode-table');
                archivedShortcodeTable.empty();
    
                archivedShortcodes.forEach(function(shortcode) {
                    // Erstellen Sie eine Zeile für jeden archivierten Shortcode
                    const row = $('<tr data-shortcode="' + shortcode.id + '" class="shortcode-class">').addClass('shortcode-class');
    
                    // Erstellen Sie eine Zelle für die Checkbox mit einer eindeutigen ID
                    const checkboxCell = $('<td>');
                    const checkbox = $('<input>').attr({
                        type: 'checkbox',
                        value: shortcode.id,
                        id: 'checkbox-' + shortcode.id, // Eindeutige ID für jede Checkbox
                    }).addClass('form-check-input');
                    checkboxCell.append(checkbox);
                    row.append(checkboxCell);
    
                    // Erstellen Sie Zellen für die anderen Spalten
                    const titleCell = $('<td>').text(shortcode.url_titel);
                    const destinationCell = $('<td>').text(shortcode.url_destination);
                    const createDateCell = $('<td>').text(shortcode.url_create_date);
    
                    // Fügen Sie die Zellen zur Zeile hinzu
                    row.append(titleCell);
                    row.append(destinationCell);
                    row.append(createDateCell);
    
                    // Fügen Sie die Zeile zur Tabelle hinzu
                    archivedShortcodeTable.append(row);
                });
            },
            error: (error) => {
                console.log(error)
            }
        });

    }

    // Shortcode Arcivieren
    ShortcodeArchiveren(buttonId){

        const self = this;
        const urlData = document.getElementById('ShortcodeAcivieren').value.replace(/0/g, buttonId);

        const alertUser = document.querySelector('#alertUser');
        while (alertUser.firstChild) {
            alertUser.removeChild(alertUser.firstChild);
        }
        
        $.ajax({
            type: 'GET',
            url: urlData,
            headers: {
                'X-CSRFToken': this.csrftoken
            },
            success: (response) => {

                let currentPage = 1
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
                    self.shortcodeview.ShortcodeAjaxView(currentPage);
                }, 400);

                lsToast(response.success);

            },
            error: (error) => {
                console.log(error);
            }
        });

    }

}

export default ShortcodeArchive;