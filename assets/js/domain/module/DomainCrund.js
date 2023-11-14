class DomainCrud {


    // https://api.ote-godaddy.com/v1/domain

    constructor(){
        this.Test();
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