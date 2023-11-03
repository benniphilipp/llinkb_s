


//Class
// LimitationShort
// GeoTargetingShort
// AndroidShort
// IosShort
// TagsShort
// ArchiveShort
// ShortcodeShort
// AnalyticsDashboardShort


import ViewShort from './module/ViewShort';
document.addEventListener('DOMContentLoaded', function() {
    // ViewShort
    const viewShort = new ViewShort();
});

//Open CreateForm
export function OpenSortcodeForm(){
    const asideForm = document.querySelector('#aside-form');
    const archiveBtn = document.querySelector('#archive-btn');
    const updateFormShortcode = document.querySelector('#update-form-shortcode');
    const openForm = document.querySelector('#openForm');
    const overlayOpen = document.querySelector('#overlay-open');
    const pillsProfileTab = document.querySelector('#pills-profile-tab');
    const limitationForm = document.querySelector('#limitation-form');
    const mobileTab = document.querySelector('#mobile-tab');
    const iosTargetingFrom = document.querySelector('#ios-targeting-from');
    const androidTargetingForm = document.querySelector('#android-targeting-form');
    const geoTargetingTab = document.querySelector('#geo-targeting-tab');
    const geoTargetingForm = document.querySelector('#geo-targeting-form');

    asideForm.classList.add('toggle');
    archiveBtn.classList.add('d-none');
    updateFormShortcode.classList.add('d-none');
    openForm.classList.add('disabled');
    overlayOpen.classList.add('overlay-open');

    pillsProfileTab.classList.add('disabled');
    limitationForm.display = 'none';

    mobileTab.classList.add('disabled');
    iosTargetingFrom.display = 'none';
    androidTargetingForm.display = 'none';

    geoTargetingTab.classList.add('disabled');
    geoTargetingForm.display = 'none';

}

const openForm = document.querySelector('#openForm');
if(openForm){
    openForm.addEventListener('click', OpenSortcodeForm);
}


export function CloseShortcodeForm(){

    const asideForm = document.querySelector('#aside-form');
    const archiveBtn = document.querySelector('#archive-btn');
    const updateFormShortcode = document.querySelector('#update-form-shortcode');
    const openForm = document.querySelector('#openForm');
    const overlayOpen = document.querySelector('#overlay-open');
    const pillsProfileTab = document.querySelector('#pills-profile-tab');
    const limitationForm = document.querySelector('#limitation-form');
    const mobileTab = document.querySelector('#mobile-tab');
    const iosTargetingFrom = document.querySelector('#ios-targeting-from');
    const androidTargetingForm = document.querySelector('#android-targeting-form');
    const geoTargetingTab = document.querySelector('#geo-targeting-tab');
    const geoTargetingForm = document.querySelector('#geo-targeting-form');
    const shortcodeId = document.querySelector('#shortcode_id');

    asideForm.classList.remove('toggle');
    archiveBtn.classList.remove('d-none');
    updateFormShortcode.classList.remove('d-none');
    openForm.classList.remove('disabled');
    overlayOpen.classList.remove('overlay-open');
    shortcodeId.innerHTML = '';

    pillsProfileTab.classList.remove('disabled');
    limitationForm.display = 'block';

    mobileTab.classList.remove('disabled');
    iosTargetingFrom.display = 'block';
    androidTargetingForm.display = 'block';

    geoTargetingTab.classList.remove('disabled');
    geoTargetingForm.display = 'block';

    const url_destination = document.getElementById('id_url_destination');
    const url_titel = document.getElementById('id_url_titel');
    const idShort = document.getElementById('id_shortcode');
    const updateShortcodeUrl = document.querySelector('#update-shortcode-url');

    url_destination.value = '';
    url_titel.value = '';
    idShort.value = '';
    updateShortcodeUrl.value = '';
    shortcodeId.innerHTML = '';

}

const closeForm = document.querySelector('#closeForm');
if(closeForm){
    closeForm.addEventListener('click', CloseShortcodeForm);
}