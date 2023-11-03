

class ViewShort{
    constructor(){
        this.ShortccodeEvents();
        this.ShortcodeAjaxView();
    }

    //Event
    ShortccodeEvents(){
        const crateFormShortcode = document.querySelector('#crate-form-shortcode');
        if (crateFormShortcode) {
            crateFormShortcode.addEventListener('click', this.ShortcodeCrateView.bind(this))
        }
    }
    

    // Craete
    ShortcodeCrateView(event){
        event.preventDefault();
        const dataInput = document.querySelector('input[name="data"]');

        const url_destination = document.getElementById('id_url_destination');
        const url_titel = document.getElementById('id_url_titel');
        const url_medium = document.getElementById('id_url_medium');
        const url_source = document.getElementById('id_url_source');
        const url_term = document.getElementById('id_url_term');
        const url_content = document.getElementById('id_url_content');
        const url_campaign = document.getElementById('id_url_campaign');
        const csrf = document.getElementsByName('csrfmiddlewaretoken');
        const url_creator = document.getElementById('url_creator');
    
        const fd = new FormData();
        fd.append('csrfmiddlewaretoken', csrf[0].value)
        fd.append('url_destination', url_destination.value);
        fd.append('url_titel', url_titel.value);
        fd.append('url_source', url_source.value);
        fd.append('url_medium', url_medium.value);
        fd.append('url_term', url_term.value);
        fd.append('url_campaign', url_campaign.value);
        fd.append('url_creator', url_creator.value);
        fd.append('url_content', url_content.value);

        $.ajax({
            type: 'POST',
            url: dataInput.value,
            data: fd,
            dataType: 'json',
            success: (response) => {
                console.log('RUN DATA' + response);
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
    ShortcodeAjaxView(){
        const dataInput = document.querySelector('input[name="data"]');
        const gifLoad = document.querySelector('#gif-load');

        let start_index; 
        var currentPage = 1;  
        var totalShortcodes = 0; 

        $.ajax({
            url: `${dataInput.value}?page=${currentPage}`,
            data: { page: currentPage  },
            dataType: 'json',
            success: (response) => {

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
                            <div class="card p-3 my-3 border border-0">
                                <div class="card-header header-elements">
                                    <form id="shortcode-form">
                                        <input type="checkbox" name="selected_shortcodes" value="shortcode_id_${short_id}">
                                    </form>
                                    <img src="${faviconPath}" class="img-thumbnail favicon-img" alt="favicon.ico">
                                    <h5 class="card-title">${url_titel}</h5>
                                    <div class="card-header-elements ms-auto">
                                        <span class="d-none" id="short${short_id}">${shortUrl}</span>
                                        <button data-button="short${short_id}" type="button" class="btn btn-secondary btn-copy colorshort${short_id} btn-sm">
                                            <i class="fa-regular fa-copy"></i> copy
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
                                        <span class="short-tags"><i class="fa-solid fa-tag orb-icon"></i> ${tags.join(', ')} Tags</span>
                                    </small>
                                </div>
                            </div>
                        `;

                        // Hinzufügen des Elements zur Seite
                        shortcodeList.appendChild(shortcodeItem);

                    });

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

export default ViewShort;