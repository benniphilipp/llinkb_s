import { getCookie } from '../../linkinbio/module/getCookie';

class ShortcodeExport {
    
    constructor(){
        this.csrftoken = getCookie('csrftoken');
        this.ExportEvents();
    }

    ExportEvents(){
        const exportButton = document.querySelector('#export-button');
        if(exportButton){
            exportButton.addEventListener('click', this.ExportFunc.bind(this));
        }
    }

    ExportFunc(){
        const dataUrl = document.querySelector('#export_shortcodes_to_excel').value;

        let selectedShortcodes = [];
        $('input[name="selected_shortcodes"]:checked').each(function() {
            selectedShortcodes.push($(this).val());
        });

        $.ajax({
            url: dataUrl,
            method: 'POST',
            data: { 
                'selected_ids[]': selectedShortcodes,
            },
            headers: {
                'X-CSRFToken': this.csrftoken,
            },
            success: function(response) {
                var blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'shortcodes.xlsx';
                link.click();
                console.log(response)
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });

    }

}

export default ShortcodeExport;