import * as bootstrap from 'bootstrap'; // Add this at the top

import { renderAgentManagementTable } from "./components/agentManagement/renderAgentManagementTable.js";
import { renderAddAgentModal } from "./components/agentManagement/addAgentModal.js";
import { renderEditAgentModal } from "./components/agentManagement/editAgentModal.js";
import { getUserForAgent, loadAgentManagementTable } from "./functions/functions.js";

import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../../js/api/fetch-api.js';


export async function renderAgentManagementTab(activeTab) {
    const html =  `
            <div class="tab-pane fade ${activeTab === 'agent' ? 'show active' : ''}" id="agent-management-tab" role="tabpanel" aria-labelledby="agent-management-tab">
                <div class="container-fluid">
                    <div class="d-flex gap-2">
                        <h1>Agent Management</h1>
                        <div>
                            <button class="btn btn-primary" id="btn-add-new-agent">Add New Agent</button>
                        </div>
                    </div>
                    <section id="agent-management-section">
                        `+ await renderAgentManagementTable() + `
                    </section>
                    `+ await renderAddAgentModal() +`
                    `+ await renderEditAgentModal() +`
                </div>
            </div>
        `;
        
        setTimeout(function(){

            const editAgentModalElement = document.getElementById("edit-agent-modal");
            const editAgentModal = new bootstrap.Modal(editAgentModalElement);

            const agentManagementTable = document.getElementById('agent-management-table');
            if (agentManagementTable) {
                agentManagementTable.addEventListener('click', async (e) => {
                    
                    // edit Dunning Group
                    const btn = e.target.closest('.btn-edit-agent');
                    if (btn) {
                        const agentId = btn.dataset.agentId;

                        const fetchAgentUrl = `${API_BASE}/dunningGroup.php?endpoint=view_agent&agentId=${agentId}`;
                        const fetchAgentResponse = await fetchAPI(fetchAgentUrl);

                        if ( fetchAgentResponse.success ) {
                            const agent = JSON.parse(fetchAgentResponse.response);
                            const callgroupId = agent.callgroup_id;
                            const userId = agent.user_id;
                            const team = agent.team;
                            const status = agent.status;
                            const caller_id = agent.caller_id;
                            const remark = agent.remark;

                            const options = await getUserForAgentOptions();
                            const userForAgentAdd = document.getElementById('user-for-agent-edit');
                            userForAgentAdd.innerHTML = options;
                            userForAgentAdd.value = userId;

                            document.getElementById('agent-id').value = agentId;
                            document.getElementById('caller-id-edit').value = caller_id;
                            document.getElementById('callgroup-id-edit').value = callgroupId;
                            document.getElementById('team-id-edit').value = team;
                            document.getElementById('agent-status-edit').value = status;
                            document.getElementById('agent-remark-edit').value = remark;

                            editAgentModal.show();   
                        }   
                    }
                });
            }

            const editAgentForm = document.getElementById('edit-agent-form');
            const editAgentFormMessage = document.getElementById('edit-agent-form-message');
            editAgentForm.addEventListener("submit", async(e) => {
                e.preventDefault();
                const formData = new FormData(editAgentForm);
                const body = {
                    id: formData.get('id'),
                    user_id: formData.get('user_id'),
                    caller_id: formData.get('caller_id'),
                    callgroup_id: formData.get('callgroup_id'),
                    team: formData.get('team'),
                    status: formData.get('status'),
                    remark: formData.get('remark'),
                }

                const url = `${API_BASE}/dunningGroup.php?endpoint=edit_agent`;
                const response = await fetchAPI(url, body);
                const responseJson = JSON.parse(response.response);

                if (!response.success) {
                    editAgentFormMessage.innerHTML ="Agent fail to edit -  " + responseJson.error_description;

                }
                else {
                     if (responseJson.error_code != 0 ) {
                        editAgentFormMessage.innerHTML = "Agent fail to edit - " + responseJson.error_description;
                    }
                    else {
                        editAgentFormMessage.innerHTML = "Agent edit successfully";
                    }
                }
            });

            editAgentModalElement.addEventListener('hide.bs.modal', async(e) => {
                await loadAgentManagementTable();
            });


            const addAgentForm = document.getElementById('add-agent-form');
            const addAgentFormMessage = document.getElementById('add-agent-form-message');
            addAgentForm.addEventListener("submit", async(e) => {
                e.preventDefault();
                const formData = new FormData(addAgentForm);
                
                // 1. Initialize structured payload base
                const body = {
                    user_id: formData.get('user_id'),
                    caller_id: formData.get('caller_id'),
                    callgroup_id: formData.get('callgroup_id'),
                    team_id: formData.get('team_id'),
                    status: formData.get('status')
                }

                const url = `${API_BASE}/dunningGroup.php?endpoint=add_agent`;
                const response = await fetchAPI(url, body);
                const responseJson = JSON.parse(response.response);

                if (!response.success) {
                    addAgentFormMessage.innerHTML ="Agent fail to create -  " + responseJson.error_description;

                }
                else {
                     if (responseJson.error_code != 0 ) {
                        addAgentFormMessage.innerHTML = "Agent fail to create - " + responseJson.error_description;
                    }
                    else {
                        addAgentFormMessage.innerHTML = "Agent create successfully";
                    }
                }
            });

            const btnAddNewAgent = document.getElementById('btn-add-new-agent');
            const addAgentModalElement = document.getElementById("add-agent-modal");
            const addAgentModal = new bootstrap.Modal(addAgentModalElement);

            addAgentModalElement.addEventListener('hide.bs.modal', async(e) => {
                await loadAgentManagementTable();
            });

            async function getUserForAgentOptions() {
                const userForAgent = await getUserForAgent();
                console.log("userForAgent: ");
                console.log(userForAgent);
                let html = "";

                userForAgent.forEach(element => {
                    html += `<option value="${element.user_id}">${element.user_name}</option>`;
                });
                console.log(html);
                return html;
            }
            btnAddNewAgent.addEventListener("click", async(e) => {
                const options = await getUserForAgentOptions();
                const userForAgentAdd = document.getElementById('user-for-agent-add');
                userForAgentAdd.innerHTML = options;

                addAgentModal.show();
            });

        }, 500);


    return html;
}
