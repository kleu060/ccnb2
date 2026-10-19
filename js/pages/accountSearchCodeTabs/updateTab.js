// Page 205, Account Inquiry > Update

import * as bootstrap from 'bootstrap';
// import TomSelect from 'tom-select';
import { fetchAPI } from '../../api/fetch-api.js';
import { API_BASE } from '../../config.js';



export async function renderUpdateTab() {

    const url = `${API_BASE}/dunningGroup.php?endpoint=list_agent`;
    const listAgentResult = await fetchAPI(url);
    console.log(listAgentResult);
    const listAgentResponse  = JSON.parse(listAgentResult.response);
    
    let agentOptions = Object.entries(listAgentResponse)
    .map(([key, value]) => {
        // Capitalise the first letter and lower-case the rest for a cleaner label
        const label = key.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        return `<option value="${value.id}">${value.user_name}</option>`;
    })
    .join('');

    agentOptions = "<option value=''>Please select an Agent</option>" + agentOptions;

    const html =  `
        <div class="tab-pane fade" id="update-tab" role="tabpanel" aria-labelledby="update-tab">
            <section class="container-fluid" id="update-tab">
                <div class="card mb-4">
                    <div class="card-header">
                        <h1>Update</h1>
                    </div>
                    <div class="card-body">
                        <div  id="account-inquiry-update-search-container" >
                            <form id="account-inquiry-update-form">
                                <label class="d-block">Account Number</label>
                                <div class="d-flex gap-1">
                                    <input type="text" id="account-inquiry-update-search-account-number" name="account-inquiry-update-search-account-number"  value=""></input>
                                    <button type="submit" class="btn btn-primary">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="account-inquiry-update-search-result-not-found-container" class="d-none">
                    <div class="card">
                        <div class="card-body">
                            Account Not Found
                        </div>
                    </div>
                </div>

                <div id="account-inquiry-update-search-result-container" class=" d-none" x-data="{ account: {} }" x-ref="accRow" @update-dunning.window="account = $event.detail">
                    <div class="card">
                        <div class="card-body">
                            <div class="row row-cols-2 row-cols-lg-4">    
                                <div class="col">
                                    <div class="field-group">
                                        <label class="">Dunning Group</label>
                                        <span  x-text="account.dunning_group"></span>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="field-group">
                                        <label class="">Collection Status</label>
                                        <span  x-text="account.collection_status"></span>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="field-group">
                                        <label class="">Collection Start Date</label>
                                        <span  x-text="account.collection_start"></span>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="field-group">
                                        <label class="">End Date</label>
                                        <span  x-text="account.collection_end"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row row-cols-2 row-cols-lg-4 mb-4">
                                <div class="col">
                                    <div class="field-group">
                                        <label class="">Campaign/DCA</label>
                                        <span  x-text="account.campaign"></span>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="field-group">
                                        <label class="">Call Agent</label>
                                        <span  x-text="account.call_agent"></span>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="field-group">
                                        <label class="">DC Agency</label>
                                        <span  x-text="account.dca_code"></span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="field-group">
                                        <label class="">Disposition</label>
                                        <span  x-text="account.disposition"></span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="row row-cols-2 row-cols-lg-8 mb-4">
                                <div class="col">
                                    <div class="field-group">
                                        <label class="">Pullback status change</label>
                                        <select id="select-pullback" name="pullback" class="form-select-sm">
                                            <option value="">Please Select</option>
                                            <option value="0">Pull back from external collection</option>
                                            <option value="1">Push to external collection</option>
                                        </select>
                                        <button class="btn btn-primary ms-1" id="btn-change-status">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="row row-cols-2 row-cols-lg-4">
                                <div class="col"> 
                                    <div class="fw-bold mb-1">Change of disposition code</div>
                                    <div class="field-group mb-1">
                                        
                                        <label class="">Call Agent ID</label>
                                        <select name="agent_id" id="select-change-disposition-code-agent-id">
                                            ${agentOptions}
                                        </select>
                                    </div>

                                    <div class="field-group mb-1">
                                        <label class="">Disposition date</label>
                                        <input type="date" name="disposition_date" id="change_disposition_code_disposition_date" /> 
                                    </div>

                                    <div id="change-disposition-error-message" class="mb-3 error-message"></div>

                                    <div class="field-group">
                                        <button class="btn btn-primary" id="btn-submit-change-disposition">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div class="modal fade" id="confirmChangeStatusModal" tabindex="-1" role="dialog" aria-labelledby="confirmChangeStatus" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm Change Status </h5>
                        
                    </div>
                    <div class="modal-body" id="confirmChangeStatusModalBody">
                        Confirm pull back from external, or push to external collection
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal" id="btn-deny-change-status-modal">No</button>
                        <button type="button" class="btn btn-primary" id="btn-confirm-change-status" >Yes</button>


                    </div>
                    </div>
                </div>
            </div>
        </div>`;

        

        setTimeout( async() => {

            function clearAccountData() {
                window.dispatchEvent(new CustomEvent('update-dunning', {
                    detail: {
                        dunning_group : '',
                        collection_status : '',
                        collection_start : '',
                        collection_end : '',
                        campaign : '',
                        call_agent : '',
                        dca_code : '',
                        disposition : '',
                    }
                }));
            }
            
            function updateAccountData(account) {
                console.log("updateAccountData");
                console.log(account);
                window.dispatchEvent(new CustomEvent('update-dunning', {
                    detail: {
                        dunning_group: account.dunning_group,
                        collection_status: account.collection_status,
                        collection_start: account.collection_start,
                        collection_end: account.collection_end,
                        campaign: account.campaign,
                        call_agent: account.call_agent,
                        dca_code: account.dca_code,
                        disposition: account.disposition,
                    }
                }));
            }

            const accountInquiryUpdateForm = document.getElementById('account-inquiry-update-form');
            const accountInquiryUpdateSearchResultNotFoundContainer = document.getElementById('account-inquiry-update-search-result-not-found-container');
            const accountInquiryUpdateSearchResultContainer = document.getElementById('account-inquiry-update-search-result-container');
            accountInquiryUpdateForm.addEventListener("submit", async(e) => {
                e.preventDefault();

                const url = `${API_BASE}/index.php?endpoint=acodeinq_2003`;
                const part = 2;
                const acc_id = document.getElementById('account-inquiry-update-search-account-number').value;
                const body2 = {
                    part,
                    acc_id,
                };
                const responseJsonPart2 = await fetchAPI(url, body2);


                console.log(responseJsonPart2);

                clearAccountData();
                accountInquiryUpdateSearchResultNotFoundContainer.classList.add("d-none");
                accountInquiryUpdateSearchResultContainer.classList.add("d-none");

                
                if  ( responseJsonPart2 !== undefined && responseJsonPart2 !== null ) {
                    
                    
                    if ( responseJsonPart2.success == true ) {


                        console.log("success");
                        const safeInnerJsonPart2 = responseJsonPart2.response;
                        const safeInnerJsonPart2Json = JSON.parse(safeInnerJsonPart2);

                        if (safeInnerJsonPart2Json.length == 0) {
                            console.log("fail 3");
                            accountInquiryUpdateSearchResultNotFoundContainer.classList.remove("d-none");    
                        }
                        else {

                            updateAccountData(safeInnerJsonPart2Json);
                            accountInquiryUpdateSearchResultContainer.classList.remove("d-none");
                        }
                    }
                    else {
                        console.log("fail 1");
                        accountInquiryUpdateSearchResultNotFoundContainer.classList.remove("d-none");    
                    }  
                }
                else {
                    console.log("fail 2");
                    accountInquiryUpdateSearchResultNotFoundContainer.classList.remove("d-none");
                }
            })
            

            const btnChangeStatus = document.getElementById('btn-change-status');
            btnChangeStatus.addEventListener("click", (e) => {
                const confirmChangeStatusModal = document.getElementById('confirmChangeStatusModal');
                var confirmChangeStatusModalBoostrap = new bootstrap.Modal(confirmChangeStatusModal);

                const selectStatusChange = document.getElementById('select-status-change');
                console.log(selectStatusChange);
                if (selectStatusChange == null ) {
                    alert("Please select Status");
                    return;
                }
                document.getElementById('confirmChangeStatusModalBody').innerHTML = "Confirm pull back from external, or push to external collection";

                document.getElementById('btn-deny-change-status-modal').innerHTML = "No";
                document.getElementById('btn-confirm-change-status').disabled = false;

                confirmChangeStatusModalBoostrap.show();
            });

            const btnConfirmChangeStatus = document.getElementById('btn-confirm-change-status');
            btnConfirmChangeStatus.addEventListener('click', async(e) => {
                e.preventDefault();

                const url = `${API_BASE}/accodeinq_2003.php?endpoint=admin_change_pullback_status`;
                const acc_id = document.getElementById('account-inquiry-update-search-account-number').value;
                const pullback = document.getElementById('select-pullback').value;
                try {
                    const body = {
                        acc_id,
                        pullback,
                    };
                    const result = await fetchAPI(url, body);

                    if (result.success == true ) {
                        const response = JSON.parse(result.response);
                        console.log(response);
                        if (response.error_code == 0 ) {
                            document.getElementById('confirmChangeStatusModalBody').innerHTML = "Pullback Status Update Successfully";

                        }
                    }
                    else {
                        document.getElementById('confirmChangeStatusModalBody').innerHTML = "Pullback Status Update failed.  Please try again. If the error persists, please contact your administrator";
                    }

                } catch (error) {
                    document.getElementById('confirmChangeStatusModalBody').innerHTML = "Server error, please contact administrator";
                    console.log(error);
                } finally {
                    document.getElementById('btn-deny-change-status-modal').innerHTML = "Close";
                    document.getElementById('btn-confirm-change-status').disabled = true;
                }

            })

            const btnSubmitChangeDisposition = document.getElementById('btn-submit-change-disposition');
            btnSubmitChangeDisposition.addEventListener("click", async(e) => {
                const url = `${API_BASE}/accodeinq_2003.php?endpoint=admin_update_disposition`;
                const acc_id = document.getElementById('account-inquiry-update-search-account-number').value;
                const agent_id = document.getElementById('select-change-disposition-code-agent-id').value;
                const disposition_date = document.getElementById('change_disposition_code_disposition_date').value;

                try {
                    const body = {
                        acc_id,
                        agent_id,
                        disposition_date,
                    };
                    const result = await fetchAPI(url, body);

                    if (result.success == true ) {
                        const response = JSON.parse(result.response);
                        console.log(response);
                        if (response.error_code == 0 ) {
                            
                            document.getElementById('change-disposition-error-message').innerHTML = "Disposition code changed successfully";
                        }
                    }
                    else {
                        document.getElementById('change-disposition-error-message').innerHTML = "Disposition code change failed. Please try again. If the error persists, please contact your administrator";

                    }

                } catch (error) {
                    document.getElementById('change-disposition-error-message').innerHTML = "Disposition code failed to change.  Please contact your administrator";                        
                    console.log(error);
                }


            });
        }, 500 );

    return html;
}