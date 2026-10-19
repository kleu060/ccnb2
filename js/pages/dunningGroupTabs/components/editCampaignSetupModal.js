import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';
import { getDunningGroups } from '../functions/functions.js';


export async function renderCampaignSetupModal() {
    
    const type = "Dunning";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const dunningJson  = await fetchAPI(url, body);
    const callGroupMapping = dunningJson.CallGroup;

    const callGroupOptions = Object.entries(callGroupMapping)
        .map(([key, value]) => {
            // Capitalise the first letter and lower-case the rest for a cleaner label
            const label = key.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            return `<option value="${value.ID}">${label}</option>`;
        })
        .join('');

    const campaign = dunningJson.Campaign;
    
    const campaignStatus = dunningJson.Campaign.Status;
    const campaignStatusOptions = Object.entries(campaignStatus)
        .map(([key, value]) => {
            // Capitalise the first letter and lower-case the rest for a cleaner label
            const label = key.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            return `<option value="${value.ID}">${label}</option>`;
        })
        .join('');

    const campaignType = dunningJson.Campaign.Type;
    const campaignTypeOptions = Object.entries(campaignType)
        .map(([key, value]) => {
            // Capitalise the first letter and lower-case the rest for a cleaner label
            const label = key.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            return `<option value="${value.ID}">${label}</option>`;
        })
        .join('');

    let dunningGroupOptions = "";
    const dunningGroups = await getDunningGroups();
    for (const dg of dunningGroups) {
        dunningGroupOptions += `<option value="${dg.id}">${dg.name}</option>`;
    }


const html = `<div class="modal" id="edit-campaign-setting-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Edit Campaign Setup</h2>
                    </div>
                    <div class="modal-body">
                        <form id="campaign-setup-form">
                            <input type="hidden" name="id" id="hidden_campaign_setup_campaign_id"/>
                            <input type="hidden" name="type" id="hidden_campaign_setup_type" value="1"/>
                            <div class="mb-1 field-group">
                                <label>ID</label>
                                <span id="campaign_setup_campaign_id"></span> 
                            </div>
                            <div class="mb-1 field-group">
                                <label>Campaign Name</label>
                                <span id="campaign_setup_campaign_name"></span>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Type</label>
                                <span id="campaign_setup_type">1</span>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Dunning Group</label>
                                <select id="campaign_setup_dunning_group" name="dunning_group">
                                    ${dunningGroupOptions}
                                </select>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Overdue days</label>
                                <input type="text" name="overdue_days" id="campaign_setup_overdue_days" value="114"/>
                            </div>
                            <div class="mb-1 field-group">
                                <label>status</label>
                                <select name="status" id="campaign_setup_status">
                                    ${campaignStatusOptions}
                                </select>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Validity</label>
                                <input type="text" name="validity" id="campaign_setup_validity" value=""/>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Call Group</label>
                                <select name="callgroup" id="campaign_setup_callgroup">
                                    ${callGroupOptions}
                                </select>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Remark</label>
                                <textarea name="remark" id="campaign_setup_remark"></textarea>
                            </div>
                            <div id="campaign-setup-error-message" class="mb-3 error-message"></div>
                            <div>
                                <button type="submit" class="btn btn-primary" id="btn-campaign-setup-form-submit">Submit</button>
                                <button type="button" class="btn btn-secondary" id="btn-campaign-setup-form-close"  data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

        return html
}