import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../../js/api/fetch-api.js';

export async function renderDunningGroupCreateVersionForm() {

    const type = "Dunning";
    const body = {type};
    const url = `${API_BASE}/getMapping.php`;
    const dunningConstantJson  = await fetchAPI(url, body);
    const dunningGroupStatus = dunningConstantJson.Status;

    // 1. Generate the options template string from the object values
    const statusOptionsHtml = Object.values(dunningGroupStatus)
        .map(status => `<option value="${status.ID}">${status.DISPLAY}</option>`)
        .join('');

    const html = `
     
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h2>Create Dunning Group Version</h2>
                    <div class="mb-3">Dunning Group: <span class="fw-bold" id="create-dunning-group-version-title">Mass_UHVC</span></div>

                    <form id="create-dunning-group-version-form">
                        <input type="hidden" id="create-dunning-group-version-dunning-id" name="dunning_id" value="" />
                        <input type="hidden" id="create-dunning-group-version-dunning-priority" name="priority" value="" />
                        <input type="hidden" id="create-dunning-group-version-dunning-name" name="name" value="" />
                        <div class="col-6">
                            <div class="mb-1 field-group">
                                <label>Version</label>
                                <input type="text" name="version">
                            </div>
                            <div class="mb-1 field-group">
                                <label>Status</label>
                                <select id="select-version-status" name="status">
                                    ${statusOptionsHtml}
                                </select>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Remark</label>
                                <textarea id="remark" name="remark"></textarea>
                            </div>
                            <div class="error-message mb-1" id="create-dunning-group-version-message"></div>
                            <div class="row">
                                <div>
                                    <input type="submit" class="btn btn-primary">
                                    <button type="button" class="btn btn-secondary" id="btn-create-dunning-group-version-form-back">Back</button>
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    `;
    
    return html;

}
