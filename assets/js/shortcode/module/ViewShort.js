
import { clearContent, lsToast } from '../../linkinbio/module/lsToast';

class ViewShort{
    constructor(){
        this.ShortccodeEvents();
        let currentPage = 1;
        this.ShortcodeAjaxView(currentPage);
    }

    //Event
    ShortccodeEvents(){
        const crateFormShortcode = document.querySelector('#crate-form-shortcode');
        if (crateFormShortcode) {
            crateFormShortcode.addEventListener('click', this.ShortcodeCrateView.bind(this))
        }

        const updateFormShortcode = document.querySelector('#update-form-shortcode');
        if(updateFormShortcode){
            updateFormShortcode.addEventListener('click', this.ShortcodeUpdateCrateView.bind(this))
        }

        const self = this;
        const listContainer = document.getElementById('shortcode-list');

        if(listContainer){
            listContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('shortcode-class')) {
                  const clickedListItem = event.target;
                  const shortcodeValue = clickedListItem.getAttribute('data-shortcode');
                  self.ShortcodeUpdateView(shortcodeValue);
                }
              });
        }

        const IdUrlDestination = document.querySelector('#id_url_destination');
        if(IdUrlDestination){
            IdUrlDestination.addEventListener('input', this.ShortcodeUrlAccessibility.bind(this));
        }

        // Feld Prüfen
        const urlTitel = document.getElementById('id_url_titel');
        if(urlTitel){
            urlTitel.addEventListener('input', function () {
                const inputValue = this.value;
                const otherInputValue = document.getElementById('id_url_destination').value;
                const crate_form_shortcode = document.getElementById('crate-form-shortcode');

                const update_form_shortcode = document.getElementById('update-form-shortcode');

                if(crate_form_shortcode){
                    if (inputValue && otherInputValue) {
                        crate_form_shortcode.classList.remove('disabled');
                    }
                }

                if(update_form_shortcode){
                    if (inputValue && otherInputValue) {
                        update_form_shortcode.classList.remove('disabled');
                    }
                }

            });
        }

        if(listContainer){
            listContainer.addEventListener('click', function(event){
                if(event.target.classList.contains('btn-copy')) {
                    const clickedListItem = event.target;
                    const buttonId = clickedListItem.getAttribute('data-button');
                    self.CopyButtonColort(buttonId);
                } 
            });
        }

        const asideForm = document.querySelector('#aside-form');
        if(asideForm){
            asideForm.addEventListener('click', function (event){
                if (event.target.classList.contains('btn-copy')) {
                    const clickedListItem = event.target;
                    const buttonId = clickedListItem.getAttribute('data-button');
                    self.CopyButtonColort(buttonId);
                  }   
            });
        }


        const loadMoreButton = document.querySelector('#load-more-button');
        if(loadMoreButton){
            let currentPage = 1; 
            loadMoreButton.addEventListener('click', function(){
                currentPage += 1; 
                this.ShortcodeAjaxView(currentPage);
            }.bind(this))
        }

        const filter_search_form = document.querySelector('#filter-search-form');
        if (filter_search_form) {
            let currentPage = 1; 
            filter_search_form.addEventListener('change', function () {
                const self = this;
                setTimeout(function(){
                    self.ShortcodeAjaxView(currentPage);
                }, 300)

                const shortcodeList = document.querySelector('#shortcode-list');
                while (shortcodeList.firstChild) {
                    shortcodeList.removeChild(shortcodeList.firstChild);
                }

                const alertUser = document.getElementById('alertUser');
                while (alertUser.firstChild) {
                    alertUser.removeChild(alertUser.firstChild);
                }

            }.bind(this));
        }

    }

    // Copy Button color
    CopyButtonColort(buttonId){
        let that = document.getElementById(buttonId);
        navigator.clipboard.writeText(that?.innerText).then(res => {});

        $('.color' + buttonId).addClass('bg-success text-white');
        setTimeout(()=>{
            $('.color' + buttonId).removeClass('bg-success text-white');
                // onClick copy to clipboard
                console.clear()
        }, 2000);
    }

    // Url Accessibility
    ShortcodeUrlAccessibility(){
        const UrlDestination = document.querySelector('#id_url_destination').value;
        const urlAccessibility = document.querySelector('#CheckingUrlAccessibility').value;

        const valueUrl = '?url=' + encodeURIComponent(UrlDestination)
        const messageElement = document.querySelector('#id_url_destination');

        $.ajax({
            url: urlAccessibility+valueUrl,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                console.log(data)
                if (data[0].data === 'true') {

                    $("#id_url_destination").after('<div class="text-success">Your website is accessible!</div>');
                    setTimeout(()=>{
                        $("#id_url_destination").next().remove();
                    }, 2000);

                } else {
   
                    $("#id_url_destination").after('<div class="text-danger">Your website is not accessible!</div>');
                    setTimeout(()=>{
                        $("#id_url_destination").next().remove();
                    }, 2000);

                }
            },
            error: (error) => {
                console.log(error);
            }
        });       

    }

    //Update View
    ShortcodeUpdateView(shortcodeValue){

        const overlayOpen = document.querySelector('#overlay-open');
        const asideForm = document.querySelector('#aside-form');
        const crateFormShortcode = document.querySelector('#crate-form-shortcode');

        crateFormShortcode.classList.add('d-none')
        overlayOpen.classList.add('overlay-open')
        asideForm.classList.add('toggle');

        const urlData = document.getElementById('ShortcodeSingelUpdateView').value.replace(/0/g, shortcodeValue);
        
        const archiveBtn = document.getElementById('archive-btn');
        archiveBtn.setAttribute('data-archive', shortcodeValue);

        const url_destination = document.getElementById('id_url_destination');
        const url_titel = document.getElementById('id_url_titel');
        const idShort = document.getElementById('id_shortcode');
        const shortcodeId = document.querySelector('#shortcode_id');
        const updateShortcodeUrl = document.querySelector('#update-shortcode-url');

        const update_form_shortcode = document.getElementById('update-form-shortcode');
        if (url_titel && url_destination) {
            update_form_shortcode.classList.remove('disabled');
        }

        $.ajax({
            type: 'GET',
            url: urlData,
            success: (response) => {

                const CopyTrans = gettext('Copy');

                const data = response.data

                url_destination.value = data.url_destination;
                url_titel.value = data.url_titel;
                idShort.value = data.shortcode;
                updateShortcodeUrl.value = data.id

                const tagsCheckboxes = $('input[name="tags"][type="checkbox"]');

                tagsCheckboxes.each(function(index, checkbox) {
                    const tagValue = parseInt($(checkbox).val());
                    const tagIsSelected = data.tags.includes(tagValue);
                    $(checkbox).prop('checked', tagIsSelected);
                });

                tagsCheckboxes.trigger('change');

                shortcodeId.innerHTML = `<button data-button="short${data.id}" type="button" class="btn btn-secondary btn-copy colorshort${data.id} btn-sm"><i class="fa-solid fa-link"></i> ${CopyTrans}</button>`;

            },
            error: (error) => {
                console.log(error);
            }
        });

    }

    //Update Crate
    ShortcodeUpdateCrateView(event){
        event.preventDefault()

        const alertUser = document.getElementById('alertUser');
        while (alertUser.firstChild) {
            alertUser.removeChild(alertUser.firstChild);
        }


        const updateShortcodeUrlID = document.querySelector('#update-shortcode-url').value;
        const urlData = document.getElementById('ShortcodeSingelUpdateView').value.replace(/0/g, updateShortcodeUrlID);

        const csrf = document.getElementsByName('csrfmiddlewaretoken');
        const url_destination = document.getElementById('id_url_destination');
        const url_titel = document.getElementById('id_url_titel');
        const idShort = document.getElementById('id_shortcode');

        const fd = new FormData();
        fd.append('csrfmiddlewaretoken', csrf[0].value)
        fd.append('url_destination', url_destination.value);
        fd.append('shortcode_id', idShort.value);
        fd.append('url_titel', url_titel.value);

        const selectedTags = [];
        document.querySelectorAll('input[name="tags"]:checked').forEach(function(checkbox) {
            selectedTags.push(checkbox.value);
        });
        
        fd.append('tags', selectedTags.join(','));

        $.ajax({
            type: 'POST',
            url: urlData,
            data: fd,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: (data) => {
                
                const archiveBtn = document.getElementById('archive-btn');
                archiveBtn.setAttribute('data-archive', '');
                url_destination.value = '';
                url_titel.value = '';
                idShort.value = '';

                const overlayOpen = document.querySelector('#overlay-open');
                const asideForm = document.querySelector('#aside-form');
                const crateFormShortcode = document.querySelector('#crate-form-shortcode');
        
                crateFormShortcode.classList.remove('d-none')
                overlayOpen.classList.remove('overlay-open')
                asideForm.classList.remove('toggle');

                const tagsCheckboxes = $('input[name="tags"][type="checkbox"]');
                tagsCheckboxes.each(function(index, checkbox) {
                    const tagValue = parseInt($(checkbox).val());
                    $(checkbox).prop('checked', '');
                });

                const shortcodeList = document.querySelector('#shortcode-list');
                while (shortcodeList.firstChild) {
                    shortcodeList.removeChild(shortcodeList.firstChild);
                }

                lsToast(data.success);


                setTimeout(()=>{
                    let currentPage = 1; 
                    this.ShortcodeAjaxView(currentPage);
                }, 200);

            },
            error: (error) => {
                console.log(error)
            }
        });
                
    }
    

    // Craete
    ShortcodeCrateView(event){
        event.preventDefault();
        const dataInput = document.querySelector('input[name="data"]');

        const url_destination = document.getElementById('id_url_destination');
        const url_titel = document.getElementById('id_url_titel');
        const id_shortcode = document.getElementById('id_shortcode');
        const url_creator = document.getElementById('url_creator');
        const csrf = document.getElementsByName('csrfmiddlewaretoken');

        const alertUser = document.getElementById('alertUser');
        while (alertUser.firstChild) {
            alertUser.removeChild(alertUser.firstChild);
        }

    
        const fd = new FormData();
        fd.append('csrfmiddlewaretoken', csrf[0].value)
        fd.append('url_destination', url_destination.value);
        fd.append('url_titel', url_titel.value);
        fd.append('id_shortcode', id_shortcode.value);
        fd.append('url_creator', url_creator.value);

        $.ajax({
            type: 'POST',
            url: dataInput.value,
            data: fd,
            dataType: 'json',
            success: (response) => {
                console.log(response)

                const openForm = document.getElementById('openForm');
                const overlayOpen = document.querySelector('#overlay-open');
                const asideForm = document.querySelector('#aside-form');
                const crateFormShortcode = document.querySelector('#crate-form-shortcode');
        
                openForm.classList.remove('disabled')
                crateFormShortcode.classList.remove('d-none')
                overlayOpen.classList.remove('overlay-open')
                asideForm.classList.remove('toggle');

                const tagsCheckboxes = $('input[name="tags"][type="checkbox"]');
                tagsCheckboxes.each(function(index, checkbox) {
                    const tagValue = parseInt($(checkbox).val());
                    $(checkbox).prop('checked', '');
                });

                const shortcodeList = document.querySelector('#shortcode-list');
                while (shortcodeList.firstChild) {
                    shortcodeList.removeChild(shortcodeList.firstChild);
                }

                lsToast(response.success);

                setTimeout(()=>{
                    let currentPage = 1
                    this.ShortcodeAjaxView(currentPage);
                }, 300);

            },
            error: (xhr, textStatus, errorThrown) => {
                console.error('Fehler:', errorThrown);
            },
            cache: false,
            contentType: false,
            processData: false,
        })
        
    }

    // View
    ShortcodeAjaxView(currentPage){
        let icon = '';
        let pageIcon = '';
        const dataInput = document.querySelector('input[name="data"]');
        if(dataInput){
            const gifLoad = document.querySelector('#gif-load');

            const selectedTag = document.querySelector('#tag-filter');
            const searchQuery = document.querySelector('#search-input');
            const ValueselectedTag = selectedTag.value;
            const ValuesearchQuery = searchQuery.value;
           
            let start_index; 
            let totalShortcodes = 0; 

            const tagsArray = ValueselectedTag ? [ValueselectedTag] : [];
    
            $.ajax({
                url: `${dataInput.value}?page=${currentPage}`,
                type: 'GET',
                data: { page: currentPage  },
                dataType: 'json',
                data: {
                    tags: tagsArray,
                    q: ValuesearchQuery
                },
                success: (response) => {

    
                    const alertUser = document.getElementById('alertUser');
                    const existingAlert = alertUser.querySelector('.alert');
                    if (!existingAlert) {
                        alertUser.innerHTML += `
                            <div class="alert alert-${response.user_date.alert} d-inline-flex p-2" role="alert">
                                ${response.user_date.message}
                            </div>
                        `;
                    }
                    
                    if(response.user_date.alert === 'warning'){
                        const openForm = document.querySelector('#openForm');
                        openForm.style.display = 'none'
                    }
    
                    const shortcodeList = document.querySelector('#shortcode-list');
                    const serialized_data = response.data;
                    gifLoad.classList.remove('d-none');
    
    

                    setTimeout(function(){
    
                        serialized_data.forEach(function(item) {
                           
                            // Kürzen der URL und der Ziel-URL
                            const shortUrl = item.get_short_url.length > 90 ? item.get_short_url.substring(0, 90) + '...' : item.get_short_url;
                            const shortDestination = item.url_destination.length > 90 ? item.url_destination.substring(0, 90) + '...' : item.url_destination;
    
                            // Extrahieren der benötigten Werte aus item
                            const short_id = item.short_id;
                            const url_create_date = item.url_create_date;
                            const click_count = item.click_count;
                            const shortcode = item.shortcode;
                            const tags = item.tags;
                            const url_titel = item.url_titel;
                            const page = item.linkinbio;
                            const linkoage = item.linkinbiopgaelinks;

                            if(linkoage){
                                pageIcon = '<i class="fa-solid fa-square-up-right"></i>'
                            }else{
                                pageIcon = '';
                            }

                            if(page){
                                 icon = '<i class="fa-regular fa-newspaper"></i>';
                            }else{
                                 icon = '';
                            }
                            
                            let faviconPath = item.favicon_path;
                            if (faviconPath === 'null' || faviconPath === null) {
                                faviconPath = document.querySelector('#favicon-path').value;
                            }
    
                            const editTrans = gettext('edit');
                            const clicksTrans = gettext('clicks');
                            const copy = gettext('copy');
                            
                            // Erstellen eines DIV-Elements und Hinzufügen der HTML-Struktur
                            const shortcodeItem = document.createElement('div');
                            shortcodeItem.innerHTML = `
                                <div class="card p-3 my-3 border border-0 shadow-sm">
                                    <div class="card-header header-elements">
                                        <form id="shortcode-form">
                                            <input type="checkbox" name="selected_shortcodes" value="shortcode_id_${short_id}">
                                        </form>
                                        <img src="${faviconPath}" class="img-thumbnail favicon-img" alt="favicon.ico">
                                        <h5 class="card-title">${url_titel}</h5>
                                        <div class="card-header-elements ms-auto">
                                            <span class="d-none" id="short${short_id}">${shortUrl}</span>
                                            <button data-button="short${short_id}" type="button" class="btn btn-secondary btn-copy colorshort${short_id} btn-sm">
                                                <i class="fa-regular fa-copy"></i> ${copy}
                                            </button>
                                            <a data-shortcode="${short_id}" data-shortname="${shortcode}" class="shortcode-class short-name btn btn-xs btn-primary btn-sm">
                                                <i class="fa-solid fa-pencil"></i> ${editTrans}
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <a href="${shortUrl}">${shortUrl}</a><br>
                                        <a class="text-muted" href="${shortDestination}">${shortDestination}</a>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted short-links-footer">
                                            <span class="short-calendar"><i class="fa-regular fa-calendar orb-icon"></i> ${url_create_date} </span>
                                            <span class="short-chart" data-anaylyse="${short_id}">
                                                <i class="fa-solid fa-chart-line orb-icon"></i> ${click_count} ${clicksTrans}
                                            </span>
                                            <span class="short-tags"><i class="fa-solid fa-tag orb-icon"></i> Tags: <b>${tags.join(', ')}</b> </span>
                                            <span class="d-flex align-items-center">${pageIcon}</span>
                                            <span class="d-flex align-items-center">${icon}</span>
                                        </small>
                                    </div>
                                </div>
                            `;
    
                            // Hinzufügen des Elements zur Seite
                            shortcodeList.appendChild(shortcodeItem);
    
                        });

                        const SearchTrans = gettext('Your search returned no results, please try again.')
    
                        if (serialized_data.length === 0) {
                            shortcodeList.innerHTML = `
                            <div class="alert alert-primary" role="alert">
                                ${SearchTrans}
                            </div>
                            `;
                        }
    
                        // Gif
                        gifLoad.classList.add('d-none');
    
                        // Load Button
                        const loadButton = document.querySelector('#load-more-button');
                        loadButton.classList.remove('d-none');
    
                        
                        if (totalShortcodes === 0) {
                            totalShortcodes = response.total_shortcodes;
                        }
    
    
                        if (serialized_data.length === 0 || response.page * response.per_page >= totalShortcodes) {
                            loadButton.classList.add('d-none');
                        } else {
                            loadButton.classList.remove('d-none');
                        }
    
                        currentPage += 1; 
                        start_index = response.start_index;
        
                    }, 1000)
    
                },
                error: (xhr, status, error) => {
                    console.error(error);
                }
    
            });
        }

    }

}

export default ViewShort;