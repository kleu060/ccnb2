// main.js or account-code-search.js
import { renderCTOSTab } from "./blacklistTabs/ctosTab.js";
import { renderETRTab } from "./blacklistTabs/etrTab.js";
import { renderInternalBlackListTab  } from "./blacklistTabs/internalBlacklistTab.js";
// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";


export async function BlackListMain() {

    // Render all tabs
    const ctosHtml = await renderCTOSTab();
    const etrHtml = await renderETRTab();
    const internalBlacklistHtml = await renderInternalBlackListTab();

    return `
        <section class="container-fluid debtor-information">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-ctos-tab" data-bs-toggle="tab" data-bs-target="#ctos-tab" type="button" role="tab" aria-controls="ctos-tab" aria-selected="true">CTOS</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-etr-tab" data-bs-toggle="tab" data-bs-target="#etr-tab" type="button" role="tab" aria-controls="etr-tab" aria-selected="false">ETR</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-internal-blacklist-tab" data-bs-toggle="tab" data-bs-target="#internal-blacklist-tab" type="button" role="tab" aria-controls="internal-blacklist-tab" aria-selected="false">Internal Blacklist</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${ctosHtml}
                ${etrHtml}
                ${internalBlacklistHtml}
            </div>
        </section>
    `;
}
