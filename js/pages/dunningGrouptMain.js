// main.js or account-code-search.js
import { renderCampaignListTab } from "./dunningGroupTabs/campaignList.js";
import { renderDunningGroupSetupTab } from "./dunningGroupTabs/dunningGroupSetupTab.js";
import { renderDunnnigGroupCampaignSetupTab  } from "./dunningGroupTabs/dunningGroupCampaignSetupTab.js";

export async function DunningGroupMain() {

    // Render all tabs
    const campaignListHtml = await renderCampaignListTab();
    const dunningGroupSetupHtml = await renderDunningGroupSetupTab();
    const campaignSetupHtml = await renderDunnnigGroupCampaignSetupTab();

    return `
        <section class="container-fluid section-blacklist">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                       <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-campaign-list-tab" data-bs-toggle="tab" data-bs-target="#campaign-list-tab" type="button" role="tab" aria-controls="campaign-list-tab" aria-selected="true">Campaign List</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-dunning-group-setup-tab" data-bs-toggle="tab" data-bs-target="#dunning-group-setup-tab" type="button" role="tab" aria-controls="dunning-group-setup-tab" aria-selected="true">Dunning Group Setup</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-campaign-setup-tab" data-bs-toggle="tab" data-bs-target="#campaign-setup-tab" type="button" role="tab" aria-controls="campaign-setup-tab" aria-selected="false">Campaign Setup</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${campaignListHtml}
                ${dunningGroupSetupHtml}
                ${campaignSetupHtml}
            </div>
        </section>
    `;
}
