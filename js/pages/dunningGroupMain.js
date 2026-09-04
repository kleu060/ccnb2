// main.js or account-code-search.js
import { renderDunningGroupTab } from "./dunningGroupTabs/dunningGroup.js";
import { renderDunningGroupSetupTab } from "./dunningGroupTabs/dunningGroupSetupTab.js";
// import { renderDunnnigGroupCampaignSetupTab  } from "./dunningGroupTabs/dunningGroupCampaignSetupTab.js";
import { renderCreateDunningTab  } from "./dunningGroupTabs/createDunningGroupTab.js";
import { renderAgentManagementTab  } from "./dunningGroupTabs/agentManagementTab.js";
import { loadDunningGroupTable } from "./dunningGroupTabs/functions/functions.js";

import * as bootstrap from 'bootstrap';
import TomSelect from 'tom-select';

export async function DunningGroupMain() {


    const allowedPages = window.allowed_pages;
    const hasDunningAccess = allowedPages.includes('5001');   
    const hasDunningSetupAccess = allowedPages.includes('5002');
    const hasCreateDunningAccess = allowedPages.includes('5003');
    const hasAgentAccess = allowedPages.includes('5004');


    // Determine which specific tab should be active based on priority order
    const activeTab = hasDunningAccess ? 'dunning' 
                    : hasDunningSetupAccess ? 'setup' 
                    : hasCreateDunningAccess ? 'create' 
                    : hasAgentAccess ? 'agent' 
                    : '';

    const dunningTab = hasDunningAccess
    ? `<li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'dunning' ? 'active' : ''}" id="btn-dunning-group-tab" data-bs-toggle="tab" data-bs-target="#dunning-group-tab" type="button" role="tab" aria-controls="dunning-group-tab" aria-selected="${activeTab === 'dunning'}">Dunning Group/Campaign</button>
        </li>`
    : ''; 

    const dunningSetupTab = hasDunningSetupAccess
    ? `<li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'setup' ? 'active' : ''}" id="btn-dunning-group-setup-tab" data-bs-toggle="tab" data-bs-target="#dunning-group-setup-tab" type="button" role="tab" aria-controls="dunning-group-setup-tab" aria-selected="${activeTab === 'setup'}">Dunning Group Setup</button>
        </li>`
    : '';

    const createDunningTab = hasCreateDunningAccess
    ? `<li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'create' ? 'active' : ''}" id="btn-create-dunning-group-tab" data-bs-toggle="tab" data-bs-target="#create-dunning-group-tab" type="button" role="tab" aria-controls="create-dunning-group-tab" aria-selected="${activeTab === 'create'}">Create Dunning Group</button>
        </li>`
    : '';

    const agentTab = hasAgentAccess
    ? `<li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'agent' ? 'active' : ''}" id="btn-agent-management-tab" data-bs-toggle="tab" data-bs-target="#agent-management-tab" type="button" role="tab" aria-controls="agent-management-tab" aria-selected="${activeTab === 'agent'}">Agent Management</button>
        </li>`
    : '';


    // Render all tabs
    const dunningGroupHtml = hasDunningAccess ? await renderDunningGroupTab(activeTab) : '';
    const dunningGroupSetupHtml = hasDunningSetupAccess ? await renderDunningGroupSetupTab(activeTab) : '';
    const createDunningTabHtml = hasCreateDunningAccess ? await renderCreateDunningTab(activeTab) : '';
    const agentManagementTabHtml = hasAgentAccess ? await renderAgentManagementTab(activeTab) : '';

    const html = `
        <section class="container-fluid section-blacklist">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="dunningGroupTab" role="tablist">
                        ${dunningTab}
                        ${dunningSetupTab}
                        ${createDunningTab}
                        ${agentTab}
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${dunningGroupHtml}
                ${dunningGroupSetupHtml}
                ${createDunningTabHtml}
                ${agentManagementTabHtml}
            </div>
        </section>
    `;

    setTimeout(function () {
        var triggerTabList = [].slice.call(document.querySelectorAll('#dunningGroupTab button'))
        triggerTabList.forEach(function (triggerEl) {
            var tabTrigger = new bootstrap.Tab(triggerEl)

            triggerEl.addEventListener('click', function (event) {
                event.preventDefault();

                console.log(triggerEl.id);
                console.log("tab click");

                if ( triggerEl.id == "btn-dunning-group-tab" ) {
                    loadDunningGroupTable(false);
                }

                if ( triggerEl.id == "btn-dunning-group-setup-tab" ){
                    loadDunningGroupTable(true);

                    const dunningGroupSetupSection = document.getElementById('dunning-group-setup-section');
                    const campaignListSetupTableSection = document.getElementById('dunning-group-version-table-section');
                    // const dunningGroupCreateFormSection = document.getElementById('dunning-group-create-form-section');
                    const dunningVersionEditFormSection = document.getElementById('dunning-version-edit-form-section');

                    dunningGroupSetupSection.classList.remove("d-none");
                    campaignListSetupTableSection.classList.remove("d-none");
                    // dunningGroupCreateFormSection.classList.add("d-none");
                    dunningVersionEditFormSection.classList.add("d-none");
                }

                if ( triggerEl.id == "btn-create-dunning-group-tab") {
                    document.getElementById('select-dunning-group-name').value = "";
                    document.getElementById('priority').value = "";
                    document.getElementById('remark').value = "";
                }

                tabTrigger.show();
            })
        })
    }, 500 );

    return html;
}
