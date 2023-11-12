import { getCookie } from '../linkinbio/module/getCookie';
import { clearContent, lsToast } from '../linkinbio/module/lsToast';

class Recommended {
    constructor(){
        this.csrftoken = getCookie('csrftoken');
        this.events();
    }

    events(){
        const recommendedForm = document.querySelector('#recommendedForm');
        if(recommendedForm){
            recommendedForm.addEventListener('submit', (event) => {
                this.Save(event);
            });
        }

        const openModel = document.querySelector('#openModelInfo');
        if(openModel){
            openModel.addEventListener('click', this.openModelInfo.bind(this));
        }

        const CloseInfo = document.querySelector('#CloseInfo');
        if(CloseInfo){
            CloseInfo.addEventListener('click', this.closeModelInfo.bind(this));
        }

    }


    RecommendedInfo(){

        const dataURL = document.querySelector('#RecommendationView');

        $.ajax({
            url: dataURL.value,
            type: 'GET',
            dataType: 'json',
            success: (data) => {

                const table = document.getElementById("RecommendedInfo");
                const tbody = table.getElementsByTagName('tbody')[0];

                for (const row of data.recommendation) {
                    const newRow = tbody.insertRow(tbody.rows.length);
                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);
                    cell1.innerHTML = row.email;
                    // cell2.innerHTML = row.status;

                    if (row.status === true) {
                        cell2.innerHTML = 'Confirmed';
                    } else if (row.status === false) {
                        cell2.innerHTML = 'Not confirmed';
                    } else {
                        cell2.innerHTML = 'Unknown';
                    }

                }


            },
            error: (error) => {
                console.error('Fehler beim Abrufen der Daten: ' + error);
            }
        });

    }



    Save(event){
        event.preventDefault();

        const dataUrl = document.querySelector('#RecommendationSend');
        const UserRecommend = document.querySelector('#UserRecommend');
        const emailHelp = document.querySelector('#emailHelp');

        const formData = new FormData();
        formData.append('email', UserRecommend.value);

        $.ajax({
            url: dataUrl.value,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRFToken': this.csrftoken, 
            },
            success: (data) => {
                console.log(data.success)

                if(data.success == true){

                    lsToast(data.message);
                    UserRecommend.value = '';
                    emailHelp.classList.remove('text-muted');
                    emailHelp.classList.add('text-success');
                    emailHelp.innerHTML = 'Thank you, as soon as the user has confirmed and you can use everything free of charge for 1 year.';
            
                    setTimeout(() => {
                        emailHelp.classList.add('text-muted');
                        emailHelp.classList.remove('text-success');
                        emailHelp.innerHTML = 'Recommend us and you will receive all functions free of charge for 1 year.';
                    }, 2000);

                }else{

                    lsToast(data.message);
                    UserRecommend.value = '';
                    emailHelp.classList.remove('text-muted');
                    emailHelp.classList.add('text-danger');
                    emailHelp.innerHTML = 'We re sorry, this user is already executing.';

                    setTimeout(() => {
                        emailHelp.classList.add('text-muted');
                        emailHelp.classList.remove('text-success');
                        emailHelp.innerHTML = 'Recommend us and you will receive all functions free of charge for 1 year.';
                    }, 2000);

                }
                


            },
            error: (xhr, textStatus, errorThrown) => {
                console.error('Fehler bei der Ajax-Anfrage:', errorThrown);
            }
        });
    }


    openModelInfo(){
        $('#exampleModal').modal('show');
        this.RecommendedInfo();
    }

    closeModelInfo(){
        $('#exampleModal').modal('hide') 
    }


}
export default Recommended;

const recommended = new Recommended();