import { fetchAPI } from '../../../../api/fetch-api.js';
import { API_BASE } from '../../../../config.js';

export async function renderEditAgentModal() {

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
        <div class="modal" id="edit-agent-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form name="edit-agent-form" id="edit-agent-form">
                        <input type="hidden" name="id" id="agent-id" value="" />
                        <div class="modal-header">
                            <h2>edit Agent</h2>
                        </div>
                        <div class="modal-body">

                            <div class="mb-1 field-group">
                                <label>Name</label>
                                <select id="user-for-agent-edit" name="user_id">
                                    <option value=""></option>
                                </select>                            
                            </div>
                            <div class="mb-1 field-group">
                                <label>Caller ID</label>
                                <input type="text"  name="caller_id" id="caller-id-edit" value=""/>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Call Group</label>
                                <select id="callgroup-id-edit" name="callgroup_id">
                                    ${callGroupOptions}
                                </select>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Team ID</label>
                                <input type="number" min="0" max="99" name="team" id="team-id-edit" value="" placeholder="0-99"/>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Status</label>
                                <select name="status" id='agent-status-edit'>
                                    ${agentStatusesOptions}
                                </select>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Remark</label>
                                <textarea id="agent-remark-edit" name="remark"></textarea>
                            </div>
                            <div>
                                <div id="edit-agent-form-message" class="error-message"></div>
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
