// Page 601, DCA > DCA Campaign
import { renderDcaCampaignTable } from "./components/functions.js";

export async function renderDcaCampaignTab(activeTab) {
    const html =  `
        <div class="tab-pane fade show active" id="dca-campaign-tab" role="tabpanel" aria-labelledby="dca-campaign-tab">
            <div class="container-fluid" id="dca-campaign-section">
                <div class="card">
                    <div class="card-header">
                        <h1>DCA Campaign</h1>
                    </div>
                    <div class="card-body">
                        <div>
                            <table id="dca-campaign-table">
                                <thead >
                                    <tr id="dca-campaign-table-header"></tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    `;

    setTimeout(async function(){
        await renderDcaCampaignTable();
    }, 1000)

    return html;
}
``