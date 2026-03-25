// main.js or account-code-search.js
import { getAccount, getAccountActionHistory } from "../api/account-api.js";
import { renderAccountTab } from "./accountSearchCodeTabs/accountCodeTab.js";
import { renderAgentSummaryTab } from "./accountSearchCodeTabs/agentSummaryTab.js";
import { renderAgentUpdateTab  } from "./accountSearchCodeTabs/agentUpdateTab.js";
// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";


export async function AccountCodeMain() {

    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accountNo = params.get('account_code') || '';
    const account = await getAccount(accountNo);
    const actions = await getAccountActionHistory(accountNo);

    // Render all tabs
    const accountTabHtml = await renderAccountTab(accountNo, account, actions);
    const agentSummaryTabHtml = await renderAgentSummaryTab();
    const agentUpdateTabHtml = await renderAgentUpdateTab();

    return `
        <section class="container-fluid account-code-section">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-account-tab" data-bs-toggle="tab" data-bs-target="#account-tab" type="button" role="tab" aria-controls="account-tab" aria-selected="true">Account</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-agent-update-tab" data-bs-toggle="tab" data-bs-target="#agent-update-tab" type="button" role="tab" aria-controls="agent-update-tab" aria-selected="false">Agent Update</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-agent-summary-tab" data-bs-toggle="tab" data-bs-target="#agent-summary-tab" type="button" role="tab" aria-controls="agent-summary-tab" aria-selected="false">Agent Summary</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${accountTabHtml}
                ${agentSummaryTabHtml}
                ${agentUpdateTabHtml}
            </div>
        </section>
    `;
}
