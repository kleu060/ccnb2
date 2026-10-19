import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';
import { getDunningGroups } from '../functions/functions.js';

import TomSelect from 'tom-select';

export async function renderCreateDunningGroupForm() {

    
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

    const html = `
        <div class="create-dunning-group-form-form mb-2">
            <div class="card">
                <div class="card-header">
                    <h2>Create Dunning Group</h2>
                </div>
                <div class="card-body">
                    <form id="create-dunning-group-form">
                        <div class="mb-1 field-group">
                            <label>Dunning Group Name</label>
                            <input type="text" name="name" id="dunning-group-name"/>

                        </div>

                        <div class="mb-1 field-group">
                            <label>Priority</label>
                            <input type="text" name="priority" id="priority" value=""/>

                        </div>

                        <div class="mb-1 field-group">
                            <label>Remark</label>
                            <textarea name="remark" id="remark" cols="60" rows="10"></textarea>

                        </div>
                        <div id="create-dunning-group-form-error-message" class="mb-3 error-message"></div>

                        <div class="row">
                            <div>
                                <input type="submit" class="btn btn-primary">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="create-campaign-form-container">
            <div class="card">
                <div class="card-header">
                    <h2>Create Campaign</h2>
                </div>
                <div class="card-body">
                    <form id="create-campaign-form">
                        <div class="mb-1 field-group">
                            <label>Campaign Name</label>
                            <input type="text" name="campaign_name" id="campaign-name" value=""/>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Type</label>
                            <select id="campaign-type" name="type" class="form-select-sm">
                                ${campaignTypeOptions}
                            </select>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Dunning Group</label>
                            <select id="campaign-dunning-group" name="dunning_id" class="tomselect-single">
                                ${dunningGroupOptions}
                            </select>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Overdue Days</label>
                            <input type="number" id="campaign-overdue-days" name="overdue_days" value=""/>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Status</label>
                            <select id="campaign-status" name="status" class="form-select-sm">
                                ${campaignStatusOptions}
                            </select>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Validity</label>
                            <input type="text" id="campaign-validity" name="validity" value=""/>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Status</label>
                            <select id="campaign-call-group" name="callgroup" class="form-select-sm">
                                ${callGroupOptions}
                            </select>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Remark</label>
                            <textarea name="remark" id="campaign-remark" cols="60" rows="10"></textarea>
                        </div>

                        <div id="create-campaign-form-error-message" class="mb-3 error-message"></div>

                        <div class="row">
                            <div>
                                <input type="submit" class="btn btn-primary">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    setTimeout(function(){

        const createDunningGroupForm = document.getElementById("create-dunning-group-form");
        const createDunningGroupFormErrorMessage = document.getElementById("create-dunning-group-form-error-message");

        createDunningGroupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(createDunningGroupForm);
            const body = Object.fromEntries(formData.entries());

            const url = `${API_BASE}/dunningGroup.php?endpoint=add_dunning`;
            const response = await fetchAPI(url, body);
            console.log(response.response);

            if ( response.success  ) {
                const result = JSON.parse(response.response);
                if ( result.error_code == 0) {
                    createDunningGroupFormErrorMessage.innerHTML = "Dunning Group created successfully";
                }
                else {
                    createDunningGroupFormErrorMessage.innerHTML = "Dunning Group fail to create. " + response.response.error_description + "(" + response.response.error_code+ ")";
                }
            }
            else {
                const result = JSON.parse(response.response);
                createDunningGroupFormErrorMessage.innerHTML = "Dunning Group fail to create.  "  + result.error_description + "(" + result.error_code+ ")";;
            }
        })

        const createCampaignForm = document.getElementById('create-campaign-form');
        createCampaignForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(createCampaignForm);
            const body = Object.fromEntries(formData.entries());

            const url = `${API_BASE}/dunningGroup.php?endpoint=add_campaign`;
            const response = await fetchAPI(url, body);
            console.log(response.response);

            const createCampaignFormErrorMessage = document.getElementById('create-campaign-form-error-message');
            if ( response.success  ) {
                const result = JSON.parse(response.response);
                if ( result.error_code == 0) {
                    createCampaignFormErrorMessage.innerHTML = "Campaign created successfully";
                }
                else {
                    createCampaignFormErrorMessage.innerHTML = "Dunning Group fail to create. " + response.response.error_description + "(" + response.response.error_code+ ")";
                }
            }
            else {
                const result = JSON.parse(response.response);
                createCampaignFormErrorMessage.innerHTML = "Dunning Group fail to create.  "  + result.error_description + "(" + result.error_code+ ")";;
            }

        });


        // if (document.querySelector('.tomselect')) {
                
        //     new TomSelect('.tomselect', {
        //         create: true, // Allows users to create new items
        //         sortField: {
        //             field: 'text',
        //             direction: 'asc'
        //         },
        //         createOnBlur: true
        //     });
        // }

    },5000)

    return html;
}
