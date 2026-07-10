// main.js or account-code-search.js
import { renderBlacklistInquiryTab } from "./blacklistTabs/inquiryTab.js";
import { renderCTOSTab } from "./blacklistTabs/ctosTab.js";
import { renderInternalBlackListTab  } from "./blacklistTabs/internalBlacklistTab.js";
import { renderInternalBlackListAdminTab  } from "./blacklistTabs/internalBlacklistAdminTab.js";
// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";
import { logEvent } from '../logEvent.js';


export async function BlackListMain() {

    const allowedPages = window.allowed_pages;
    const hasInquiryAccess = allowedPages.includes('4001');
    const hasCtosAccess = allowedPages.includes('4002');
    const hasInternalBlackListFraudAccess = allowedPages.includes('4003');
    const hasInternalBlackListAdminAccess = allowedPages.includes('4004');

    const inquiryTab = hasInquiryAccess
        ? `<li class="nav-item" role="presentation">
                <button class="nav-link active" id="btn-inquiry-tab" data-bs-toggle="tab" data-bs-target="#inquiry-tab" type="button" role="tab" aria-controls="inquiry-tab" aria-selected="true" data-parent="Blacklist">Inquiry</button>
            </li>`
        : ''; 

    const ctosTab = hasCtosAccess
        ? `<li class="nav-item" role="presentation">
            <button class="nav-link" id="btn-ctos-tab" data-bs-toggle="tab" data-bs-target="#ctos-tab" type="button" role="tab" aria-controls="ctos-tab" aria-selected="true" data-parent="Blacklist">CTOS</button>
        </li>`
        : '';

    const internalBlackListFraudTab = hasInternalBlackListFraudAccess
        ? `<li class="nav-item" role="presentation">
            <button class="nav-link" id="btn-internal-blacklist-tab" data-bs-toggle="tab" data-bs-target="#internal-blacklist-tab" type="button" role="tab" aria-controls="internal-blacklist-tab" aria-selected="false" data-parent="Blacklist">Internal Blacklist (Fraud)</button>
        </li>`
        : '';
    
    const internalBlackListAdminTab = hasInternalBlackListAdminAccess
        ? `<li class="nav-item" role="presentation">
            <button class="nav-link" id="btn-internal-blacklist-admin-tab" data-bs-toggle="tab" data-bs-target="#internal-blacklist-admin-tab" type="button" role="tab" aria-controls="internal-blacklist-admin-tab" aria-selected="false" data-parent="Blacklist">Internal Blacklist (Admin)</button>
        </li>`
        : '';

    // Render all tabs
    const inquiryHtml = hasInquiryAccess ? await renderBlacklistInquiryTab() : '';
    const ctosHtml = hasCtosAccess ? await renderCTOSTab() : '';
    const internalBlacklistHtml = hasInternalBlackListFraudAccess ? await renderInternalBlackListTab() : '';
    const internalBlacklistAdminHtml = hasInternalBlackListAdminAccess ? await renderInternalBlackListAdminTab() : '';

    logEvent('info', 'Visit Blacklist page');

    const html =  `
        <section class="container-fluid section-blacklist">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="blackListTabs" role="tablist">
                        ${inquiryTab}
                        ${ctosTab}
                        ${internalBlackListFraudTab}
                        ${internalBlackListAdminTab}
                        
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${inquiryHtml}
                ${ctosHtml}
                ${internalBlacklistHtml}
                ${internalBlacklistAdminHtml}
            </div>
        </section>
    `;



    return html;
}
