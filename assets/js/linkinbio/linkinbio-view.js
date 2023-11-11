
class LinkInBioView {
    constructor(){
        
        const dataUrl = document.querySelector('#LinkInBioDeatilePage');
        if(dataUrl){
            this.ajaxView(dataUrl);
        }
    }


    ajaxView(dataUrl){
        let image;
        const self = this;
        $.ajax({
            url: dataUrl.value,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
            //console.log(data)
            
            $('#descriptionPageValue').text(data.context_json.description);
            $('#titelpageValue').text(data.context_json.title);

            // Rendern der URL-Social-Profile
            const urlSocialProfilesContainer = $('#urlSocialProfilesContainer');
            urlSocialProfilesContainer.empty();


            data.social_media_data.forEach((profile) => {
                const profileElement = `
                <li>
                    <a href="${profile.url}">
                        <i class="fa-brands ${profile.platform}"></i>
                    </a>
                </li>
                `;
                urlSocialProfilesContainer.append(profileElement);
            });
            
            // Rendern der Link-in-Bio-Links
            const linkInBioLinksContainer = $('#linkInBioLinksContainer');
            linkInBioLinksContainer.empty();
            
            data.links.forEach((link) => {

                if(link.image){
                    image = `<img class="img-fluid-shortcode" src="${link.image}"
                    style="
                    position: absolute;
                    left: 0.4rem;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 2rem;
                    width: 2rem;
                    object-fit: cover;
                    object-position: center;
                    ">`
                }else{
                    image = '';
                }

                const linkElement = `
                    <a class="link-page-btn link-btn-color position-relative" href="${link.url_destination}">${image}${link.button_label}</a>
                `;
                linkInBioLinksContainer.append(linkElement);
            });

            //Image
            const pageImage = document.querySelector('.page-image');
            const newImageUrl = data.image[0].profile_image;
            if(newImageUrl){
                pageImage.src = newImageUrl;
            }

        
            // Background Image
            const bg_image = data.image_bg[0].image_bg;
            if(bg_image){
                
                self.handleBlurEffect(bg_image);

                const pageOne = document.querySelector('#pageOne');
                pageOne.style.backgroundImage = `url(${bg_image})`;
                pageOne.style.backgroundSize = 'cover';
                pageOne.style.backgroundRepeat = 'no-repeat';
                pageOne.style.backgroundPosition = 'center center';
                pageOne.style.zIndex = '99'; 
            }

            const cssStyles  = data['settings_json_data'];


            for (const className in cssStyles) {
                const elementInfo = cssStyles[className];
                const elements = document.getElementsByClassName(className);
            
                for (const element of elements) {
                    const defaultStyles = elementInfo.default;
                    for (const styleName in defaultStyles) {
                        element.style[styleName] = defaultStyles[styleName];
                    }
            
                    // Fügen Sie den Hover-Effekt hinzu
                    element.addEventListener('mouseenter', () => {
                        const hoverStyles = elementInfo.hover;
                        if (hoverStyles) {
                            for (const styleName in hoverStyles) {
                                element.style[styleName] = hoverStyles[styleName];
                            }
                        }
                    });

                    // Entfernen Sie den Hover-Effekt
                    element.addEventListener('mouseleave', () => {
                        for (const styleName in defaultStyles) {
                            element.style[styleName] = defaultStyles[styleName];
                        }
                    });
            
                    // Prüfen, ob mobile Stile verfügbar sind und den Bildschirm überwachen
                    const mobileStyles = elementInfo.mobile;
                    
                    if (mobileStyles) {
                        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Hier an die gewünschte Bildschirmbreite anpassen
                        const applyMobileStyles = () => {
                            for (const styleName in mobileStyles) {
                                element.style[styleName] = mobileStyles[styleName];
                            }
                        };
            
                        if (mediaQuery.matches) {
                            applyMobileStyles(); // Wenn die Bildschirmgröße passt, wende mobile Stile an
                        }
            
                        mediaQuery.addListener((e) => {
                            if (e.matches) {
                                applyMobileStyles();
                            } else {
                                // Wenn der Bildschirm größer ist, wende die Standardstile an
                                for (const styleName in defaultStyles) {
                                    element.style[styleName] = defaultStyles[styleName];
                                }
                            }
                        });
                    }
                }
            }

            },
            error: function(error) {
              console.error('Fehler beim Abrufen der Daten: ' + error);
            }
        });
    }


    handleBlurEffect(bg_image) {
        console.log('run');
        const pageUserBg = document.querySelector('#pageUserBg');
        const viewportWidth = window.innerWidth;
    
        if (viewportWidth >= 168) {
            if (pageUserBg) {
                pageUserBg.style.backgroundImage = `url(${bg_image})`;
                pageUserBg.style.backgroundSize = 'cover';
                pageUserBg.style.backgroundRepeat = 'no-repeat';
                pageUserBg.style.backgroundPosition = 'center center';
                pageUserBg.style.filter = 'blur(4px)';
                pageUserBg.style.zIndex = '0';
                pageUserBg.style.position = 'absolute';
                pageUserBg.style.height = '100%';
                pageUserBg.style.width = '100%';
            }
        } else {
            if (pageUserBg) {
                pageUserBg.style.backgroundImage = 'none';
                pageUserBg.style.filter = 'none';
                pageUserBg.style.backgroundSize = 'none';
                pageUserBg.style.backgroundRepeat = 'none';
                pageUserBg.style.backgroundPosition = 'none';
                pageUserBg.style.filter = 'none';
                pageUserBg.style.zIndex = 'none';
                pageUserBg.style.position = 'none';
                pageUserBg.style.height = 'none%';
                pageUserBg.style.width = 'none';
            }
        }
    }
      

}

export default LinkInBioView;

const linkinbioview = new LinkInBioView();
// window.addEventListener('resize', linkinbioview.handleBlurEffect);

window.addEventListener('resize', () => {
    linkinbioview.ajaxView(document.querySelector('#LinkInBioDeatilePage'));
  });