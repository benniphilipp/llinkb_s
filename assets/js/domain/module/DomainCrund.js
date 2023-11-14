import { getCookie } from '../../linkinbio/module/getCookie';

class DomainCrud {


    // https://api.ote-godaddy.com/v1/domain

    constructor(){
        this.csrftoken = getCookie('csrftoken');
        const SerachDomainBtn = document.querySelector('#SerachDomain');
        if(SerachDomainBtn){
            SerachDomainBtn.addEventListener('click', this.DomainSearch.bind(this));
        }

        const autocompleteInput = document.querySelector('#autocomplete');
        if (autocompleteInput) {
            const self = this;
            autocompleteInput.addEventListener('input', function(event) {
                const value = event.target.value;
                self.AutocompleteLts(value);
            });
        }

    }




    AutocompleteLts() {

        this.autocompleteInstance = new Autocomplete('#autocomplete', {
            search: input => {
                if (input.length < 1) {
                    return Promise.resolve([]);
                }
    
                const DataURL = document.querySelector('#SearchDomainView').value;

                return fetch(DataURL, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': this.csrftoken,
                    },
                })
                .then(response => response.json())
                .then(data => {
                    // Extrahiere die relevanten Daten für Autocomplete
                    const autocompleteData = data.map(item => item.name); // Passe dies entsprechend deiner Datenstruktur an
                    // return autocompleteData;

                    const filteredData = autocompleteData.filter(item => {
                        return item.toLowerCase().includes(input.toLowerCase());
                    });
    
                    return filteredData;

                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der Daten:', error);
                    return [];
                });
            },

            getResultValue: result => result,


        });
    }
    



    DomainSearch(){
        
        const SearchValue = document.querySelector('#SearchValue').value;

        const tlsValue = document.querySelector('#tls').value;

        const SearchDomainView = document.querySelector('#SearchDomainView');
        const DataURL = SearchDomainView.value;
        
        const fd = new FormData();
        fd.append('url', SearchValue);
        fd.append('lts', tlsValue);

        $.ajax({
            url: DataURL,
            type: 'POST',
            dataType: 'json',
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRFToken': this.csrftoken,
            },
            success: (data) => {
                console.log(data);
            },
            error: (error) => {
                console.log(error);
            }
        });

    }


    Test(){

        $.ajax({
            url: 'http://127.0.0.1:8000/domain/list/',
            type: 'GET',
            dataType: 'json', // Wenn Ihre Ansicht JSON zurückgibt
            success: (response) => {
                //console.log(response);

                setTimeout(()=>{

                    const domainText = document.querySelector('#domainText');
                    domainText.classList.add('d-none');

                    const waitImage = document.querySelector('#waitImage');
                    waitImage.classList.add('d-none');

                    const domainContainer = document.querySelector('#domainContainer');
                    domainContainer.classList.remove('d-none');

                    const table = document.getElementById("domainTable");
                    const domains = response;
                    
                    domains.forEach((domainData) => {
                        const row = table.insertRow(-1);
                        const domainCell = row.insertCell(0);
                        domainCell.innerHTML = domainData.domain; // Hier den Domänennamen einfügen
    
                        // Verfügbarkeits-Spalte
                        const availabilityCell = row.insertCell(1);
                        availabilityCell.innerHTML = "Verfügbar";
    
                        // Button-Spalte
                        const actionCell = row.insertCell(2);
                        const button = document.createElement("button");
                        button.type = "button";
                        button.className = "btn btn-primary btn-sm";
                        button.textContent = "Aktion ausführen";
                        actionCell.className = "d-flex justify-content-start";
                        actionCell.appendChild(button);

                    });
                }, 2000)


            },
            error: (error) => {
              console.error('Fehler:', error);
            }
          });

    }

}

export default DomainCrud;