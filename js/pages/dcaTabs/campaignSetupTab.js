// page 603, DCA > Campaign Setup
import * as bootstrap from 'bootstrap'; // Add this at the top

import { renderCampaignSetupTable } from "./components/functions.js";
import { renderCampaignSetupModal }  from '../dunningGroupTabs/components/editCampaignSetupModal.js';

import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';


export async function renderCampaignSetupTab(activeTab) {
    const html =  `
        <div class="tab-pane fade" id="campaign-setup-tab" role="tabpanel" aria-labelledby="campaign-setup-tab">
            <div class="container-fluid" id="campaign-setup-section">
                <div class="card">
                    <div class="card-header">
                        <h1>DCA Campaign Setup</h1>
                    </div>
                    <div class="card-body">
                        <div>
                            <table id="campaign-setup-table">
                                <thead >
                                    <tr id="campaign-setup-table-header"></tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            ` + await renderCampaignSetupModal()+ `
        </div>
        
    `;

    setTimeout(async function(){
        await renderCampaignSetupTable(true);

        const type = "Dunning";
        const body = {type};
        const url = `${API_BASE}/getMapping.php`;
        const dunningConstantJson  = await fetchAPI(url, body);
        const campaignType = dunningConstantJson.Campaign.Type;

        //.btn-edit-campaign-setting

        const campaignSetupTable = document.getElementById('campaign-setup-table');

        const editCampaignSettingModalElement = document.getElementById("edit-campaign-setting-modal");
        const editCampaignSettingModal = new bootstrap.Modal(editCampaignSettingModalElement);

        campaignSetupTable.addEventListener("click", async(e) => {
            const btnEditCampaignSetting = e.target.closest('.btn-edit-campaign-setting');
            if (btnEditCampaignSetting) {
                document.getElementById('campaign-setup-error-message').innerHTML = "";
                const campaignId = btnEditCampaignSetting.dataset.campaignId;
                const url = `${API_BASE}/dunningGroup.php?endpoint=view_dca_campaign&campaign_id=${campaignId}`;
                const result = await fetchAPI(url);
                console.log(result);
                const responseJson = JSON.parse(result.response);

                const typeObj = Object.values(campaignType).find(s => s.ID === Number(responseJson.type));
                const typeDisplay = typeObj ? typeObj.DISPLAY : (responseJson.status ?? "0");

                document.getElementById('hidden_campaign_setup_campaign_id').value = campaignId;
                document.getElementById('hidden_campaign_setup_type').value = 2;
                document.getElementById('campaign_setup_campaign_id').innerHTML = campaignId;
                document.getElementById('campaign_setup_campaign_name').innerHTML = responseJson.campaign_name;
                document.getElementById('campaign_setup_type').innerHTML = typeDisplay;
                document.getElementById('campaign_setup_dunning_group').value = responseJson.dunning_id;
                document.getElementById('campaign_setup_overdue_days').value = responseJson.overdue_days;
                document.getElementById('campaign_setup_status').value = responseJson.status;
                document.getElementById('campaign_setup_validity').value = responseJson.validity;
                document.getElementById('campaign_setup_callgroup').value = responseJson.callgroup;
                document.getElementById('campaign_setup_remark').value = responseJson.remark;

                editCampaignSettingModal.show();
            }
        });

        const campaignSetupForm = document.getElementById('campaign-setup-form');
        campaignSetupForm.addEventListener('submit', async(e) => {
            e.preventDefault();
            document.getElementById('campaign-setup-error-message').innerHTML = "";
            const formData = new FormData(campaignSetupForm);
            const body = Object.fromEntries(formData.entries());
            const url = `${API_BASE}/dunningGroup.php?endpoint=edit_dca_campaign`;
            try {
                const result = await fetchAPI(url, body);
                if ( result.success == true ) {
                    const response = JSON.parse(result.response);
                    if ( response.error_code == 0 ) {
                        document.getElementById('campaign-setup-error-message').innerHTML = "Campaign update successfully";

                        await renderCampaignSetupTable(true);
                    }
                    else {
                        document.getElementById('campaign-setup-error-message').innerHTML = "Campaign update failed - "+ response.error_description;
                    }
                }
                else {
                    document.getElementById('campaign-setup-error-message').innerHTML = "Campaign update failed - server error";
                }
            }
            catch (error) {
                document.getElementById('campaign-setup-error-message').innerHTML = "Campaign update failed - " + error;
            }
        });
    }, 1000)

    return html;
}
``