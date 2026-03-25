// main.js or account-code-search.js
import { renderCampaignListTab } from "./dcaAgencyTabs/campaignListTab.js";
import { renderDownloadTab } from "./dcaAgencyTabs/downloadTab.js";
import { renderUploadDispositionTab } from "./dcaAgencyTabs/uploadDispositionTab.js";

// import { renderAgentUpdateTab, initAgentUpdateTab } from "./tabs/agent-update-tab.js";
// import { renderAgentSummaryTab, initAgentSummaryTab } from "./tabs/agent-summary-tab.js";


export async function DcaAgencyMain() {

    // Render all tabs
    const campaignListHtml = await renderCampaignListTab();
    const downloadHtml = await renderDownloadTab();
    const uploadDispositionHtml = await renderUploadDispositionTab();

    return `
        <section class="container-fluid debtor-information">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">

                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-campaign-list-tab" data-bs-toggle="tab" data-bs-target="#campaign-list-tab" type="button" role="tab" aria-controls="campaign-list-tab" aria-selected="false">Camapign List</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-download-tab" data-bs-toggle="tab" data-bs-target="#download-tab" type="button" role="tab" aria-controls="download-tab" aria-selected="false">Download</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-upload-disposition-tab" data-bs-toggle="tab" data-bs-target="#upload-disposition-tab" type="button" role="tab" aria-controls="upload-disposition-tab" aria-selected="false">Download Disposition</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${campaignListHtml}
                ${downloadHtml}
                ${uploadDispositionHtml}

            </div>
        </section>
    `;
}
