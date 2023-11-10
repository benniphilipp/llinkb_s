import { getCookie } from './getCookie';
import profileImageView from '../../linkinbio/module/adjustmentViewImg';
import { clearContent, lsToast } from './lsToast';

class adjustmentRemoImg {

    constructor(){
        this.csrftoken = getCookie('csrftoken');
        this.event();
    }

    event(){
        const openModelDelte = document.querySelector('#openModelDelte');
        if(openModelDelte){
            openModelDelte.addEventListener('click', (event) => {
                this.openDeleteModalImage(event);
            });
        }
        const imageProfileDeleteBtn = document.querySelector('#imageProfileDeleteBtn');
        if(imageProfileDeleteBtn){
            imageProfileDeleteBtn.addEventListener('click', (event) => {
                this.profileImageDelete(event);
            });
        }
    }

    openDeleteModalImage(){
        console.log('Run Model');
        $('#exampleModalImageDelete').modal('show');
    }

    profileImageDelete(event){

        const urlData = document.querySelector('#DeleteImageAdjustmentView');
        const profileImageValue = document.querySelector('#ProfileImageDetailView')?.value || '';
        const self = this;
        $.ajax({
            type: 'POST',
            url: urlData.value,
            enctype: 'multipart/form-data',
            headers: {
                'X-CSRFToken': this.csrftoken 
            },
            success: function(response) {
                

                self.profileImage = new profileImageView();
                self.profileImage.profileImageView(profileImageValue);

                const pageImage = document.querySelector('.page-image');
                const profileImage = document.querySelector('#profileImage');

                const profileImageSrc = document.querySelector('#ImageProfilePlacholder').value;

                pageImage.src = profileImageSrc;
                profileImage.src = profileImageSrc; 
                lsToast(response.message);
                $('#exampleModalImageDelete').modal('hide');
                

            },
            error: function(error) {
                console.log('error', error);
            },
            contentType: false,
            processData: false,
        });
    }

}

export default adjustmentRemoImg;