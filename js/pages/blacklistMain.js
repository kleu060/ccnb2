// main.js or account-code-search.js
import { renderBlacklistInquiryTab } from "./blacklistTabs/inquiryTab.js";
import { renderCTOSTab } from "./blacklistTabs/ctosTab.js";
import { renderInternalBlackListTab  } from "./blacklistTabs/internalBlacklistTab.js";
// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";
import { logEvent } from '../logEvent.js';


export async function BlackListMain() {

    // Render all tabs
    const inquiryHtml = await renderBlacklistInquiryTab();
    const ctosHtml = await renderCTOSTab();
    const internalBlacklistHtml = await renderInternalBlackListTab();

    logEvent('info', 'Visit Blacklist page');

    const html =  `
        <section class="container-fluid section-blacklist">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="blackListTabs" role="tablist">
                       <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-inquiry-tab" data-bs-toggle="tab" data-bs-target="#inquiry-tab" type="button" role="tab" aria-controls="inquiry-tab" aria-selected="true" data-parent="Blacklist">Inquiry</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-ctos-tab" data-bs-toggle="tab" data-bs-target="#ctos-tab" type="button" role="tab" aria-controls="ctos-tab" aria-selected="true" data-parent="Blacklist">CTOS</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-internal-blacklist-tab" data-bs-toggle="tab" data-bs-target="#internal-blacklist-tab" type="button" role="tab" aria-controls="internal-blacklist-tab" aria-selected="false" data-parent="Blacklist">Internal Blacklist</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${inquiryHtml}
                ${ctosHtml}
                ${internalBlacklistHtml}
            </div>
        </section>
    `;



    return html;
}
