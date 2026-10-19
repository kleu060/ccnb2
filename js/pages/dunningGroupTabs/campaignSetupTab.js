// page 504, Dunning Group > Campaign Setup
import * as bootstrap from 'bootstrap'; // Add this at the top

// import { renderCampaignSetupTable } from "./components/campaignSetup.js";
import { loadCampaignListTable, getCampaignData } from "./functions/functions.js";
import { renderCampaignSetupModal }  from './components/editCampaignSetupModal.js';
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../../js/api/fetch-api.js';

export async function renderCampaignSetupTab(activeTab) {
    const html =  `
        <div class="tab-pane fade ${activeTab === 'create' ? 'show active' : ''}" id="campaign-setup-tab" role="tabpanel" aria-labelledby="create-dunning-group-tab">
            <div class="container-fluid" id="campaign-setup-section">
                <h1>Campaign Setup</h1>
                <div>
                    <table id="campaign-list-setup-table">
                         <thead >
                            <tr id="campaign-list-setup-table-header"></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                ` + await renderCampaignSetupModal()+ `
            </div>
        </div>

        
    `;

    setTimeout(async function(){
        await loadCampaignListTable(true);

        //.btn-edit-campaign-setting
        const campaignSetupTable = document.getElementById('campaign-list-setup-table');

        const editCampaignSettingModalElement = document.getElementById("edit-campaign-setting-modal");
        const editCampaignSettingModal = new bootstrap.Modal(editCampaignSettingModalElement);

        campaignSetupTable.addEventListener("click", async(e) => {
            const btnEditCampaignSetting = e.target.closest('.btn-edit-campaign-setting');
            if (btnEditCampaignSetting) {

                const campaignId = btnEditCampaignSetting.dataset.campaignId
                const url = `${API_BASE}/dunningGroup.php?endpoint=view_campaign&campaign_id=${campaignId}`;
                const result = await fetchAPI(url);
                
                console.log(result);
                if (result.success == true) {
                    const response = JSON.parse(result.response);


                    document.getElementById('campaign-setup-error-message').innerHTML = "";
                    // [09-Oct-2026 07:54:07 UTC] [2026-10-09 07:54:07] [INFO] [ko] API response - {"success":true,"response":"{\"id\":1,\"dunning_id\":23,\"dunning_group_name\":\"Ent_60_VOICE\",\"campaign_name\":\"ENT_60_VOICE_DDplus2\",\"status\":1,\"overdue_days\":2,\"validity\":15,\"callgroup\":1,\"type\":1,\"remark\":null}"}

                
                    document.getElementById('hidden_campaign_setup_campaign_id').value = campaignId;
                    document.getElementById('hidden_campaign_setup_type').value = 1;
                    document.getElementById('campaign_setup_campaign_id').innerHTML = campaignId;
                    document.getElementById('campaign_setup_campaign_name').innerHTML = response.campaign_name;
                    document.getElementById('campaign_setup_dunning_group').value = response.dunning_id;
                    document.getElementById('campaign_setup_overdue_days').value = response.overdue_days;
                    document.getElementById('campaign_setup_status').value = response.status;
                    document.getElementById('campaign_setup_validity').value = response.validity;
                    document.getElementById('campaign_setup_callgroup').value = response.callgroup;
                    document.getElementById('campaign_setup_remark').value = response.remark;

                }
               
                editCampaignSettingModal.show();
            }

            const campaignSetupForm = document.getElementById('campaign-setup-form');
            campaignSetupForm.addEventListener('submit', async(e) => {
                e.preventDefault();
                document.getElementById('campaign-setup-error-message').innerHTML = "";
                const formData = new FormData(campaignSetupForm);
                const body = Object.fromEntries(formData.entries());
                const url = `${API_BASE}/dunningGroup.php?endpoint=edit_campaign`;
                try {
                    const result = await fetchAPI(url, body);
                    if ( result.success == true ) {
                        const response = JSON.parse(result.response);
                        if ( response.error_code == 0 ) {
                            document.getElementById('campaign-setup-error-message').innerHTML = "Campaign update successfully";

                            await loadCampaignListTable(true);
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
        });
    }, 1000)

    return html;
}
