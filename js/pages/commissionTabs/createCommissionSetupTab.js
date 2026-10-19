import * as bootstrap from 'bootstrap'; // Add this at the top
import { renderEditCommissionModal } from './editCommissionModel.js';
import { loadCommissionSetupTable, loadCommissionEditComissionTable } from './functions/functions.js';
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../../js/api/fetch-api.js';


export async function renderCommissionSetupTab(activeTab) {
    const html =  `
        <div class="tab-pane fade ${activeTab === 'setup' ? 'show active' : ''}" id="commission-setup-tab" role="tabpanel" aria-labelledby="commission-setup-tab">
            <div class="container-fluid">
                <h1>Internal Commission Rate Table</h1>
                <section id="commission-setup-section">
                    <div class="card mb-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="error-message" id="change-status-message"></div>
                                    <table id="commission-setup-table">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    
                </section>
            </div>
            ` + await renderEditCommissionModal() + `
        </div>
    `;

    setTimeout(async function(){

        await loadCommissionSetupTable();
        
        const commissionSetupTable = document.getElementById('commission-setup-table');
        const editCommissionModalElement = document.getElementById("edit-commission-modal");
        const editCommissionModal = new bootstrap.Modal(editCommissionModalElement);
           

        commissionSetupTable.addEventListener("click", async(e) => {
            const btnEdit = e.target.closest('.btn-edit-internal-commission');
            if (btnEdit) {
                await loadCommissionEditComissionTable(btnEdit.dataset.dcaProfileId);

                document.getElementById('commission_id').innerHTML = btnEdit.dataset.dcaProfileId;
                document.getElementById('commission_version_name').value = btnEdit.dataset.dcaVersionName;
                document.getElementById('commission_remark').value = btnEdit.dataset.dcaRemark;

                document.getElementById('edit-commission-modal').querySelectorAll('input, textarea').forEach(el => {
                    el.removeAttribute('disabled');
                });
                document.getElementById('save-commission-btn').style.display = 'block';

                editCommissionModal.show();
            }

            const btnView = e.target.closest('.btn-view-internal-commission');
            if (btnView) {
                await loadCommissionEditComissionTable(btnView.dataset.dcaProfileId);

                document.getElementById('commission_id').innerHTML = btnView.dataset.dcaProfileId;
                document.getElementById('commission_version_name').value = btnView.dataset.dcaVersionName;
                document.getElementById('comission_remark').value = btnView.dataset.dcaRemark;

                document.getElementById('edit-commission-modal').querySelectorAll('input, textarea').forEach(el => el.setAttribute('disabled', 'disabled'));
                document.getElementById('save-commission-btn').style.display = 'none';
                editCommissionModal.show();
            }

            const btnChangeStatus = e.target.closest('.btn-change-status-internal-commission');
            if ( btnChangeStatus ) {
                document.getElementById('change-status-message').innerHTML = "";
                const status = btnChangeStatus.parentElement.parentElement.querySelector('.sel-internal-commission-status').value;
                
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
                            await loadCommissionSetupTable();
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
        });

        const editCommissionForm = document.getElementById('edit-commission-form');
        editCommissionForm.addEventListener("submit", async(e) => {
            e.preventDefault();
            document.getElementById("edit-commission-error-message").innerHTML = "";

            const formData = new FormData(editCommissionForm);
            const body = {
                version_id: document.getElementById('commission_id').innerHTML,
                name: formData.get('version_name'),
                remark: formData.get('remark'),
            };

            const url = `${API_BASE}/commissionManage.php?endpoint=edit_int_comm_version`;
            
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
                                callgroup: row.querySelector("[data-callgroup-id]").dataset.callgroupId,
                                bucket: row.querySelector("[data-bucket-id]").dataset.bucketId,
                                bracket: row.querySelector("[data-bracket-id]").dataset.bracketId,
                                rate_normal: row.querySelector(".input_rate_normal").value,
                                rate_newhire: row.querySelector(".input_rate_newhire").value,
                                bonus: row.querySelector(".input_bonus").value
                            };
                            commRateBody.rate_table.push(tierData);
                        });
                        const urlCommRate = `${API_BASE}/commissionManage.php?endpoint=edit_int_comm_rate`;
                        const urlCommRateResult = await fetchAPI(urlCommRate, commRateBody);

                        if (urlCommRateResult.success == true) {
                            const urlCommRateResponse = JSON.parse(urlCommRateResult.response);

                            if ( urlCommRateResponse.error_code == 0 ){
                                document.getElementById("edit-commission-error-message").innerHTML = "Internal commission updated successfully";

                                await loadCommissionSetupTable();
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

        // 2. Handle dropdown changes
        // commissionSetupTable.addEventListener("change", async (e) => {
        //     const selInternalCommissionStatus = e.target.closest('.sel-internal-commission-status');
            
        //     if (selInternalCommissionStatus) {
        //         document.getElementById('change-status-message').innerHTML = "";
        //         const status = selInternalCommissionStatus.value;
        //         const version_id = selInternalCommissionStatus.dataset.dcaProfileId;
        //         const body = {
        //             version_id,
        //             status
        //         };
        //         const url = `${API_BASE}/commissionmanage.php?endpoint=change_int_comm_version_status`;
        //         const result  = await fetchAPI(url, body);
        //         if (result.success == true ) {
        //             const response = result.JSON.parse(result.repsonse);
        //             console.log(response);
        //         }
                
        //         // Your logic here (e.g., save status via API)
        //     }
        // });

    }, 1000);

    return html;
}
