// main.js or account-code-search.js
import { renderDunningGroupTab } from "./dunningGroupTabs/dunningGroup.js";
import { renderDunningGroupSetupTab } from "./dunningGroupTabs/dunningGroupSetupTab.js";
// import { renderDunnnigGroupCampaignSetupTab  } from "./dunningGroupTabs/dunningGroupCampaignSetupTab.js";
import { renderCreateDunningTab  } from "./dunningGroupTabs/createDunningGroupTab.js";
import { loadDunningGroupTable } from "./dunningGroupTabs/functions/functions.js";

import * as bootstrap from 'bootstrap';

export async function DunningGroupMain() {

    // Render all tabs
    const dunningGroupHtml = await renderDunningGroupTab();
    const dunningGroupSetupHtml = await renderDunningGroupSetupTab();
    // const campaignSetupHtml = await renderDunnnigGroupCampaignSetupTab();
    const createDunningTab = await renderCreateDunningTab();

    const html = `
        <section class="container-fluid section-blacklist">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="dunningGroupTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-dunning-group-tab" data-bs-toggle="tab" data-bs-target="#dunning-group-tab" type="button" role="tab" aria-controls="dunning-group-tab" aria-selected="true">Dunning Group/Campaign</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-dunning-group-setup-tab" data-bs-toggle="tab" data-bs-target="#dunning-group-setup-tab" type="button" role="tab" aria-controls="dunning-group-setup-tab" aria-selected="true">Dunning Group Setup</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-create-dunning-group-tab" data-bs-toggle="tab" data-bs-target="#create-dunning-group-tab" type="button" role="tab" aria-controls="create-dunning-group-tab" aria-selected="true">Create Dunning Group</button>
                        </li>

                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AccountTabContent">
                ${dunningGroupHtml}
                ${dunningGroupSetupHtml}
                ${createDunningTab}
            </div>
        </section>
    `;

    setTimeout(function () {
        var triggerTabList = [].slice.call(document.querySelectorAll('#dunningGroupTab button'))
        triggerTabList.forEach(function (triggerEl) {
            var tabTrigger = new bootstrap.Tab(triggerEl)

            triggerEl.addEventListener('click', function (event) {
                event.preventDefault();

                console.log(triggerEl.id);
                console.log("tab click");

                if ( triggerEl.id == "btn-dunning-group-tab" ) {
                    loadDunningGroupTable(false);
                }

                if ( triggerEl.id == "btn-dunning-group-setup-tab" ){
                    loadDunningGroupTable(true);

                    const dunningGroupSetupSection = document.getElementById('dunning-group-setup-section');
                    const campaignListSetupTableSection = document.getElementById('dunning-group-version-table-section');
                    // const dunningGroupCreateFormSection = document.getElementById('dunning-group-create-form-section');
                    const dunningVersionEditFormSection = document.getElementById('dunning-version-edit-form-section');

                    dunningGroupSetupSection.classList.remove("d-none");
                    campaignListSetupTableSection.classList.remove("d-none");
                    // dunningGroupCreateFormSection.classList.add("d-none");
                    dunningVersionEditFormSection.classList.add("d-none");
                }

                tabTrigger.show();
            })
        })
    }, 500 );

    return html;
}
