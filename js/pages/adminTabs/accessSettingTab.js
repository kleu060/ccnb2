import { API_BASE } from '../../config.js';
import { PAGES } from '../../variables.js';
import { getGroups, getGroupAccess } from "./functions/functions.js";
import { fetchAPI } from '../../api/fetch-api.js';




export async function renderAccessSettingTab() {
    // console.log(JSON.parse(groups.response));
    // console.log(JSON.parse(groupAccess.response));

    const groups =  await getGroups();
    const groupAccess = await getGroupAccess();  

    console.log("group access");
    console.log(groupAccess);

    // const groups = [];
    // const groupAccess = [];
    const html =  `
        <div class="tab-pane fade" id="access-setting-tab" role="tabpanel" aria-labelledby="access-setting-tab">
            <div class="alert alert-primary d-none" id="update-access-list-response-message">
            </div>
            <table class="table" id="access-list-table">
                <thead>
                    <tr>    
                        <th>&nbsp;</th>
                        ${Object.entries(PAGES).map(([id, name]) => `
                            <th>${name}</th>
                        `).join('')}
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through your Groups data array to create rows -->
                    ${groups.map((group) => {
                        // Find the matching permission list for the current group row
                        const matchingAccess = groupAccess.find(access => access.group_id === group.group_id);
                        // const assignedPages = matchingAccess ? matchingAccess.page_code : [];
                        const assignedPages = matchingAccess ? matchingAccess.page_code.map(String) : [];

                        return `
                            <tr>
                                <th scope="row">${group.group_name}</th>
                                <!-- Loop through the same PAGES keys to build matching columns -->
                                ${Object.entries(PAGES).map(([pageCode, pageName]) => {
                                    // Check if the current page code exists in the group's permission array
                                    const isChecked = assignedPages.includes(pageCode) ? 'checked' : '';
                                    
                                    return `
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                id="access-${group.group_id}-${pageCode}" 
                                                data-group-id="${group.group_id}" 
                                                data-page-code="${pageCode}"
                                                ${isChecked}
                                                class="chk-access-group-${group.group_id}" 
                                            />
                                        </td>
                                    `;
                                }).join('')}
                                <td>
                                    <button type="button" class="btn-update-access-list btn btn-primary" data-group-id="${group.group_id}">Update</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>`;

        setTimeout(function() {

            const accessListtable = document.getElementById("access-list-table");

            accessListtable.addEventListener('click', async (e) => {
                
                const updatAccessListResponseMessage = document.getElementById("update-access-list-response-message");

                updatAccessListResponseMessage.classList.remove("d-none");
                updatAccessListResponseMessage.classList.remove("alert-primary");
                updatAccessListResponseMessage.classList.remove("alert-danger");

                const button = e.target.closest('.btn-update-access-list');
            
                const groupId = button.dataset.groupId;
                const pageCode = Array.from(
                    document.querySelectorAll(`.chk-access-group-${groupId}:checked`), 
                    checkbox => checkbox.dataset.pageCode
                );

                const body = {
                    groupId,
                    pageCode,
                };
            
                const url = `${API_BASE}/index.php?endpoint=edit_access_list`;
                const responseJson = await fetchAPI(url, body);
                console.log(responseJson);
                
                if ( responseJson.success == true ) {
                    const serverResponse = JSON.parse(responseJson.response);
                    if (serverResponse.error_code == 0) {
                        updatAccessListResponseMessage.classList.add("alert-primary");
                        updatAccessListResponseMessage.innerHTML = "Access List updated Successfully";
                    }
                    else {
                        updatAccessListResponseMessage.classList.add("alert-danger");
                        updatAccessListResponseMessage.innerHTML = "Access List updated fail - ". serverResponse.error_description;
                    }
                }
                else {
                    updatAccessListResponseMessage.classList.add("alert-danger");
                    updatAccessListResponseMessage.innerHTML = "Access List updated fail - Serer Error";
                }
                

            });
        }, 0);


    return html;
}