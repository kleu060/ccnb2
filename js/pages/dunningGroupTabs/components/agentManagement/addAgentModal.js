import { fetchAPI } from '../../../../api/fetch-api.js';
import { API_BASE } from '../../../../config.js';

export async function renderAddAgentModal() {

    const type = "Dunning";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const DunningJson  = await fetchAPI(url, body);
    const callGroups  = DunningJson.CallGroup;
    const agentStatuses  = DunningJson.Agent.Status;

    let callGroupOptions = Object.values(callGroups).map(callGroup => `
        <option value="${callGroup.ID}">${callGroup.DISPLAY}</option>
    `).join('');

    let agentStatusesOptions = Object.values(agentStatuses).map(agentStatuse => `
        <option value="${agentStatuse.ID}">${agentStatuse.DISPLAY}</option>
    `).join('');

    const html = `
        <div class="modal" id="add-agent-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form name="add-agent-form" id="add-agent-form">

                        <div class="modal-header">
                            <h2>Add Agent</h2>
                        </div>
                        <div class="modal-body">

                            <div class="mb-1 field-group">
                                <label>Name</label>
                                <select id="user-for-agent-add" name="user_id">
                                    <option value=""></option>
                                </select>                            
                            </div>
                            <div class="mb-1 field-group">
                                <label>Caller ID</label>
                                <input type="text" id="caller_id_edit" name="caller_id" value=""/>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Call Group</label>
                                <select id="callgroup-id-add" name="callgroup_id">
                                    ${callGroupOptions}
                                </select>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Team ID</label>
                                <input type="number" min="0" max="99" name="team_id" id="add-agent-team-id" value="" placeholder="0-99"/>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Status</label>
                                <select name="status">
                                    ${agentStatusesOptions}
                                </select>
                            </div>
                            <div>
                                <div id="add-agent-form-message" class="error-message"></div>
                            </div>
                        </div>

                        <div class="modal-footer gap-2">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    return html;
}
