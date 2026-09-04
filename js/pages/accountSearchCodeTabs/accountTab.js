import { getAccountActionHistory } from "../../api/account-api.js";
// import { loadDebtorTable } from "../../components/debtor-table.js";
import { rendorSearchFormSection } from "./components/searchFormSection.js";
import { rendorAccountDetailSection } from "./components/accountDetailSection.js";
import { rendorNoResultSection } from "./components/noResultSection.js";
import { rendorAgentUpdateSection } from "./components/agentUpdateSection.js";
import { rendorAccountTableSection } from "./components/accountTableSection.js";
import { rendorActionHistorySection } from "./components/actionHistorySection.js";
import { accCodeFormSubmit, accIdFormSubmit, getAccountCodeSubInfo } from "./functions/functions.js";

export async function renderAccountTab() {
    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accCode = params.get('acc_code') || '';
    // const account = await getAccount('acc_code');
    // const actions = await getAccountActionHistory(accCode);
    const tab = "account";

    const rendorSearchFormSectionHtml = await rendorSearchFormSection(tab, accCode);
    const rendorAccountDetailSectionHtml = await rendorAccountDetailSection(tab);
    const rendorNoResultSectionHtml = await rendorNoResultSection(tab);
    const renderAgentUpdateSectionHtml = await rendorAgentUpdateSection(tab);
    const rendorAccountTableSectionHtml  = await rendorAccountTableSection(tab);
    const rendorActionHistorySectionHtml = await rendorActionHistorySection(tab);

    const html = `
        <div class="tab-pane fade show active" id="account-tab" role="tabpanel" aria-labelledby="account-tab">
            <section class="container-fluid" id="account-tab">
                <!-- Search form -->
                ` + rendorSearchFormSectionHtml + `

                <!-- Account Not Found Section -->
                ` + rendorNoResultSectionHtml + `

                <div id="${tab}-account-code-result-container" class="row d-none">
                    <div class="col-9" x-data="{ account: {} }" x-ref="accRow" @update-account.window="account = $event.detail">
                        
                        <!-- Account Detail -->
                        ` + rendorAccountDetailSectionHtml +`

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
        </div>        
    `;

    setTimeout(() => {
        const accountTabaccountEnquiryAccCodeForm = document.getElementById(tab + "-account-enquiry-acc-code-form");
        const accountTabaccountEnquiryAccIdForm = document.getElementById(tab + "-account-enquiry-acc-id-form");
        const accountTabselectAccountCodeSubInfo = document.getElementById(tab + "-select-account-code-sub-info");
    
        accountTabaccountEnquiryAccCodeForm.addEventListener("submit", async (e)=>{
            e.preventDefault();
            console.log("accountTabaccountEnquiryAccCodeForm submit");
            accountTabselectAccountCodeSubInfo.tomselect.clear();
            accCodeFormSubmit(tab);
        });

        accountTabaccountEnquiryAccIdForm.addEventListener("submit", async (e)=>{
            e.preventDefault();
            accountTabselectAccountCodeSubInfo.tomselect.clear();
            accIdFormSubmit(tab);
        });

        accountTabselectAccountCodeSubInfo.addEventListener("change", async(e)=> {
            e.preventDefault();
            console.log("accountTabselectAccountCodeSubInfo");
            getAccountCodeSubInfo(e, tab);
        });

        if ( accCode != "" ) {
            accCodeFormSubmit("account");
        }

    }, 500 );




    return html;
}