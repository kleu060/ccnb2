import * as bootstrap from 'bootstrap';

// main.js or account-code-search.js
import { renderDcaCampaignTab } from "./dcaTabs/dcaCampaignTab.js";
import { renderCampaignSetupTab } from "./dcaTabs/campaignSetupTab.js";
// import { renderCampaignListTab } from "./dcaTabs/campaignListTab.js";
import { renderDcaManageTab } from "./dcaTabs/dcaManageTab.js";
import { renderDcaProfileTab } from "./dcaTabs/dcaProfileTab.js";
// import { renderAccounntInquiryTab } from "./dcaTabs/accountInquiryTab.js";
import { renderWeightTab } from "./dcaTabs/weightTab.js";
import { renderLoginUserManagementTab } from "./dcaTabs/loginUserManagementTab.js";

import { renderDcaProfileTable, renderLoginUserTable } from "./dcaTabs/components/functions.js";


// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";


export async function DcaMain() {

    // Render all tabs
    const dcaCampaignHtml = await renderDcaCampaignTab();
    // const campaignListHtml = await renderCampaignListTab();
    const dcaManageHtml = await renderDcaManageTab();
    const campaignSetupHtml = await renderCampaignSetupTab();
    const dcaProfileHtml = await renderDcaProfileTab();
    // const accountInquiryHtml = await renderAccounntInquiryTab();
    const weightHtml = await renderWeightTab();
    const loginUserManagementHtml = await renderLoginUserManagementTab();

    const html = `
        <section class="container-fluid" id="dca-main-container">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="dcaTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-dca-campaign" data-bs-toggle="tab" data-bs-target="#dca-campaign-tab" type="button" role="tab" aria-controls="dca-campaign-tab" aria-selected="true">DCA Campaign</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-dca-manage-tab" data-bs-toggle="tab" data-bs-target="#dca-manage-tab" type="button" role="tab" aria-controls="dca-manage-tab" aria-selected="false">Manage</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-campaign-setup" data-bs-toggle="tab" data-bs-target="#campaign-setup-tab" type="button" role="tab" aria-controls="campaign-setup-tab" aria-selected="true">Campaign Setup</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-dca-profile-tab" data-bs-toggle="tab" data-bs-target="#dca-profile-tab" type="button" role="tab" aria-controls="dca-profile-tab" aria-selected="false">DCA Profile</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-weight-tab" data-bs-toggle="tab" data-bs-target="#weight-tab" type="button" role="tab" aria-controls="weight-tab" aria-selected="false">Weight</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-login-user-management-tab" data-bs-toggle="tab" data-bs-target="#login-user-management-tab" type="button" role="tab" aria-controls="login-user-management-tab" aria-selected="false">Login User Management</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${dcaCampaignHtml}
                ${dcaManageHtml}
                ${campaignSetupHtml}
                ${dcaProfileHtml}
                ${weightHtml}
                ${loginUserManagementHtml}

            </div>
        </section>
    `;

    setTimeout(function () {
            var triggerTabList = [].slice.call(document.querySelectorAll('#dcaTab button'))
            triggerTabList.forEach(function (triggerEl) {
                var tabTrigger = new bootstrap.Tab(triggerEl)
    
                triggerEl.addEventListener('click', async function (event) {
                    event.preventDefault();
    
                    if ( triggerEl.id == "btn-dca-manage-tab" ) {
                        document.getElementById('dca-manage-main-container').classList.remove("d-none");
                        document.getElementById('dispatch-campaign-container').classList.add("d-none");
                    }
                    else if ( triggerEl.id == "btn-weight-tab" ) {
                        document.getElementById('weight-container').classList.remove("d-none");
                        document.getElementById('weight-group-container').classList.add("d-none");
                    }
                    else if ( triggerEl.id == "btn-dca-profile-tab") {

                        await renderDcaProfileTable();  // Load table when click on the Tab
                        document.getElementById('dca-profile-table-container').classList.remove("d-none");
                        document.getElementById('dca-profile-container').classList.add("d-none");
                    }
                    else if (triggerEl.id == "btn-login-user-management-tab") {
                        await renderLoginUserTable();
                    }

                    tabTrigger.show();
                })
            });


            
        }, 500 );

    return html;
}
