// Page 502, Dunning Group > Dunning Group Setup

import { loadDunningGroupTable } from "../functions/functions.js";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../../js/api/fetch-api.js';

export async function renderEditDunningGroupForm() {
    const html = `
        <h2 class="mb-2">Edit Dunning Group</h2>
        <form id="edit-dunning-group-form">
            <input type="hidden" id="dunning-group-id-edit" name="id">
            <div class="mb-1 field-group">
                <label>Dunning Group Name</label>
                <input type="text" id="dunning-group-name-edit" name="name" />
                
            </div>

            <div class="mb-1 field-group">
                <label>Priority</label>
                <input type="text" name="priority" id="dunning-group-priority-edit" value=""/>
            </div>

            <div class="mb-1 field-group">
                <label>Remark</label>
                <textarea name="remark"  id="dunning-group-remark-edit" cols="60" rows="10"></textarea>

            </div>
            <div id="edit-dunning-group-form-error-message" class="mb-3 error-message"></div>

            <div class="row">
                <div>
                    <input type="submit" class="btn btn-primary">
                    <button type="button" class="btn btn-secondary" id="btn-edit-dunning-group-form-back">Back</button>
                </div>
            </div>

            

        </form>
    `;

    setTimeout(function(){
        const btnEditDunningGroupFormBack = document.getElementById('btn-edit-dunning-group-form-back');
        const dunningGroupSetupSection = document.getElementById('dunning-group-setup-section');
        const dunningGroupEditFormSection = document.getElementById('dunning-group-edit-form-section');

        btnEditDunningGroupFormBack.addEventListener("click", async (e) => {
            await loadDunningGroupTable(true);
            dunningGroupSetupSection.classList.remove("d-none");
            dunningGroupEditFormSection.classList.add("d-none");
        });

        const editDunningGroupForm = document.getElementById("edit-dunning-group-form");
        const editDunningGroupFormErrorMessage = document.getElementById("edit-dunning-group-form-error-message");

        editDunningGroupForm.addEventListener("submit", async (e) => {
                e.preventDefault();

            const formData = new FormData(editDunningGroupForm);
            const body = Object.fromEntries(formData.entries());
            const url = `${API_BASE}/dunningGroup.php?endpoint=edit_dunning`;
            const response = await fetchAPI(url, body);
            console.log(response.response);

            if ( response.success  ) {
                const result = JSON.parse(response.response);
                if ( result.error_code == 0) {
                    editDunningGroupFormErrorMessage.innerHTML = "Dunning Group Updated successfully";
                }
                else {
                    editDunningGroupFormErrorMessage.innerHTML = "Dunning Group fail to edit. " + response.response.error_description + "(" + response.response.error_code+ ")";
                }
            }
            else {
                // const result = JSON.parse(response.response);
                editDunningGroupFormErrorMessage.innerHTML = "Dunning Group fail to edit.  "  + response.response.error_description + "(" + response.response.error_code+ ")";;
            }
        });
    }, 5000);

    return html;

}
