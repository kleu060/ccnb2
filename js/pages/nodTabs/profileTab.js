import * as bootstrap from 'bootstrap'; // Add this at the top
import { loadNodProfileTable } from "./functions/functions.js";


export async function renderProfileTab() {

    const html =  `
        <div class="tab-pane fade" id="nod-profile-tab" role="tabpanel" aria-labelledby="nod-profile-tab">
           <button class="btn btn-primary" id="btn-add-new-nod-profile">Add New</button>

           <div class="row">
                <div class="col-12">
                    <table id="nod-profile-table">
                        <thead></thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal" id="nod-profile-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="nod-profile-modal-heading">Create Nod Profile</h2>
                    </div>
                    <div class="modal-body">
                        <div class="mb-1 field-group">
                            <label>Solicitor Code</label>
                            <input type="text" id="nod-profile-solicitor-code" name="nod-profile-solicitor-code">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Solictior BRN</label>
                            <input type="text" id="nod-profile-solicitor-brn" name="nod-profile-solicitor-brn">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Contact</label>
                            <input type="text" id="nod-profile-contact" name="nod-profile-contact">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Contact phone 2</label>
                            <input type="text" id="nod-profile-contact-phone-1" name="nod-profile-contact-phone-1">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Contact phone 2</label>
                            <input type="text" id="nod-profile-contact-phone-2" name="nod-profile-contact-phone-2">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Fax</label>
                            <input type="text" id="nod-profile-fax" name="nod-profile-fax">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Solicitor Email</label>
                            <input type="text" id="nod-profile-solicitor-email" name="nod-profile-solicitor-email">
                        </div>

                        <div class="mb-1 field-group">
                            <label>NOD Email</label>
                            <input type="text" id="nod-profile-nod-email" name="nod-profile-nod-email">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Solicitor Address</label>
                            <input type="text" id="nod-profile-solicitor-address" name="nod-profile-solicitor-address">
                        </div>

                        <div class="mb-1 field-group">
                            <label>Status</label>
                            <select id="nod-profile-status">
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </div>
                        
                        <div class="mb-1 field-group">
                            <label>BG Expiry Date</label>
                            <input type="text" id="nod-profile-bg-expiry-date" name="nod-profile-bg-expiry-date">
                        </div>
                        
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        `;


    setTimeout(function(){
        loadNodProfileTable();

        const btnAddNewNodProfile = document.getElementById('btn-add-new-nod-profile');
        const nodProfileTable = document.getElementById('nod-profile-table');
        const nodProfileModalElement = document.getElementById("nod-profile-modal");
        const nodProfileModal = new bootstrap.Modal(nodProfileModalElement);

        btnAddNewNodProfile.addEventListener('click', async(e) => {

            document.getElementById('nod-profile-modal-heading').innerHTML = "Create NOD Profile";
            nodProfileModal.show();
        });

        nodProfileTable.addEventListener('click', async(e) => {
            const btn = e.target.closest('.btn-edit-nod-profile');
            if (btn) {
                document.getElementById('nod-profile-modal-heading').innerHTML = "Edit NOD Profile";
                nodProfileModal.show();
            }
        });

        nodProfileModalElement.addEventListener('hide.bs.modal', async(e) => {
            await loadNodProfileTable();
        });
    }, 500)

    return html;
}