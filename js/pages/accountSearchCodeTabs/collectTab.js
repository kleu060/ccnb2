import { rendorSearchFormSection } from "./components/searchFormSection.js";
import { rendorAccountDetailSection } from "./components/accountDetailSection.js";
import { rendorNoResultSection } from "./components/noResultSection.js";
import { rendorAgentUpdateSection } from "./components/agentUpdateSection.js";
import { rendorAccountTableSection } from "./components/accountTableSection.js";
import { rendorActionHistorySection } from "./components/actionHistorySection.js";
import { accCodeFormSubmit, accIdFormSubmit, getAccountCodeSubInfo} from "./functions/functions.js";
// import TomSelect from 'tom-select';
import { fetchAPI } from '../../api/fetch-api.js';
import { API_BASE } from '../../config.js';

import { getAccountSubInfo } from "../../api/account-api.js";
import { loadDebtorTable } from "../../components/debtor-table.js";





export async function renderCollectTab() {

    

    const params = new URLSearchParams(window.location.search);
    const accCode = params.get('acc_code') || '';

    const tab = "collect";

    const rendorSearchFormSectionHtml = await rendorSearchFormSection(tab, accCode);
    const rendorAccountDetailSectionHtml = await rendorAccountDetailSection(tab);
    const rendorNoResultSectionHtml = await rendorNoResultSection(tab);
    const renderAgentUpdateSectionHtml = await rendorAgentUpdateSection(tab);
    const rendorAccountTableSectionHtml  = await rendorAccountTableSection(tab);
    const rendorActionHistorySectionHtml = await rendorActionHistorySection(tab);

    
    const html =  `
        <div class="tab-pane fade" id="collect-tab" role="tabpanel" aria-labelledby="collect-tab">
            <section class="container-fluid" id="collect-tab">
                <h1>Collect</h1>
                <!-- Search form -->
                ` + rendorSearchFormSectionHtml + `

                <!-- Account Not Found Section -->
                ` + rendorNoResultSectionHtml + `

                <div id="${tab}-account-code-result-container" class="row d-none">
                    <div class="col-9" x-data="{ account: {} }" x-ref="accRow" @update-account.window="account = $event.detail">
                        
                        <!-- Account Detail -->
                        ` + rendorAccountDetailSectionHtml +`

                        <!-- Agent Update -->
                        ` + renderAgentUpdateSectionHtml + `

                        <!-- Account Code Table -->
                        <div class="card">
                            <div class="card-body">
                                ` + rendorAccountTableSectionHtml + `
                            </div>
                        </div>
                    </div>

                    <div class="col-3"  x-data="{ actions: {} }" x-ref="actionHistoryRow" @update-actions.window="actions = $event.detail">
                        <div class="card">
                            <div class="card-body">
                                ` + rendorActionHistorySectionHtml + `
                            </div>
                        </div>
                    </div>
                
                </div>
            </section>
        </div>`;

        setTimeout( async() => {

            //get Contact
            const agentUpdateTabaccountEnquiryAccCodeForm = document.getElementById(tab + "-account-enquiry-acc-code-form");
            const agentUpdateTabaccountEnquiryAccIdForm = document.getElementById(tab + "-account-enquiry-acc-id-form");
            const agentUpdateTabselectAccountCodeSubInfo = document.getElementById(tab + "-select-account-code-sub-info");


            agentUpdateTabaccountEnquiryAccCodeForm.addEventListener("submit", async (e)=>{
                e.preventDefault();
                agentUpdateTabselectAccountCodeSubInfo.tomselect.clear();
                accCodeFormSubmit(tab);
            });

            agentUpdateTabaccountEnquiryAccIdForm.addEventListener("submit", async (e)=>{
                e.preventDefault();
                agentUpdateTabselectAccountCodeSubInfo.tomselect.clear();
                accIdFormSubmit(tab);
            });

            agentUpdateTabselectAccountCodeSubInfo.addEventListener("change", async(e)=> {
                e.preventDefault();
                getAccountCodeSubInfo(e, tab);
                
            });

            const agentUpdateContactTypeForm = document.getElementById('agent-update-contact-type-form');
            agentUpdateContactTypeForm.addEventListener("submit", async(e) => {
                e.preventDefault();
                document.getElementById('add-contact-error-message').innerHTML = "";

                const agentUpdateContactTypeErrorMessage = document.getElementById("agent-update-contact-type-error-message");
                agentUpdateContactTypeErrorMessage.textContent = "";

                try {
                    const formData = new FormData(e.target);
                    let data = Object.fromEntries(formData.entries());
                    data["acc_id"] = document.getElementById('collect-account-code-acc-id').innerHTML;


                    const url = `${API_BASE}/index.php?endpoint=agent-add-contact`;
                    const result = await fetchAPI(url, data);

                    if ( result.success == true ) {
                        document.getElementById('add-contact-error-message').innerHTML = "Contact added successfully";
                    }
                    else {
                        document.getElementById('add-contact-error-message').innerHTML = "Contact added unsuccessfully"
                    }

                    agentUpdateContactTypeErrorMessage.textCotnent = "Contact added successfully";

                } catch (err) {
                    agentUpdateContactTypeErrorMessage.textCotnent = "";
                }
                finally {
                    
                }
            });

            const selUpdateDisposition = document.getElementById('sel-update-disposition');
            selUpdateDisposition.addEventListener("change", (e) => {
                const schedCallBackContainer = document.getElementById('sched-call-back-container');
                schedCallBackContainer.classList.add("d-none");
                if (e.target.value == "12") {       // SC
                    schedCallBackContainer.classList.remove("d-none");
                }
            });

            const updateDispositionForm = document.getElementById('update-disposition-form');
            updateDispositionForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                try {
                    const formData = new FormData(e.target);
                    let data = Object.fromEntries(formData.entries());
                    console.log("update disposition: " + document.getElementById('collect-account-code-acc-id').innerHTML);
                    data["acc_id"] = document.getElementById('collect-account-code-acc-id').innerHTML;

                    console.log(document.getElementById('collect-account-code-acc-id').innerHTML);
                    console.log(data);
                    const url = `${API_BASE}/index.php?endpoint=add-disposition`;
                    const result = await fetchAPI(url, data);
                    
                    if ( result.success == true ) {
                        const response = JSON.parse(result.response);
                        if (response.error_code == 0){
                            document.getElementById('update-disposition-error-message').innerHTML = "Disposition updated successfully";
                        }
                        else {
                            document.getElementById('update-disposition-error-message').innerHTML = "Disposition updated failed: "+ response.error_description;
                        }

                    }
                    else {
                        document.getElementById('update-disposition-error-message').innerHTML = "Disposition updated failed(Server Error)";
                    }

                } catch (err) {
                    document.getElementById('update-disposition-error-message').innerHTML = "Disposition updated failed " + err;
                }
                finally {

                }
            });

            const collectOptionTable = document.getElementById('collect-option-table');
            collectOptionTable.addEventListener("click", async(e) => {

                const btn = e.target.closest('.btn-change-contact-status');
                if (btn) {
                    const selChangeContactStatus = btn.parentElement.querySelector('.sel-change-contact-status');
                    
                    const contactId = btn.dataset.id;
                    const contactType = btn.dataset.contactType;
                    const contactInfo = btn.dataset.contactInfo;
                    const status = selChangeContactStatus.value;

                    const data = {
                        id: contactId,
                        type: contactType,
                        info: contactInfo,
                        status: status
                    };
                    const url = `${API_BASE}/contactManage.php?endpoint=edit_contact`;
                    const result = await fetchAPI(url, data);

                    console.log(result);
                    if (result.success == true ) {
                        const response = JSON.parse(result.response);

                        if (response.error_code == 0 ) {
                            const accId = document.getElementById("collect-account-code-customer-id").textContent;
                            const fetchSubInfoResult = await getAccountSubInfo("contact", accId);
                            
                            console.log(fetchSubInfoResult);
                        
                            console.log("tab 1: " + tab);
                            loadDebtorTable("contact", fetchSubInfoResult, "collect");
                        }
                    }

                }
            });

        }, 2000 );

    return html;
}