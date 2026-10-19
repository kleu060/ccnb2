import {loadCampaignTable } from './functions/functions.js';

export async function renderCampaignListTab() {

    const html =  `
        <div class="tab-pane fade show active" id="campaign-list-tab" role="tabpanel" aria-labelledby="campaign-setup-tab">
            <div class="card">
                <div class="card-body">
                    <table id="dca-agency-campaign-table">
                    </table>

                    <div class="mb-2">   
                        <select class="form-select form-select-sm w-auto d-inline-block me-1">
                            <option>One of last 6 months</option>
                        </select>
                        <button class="btn btn-primary">Download Payment</button>
                    </div>

                    <div>
                        <button class="btn btn-primary">Pullback List</button>
                    </div>
                </div>
            </div>
        </div>`;

    
    setTimeout( function(){
        loadCampaignTable();
    }, 500);

    return html;
}