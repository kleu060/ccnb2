// main.js or account-code-search.js
import { getAccount, getAccountActionHistory } from "../api/account-api.js";
import { renderAccountTab } from "./accountSearchCodeTabs/accountTab.js";
import { renderCollectTab } from "./accountSearchCodeTabs/collectTab.js";
import { renderUpdateTab } from "./accountSearchCodeTabs/updateTab.js";

// import { renderUpdateTab  } from "./accountSearchCodeTabs/collectTab.js";
// import { renderAgentSummaryTab } from "./accountSearchCodeTabs/agentSummaryTab.js";

// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";
import { logEvent } from '../logEvent.js';

export async function account() {

    logEvent('info', 'Visit Account page');

    // const allowedPages = window.allowed_pages;
    // const hasAccountAccess = allowedPages.includes('2003');   
    // const hasCollectAccess = allowedPages.includes('2004');     //Collect
    // const hasAgentSummaryAccess = allowedPages.includes('2004');    //Update
    // const hasUpdateAccess = allowedPages.includes('2005');          //Update


    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accountNo = params.get('account_code') || '';
    // const account = await getAccount(accountNo);
    // const actions = await getAccountActionHistory(accountNo);


    
    const collectTab = `<li class="nav-item" role="presentation">
            <button class="nav-link" id="btn-collect-tab" data-bs-toggle="tab" data-bs-target="#collect-tab" type="button" role="tab" aria-controls="collect-tab" aria-selected="false" data-parent="Account Inquiry">Collect</button>
        </li>`;


    
    // Render all tabs content
    // const accountTabHtml = hasAccountAccess ? await renderAccountTab() : '';
    const collectHtml = await renderCollectTab();
    // const updateHtml = hasUpdateAccess ? await renderUpdateTab() : '';
    // const agentUpdateTabHtml = hasAgentUpdateAccess ? await renderAgentUpdateTab() : '';
    // const updateHtml = hasUpdateAccess ? await renderUpdateTab() : '';

    const html = `
        <section class="container-fluid account-code-section">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        ${collectTab}
               
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${collectHtml}
            </div>
        </section>
    `;

    setTimeout(function(){
        const btnCollectTab = document.getElementById("btn-collect-tab");
        btnCollectTab.click();

        const collectAccountEnquiryAccCodeFormAccCode = document.getElementById("collect-account-enquiry-acc-code-form-acc-code");
        collectAccountEnquiryAccCodeFormAccCode.value = accountNo;

        document.getElementById("collect-btn-submit-account-enquiry-acc-code-form").click();

    }, 500);

    return html;
}
