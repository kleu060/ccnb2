import { rendorSearchFormSection } from "./components/searchFormSection.js";
import { rendorAccountDetailSection } from "./components/accountDetailSection.js";
import { rendorNoResultSection } from "./components/noResultSection.js";
import { rendorAgentUpdateSection } from "./components/agentUpdateSection.js";
import { rendorAccountTableSection } from "./components/accountTableSection.js";
import { rendorActionHistorySection } from "./components/actionHistorySection.js";
import { accCodeFormSubmit, accIdFormSubmit, getAccountCodeSubInfo, updateContactType} from "./functions/functions.js";
// import TomSelect from 'tom-select';
import { fetchAPI } from '../../api/fetch-api.js';
import { API_BASE } from '../../config.js';



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

            const agentUpdateContactTypeForm = document.getElementById("agent-update-contact-type-form");

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

            agentUpdateContactTypeForm.addEventListener("submit", async(e) => {
                e.preventDefault();

                const agentUpdateContactTypeErrorMessage = document.getElementById("agent-update-contact-type-error-message");
                agentUpdateContactTypeErrorMessage.textContent = "";

                const contactType = document.getElementById("select-contact-type").value;
                const contactTypeValue = document.getElementById("contact-value").value;
                const response = await updateContactType(contactType, contactTypeValue, tab);

                if (!response.success) {
                    agentUpdateContactTypeErrorMessage.textContent = response.response;
                }
            });


            // document.addEventListener("DOMContentLoaded", function() {
                // new TomSelect('.tomselect', {
                //     create: true, // Allows users to create new items
                //     sortField: {
                //         field: 'text',
                //         direction: 'asc'
                //     }
                // });
            // });

        }, 0 );

    return html;
}