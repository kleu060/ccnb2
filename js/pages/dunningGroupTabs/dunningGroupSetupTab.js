import * as bootstrap from 'bootstrap'; // Add this at the top

// import { loadDunningGroupSetupTable } from "./functions/functions.js";
import { renderEditDunningVersionForm } from "./components/editDunningVersionForm.js";
import { renderEditDunningGroupForm } from "./components/editDunningGroupForm.js";
// import { renderCreateDunningGroupForm } from "./components/createDunningGroupForm.js";
import { renderDunningGroupTable } from "./components/renderDunningGroupTable.js" 
import { renderDunningVersionTable } from "./components/renderDunningVersionTable.js" 
// import { renderCampaignTable } from "./components/renderCampaignTable.js" 

import { loadDunningGroupTable, loadDunningVersionTable  } from "./functions/functions.js";

import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../../js/api/fetch-api.js';

import TomSelect from 'tom-select';

export async function renderDunningGroupSetupTab(activeTab) {

    const dunningGroupTable = await renderDunningGroupTable(true);
    const dunningVersionTable = await renderDunningVersionTable();
    // const campaignTable = await renderCampaignTable(true);

    const type = "Dunning";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const DunningJson  = await fetchAPI(url, body);
    const DunningOperators  = DunningJson.OPERATORS;
    const dunningCriteria = DunningJson.CRITERIA;
    const dunningNPSI = DunningJson.NPSI;

    const html =  `
        <div class="tab-pane fade ${activeTab === 'setup' ? 'show active' : ''}" id="dunning-group-setup-tab" role="tabpanel" aria-labelledby="dunning-group-setup-tab">
            <div class="container-fluid">
                <div class="d-flex gap-2 mb-3">
                    <h1>Dunning Group Setup</h1>
                </div>
                <section id="dunning-group-setup-section">
                    ${dunningGroupTable}
                </section>
                <section id="dunning-group-edit-form-section" class="d-none">
                    `+ await renderEditDunningGroupForm() + `
                </section>


                
                <hr />

                <section id="dunning-group-version-table-section">
                    ${dunningVersionTable}
                </section>

                <section id="dunning-version-edit-form-section" class="d-none">
                    `+ await renderEditDunningVersionForm() + `
                </section>

                
            </div>
            
        </div>
    `;

    setTimeout(function(){
            // loadDunningGroupSetupTable();

            const dunningGroupSetupSection = document.getElementById('dunning-group-setup-section');
            const dunningGroupEditFormSection = document.getElementById('dunning-group-edit-form-section');
            // const dunningGroupCreateFormSection = document.getElementById('dunning-group-create-form-section');
            
            
            const btnEditDunningGroupFormBack = document.getElementById('btn-edit-dunning-group-form-back');
            btnEditDunningGroupFormBack.addEventListener("click", async (e) => {
                await loadDunningGroupTable(true);
                dunningGroupSetupSection.classList.remove("d-none");
                dunningGroupEditFormSection.classList.add("d-none");
            });

            const editDunningGroupForm = document.getElementById("edit-dunning-group-form");
            const editDunningGroupFormErrorMessage = document.getElementById("edit-dunning-group-form-error-message");

            editDunningGroupForm.addEventListener("submit", async (e) => {
                 e.preventDefault();

                const formData = new FormData(editDunningGroupForm);
                const body = Object.fromEntries(formData.entries());
                const url = `${API_BASE}/dunningGroup.php?endpoint=edit_dunning`;
                const response = await fetchAPI(url, body);
                console.log(response.response);

                if ( response.success  ) {
                    const result = JSON.parse(response.response);
                    if ( result.error_code == 0) {
                        editDunningGroupFormErrorMessage.innerHTML = "Dunning Group Updated successfully";
                    }
                    else {
                        editDunningGroupFormErrorMessage.innerHTML = "Dunning Group fail to edit. " + response.response.error_description + "(" + response.response.error_code+ ")";
                    }
                }
                else {
                    // const result = JSON.parse(response.response);
                    editDunningGroupFormErrorMessage.innerHTML = "Dunning Group fail to edit.  "  + response.response.error_description + "(" + response.response.error_code+ ")";;
                }
            });

            
            const dunningGroupVersionTableSection = document.getElementById('dunning-group-version-table-section');
            const dunningGroupVersionTable = document.getElementById('dunning-group-version-table');
            const dunningVersionEditFormSection = document.getElementById('dunning-version-edit-form-section');
            
            const tableContainer = document.getElementById('dunning-group-setup-table');
            if (tableContainer) {
                tableContainer.addEventListener('click', async (e) => {
                    
                    // edit Dunning Group
                    const btn = e.target.closest('.btn-edit-dunning-group');
                    if (btn) {

                        const dunningGroupId = btn.dataset.dunningId;
                        const dunningGroupName = btn.dataset.dunningName;
                        const dunningGroupPriority = btn.dataset.dunningPriority;
                        const dunningGroupRemark = btn.dataset.dunningRemark;

                        console.log("dunningGroupName: " + dunningGroupName);

                        const tsInstance = document.getElementById('select-dunning-group-name-edit').tomselect;
                        if (tsInstance) {
                            // Add the new option to the existing instance dataset
                            tsInstance.addOption({ value: dunningGroupName, text: dunningGroupName });
                            
                            // Set it as the active selected item
                            tsInstance.setValue(dunningGroupName);
                        }

                        document.getElementById("dunning-group-id-edit").value = dunningGroupId;
                        document.getElementById("dunning-group-priority-edit").value = dunningGroupPriority;
                        document.getElementById("dunning-group-remark-edit").value = dunningGroupRemark;

                        editDunningGroupFormErrorMessage.innerHTML = "";
                        
                        dunningGroupSetupSection.classList.add("d-none");
                        dunningGroupEditFormSection.classList.remove("d-none");

                        // clearUserData();
                        // const campaignId = btn.getAttribute('data-campaign-id');
                        // updateUserData(user);
                    }

                    

                    const btnDunningGroupViewVersion = e.target.closest('.btn-dunning-group-view-version');
                    if ( btnDunningGroupViewVersion ) {
                        
                        const dunningGroupId = btnDunningGroupViewVersion.dataset.dunningId;
                        const dunningGroupPriority = btnDunningGroupViewVersion.dataset.dunningPriority;
                        const dunningGroupName = btnDunningGroupViewVersion.dataset.dunningGroupName;

                        const dunningGroupIdEditAction = document.getElementById('dunning-group-id-edit-action');
                        dunningGroupIdEditAction.value = "create";

                        // Load the Dunning Group Version table
                        await loadDunningVersionTable(dunningGroupId, dunningGroupPriority, dunningGroupName, true);

                        dunningGroupVersionTableSection.classList.remove("d-none");
                        dunningVersionEditFormSection.classList.add("d-none");
                    }
                });
            }

            

            if (dunningGroupVersionTable) {
                dunningGroupVersionTable.addEventListener('click', async(e) => {
                    // Create Dunning Group Version

                    const showCriteriaBtn = e.target.closest('.show-criteria');
                    if (showCriteriaBtn) {
                        const versionId = showCriteriaBtn.dataset.versionId;
                        const dunningGroupName = showCriteriaBtn.dataset.dunningGroupName;
                        const dunningGroupStatus = showCriteriaBtn.dataset.dunningGroupStatus;

                        document.getElementById('criteria-modal-dunning-group-name').innerHTML = dunningGroupName;
                        document.getElementById('criteria-modal-dunning-group-status').innerHTML = dunningGroupStatus;

                        const modalElement = document.getElementById("criteria-version-modal");
                        const criteriaModal = new bootstrap.Modal(modalElement);

                        const fetchDunningLogicUrl = `${API_BASE}/dunningGroup.php?endpoint=view_dunning_logic&versionId=${versionId}`;
                        const dunningLogicResponse = await fetchAPI(fetchDunningLogicUrl);

                        let criteriaContent = "";
                        if ( dunningLogicResponse.success ) {
                            resetLogicsValue();
                            
                            const dunningLogics = JSON.parse(dunningLogicResponse.response);
                            console.log(dunningLogics);


                            const criteriaVersionTable = document.getElementById('criteria-version-table-body');
                            const npsiList = Object.values(dunningNPSI);
                            const operatorList  =  Object.values(DunningOperators);
                            const criteriaList =  Object.values(dunningCriteria);

                            let criteriaName,operatorName, values,match;
                            dunningLogics.forEach( criteria => {
                                
                                match = criteriaList.find(item => item.ID == criteria.criteria);
                                criteriaName = match ? match.DISPLAY : "";

                                match = operatorList.find(item => item.ID == criteria.operator);
                                operatorName = match ? match.DISPLAY : "";

                                values = criteria.values;
                                if (criteria.criteria == 9 ) { // NPSI
                                    values = criteria.values.map(savedId => {
                                        // Find the matching item in dunningNPSI by comparing IDs
                                        const match = npsiList.find(item => item.ID == savedId);
                                        return match ? match.DISPLAY : savedId;
                                    }).join(', ');

                                }

                                criteriaContent += `
                                    <tr>
                                        <td>
                                            ${criteriaName}
                                        </td>
                                        <td>
                                            ${operatorName}
                                        </td>
                                        <td>
                                            ${values}
                                        </td>
                                    </tr>
                                `;
                                
                                
                            });

                            criteriaVersionTable.innerHTML = criteriaContent;
                            criteriaModal.show();
                        }
                    }

                    function resetLogicsValue() {
                        document.querySelectorAll(".crit-enable-checkbox").forEach( chkbox => {
                            chkbox.checked = false;
                        });
                        document.querySelectorAll(".crit-operators-select").forEach( select => {
                            select.value = "";
                        });
                        document.querySelectorAll(".criteria-values").forEach( input => {
                            input.value = "";
                        });

                    }

                    async function  fillCriterias(dunningLogicResponse) {
                        const dunningLogics = JSON.parse(dunningLogicResponse.response);
                        console.log(dunningLogics);
                        let checkboxElement;
                        let optionElement;
                        let valueElement;
                        let valueString;
                        
                        const url = `${API_BASE}/getMapping.php`;
                        const DunningJson = await fetchAPI(url, body);
                        const dunningCriteria = DunningJson.CRITERIA;

                        dunningLogics.forEach(  function (criteria) {
                                console.log(criteria);
                                // 1. Find the VARTYPE configuration from your dunningCriteria object
                                const criteriaConfig = Object.values(dunningCriteria).find(item => item.ID == criteria.criteria);
                                const vartype = criteriaConfig ? criteriaConfig.VARTYPE : null;
                                console.log(`Criteria ID: ${criteria.criteria}, VARTYPE: ${vartype}`);

                                

                                checkboxElement = document.getElementById(`crit-${criteria.criteria}`);
                                checkboxElement.checked = true;

                                optionElement = document.getElementById(`crit-${criteria.criteria}-option`);
                                console.log("criteria operator: " + criteria.operator);
                                optionElement.value = criteria.operator;

                                valueElement = document.getElementById(`crit-${criteria.criteria}-value`);
                                // 2. Handle assignments dynamically based on VARTYPE
                                if (vartype === "SELECTION" || vartype === "MULTI_SELECTION" ) {
                                    const tomselect = valueElement.tomselect;
                                    if (tomselect) {
                                        tomselect.clear(true); // Clear without firing change event

                                        const selectionOptions = criteriaConfig.SELECTION || [];
                                        const formattedOptions = criteria.values.map(savedId => {
                                            const match = selectionOptions.find(item => item.ID == savedId);
                                            return {
                                                value: savedId,
                                                text: match ? (match.DISPLAY || match.ID) : savedId
                                            };
                                        });
                                        tomselect.addOptions(formattedOptions);
                                        tomselect.setValue(criteria.values, true);
                                    }
                                }
                                else if (vartype === "BOOLEAN") {
                                    const tomselect = valueElement.tomselect;
                                    if (tomselect) {
                                        tomselect.clear(true); // Clear without firing change event

                                        // Convert criteria.values array into the { value, text } objects TomSelect needs
                                        const formattedOptions = criteria.values.map(savedId => {
                                            // Normalise value to string/number for accurate checks
                                            const normalizedId = String(savedId); 
                                            
                                            return {
                                                value: savedId,
                                                text: normalizedId === "1" ? "True" : "False"
                                            };
                                        });

                                        tomselect.addOptions(formattedOptions);
                                        tomselect.setValue(criteria.values, true);
                                    }
                                }
                                else {
                                    // Standard DOM elements (Inputs, Date Pickers, Boolean Drops) do not use TomSelect
                                    // Pull the raw scalar value safely out of your criteria.values array
                                    const defaultValue = Array.isArray(criteria.values) ? criteria.values[0] : criteria.values;
                                    valueElement.value = defaultValue !== undefined ? defaultValue : '';
                                }

                            });
                    }

                    const createDunningVersionBtn = e.target.closest('.btn-dunning-group-create-version');
                    if (createDunningVersionBtn) {

                        const dunningGroupId = createDunningVersionBtn.dataset.dunningId;
                        const dunningGroupName = createDunningVersionBtn.dataset.dunningGroupName;
                        const dunningGroupPriority = createDunningVersionBtn.dataset.dunningGroupPriority;
                        const versionId = createDunningVersionBtn.dataset.versionId;


                        console.log("dunningGroupId" + dunningGroupId);
                        document.getElementById('dunning-version-form-action-title').innerHTML = "Create";
                        document.getElementById('dunning-version-form-edit-dunning-name').innerHTML = dunningGroupName;
                        document.getElementById('dunning-group-version-dunning-priority-edit').innerHTML = dunningGroupPriority;
                        document.getElementById('dunning-group-id-edit-action').value = "create";
                        document.getElementById('dunning-group-version-dunning-id-edit').value = dunningGroupId;
                        document.getElementById('dunning-group-version-id-edit').value = "";
                        document.getElementById('dunning-group-version-edit').value = "";
                        document.getElementById('dunning-group-version-status-edit').value = 1;
                        document.getElementById('dunning-group-version-remark-edit').value = "";
                        document.getElementById('edit-dunning-group-message').innerHTML = "";
                        document.getElementById('btn-submit-dunning-version-form').disabled = false;


                        const fetchDunningLogicUrl = `${API_BASE}/dunningGroup.php?endpoint=view_dunning_logic&versionId=${versionId}`;
                        const dunningLogicResponse = await fetchAPI(fetchDunningLogicUrl);
                        
                        console.log(dunningLogicResponse);

                        if ( dunningLogicResponse.success ) {
                            resetLogicsValue();
                            fillCriterias(dunningLogicResponse);
                        }

                        document.getElementById('campaign-criteria-container').classList.remove('d-none');
                        dunningGroupVersionTableSection.classList.add("d-none");
                        dunningVersionEditFormSection.classList.remove("d-none")
                    }

                    const btnEditDunningVersion = e.target.closest('.btn-edit-dunning-version');
                    if (btnEditDunningVersion) {

                        
                        const versionId = btnEditDunningVersion.dataset.versionId;
                        const dunningGroupName = btnEditDunningVersion.dataset.dunningGroupName;
                        const dunningGroupId = btnEditDunningVersion.dataset.dunningId;
                        const versionNumber = btnEditDunningVersion.dataset.versionNumber;
                        const versionStatus = btnEditDunningVersion.dataset.versionStatus;
                        const versionRemark = btnEditDunningVersion.dataset.versionRemark;
                        const dunningGroupPriority = btnEditDunningVersion.dataset.dunningGroupPriority;
                        

                        document.getElementById('dunning-version-form-action-title').innerHTML = "Edit";
                        document.getElementById('dunning-group-version-dunning-id-edit').value = dunningGroupId;
                        document.getElementById('dunning-version-form-edit-dunning-name').innerHTML = dunningGroupName;
                        document.getElementById('dunning-group-version-dunning-priority-edit').value = dunningGroupPriority;
                        document.getElementById('dunning-group-id-edit-action').value = "edit";
                        document.getElementById('dunning-group-version-id-edit').value = versionId;
                        document.getElementById('dunning-group-version-edit').value = versionNumber;
                        document.getElementById('dunning-group-version-status-edit').value = versionStatus;
                        document.getElementById('dunning-group-version-remark-edit').value = versionRemark;
                        document.getElementById('edit-dunning-group-message').innerHTML = "";
                        document.getElementById('btn-submit-dunning-version-form').disabled = false;

                        const fetchDunningLogicUrl = `${API_BASE}/dunningGroup.php?endpoint=view_dunning_logic&versionId=${versionId}`;
                        const dunningLogicResponse = await fetchAPI(fetchDunningLogicUrl);
                        console.log(dunningLogicResponse);
                        
                        if ( dunningLogicResponse.success ) {
                            resetLogicsValue();
                            fillCriterias(dunningLogicResponse);
                        }

                        if ( versionStatus == 1 ) { // Not Used
                            document.getElementById('campaign-criteria-container').classList.remove('d-none');
                        }
                        else {
                            document.getElementById('campaign-criteria-container').classList.add('d-none');
                        }

                        dunningGroupVersionTableSection.classList.add("d-none");
                        dunningVersionEditFormSection.classList.remove("d-none")

                    }
                })
            }
            
            const selectDunningGroupVersionStatus = document.getElementById('dunning-group-version-status-edit');
            const campaignCriteriaContainer = document.getElementById('campaign-criteria-container');
            selectDunningGroupVersionStatus.addEventListener('change', (e) => {
                const selectedValue = e.target.value;
                console.log(selectedValue);

                if (selectedValue == "1") {
                    campaignCriteriaContainer.classList.remove("d-none");
                }
                else {
                    campaignCriteriaContainer.classList.add("d-none");
                }
            })


            const btnCriteriaFormBack = document.getElementById("btn-criteria-form-back");
            btnCriteriaFormBack.addEventListener("click", async(e) => {
                e.preventDefault();
                dunningGroupVersionTableSection.classList.remove("d-none");
                dunningVersionEditFormSection.classList.add("d-none");

                const dunningGroupId = document.getElementById("dunning-group-version-dunning-id-edit").value;
                const dunningGroupPriority = document.getElementById("dunning-group-version-dunning-priority-edit").value;
                const dunningGroupName = document.getElementById("dunning-version-form-edit-dunning-name").textContent;

                
                await loadDunningVersionTable(dunningGroupId, dunningGroupPriority, dunningGroupName, true);
            });

            // const btnCreateDunningGroup = document.getElementById("btn-create-dunning-group");
            // btnCreateDunningGroup.addEventListener("click", (e) => {
            //     e.preventDefault();
            //     // dunningGroupCreateFormSection.classList.remove("d-none");
            //     dunningGroupSetupSection.classList.add("d-none");
            //     dunningGroupEditFormSection.classList.add("d-none");
            // });

            // const btnCreateDunningGroupFormBack = document.getElementById("btn-create-dunning-group-form-back");
            // btnCreateDunningGroupFormBack.addEventListener("click", (e) => {
            //     e.preventDefault();
            //     // dunningGroupCreateFormSection.classList.add("d-none");
            //     dunningGroupSetupSection.classList.remove("d-none");                
            // });



            const setupTableContainer = document.getElementById('campaign-list-setup-table');
            if (setupTableContainer) {
                setupTableContainer.addEventListener('click', async (e) => {
                
                    const btn = e.target.closest('.btn-edit-campaign');
                    if (btn) {
                        console.log("click btn-edit-campaign");
                        dunningGroupVersionTableSection.classList.add("d-none");
                        dunningVersionEditFormSection.classList.remove("d-none");

                    }
                });
            }

            /* Edit Dunning group version form submit */
            const editDunningVersionForm = document.getElementById('edit-dunning-version-form');
            editDunningVersionForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const formData = new FormData(editDunningVersionForm);
                
                // 1. Initialize structured payload base
                const body = {
                    dunningId: formData.get('dunningId'),
                    id: formData.get('id'),
                    version: formData.get('version'),
                    status: formData.get('status'),
                    remark: formData.get('remark'),
                    criteria: {} // Initialize clean nested criteria object
                };

                // 2. Loop through entries to nest criteria fields matching criteria[X][Y]
                for (let [key, value] of formData.entries()) {
                    const match = key.match(/^criteria\[(\d+)\]\[(\w+)\]$/);
                    if (match) {
                        const index = match[1];
                        const field = match[2];
                        
                        if (!body.criteria[index]) {
                            body.criteria[index] = {};
                        }
                        console.log("index: " + index + " value: " + value);
                        // If the field doesn't exist yet, initialize it as the value
                        if (!body.criteria[index][field]) {
                            body.criteria[index][field] = value;
                        } else {
                            // Append with a comma if it's a multiple select value
                            body.criteria[index][field] += `,${value}`;
                        }
                    }
                }
                let url ;
                let keyword;
                if ( formData.get("action") == "edit" ) {
                    url = `${API_BASE}/dunningGroup.php?endpoint=edit_dunning_version`;
                    keyword = "updated";
                }
                else {
                    url = `${API_BASE}/dunningGroup.php?endpoint=add_dunning_version`;
                    keyword = "created";
                }
                const response = await fetchAPI(url, body);
                const responseJson = JSON.parse(response.response);

                const editDunningGroupMessage = document.getElementById('edit-dunning-group-message');
                if (!response.success) {
                    editDunningGroupMessage.innerHTML = "Dunning Group "+keyword+" fail - " + responseJson.error_description;

                    if (keyword == "created") {
                        
                        if (responseJson.error_code != 0 ) {
                            document.getElementById('btn-submit-dunning-version-form').disabled = false;
                        }
                        else {
                            document.getElementById('btn-submit-dunning-version-form').disabled = true;
                        }
                    }
                    
                }
                else {
                    if (responseJson.error_code != 0 ) {
                        editDunningGroupMessage.innerHTML = "Dunning Group "+keyword+" fail - " + responseJson.error_description;
                    }
                    else {
                        editDunningGroupMessage.innerHTML = "Dunning Group "+keyword+" successfully";
                    }
                    document.getElementById('btn-submit-dunning-version-form').disabled = false;
                }


            });
            

        }, 1000);
        
        return html
}