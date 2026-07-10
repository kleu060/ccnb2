// main.js or account-code-search.js
import { getAccount, getAccountActionHistory } from "../api/account-api.js";
import { renderAccountTab } from "./accountSearchCodeTabs/accountCodeTab.js";
import { renderAgentSummaryTab } from "./accountSearchCodeTabs/agentSummaryTab.js";
import { renderAgentUpdateTab  } from "./accountSearchCodeTabs/agentUpdateTab.js";
// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";
import { logEvent } from '../logEvent.js';

export async function AccountInquiryMain() {

    logEvent('info', 'Visit Account Inquiry page');

    const allowedPages = window.allowed_pages;
    const hasAccountAccess = allowedPages.includes('2003');
    const hasAgentUpdateAccess = allowedPages.includes('2004');
    const hasAgentSummaryAccess = allowedPages.includes('2005');


    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accountNo = params.get('account_code') || '';
    // const account = await getAccount(accountNo);
    const actions = await getAccountActionHistory(accountNo);

    //Render Tabs
    const accountTab = hasAccountAccess 
        ? `<li class="nav-item" role="presentation">
            <button class="nav-link active" id="btn-account-tab" data-bs-toggle="tab" data-bs-target="#account-tab" type="button" role="tab" aria-controls="account-tab" aria-selected="true" data-parent="Account Inquiry">Account</button>
           </li>`
        : '';
    
    const agentUpdateTab = hasAgentUpdateAccess
        ?   `<li class="nav-item" role="presentation">
                <button class="nav-link" id="btn-agent-update-tab" data-bs-toggle="tab" data-bs-target="#agent-update-tab" type="button" role="tab" aria-controls="agent-update-tab" aria-selected="false" data-parent="Account Inquiry">Agent Update</button>
            </li>`
        : '';

    const agentSummaryTab = hasAgentSummaryAccess 
        ?  `<li class="nav-item" role="presentation">
                <button class="nav-link" id="btn-agent-summary-tab" data-bs-toggle="tab" data-bs-target="#agent-summary-tab" type="button" role="tab" aria-controls="agent-summary-tab" aria-selected="false" data-parent="Account Inquiry">Agent Summary</button>
            </li>`
        : '';
    
    // Render all tabs content
    const accountTabHtml = hasAccountAccess ? await renderAccountTab() : '';
    const agentUpdateTabHtml = hasAgentUpdateAccess ? await renderAgentUpdateTab() : '';
    const agentSummaryTabHtml = hasAgentSummaryAccess ? await renderAgentSummaryTab() : '';

    return `
        <section class="container-fluid account-code-section">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        ${accountTab}
                        ${agentUpdateTab}
                        ${agentSummaryTab}                        
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">

                ${accountTabHtml}
                ${agentUpdateTabHtml}
                ${agentSummaryTabHtml}                
            </div>
        </section>
    `;
}
