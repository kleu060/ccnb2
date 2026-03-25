// main.js or account-code-search.js
import { renderCampaignSetupTab } from "./dcaTabs/campaignSetupTab.js";
import { renderCampaignListTab } from "./dcaTabs/campaignListTab.js";
import { renderDcaProfileTab } from "./dcaTabs/dcaProfileTab.js";
import { renderAccounntInquiryTab } from "./dcaTabs/accountInquiryTab.js";

// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";


export async function DcaMain() {

    // Render all tabs
    const campaignSetupHtml = await renderCampaignSetupTab();
    const campaignListHtml = await renderCampaignListTab();
    const dcaProfileHtml = await renderDcaProfileTab();
    const accountInquiryHtml = await renderAccounntInquiryTab();

    return `
        <section class="container-fluid debtor-information">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-campaign-setup" data-bs-toggle="tab" data-bs-target="#campaign-setup-tab" type="button" role="tab" aria-controls="campaign-setup" aria-selected="true">Campaign Setup</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-campaign-list-tab" data-bs-toggle="tab" data-bs-target="#campaign-list-tab" type="button" role="tab" aria-controls="campaign-list-tab" aria-selected="false">Camapign List</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-dca-profile-tab" data-bs-toggle="tab" data-bs-target="#dca-profile-tab" type="button" role="tab" aria-controls="dca-profile-tab" aria-selected="false">DCA Profile</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-account-inquiry-tab" data-bs-toggle="tab" data-bs-target="#account-inquiry-tab" type="button" role="tab" aria-controls="account-inquiry-tab" aria-selected="false">Account Inquiry</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${campaignSetupHtml}
                ${campaignListHtml}
                ${dcaProfileHtml}
                ${accountInquiryHtml}

            </div>
        </section>
    `;
}
