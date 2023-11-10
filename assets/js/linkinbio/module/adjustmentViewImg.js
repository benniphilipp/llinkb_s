class adjustmentViewImg{

    constructor(){
        this.profileImageValue = document.querySelector('#ProfileImageDetailView')?.value || '';
        this.event();
    }

    event(){
        if (this.profileImageValue) {
            this.profileImageView(this.profileImageValue);
        }
    }

    profileImageView(valueUrl){
        const profileImage = document.getElementById('profileImage');
        const pageImage = document.querySelector('.page-image');

        $.ajax({
            url: valueUrl,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                const openModelButton = document.querySelector('#openMoadlImage');
                const openModelDelte = document.querySelector('#openModelDelte');

                openModelButton.classList.remove('d-none');
                openModelDelte.classList.remove('d-none');
                
                const newImageUrl = data[0].profile_image;
                if(newImageUrl){
                    profileImage.src = newImageUrl;
                    pageImage.src = newImageUrl;
                    openModelButton.classList.add('d-none');
                }else{
                    openModelDelte.classList.add('d-none');
                }

            },
            error: (xhr, textStatus, errorThrown) => {
              console.error('Fehler:', errorThrown);
            }
          });
    }


}

export default adjustmentViewImg;
