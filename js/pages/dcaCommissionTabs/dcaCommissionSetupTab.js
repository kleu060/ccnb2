// Page 902, DCA Commission > DCA Commission Rate Setup

import * as bootstrap from 'bootstrap'; // Add this at the top

import { renderEditCommissionModal } from './editComissionnModal.js';
import { loadDcaCommissionSetupTable, loadEditComissionTable} from "./functions/functions.js";
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderDcaCommissionSetupTab() {
    const html =`
        <section class="tab-pane fade"  role="tabpanel" aria-labelledby="dca-commission-setup-tab" id="dca-commission-setup-tab">
            <div class="card">
                <div class="card-body">
                    <h1>DCA Commission Rate Setup</h1>
                    <div class="row">
                        <div class="col-12">
                            <div class="error-message" id="change-status-message"></div>
                            <table id="dca-commission-setup-table">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `+ await renderEditCommissionModal() + `
    `;

    setTimeout(async function(){
        await loadDcaCommissionSetupTable();

        const dcaCommissionSetupTable = document.getElementById('dca-commission-setup-table');
        const editCommissionModalElement = document.getElementById("edit-commission-modal");
        const editCommissionModal = new bootstrap.Modal(editCommissionModalElement);

        dcaCommissionSetupTable.addEventListener("click", async(e) => {

            const btnChangeStatus = e.target.closest('.btn-change-status-dca-commission');
            if ( btnChangeStatus ) {
                const status = btnChangeStatus.parentElement.parentElement.querySelector('.sel-dca-commission-status').value;
                const version_id = btnChangeStatus.dataset.dcaProfileId;

                const body = {
                    version_id,
                    status
                };

                console.log(body);
                
                const url = `${API_BASE}/commissionManage.php?endpoint=change_int_comm_version_status`;
                try {
                    const result  = await fetchAPI(url, body);
                    if (result.success == true ) {
                        const response = JSON.parse(result.response);
                        if ( response.error_code == 0 ) {
                            document.getElementById('change-status-message').innerHTML = "Internal commission status updated successfully";
                            await loadDcaCommissionSetupTable();
                        }
                        else {
                                document.getElementById('change-status-message').innerHTML = "Internal commission status update failed: " + response.error_description;
                        }
                    }
                    else {
                            document.getElementById('change-status-message').innerHTML = "Internal commission status update failed: Server Error";
                    }
                }
                catch (error) {
                    document.getElementById('change-status-message').innerHTML = "Internal commission status update failed: Server error " + error;
                }
            }

            const btnEdit = e.target.closest('.btn-edit-dca-commission');
            if (btnEdit) {
                await loadEditComissionTable(btnEdit.dataset.dcaProfileId);

                document.getElementById('commission_id').innerHTML = btnEdit.dataset.dcaProfileId;
                document.getElementById('commission_version_name').value = btnEdit.dataset.dcaVersionName;
                document.getElementById('commission_remark').value = btnEdit.dataset.dcaRemark;

                document.getElementById('edit-commission-modal').querySelectorAll('input, textarea').forEach(el => {
                    el.removeAttribute('disabled');
                });
                document.getElementById('save-commission-btn').style.display = 'block';

                editCommissionModal.show();
            }


            const editExtraCommissionForm = document.getElementById('edit-extra-commission-form');
            editExtraCommissionForm.addEventListener("submit", async(e) => {
                e.preventDefault();
                document.getElementById("edit-commission-error-message").innerHTML = "";
    
                const formData = new FormData(editExtraCommissionForm);
                const body = {
                    version_id: document.getElementById('commission_id').innerHTML,
                    name: formData.get('version_name'),
                    remark: formData.get('remark'),
                };
    
                const url = `${API_BASE}/dcaCommission.php?endpoint=edit_dca_comm_version`;
                
                try {
                    const result = await fetchAPI(url, body);
                    if (result.success == true) {
                        const response = JSON.parse(result.response);
                        if (response.error_code == 0) {
                            let commRateBody = {
                                version_id: document.getElementById('commission_id').innerHTML,
                                rate_table:[]
                            }
    
                            const tierRows = document.querySelectorAll("#edit-commission-table tbody tr");
                            tierRows.forEach(row => {
                                const tierData = {
                                    bucket: row.querySelector("[data-bucket-id]").dataset.bucketId,
                                    bracket: row.querySelector("[data-bracket-id]").dataset.bracketId,
                                    rate: row.querySelector(".input_rate").value,
                                };
                                commRateBody.rate_table.push(tierData);
                            });
                            const urlCommRate = `${API_BASE}/dcaCommission.php?endpoint=edit_dca_comm_rate`;
                            const urlCommRateResult = await fetchAPI(urlCommRate, commRateBody);
    
                            if (urlCommRateResult.success == true) {
                                const urlCommRateResponse = JSON.parse(urlCommRateResult.response);
    
                                if ( urlCommRateResponse.error_code == 0 ){
                                    document.getElementById("edit-commission-error-message").innerHTML = "Internal commission updated successfully";
    
                                    await loadDcaCommissionSetupTable();
                                }
                                else {
                                    document.getElementById("edit-commission-error-message").innerHTML = "Internal commission updated failed: " + urlCommRateResponse.error_description;
                                }
                            }
                            else {
                                document.getElementById("edit-commission-error-message").innerHTML = "Internal commission updated failed: server error";
                            }
                        
                        }
                        else {
                            document.getElementById("edit-commission-error-message").innerHTML = "Internal commission updated failed: " + response.error_description;
                        }
                    }
                    else {
                        document.getElementById("edit-commission-error-message").innerHTML = "Internal commission updated failed: server error";
                    }
                }
                catch (error) {
                    document.getElementById("edit-commission-error-message").innerHTML = "Internal commission update failed: Server error " + error;
                }
            });
        });


    }, 500);

    return html;
}