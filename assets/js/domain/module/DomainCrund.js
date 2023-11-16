import { getCookie } from '../../linkinbio/module/getCookie';
import { clearContent, lsToast } from '../../linkinbio/module/lsToast';


class DomainCrud {

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

        const self = this;
        const domainContainer = document.querySelector('#domainContainer');
        if(domainContainer){
            domainContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('addShoppingCard')) {
                    const clickedListItem = event.target;
                    const dataDomainPrice = clickedListItem.getAttribute('data-domain-price');
                    const dataDomain = clickedListItem.getAttribute('data-domain');
                    self.AddWishlist(dataDomainPrice, dataDomain);
                }
              });
        }

        // Trash Domain Wishlist
        const TrashDomain = document.querySelector('#ShoppingTrash');
        if(TrashDomain){

            // View Wishlist
            this.ViewWishlist();

            TrashDomain.addEventListener('click', function (event) {
                if (event.target.classList.contains('trash-domain')) {
                    const clickedListItem = event.target;
                    const dataDomainTrash = clickedListItem.getAttribute('data-trash-domain');
                    self.RemoveWishlist(dataDomainTrash);
                }
            });
        }

        // Open Chackout
        const OpenShopping = document.querySelector('#OpenShopping');
        if(OpenShopping){
            OpenShopping.addEventListener('click', this.OpenChackout.bind(this));
        }


        // CheckUser Crate ShoppingCard

        // CheckUserCrateShoppingCard
        const FormSubmit = document.querySelector('#FormSubmit');
        if(FormSubmit){
            FormSubmit.addEventListener('click', this.CheckUserCrateShoppingCard.bind(this))
        }

        //
        const inputFields = document.querySelectorAll('.form-control');
        if (inputFields) {
            inputFields.forEach(inputField => {
                inputField.addEventListener('input', this.handleKeyPress.bind(this));
            });
        }


        //https://app.vatcheckapi.com/api-keys


    }


    CheckUserCrateShoppingCard(event){
        event.preventDefault();
        const dataURL = document.querySelector('#CrateSubaccountAndShoppingCard').value;

        const FormSubmit = document.querySelector('#FormSubmit');
        FormSubmit.disabled = true;
        
        const emailInput = document.getElementById('email');
        const addressInput = document.getElementById('address');
        const zipCodeInput = document.getElementById('zip_code');
        const cityInput = document.getElementById('city');
        const firstNameInput = document.getElementById('firstname');
        const lastNameInput = document.getElementById('lastname');
        const passwort = document.querySelector('#passwort');

        const element = document.getElementById('FormSubmit');
        const wishlistId = element.getAttribute('data-wishlist-id');
        console.log(wishlistId)

        const fd = new FormData();
        fd.append('email', emailInput.value);
        fd.append('address', addressInput.value);
        fd.append('zip_code', zipCodeInput.value);
        fd.append('city', cityInput.value);
        fd.append('firstname', firstNameInput.value);
        fd.append('lastname', lastNameInput.value);
        fd.append('passwort', passwort.value);
        fd.append('wishlistId', wishlistId);

        $.ajax({
            url:dataURL,
            type: 'POST',
            data: fd,
            dataType: 'json',
            headers: {
                'X-CSRFToken': this.csrftoken,
            },
            success: (data) => {
                console.log(data)

                if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    // Handle other responses if needed
                }

            },
            error: (error) => {
                console.log(error)
            },
            cache: false,
            contentType: false,
            processData: false,
        })

    }


    //
    handleKeyPress(event) {
        const inputId = event.target.id;
        const inputValue = event.target.value.trim();
        const FormSubmit = document.querySelector('#FormSubmit');

        if (!inputValue) {
            // Füge eine CSS-Klasse hinzu, um leere Felder zu markieren
            event.target.style.border = '1px solid red';
        } else {
            // Entferne die CSS-Klasse, wenn das Feld einen Wert hat
            event.target.style.border = '1px solid #ced4da';
        }


        // Überprüfe alle Eingabefelder auf leere Werte
        const inputFields = document.querySelectorAll('.field-shop');

        let areAllFieldsFilled = true;

        for (const field of inputFields) {
            if (field.value.trim() === '' || field.value === null) {
                areAllFieldsFilled = false;
                break;
            }
        }

        // Aktualisiere den Status des Formular-Submit-Buttons basierend auf den leeren Feldern
        if (areAllFieldsFilled) {
            FormSubmit.disabled = false;
        } else {
            FormSubmit.disabled = true;
        }


    }


    // Open Chackout
    OpenChackout(event){
        event.preventDefault();
        $('#exampleOpenShopping').modal('show');

        const dataURL = document.querySelector('#CrateSubaccountAndShoppingCard').value;

        $.ajax({
            url: dataURL,
            type: 'GET',
            dataType: 'json',
            success: (data) => {

                const emailInput = document.getElementById('email');
                const addressInput = document.getElementById('address');
                const zipCodeInput = document.getElementById('zip_code');
                const cityInput = document.getElementById('city');
                const firstNameInput = document.getElementById('firstname');
                const lastNameInput = document.getElementById('lastname');

                emailInput.value = data[0].email;
                addressInput.value = data[0].address;
                zipCodeInput.value = data[0].zip_code;
                cityInput.value = data[0].city;
                firstNameInput.value = data[0].first_name;
                lastNameInput.value = data[0].last_name;

                // const idMapping = {
                //     'email': 'email',
                //     'address': 'address',
                //     'zip_code': 'zip_code',
                //     'city': 'city',
                //     'firstname': 'firstname_',
                //     'lastname': 'lastname_'
                // };
                
            },
            error: (error) => {
                console.log(error);
            }
        });

    }

    // View Wishlist
    ViewWishlist(){

        const DataURL = document.querySelector('#AddWishlistView').value;
        $.ajax({
            url:DataURL,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                
                const element = document.getElementById('FormSubmit');
                element.setAttribute('data-wishlist-id', data[0].wishlist_id);

                const ShoppingTrash = document.querySelector('#ShoppingTrash');

                while (ShoppingTrash.firstChild) {
                    ShoppingTrash.removeChild(ShoppingTrash.firstChild);
                }

                data.forEach(wishlistData => {
                    const wishlistDiv = document.createElement('div');
                    wishlistDiv.innerHTML = `
                    <div class="shopping-card d-flex w-100 mt-3">
                        <div class="domain-icon d-flex align-items-center">
                            <i class="fa-solid fa-globe"></i>
                        </div>
                        <div class="domain-card d-flex flex-column w-100 mx-3">
                            <span><h5>${wishlistData.product}</h5></span>
                            <span><small>.AT Domain Registration</small></span>
                            <span><small>1 Year</small></span>
                            <div class="price d-flex justify-content-between w-100 align-items-center">
                                <small>Renews ${wishlistData.date} for</small>
                                <span class="price_normal">${wishlistData.price}</span>
                                <span><i class="fa-solid fa-trash-can trash-domain" data-trash-domain="${wishlistData.id}"></i></span>
                            </div>
                        </div>
                    </div>

                    `;
                    ShoppingTrash.appendChild(wishlistDiv)
                });

                

            },
            error: (error) => {
                console.log(error);
            }
        })

    }


    // Remove Wishlist Card
    RemoveWishlist(dataDomainTrash){
        console.log(dataDomainTrash)
        const self = this;
        const DataDelete = document.querySelector('#AddWishlistView').value;
        const deleteUrl = `${DataDelete}?id=${dataDomainTrash}`;

        $.ajax({
            url: deleteUrl,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'X-CSRFToken': this.csrftoken,
                'Content-Type': 'application/json',
            },
            success: (data) => {
                self.ViewWishlist();
                lsToast(data.message);
            },
            error: (error) => {
                console.log(error);
            },
            cache: false,
            contentType: false,
            processData: false,
        });

    }

    // Add Wishlist Card
    AddWishlist(dataDomainPrice, dataDomain){
        const self = this;
        const DataUrl = document.querySelector('#AddWishlistView').value;

        const fd = new FormData();
        fd.append('price', dataDomainPrice);
        fd.append('domain', dataDomain)

        $.ajax({
            url: DataUrl,
            type: 'POST',
            data: fd,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRFToken': this.csrftoken,
            },
            success: (data) => {
                self.ViewWishlist();
                lsToast(data.success);
            },
            error: (error) => {
                console.log(error);
            }
        })

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
    
    // Suche
    DomainSearch(){
        
        const domainContainer = document.querySelector('#domainContainer');

        while (domainContainer.firstChild) {
            domainContainer.removeChild(domainContainer.firstChild);
        }

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
                console.log(data)

                if(data.data_available.available == true){

                    const domainData = data.data_available;

                    const parts = domainData.price.toString().split('.');
                    const euros = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    const cents = parts[1] ? ',' + parts[1] : ',00';

                    domainContainer.innerHTML = `
                    <div class="card shadow-sm p-2 mt-3 ${domainData.domain? 'border-success' : 'border-0'}">
                        <div class="card-body">

                            <div class="d-flex justify-content-between align-items-center">
                                <div class="domain-div d-flex flex-column">
                                    <span class="premium">PREMIUM</span>
                                    <span data-domain="${domainData.domain}" class="domain">${domainData.domain}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="domain-price d-flex flex-column">
                                        <span class="price">${euros + cents + ' €'}</span>
                                        <span class="time">for first year</span>
                                    </div>
                                    <div class="domain-shop d-flex align-items-center addShoppingCard">
                                        <i class="fa-solid fa-cart-plus addShoppingCard" data-domain-price="${domainData.price}" data-domain="${domainData.domain}"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    `;

                }else{

                    const domainData = data.data_available;
                    domainContainer.innerHTML = `
                    <div class="card ${domainData.domain? 'border-danger' : 'border-0'} shadow-sm p-2">
                        <div class="card-body">

                            <div class="d-flex justify-content-between align-items-center">
                                <div class="domain-div d-flex flex-column">
                                    <span class="premium">PREMIUM</span>
                                    <span data-domain="${domainData.domain}" class="domain">${domainData.domain}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="domain-price d-flex flex-column">
                                        DOMAIN TAKEN
                                    </div>
                                    <div class="domain-shop d-flex align-items-center NoShopping">
                                        <i class="fa-solid fa-ban"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    `;

                }


                data.available_domains.forEach(domainData => {
                    // Erstelle ein neues Div-Element für jede Domain
                    const domainDiv = document.createElement('div');

                    const parts = domainData.price.toString().split('.');
                    const euros = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    const cents = parts[1] ? ',' + parts[1] : ',00';
                
                    // Fülle das Div-Element mit den Informationen der Domain
                    domainDiv.innerHTML = `
                    <div class="card shadow-sm p-2 mt-3 ${domainData.domain? 'border-success' : 'border-0'}">
                        <div class="card-body">

                            <div class="d-flex justify-content-between align-items-center">
                                <div class="domain-div d-flex flex-column">
                                    <span class="premium">PREMIUM</span>
                                    <span data-domain="${domainData.domain}" class="domain">${domainData.domain}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="domain-price d-flex flex-column">
                                        <span data-domain-price="${domainData.price}" class="price">${euros + cents + ' €'}</span>
                                        <span class="time">for first year</span>
                                    </div>
                                    <div class="domain-shop d-flex align-items-center">
                                        <i class="fa-solid fa-cart-plus addShoppingCard" data-domain-price="${domainData.price}" data-domain="${domainData.domain}"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    `;
                
                    domainContainer.appendChild(domainDiv);
                });


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




// setTimeout(() => {
//     data.forEach(item => {
//         // Jetzt kannst du auf die Schlüssel-Wert-Paare jedes Objekts zugreifen
//         const keysToCheck = ['firstname_', 'lastname_', 'email', 'address', 'zip_code', 'city'];

//         keysToCheck.forEach(key => {
//             if (item[key] === null || item[key] === undefined) {

//                 const inputValue = item[key] || '';

//                 const inputId = idMapping[key];
//                 const inputElement = document.getElementById(key);

//                 if (inputElement) {
                
//                     if (!inputValue.trim()) {
//                         // Füge eine CSS-Klasse hinzu, um leere Felder zu markieren
//                         inputElement.style.border = '1px solid red';
//                     } else {
//                         // Entferne die CSS-Klasse, wenn das Feld einen Wert hat
//                         inputElement.style.border = '1px solid #ced4da'
//                     }
//                 }

//             }
//         });
//     });
// })