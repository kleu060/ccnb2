
import { renderCommissionAgentTab  } from "./commissionTabs/createCommissionAgentTab.js";
import { renderCommissionManageTab  } from "./commissionTabs/createCommissionManageTab.js";
import { renderCommissionSetupTab  } from "./commissionTabs/createCommissionSetupTab.js";
import { renderExtraCommissionTab  } from "./commissionTabs/createExtraCommissionTab.js";
import { loadCommissionAgentTable, loadCommissionManageTable, loadCommissionSetupTable, loadCommissionExtraTable } from "./commissionTabs/functions/functions.js";

export async function Commission() {

    const allowedPages = window.allowed_pages;
    const hasCommissionAgentAccess = allowedPages.includes('8001');   
    const hasCommissionManageAccess = allowedPages.includes('8002');
    const hasCommissionSetupAccess = allowedPages.includes('8003');
    const hasExtraComissionAccess = allowedPages.includes('8004');

    // Determine which specific tab should be active based on priority order
    const activeTab = hasCommissionAgentAccess ? 'agent' 
                    : hasCommissionManageAccess ? 'manage' 
                    : hasCommissionSetupAccess ? 'setup' 
                    : hasExtraComissionAccess ? 'extra' 
                    : 'agent';

    
    const commissionAgentTab = hasCommissionAgentAccess
    ? `<li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'agent' ? 'active' : ''}" id="btn-commission-agent-tab" data-bs-toggle="tab" data-bs-target="#commission-agent-tab" type="button" role="tab" aria-controls="commission-agent-tab" aria-selected="${activeTab === 'agent'}">Agent</button>
        </li>`
    : ''; 

    const commissionManageTab = hasCommissionManageAccess
    ? `<li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'manage' ? 'active' : ''}" id="btn-commission-manage-tab" data-bs-toggle="tab" data-bs-target="#commission-manage-tab" type="button" role="tab" aria-controls="commission-manage-tab" aria-selected="${activeTab === 'manage'}">Manage</button>
        </li>`
    : '';

    const commissionSetupTab = hasCommissionSetupAccess
    ? `<li class="nav-item" role="presentation">
            <button class="nav-link ${activeTab === 'setup' ? 'active' : ''}" id="btn-commission-setup-tab" data-bs-toggle="tab" data-bs-target="#commission-setup-tab" type="button" role="tab" aria-controls="commission-setup-tab" aria-selected="${activeTab === 'setup'}">Setup</button>
        </li>`
    : '';

    const extraCommissionpTab = hasCommissionSetupAccess
    ? `<li class="nav-item pending" role="presentation">
            <button class="nav-link ${activeTab === 'extra' ? 'active' : ''}" id="btn-extra-commission-tab" data-bs-toggle="tab" data-bs-target="#extra-commission-tab" type="button" role="tab" aria-controls="extra-commission-tab" aria-selected="${activeTab === 'setup'}">Extra Commission</button>
        </li>`
    : '';

    // Render all tabs
    const commissionAgentHtml = hasCommissionAgentAccess ? await renderCommissionAgentTab(activeTab) : '';
    const commissionManageHtml = hasCommissionManageAccess ? await renderCommissionManageTab(activeTab) : '';
    const commissionSetupHtml = hasCommissionSetupAccess ? await renderCommissionSetupTab(activeTab) : '';
    const extraCommissionHtml = hasCommissionSetupAccess ? await renderExtraCommissionTab(activeTab) : '';

    const html = `
        <section class="container-fluid commission-section">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="dunningGroupTab" role="tablist">
                        ${commissionAgentTab}
                        ${commissionManageTab}
                        ${commissionSetupTab}
                        ${extraCommissionpTab}

                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${commissionAgentHtml}
                ${commissionManageHtml}
                ${commissionSetupHtml}
                ${extraCommissionHtml}
            </div>
        </section>
    `;

    setTimeout(async function(){
        await loadCommissionAgentTable();
        // await loadCommissionManageTable();
        
        // await loadCommissionExtraTable();


    }, 500);
    return html;
   
}