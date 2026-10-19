// Page 1002, Admin > Access

import { API_BASE } from '../../config.js';
import { PAGES } from '../../variables.js';
import { getGroups, getGroupAccess } from "./functions/functions.js";
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderAccessSettingTab() {
    // console.log(JSON.parse(groups.response));
    // console.log(JSON.parse(groupAccess.response));

    // const type = "User";
    // const body = {type};
    // const url = `${API_BASE}/getMapping.php`;
    // const UserConstantJson  = await fetchAPI(url, body);
    // const userGroups = UserConstantJson.Group;


    const userGroups =  await getGroups();
    const groupAccess = await getGroupAccess();  

    console.log("group access");
    console.log(groupAccess);

    // const groups = [];
    // const groupAccess = [];
    const html =  `

        <style>
            .table-responsive-container {
                max-width: 100%;
                overflow-x: auto;
                position: relative;
            }
            #access-list-table {
                border-collapse: separate;
                border-spacing: 0;
                width: 100%;
            }
            /* Freeze First Column (Labels) */
            #access-list-table th:first-child,
            #access-list-table td:first-child {
                position: sticky;
                left: 0;
                background-color: #fff;
                z-index: 2;
                border-right: 2px solid #dee2e6;
            }
            /* Freeze Last Column (Buttons) */
            #access-list-table th:last-child,
            #access-list-table td:last-child {
                position: sticky;
                right: 0;
                background-color: #fff;
                z-index: 2;
                border-left: 2px solid #dee2e6;
            }
            /* Keep header above body elements when scrolling vertically/horizontally */
            #access-list-table thead th {
                position: sticky;
                top: 0;
                background-color: #f8f9fa;
                z-index: 1;
            }
            /* Ensure the frozen header cells have a higher priority index stack */
            #access-list-table thead th:first-child,
            #access-list-table thead th:last-child {
                z-index: 3;
            }
        </style>

        <div class="tab-pane fade" id="access-setting-tab" role="tabpanel" aria-labelledby="access-setting-tab">
            
            <div class="row">
                <div class="col-12";
                    <div class="alert alert-primary d-none" id="update-access-list-response-message">
                    </div>
                    <div class="table-responsive-container m-0 p-0">
                        <table class="table" id="access-list-table">
                            <thead>
                                <tr>    
                                    <th class='bg-white'>Page</th>
                                    ${Object.entries(PAGES).map(([id, name]) => `
                                        <th>${name}</th>
                                    `).join('')}
                                    <th class='bg-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Object.entries breaks down the 'Group' object into [key, data] pairs -->
                                ${Object.entries(userGroups).map(([groupKey, groupData]) => {
                                    const groupId = groupData.ID;
                                    const groupName = groupData.NAME;

                                    // Find matching permission list using the numerical ID
                                    const matchingAccess = groupAccess.find(access => access.group_id === groupId);
                                    
                                    // Force string conversion for robust inclusion check against PAGES object keys
                                    const assignedPages = matchingAccess ? matchingAccess.page_code.map(String) : [];

                                    return `
                                    <tr>
                                        <th scope="row" class="bg-white">${groupName}</th>
                                        
                                        <!-- Loop through PAGES keys to build matching checkbox columns -->
                                        ${Object.entries(PAGES).map(([pageCode, pageName]) => {
                                            const isChecked = assignedPages.includes(String(pageCode)) ? 'checked' : '';
                                            
                                            return `
                                            <td>
                                                <input 
                                                    type="checkbox" 
                                                    id="access-${groupId}-${pageCode}" 
                                                    data-group-id="${groupId}" 
                                                    data-page-code="${pageCode}" 
                                                    ${isChecked} 
                                                    class="chk-access-group-${groupId}" 
                                                />
                                            </td>
                                            `;
                                        }).join('')}
                                        
                                        <td class="bg-white">
                                            <button 
                                                type="button" 
                                                class="btn-update-access-list btn btn-primary" 
                                                data-group-id="${groupId}">
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
        }, 1000);


    return html;
}