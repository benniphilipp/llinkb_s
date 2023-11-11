
import { getCookie } from '../../linkinbio/module/getCookie';
import { clearContent, lsToast } from '../../linkinbio/module/lsToast';

class ShortcodeTags {
    constructor(){
        this.csrftoken = getCookie('csrftoken');
        this.EventTags();
        this.LoadTags();
    }

    EventTags(){
        //Tags Model
        const exampleModal = document.querySelector('#exampleModal');
        if(exampleModal){
            exampleModal.addEventListener('click', function(){
                const modelFormTag = document.querySelector('#model-form-tag');
                modelFormTag.classList.add('active');
            });
        }

        // Tags Create
        const createTagButton = document.querySelector('#createTagButton');
        if(createTagButton){
            createTagButton.addEventListener('click', this.CrateShortcodeTags.bind(this));
        }

        // View List
        const tagEdit = document.querySelector('#tag-edit');
        if(tagEdit){
            tagEdit.addEventListener('click', this.EditTagsView.bind(this))
        }

        // Edit Tags
        const self = this;
        const tagListEdit = document.getElementById('tag-list-edit');

        if(tagListEdit){
            tagListEdit.addEventListener('click', function (event) {
                if (event.target.classList.contains('edit-tag-button')) {
                  const tagItem = event.target;
                  const tagId = tagItem.getAttribute('data-tag-id');
                  self.EditTags(tagId);
                }
              });
        }

        // Tags Model Close
        const tagClose = document.querySelector('#tag-close');
        if(tagClose){
            tagClose.addEventListener('click', this.TagModelClose.bind(this));
        }

        // Delete Tag
        if(tagListEdit){
            tagListEdit.addEventListener('click', function (event) {
                if (event.target.classList.contains('delete-tag-button')) {
                  const tagItem = event.target;
                  const tagId = tagItem.getAttribute('data-tag-id');
                  self.DeleteTag(tagId);
                }
            });
        }


    }

    // Delete Tag
    DeleteTag(tagId){

        const urlData = document.getElementById('tag_delete').value.replace(/0/g, tagId);

        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                'X-CSRFToken': this.csrftoken,
            },
            success: (response) => {
                console.log(response);
                lsToast(response.message);
                this.LoadTags();
                this.EditTagsView();
            },
            error: (error) => {
                console.log(error);
            }
        });
    }


    // Tag Model Close
    TagModelClose(){

        const form_tag_view = document.querySelector('.form-tag-view');
        const tagListEdit = document.querySelector('#tag-list-edit');
        const id_name = document.querySelector('#id_name');
        const tagEdit = document.querySelector('#tag-edit');
        const icon_modal_right = document.querySelector('.icon-modal-right');
        const modelFormTag = document.querySelector('#model-form-tag');


        const editDelete = gettext('Delete or edit tags');

        form_tag_view.style.display = 'block';
        tagListEdit.style.display = 'none';
        id_name.value = '';
        tagEdit.innerHTML = `<span id="tag-edit">${editDelete}</span>`;
        icon_modal_right.style.display = 'block';
        modelFormTag.classList.remove('active');

    }

    // Edit Tags
    EditTags(tagId){

        const tagName = document.querySelector('#tag-value'+tagId).value;
        const urlData = document.getElementById('tag_edit').value.replace(/0/g, tagId);
        console.log(urlData)

        $.ajax({
            type: 'POST',
            url: urlData,
            headers: {
                'X-CSRFToken': this.csrftoken,
            },
            data: {
                tag_name: tagName,
            },
            success: (response) => {

                lsToast(response.message);
                this.LoadTags();
            },
            error: (error) => {
                console.log(error);
            }
        })

    }

    // Edit Tags
    EditTagsView(){
        const ifUrl = document.querySelector('#TagListView');

        if(ifUrl){

            const dataURL = ifUrl.value;

            const form_tag_view = document.querySelector('.form-tag-view');
            const tag_list_edit = document.querySelector('#tag-list-edit');
            const icon_modal_right = document.querySelector('.icon-modal-right');
            const tagEdit = document.querySelector('#tag-edit');
            
            form_tag_view.style.display = 'none'; 
            tag_list_edit.style.display = 'block';
            icon_modal_right.style.display = 'none'; 
            tagEdit.innerHTML = '';
    
            const deleteTrans = gettext('delete');
            const saveChanges = gettext('save Changes');
    
            $.ajax({
               url: dataURL,
               method: 'GET',
               success: (response) => {
                const tags = response.tags;
                let tagOptions = '';
    
                tags.forEach(tag => {
    
                    tagOptions += `
                    <div class="input-group mb-3" id="tag-${tag.id}">
                        <input type="text" class="form-control" id="tag-value${tag.id}" value="${tag.name}" placeholder="">
                        <button class="btn btn-outline-danger delete-tag-button" type="button" data-tag-id="${tag.id}">${deleteTrans}</button>
                        <button class="btn btn-outline-primary edit-tag-button" type="button" data-tag-id="${tag.id}">${saveChanges}</button>
                    </div>`
                });
    
                tag_list_edit.innerHTML = tagOptions
    
    
               },
               error: (error) => {
                console.log(error);
               }
            });
        }

    }

    // Load Tags
    LoadTags(){
        const dataIf = document.querySelector('#get_all_tags');

        if(dataIf){
            const dataUrl = dataIf.value;
            $.ajax({
                type:'GET',
                url: dataUrl,
                success: (response) => {
                    const tags = response.tags;
                    const tagFilter = document.querySelector('#tag-filter');
                    const SelectTagsTrans = gettext('Select Tags...');

                    const emptyOption = document.createElement('option');
                    emptyOption.text = SelectTagsTrans;
                    emptyOption.value = '';
                    tagFilter.innerHTML = '';
                    tagFilter.appendChild(emptyOption);
                    
                    tags.forEach(function(tag) {
                      const option = document.createElement('option');
                      option.text = tag;
                      option.value = tag;
                      tagFilter.appendChild(option);
                    });
    
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }

    }

    // Crate Tags
    CrateShortcodeTags(event){
        event.preventDefault();

        const dataUrl = document.querySelector('#CreateTagView').value;
        const modelFormTag = document.querySelector('#model-form-tag');
        const tagName = document.querySelector('#id_name');

        const tag_name = $('#id_name').val();
        const csrf_token = $('[name="csrfmiddlewaretoken"]').val();

        $.ajax({
            type: 'POST',
            url: dataUrl,
            data: {
                tag_name: tag_name,
                csrfmiddlewaretoken: csrf_token
            },
            success: (response) => {
                
                lsToast(response.message);
                this.LoadTags();
                tagName.value = '';
                modelFormTag.classList.remove('active');
            },
            error: (xhr, textStatus, errorThrown) => {
                console.log(xhr, textStatus, errorThrown)
            }

        });
    }

}

export default ShortcodeTags;