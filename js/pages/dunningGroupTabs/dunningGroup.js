import * as bootstrap from 'bootstrap'; // Add this at the top
import { loadDunningGroupTable } from "./functions/functions.js";
import { renderDunningGroupTable } from "./components/renderDunningGroupTable.js" 
import { renderCampaignTable } from "./components/renderCampaignTable.js" 

export async function renderDunningGroupTab(activeTab) {

    const dunningGroupTable = await renderDunningGroupTable();
    const campaignTable = await renderCampaignTable();

    const html =  `
        <div class="tab-pane  ${activeTab === 'dunning' ? 'show active' : ''}" id="dunning-group-tab" role="tabpanel" aria-labelledby="dunning-group-tab">
            <div class="container-fluid dunning-group">
                <h1>Dunning Group</h1>
                ${dunningGroupTable}
                <hr />
                ${campaignTable}
            </div>
        </div>
    `;

    return html
}