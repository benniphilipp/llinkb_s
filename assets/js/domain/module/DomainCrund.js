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
            success: function(data) {
                console.log(data)
            },
            error: function(xhr, status, error) {
              console.error('Fehler:', status, error);
            }
          });

    }

}

export default DomainCrud;