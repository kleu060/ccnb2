// Page 603, DCA > DCA Profile
import { renderDcaProfileTable } from "./components/functions.js";
import { fetchAPI } from '../../api/fetch-api.js';
import { API_BASE } from '../../config.js';

export async function renderDcaProfileTab() {

    const type = "DCA";
    const body = {
        type
    };
    const url= `${API_BASE}/getMapping.php`;
    const dcaJson  = await fetchAPI(url, body);
    const dcaStatus  = dcaJson.STATUS;

    // 1. Generate the options template string from the object values
    const statusOptionsHtml = Object.values(dcaStatus)
        .map(status => `<option value="${status.ID}">${status.DISPLAY}</option>`)
        .join('');

    const html = `
        <div class="tab-pane fade" id="dca-profile-tab" role="tabpanel" aria-labelledby="dca-profile-tab">
            
            <div class="card" id="dca-profile-table-container">
                <div class="card-header">
                    <h1>DCA Profile</h1>
                    <button class="btn btn-primary" id="btn-add-new-dca-profile">Add New</button>
                </div>
                <div class="card-body">
                    <table id="dca-profile-table">

                    </table>
                </div>
            </div>

            <div class="card d-none" id="dca-profile-container">
                <div class="card-header">
                    <h1 id="dca-profile-container-title">Add DCA Profile</h1>
                </div>
                <div class="card-body">
                    <form id="dca-profile-form">
                        <input type="hidden" value="add" name="action" id="dca-profile-form-action"/> 
                        <div class="field-group col-4 mb-1 d-none" id="dca-id-container">
                            <label>DCA ID</label>
                            <span id="dca_id_text"></span>
                            <input type="hidden" id="dca_id" name='dca_id'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA Code</label>
                            <input type="text" id="dca_code" name='dca_code'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA Name</label>
                            <input type="Text" id="dca_name" name='dca_name'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA BR Number</label>
                            <input type="Text" id="dca_brn" name='dca_brn'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>GST Code</label>
                            <input type="Text" id="gst_code" name='gst_code'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA Group Standard</label>
                            <select class="form-select-sm" id="dcs-dca_group_standard" name="dca_group_standard">
                                <option value="0">NO</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA Group SPDCA</label>
                            <select class="form-select-sm" id="dcs-dca_group_spdca" name="dca_group_spdca">
                                <option value="0">NO</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA Group Ad Hoc</label>
                            <select class="form-select-sm" id="dcs-dca_group_adhoc" name="dca_group_adhoc">
                                <option value="0">NO</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>status</label>
                            <select class="form-select-sm" id="dcs_status" name="status">
                                ${statusOptionsHtml}
                            </select>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Ranking</label>
                            <input type="number" id="dcs_ranking" name='ranking'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA Email</label>
                            <input type="text" id="dca_email" name='dca_email'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Agreement Start Date</label>
                            <input type="date" id="dca-agreement_start_date" name='agreement_start_date'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Agreement End Date</label>
                            <input type="date" id="dca-agreement_end_date" name='agreement_end_date'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Issuer of Bank Guarantee</label>
                            <input type="text" id="dca-bank_guarantee_issuer" name='bank_guarantee_issuer'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Bank Guarantee Cert No.</label>
                            <input type="text" id="dca-bank_guarantee_cert_num" name='bank_guarantee_cert_num'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Bank Guarantee Start</label>
                            <input type="date" id="dca-bank_guarantee_start_date" name='bank_guarantee_start_date'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Bank Guarantee Expiry</label>
                            <input type="date" id="dca-bank_guarantee_end_date" name='bank_guarantee_end_date'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Insurance Policy Number</label>
                            <input type="text" id="dca-insurance_policy_num" name='insurance_policy_num'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Policy start</label>
                            <input type="date" id="dca-insurance_policy_start_date" name='insurance_policy_start_date'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Policy Expiry</label>
                            <input type="date" id="dca-insurance_policy_end_date" name='insurance_policy_end_date'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Contact Name</label>
                            <input type="text" id="dca-contact_name" name='contact_name'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Contact Phone 1</label>
                            <input type="text" id="dca-contact_phone1" name='contact_phone1'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Contact Phone 2</label>
                            <input type="text" id="dca-contact_phone2" name='contact_phone2'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Contact Email</label>
                            <input type="text" id="dca-contact_email" name='contact_email'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Contact Fax</label>
                            <input type="text" id="dca-contact_fax" name='contact_fax'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>DCA Address</label>
                            <input type="text" id="dca-contact_address" name='contact_address'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Bank Name Account</label>
                            <input type="text" id="dca-bank_name" name='bank_name'/>
                        </div>

                        <div class="field-group col-4 mb-1">
                            <label>Bank Account Number</label>
                            <input type="text" id="dca-bank_account_num" name='bank_account_num'/>
                        </div>
                        <div id="dca-profile-add-error-message" class="mb-3 error-message"></div>
                        <div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button type="button" class="btn btn-secondary" id="btn-cancel-dca-profile">Cancel</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>`;

        setTimeout(async function(){
            

            // Edit DCA Profile
            const dcaProfileTable = document.getElementById('dca-profile-table');
            dcaProfileTable.addEventListener("click", async(e) => {
                const button = e.target.closest(".btn-edit-dca-profile");
                if (button) {
                    document.getElementById('dca-profile-add-error-message').innerHTML = "";
                    document.getElementById('dca-profile-container-title').innerHTML = "Edit DCA Profile";
                    document.getElementById('dca-profile-table-container').classList.add('d-none');
                    document.getElementById('dca-profile-container').classList.remove('d-none');
                    document.getElementById('dca-id-container').classList.remove('d-none');

                    const dcaProfileId = button.dataset.dcaProfileId;
                    const url = `${API_BASE}/dunningGroup.php?endpoint=view_dca_profile&id=${dcaProfileId}`;
                    const result = await fetchAPI(url);
                    const response = JSON.parse(result.response);
// "{\"dca_id\":4,\"dca_code\":\"ka test002\",\"dca_name\":\"ka\",\"dca_brn\":\"111\",\"dca_email\":\"kleu060@gmail.com\",\"gst_code\":\"1234\",\"agreement_start_date\":\"2026-09-01\",\"agreement_end_date\":\"2026-09-03\",\"bank_guarantee_issuer\":\"BOC\",\"bank_name\":\"ANZ\",\"bank_account_num\":\"1111--111-111\",\"bank_guarantee_cert_num\":\"123123\",\"bank_guarantee_start_date\":\"2026-09-10\",\"bank_guarantee_end_date\":\"2026-09-13\",\"insurance_policy_num\":\"9999\",\"insurance_policy_start_date\":\"2026-09-23\",\"insurance_policy_end_date\":\"2026-09-26\",\"contact_name\":\"Ka On Leung\",\"contact_phone1\":\"0224362922\",\"contact_phone2\":\"0224362922\",\"contact_email\":\"kleu060@gmail.com\",\"contact_fax\":\"123\",\"contact_address\":\"72 Dominion Road\",\"dca_group_standard\":0,\"dca_group_spdca\":1,\"dca_group_adhoc\":0,\"status\":2,\"ranking\":3}"


                    document.getElementById('dca_id_text').innerHTML = dcaProfileId;
                    document.getElementById('dca_id').value = dcaProfileId;
                    document.getElementById('dca_code').value = response.dca_code;
                    document.getElementById('dca_name').value = response.dca_name;
                    document.getElementById('dca_brn').value = response.dca_brn;
                    document.getElementById('gst_code').value = response.gst_code;
                    document.getElementById('dcs-dca_group_standard').value = response.dca_group_standard;
                    document.getElementById('dcs-dca_group_spdca').value = response.dca_group_spdca;
                    document.getElementById('dcs-dca_group_adhoc').value = response.dca_group_adhoc;
                    document.getElementById('dcs_status').value = response.status;
                    document.getElementById('dcs_ranking').value = response.ranking;
                    document.getElementById('dca_email').value = response.dca_email;
                    document.getElementById('dca-agreement_start_date').value = response.agreement_start_date;
                    document.getElementById('dca-agreement_end_date').value = response.agreement_end_date;
                    document.getElementById('dca-bank_guarantee_issuer').value = response.bank_guarantee_issuer;
                    document.getElementById('dca-bank_guarantee_cert_num').value = response.bank_guarantee_cert_num;
                    document.getElementById('dca-bank_guarantee_start_date').value = response.bank_guarantee_start_date;
                    document.getElementById('dca-bank_guarantee_end_date').value = response.bank_guarantee_end_date;
                    document.getElementById('dca-insurance_policy_num').value = response.insurance_policy_num;
                    document.getElementById('dca-insurance_policy_start_date').value = response.insurance_policy_start_date;
                    document.getElementById('dca-insurance_policy_end_date').value = response.insurance_policy_end_date;
                    document.getElementById('dca-contact_name').value = response.contact_name;
                    document.getElementById('dca-contact_phone1').value = response.contact_phone1;
                    document.getElementById('dca-contact_phone2').value = response.contact_phone2;
                    document.getElementById('dca-contact_email').value = response.contact_email;
                    document.getElementById('dca-contact_address').value = response.contact_address;
                    document.getElementById('dca-contact_address').value = response.contact_address;
                    document.getElementById('dca-contact_fax').value = response.contact_fax;
                    document.getElementById('dca-bank_name').value = response.bank_name;
                    document.getElementById('dca-bank_account_num').value = response.bank_account_num;

                    document.getElementById('dca-profile-form-action').value="edit";
                }
            });

            // Add DCA Profile
            const btnAddNewDcaProfile = document.getElementById('btn-add-new-dca-profile');
            btnAddNewDcaProfile.addEventListener("click", (e) => {
                document.getElementById('dca-profile-add-error-message').innerHTML = "";
                document.getElementById('dca-profile-container-title').innerHTML = "Add DCA Profile";
                document.getElementById('dca-profile-table-container').classList.add('d-none');
                document.getElementById('dca-profile-container').classList.remove('d-none');
                document.getElementById('dca-id-container').classList.add('d-none');

                document.getElementById('dca-profile-form-action').value="add";
            });

            const dcaProfileForm = document.getElementById('dca-profile-form');
            dcaProfileForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                console.log("submit form");
                try {
                    const formData = new FormData(e.target);
                    
                    let data = Object.fromEntries(formData.entries());
                    const action = data["action"];

                    let url = `${API_BASE}/dunningGroup.php?endpoint=add_dca_profile`;
                    if ( action == "edit" ) {
                        url = `${API_BASE}/dunningGroup.php?endpoint=edit_dca_profile`;
                    }
                    const result = await fetchAPI(url, data);
                    const response = JSON.parse(result.response);
                    if (result.success && response.error_code == 0) {
                        document.getElementById('dca-profile-add-error-message').innerHTML =" DCA profile created successfully.";
                        if ( action == "edit" ) { 
                            document.getElementById('dca-profile-add-error-message').innerHTML =" DCA profile updated successfully.";
                        }
                    }
                    else {
                        document.getElementById('dca-profile-add-error-message').innerHTML = "DCA profile failed to create.("+response.error_description+")";
                        if ( action == "edit" ) { 
                            document.getElementById('dca-profile-add-error-message').innerHTML = "DCA profile failed to updatae.("+response.error_description+")";
                        }
                    }
                } catch (err) {
                    document.getElementById('dca-profile-add-error-message').innerHTML = "DCA profile failed to create.("+response.error_description+")";
                    if ( action == "edit" ) { 
                        document.getElementById('dca-profile-add-error-message').innerHTML = "DCA profile failed to updatae.("+response.error_description+")";
                    }
                }
                finally {
                    await renderDcaProfileTable();
                }
                
            });

            const btnCancelDcaProfile = document.getElementById('btn-cancel-dca-profile');
            btnCancelDcaProfile.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("btn-cancel-dca-profile click");
                document.getElementById('dca-profile-table-container').classList.remove('d-none');
                document.getElementById('dca-profile-container').classList.add('d-none');
            });
        },2000)
        return html;
}