
class DomainCheckout {

    constructor(){

        const dataUrl = document.querySelector('#DomainCheckoutView');

        if(dataUrl){
            this.ShoppingCard(dataUrl.value);
        }
        
    }

    ShoppingCard(dataUrl){
        $.ajax({
            url:dataUrl,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
    
                const data = response.data;
                const total_price = response.total_price;
                const shopping_id = response.shopping_id;
                const tax_price = response.tax_price;
                const email = response.email;
                const url = response.url;

                const priceCalculate = document.querySelector('#priceCalculate');
                const priceDiv = document.createElement('div');

                priceDiv.innerHTML = `
                    <hr class="m-0 p-0">
                    <div class="d-flex justify-content-between align-items-baseline px-2 mt-3">
                        <span class="fs-5">Tax</span>
                        <span class="fs-5">20 %</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-baseline px-2">
                        <span class="fs-5">Summe</span>
                        <span class="fs-5">${total_price}</span>
                        <div id="dataShoppingId" data-shopping-id="${shopping_id}" class="d-none"></div> 
                        <div id="userEmail" data-user-email="${email}" class="d-none"></div> 
                        <div id="UrlData" data-url="${url}" class="d-none"></div> 
                    </div>
                `;

                priceCalculate.appendChild(priceDiv);


                const shoppingCardValues = document.querySelector('#shoppingCardValues');

                    data.forEach(element => {
                        const domainDiv = document.createElement('div');
                        domainDiv.innerHTML = `
                            <div class="shopping-card d-flex w-100 mt-3">
                                <div class="domain-icon d-flex align-items-center">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <div class="domain-card d-flex flex-column w-100 mx-3">
                                    <span><h5>${element.card__products__domain}</h5></span>
                                    <span><small>.AT Domain Registration</small></span>
                                    <span><small>1 Year</small></span>
                                    <div class="price d-flex justify-content-between w-100 align-items-center">
                                        <small>Renews ${element.date} for</small>
                                        <span class="price_normal">${element.card__products__price}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                        shoppingCardValues.appendChild(domainDiv);
                    });

                }

        });
    }

}

export default DomainCheckout;