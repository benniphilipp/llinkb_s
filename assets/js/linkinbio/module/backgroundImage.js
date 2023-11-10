import { clearContent, lsToast } from './lsToast';
import { getCookie } from './getCookie';

class BackgroundImage {

    constructor(){

        this.csrftoken = getCookie('csrftoken');

        // Image View
        const backgrungImgaeId = document.querySelector('#BackgroundImageJson');
        if(backgrungImgaeId){
            this.BackgroungImageView(backgrungImgaeId.value);
        }

        // Modal View
        const clickableElements = document.querySelectorAll('.backgroundImage');
        if(clickableElements){
            const self = this;
            clickableElements.forEach(function (element) {
                element.addEventListener('click', function () {
                    var dataInfo = element.getAttribute('data-crate-image');
                    self.OpenModelBackgroundImage(dataInfo);
                });
            });
        }

        // Modal Close
        const closeButtons = document.querySelectorAll('.close');
        if(closeButtons){
            const self = this;
            closeButtons.forEach(function(closeButton) {
                closeButton.addEventListener('click', function() {
                    console.log('Das Schließen-Element wurde geklickt');
                    self.CloseBackgroundModel();
                });
            });
        }

        // Cropping Image
        const cropperBackground = document.querySelector('.backgroundImageBody');
        if(cropperBackground){
            const self = this;
            document.addEventListener('change', (event) =>{
                if (event.target.id === 'image-background') {
                    self.CorppingBackgroundImage(event);
                }
            })
        }

        // Image Save
        const backgroundCreate = document.querySelector('#backgroundCreate');
        if(backgroundCreate){
            backgroundCreate.addEventListener('click', this.BackgroungCrateView.bind(this))
        }

        // Delete Iamge
        const backgroundDelete = document.querySelector('#backgroundDelete');
        if(backgroundDelete){
            backgroundDelete.addEventListener('click', this.BackgroungDelete.bind(this));
        }

    }

    // Close Modal
    CloseBackgroundModel(){
        const BackgroundCreate = document.querySelector('#backgroundCreate');
        const BackgroundDelete = document.querySelector('#backgroundDelete');
        BackgroundCreate.classList.add('d-none');
        BackgroundDelete.classList.add('d-none');
    }

    // Open Modal
    ModelBackgroundImage(){
        $('#exampleBackground').modal('show');
    }


    BackgroungCrateView(){
        const self = this;
        if(this.cropper){

            this.cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    const urlData = document.querySelector('#BackgroundImageJson');
                    
                    if (urlData) {
                        const formData = new FormData();
                        const randomFileName = `image_${Math.floor(Math.random() * 1000000)}.png`;
                        formData.append('image', blob, randomFileName);
    
                        $.ajax({
                            type: 'POST',
                            url: urlData.value,
                            enctype: 'multipart/form-data',
                            data: formData,
                            headers: {
                                'X-CSRFToken': this.csrftoken 
                            },
                            success: function(response) {
                                //console.log(response)
                                lsToast(response.message);
                                self.CloseBackgroundModel();
                                $('#exampleBackground').modal('hide');
                                self.BackgroungImageView(urlData.value);
                                self.CloseBackgroundModel();
                            },
                            error: function(error) {
                                console.log('error', error);
                            },
                            contentType: false,
                            processData: false,
                        });
                    } else {
                        console.error('Element mit ID "ImageProfileAdjustment" nicht gefunden.');
                    }
                } else {
                    console.error('Fehler beim Erstellen des Blob für das Bild.');
                }
            }, 'image/png');
        } else {
            console.error('Bild-Element nicht gefunden.');
        }

    }

    // Cropping Background Image
    CorppingBackgroundImage(event){
        const cropperContainerBg = document.getElementById('cropper-container-background');
        const imageInput = document.querySelector('#image-background');
        const img_data = imageInput.files[0];
        const url = URL.createObjectURL(img_data);

        const imageDiv = document.querySelector('#cropper-background');
        cropperContainerBg.classList.remove('d-none');

        // Das Bild mit der ID 'image' in das imageBox-Element einfügen
        cropperContainerBg.innerHTML = `<img src="${url}" id="image-bg" width="700px">`;
        const image = document.querySelector('#image-bg');

        this.cropper = new Cropper(image, {
            aspectRatio: 1125/1125,
            minCropBoxWidth: 1125,
            minCropBoxHeight: 1125,
            crop: function(event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            }
        }); 
    }

    // Open Model Add fiels
    OpenModelBackgroundImage(dataInfo){

        const BackgroundImageBody = document.querySelector('.backgroundImageBody');
        const BackgroundCreate = document.querySelector('#backgroundCreate');
        const BackgroundDelete = document.querySelector('#backgroundDelete');

        const PermanentlydeleteimageTrans = gettext('Permanently delete image.')

        if(dataInfo == 'create'){
            this.ModelBackgroundImage();
            
            BackgroundCreate.classList.remove('d-none');

            BackgroundImageBody.innerHTML = `
            <div id="cropper-container-background" class="d-none">
                <img id="cropper-background" src="" alt="Bild zum Zuschneiden">
            </div>
    
            <div class="mb-3 mt-3">
                <label for="formFile" class="form-label"></label>
                <input class="form-control" type="file" id="image-background">
            </div>
            `;

        }else{
            this.ModelBackgroundImage();

            BackgroundDelete.classList.remove('d-none');

            BackgroundImageBody.innerHTML = `
                <h6>${PermanentlydeleteimageTrans}</h6>
            `;
        }

    }

    // Delete Image
    BackgroungDelete(){
        const self = this;
        const urlData = document.querySelector('#BackgroundImageJson');
        $.ajax({
            url: urlData.value,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'X-CSRFToken': this.csrftoken 
            },
            success: (response) => {
                lsToast(response.message);
                $('#exampleBackground').modal('hide');
                self.BackgroungImageView(urlData.value);
                self.CloseBackgroundModel();
            },
            error: (error) => {
                console.log(error);
            }
        })

    }


    BackgroungImageView(DataURL){

        $.ajax({
            url: DataURL,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                
                const backgoundImage = document.querySelector('#backgroungImageMobile');
                const btnBgImageAdd = document.querySelector('.btnBgImageAdd');
                const btnBgImageRemove = document.querySelector('.btnBgImageRemove');
                const pageOne = document.querySelector('#pageOne');

                btnBgImageAdd.classList.remove('d-none');
                btnBgImageRemove.classList.remove('d-none');

                if(response[0].image == null){
                    backgoundImage.innerHTML = '<div style="height:140px;width:90px;margin-bottom:0rem;background-color:#dddddd;border-radius:5px;"></div>';
                    btnBgImageRemove.classList.add('d-none');
                }else{
                    backgoundImage.innerHTML = `
                    <div style="height:140px;width:90px;margin-bottom:0rem;background-color:#dddddd;border-radius:5px;">
                        <img style="height:140px;width:100%;margin-bottom:0rem;border-radius:5px;object-fit:cover;" src="${response[0].image}">
                    </div>
                    `;
                    btnBgImageAdd.classList.add('d-none');

                    pageOne.style.backgroundImage = `url(${response[0].image})`;
                    pageOne.style.backgroundSize = 'cover';
                    pageOne.style.backgroundRepeat = 'no-repeat';
                    pageOne.style.backgroundPosition = 'center center';
                }

            },
            error: (error) => {
                console.log(error);
            }
        });

    }


}

export default BackgroundImage;