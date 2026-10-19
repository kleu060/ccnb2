import { fetchAPI } from '../../../api/fetch-api.js';
import { API_BASE } from '../../../config.js';
import TomSelect from 'tom-select';


export async function renderEditDunningVersionForm() {

    const type = "Dunning";
    const body = {
        type
    };

    const url = `${API_BASE}/getMapping.php`;
    const DunningJson  = await fetchAPI(url, body);
    const DunningOperators  = DunningJson.OPERATORS;
    const dunningCriteria = DunningJson.CRITERIA;
    const dunningStatus = DunningJson.DunningVersion.Status;
    const dunningNPSI = DunningJson.NPSI;

    let statusOptions = Object.values(dunningStatus).map(status => `
            <option value="${status.ID}">${status.DISPLAY}</option>
        `).join('');



    let operatorOptions = Object.values(DunningOperators).map(operator => `
            <option value="${operator.ID}">${operator.DISPLAY}</option>
        `).join('');

    let npsiOptions = Object.values(dunningNPSI).map(status => `
        <option value="${status.ID}">${status.DISPLAY}</option>
    `).join('');


    // Cleaned up template function to generate criteria HTML dynamically
    function generateCriteriaHtml(dunningCriteria, operatorOptions, prefix = 'criteria') {
        return Object.values(dunningCriteria).map(criteria => `
            <div class="row mb-1" data-id="${criteria.ID}">
                <div class="col-1 d-flex align-items-center">
                    <input type="checkbox" class="crit-enable-checkbox" name="${prefix}[${criteria.ID}][enable]" id="${prefix}-crit-${criteria.ID}"/>
                </div>
                <div class="col-3 d-flex align-items-center">
                    ${criteria.DISPLAY} 
                </div>
                <div class="col-3 d-flex align-items-center">
                    <!-- FIXED: Merged duplicate class attributes -->
                    <select class="form-control crit-operators-select" name="${prefix}[${criteria.ID}][option]" id="${prefix}-crit-${criteria.ID}-option">
                        <option value="">-- Select operator --</option>
                        ${operatorOptions}
                    </select>
                </div>
                <div class="col-4">
                    ${criteria.VARTYPE === "SELECTION" ? `
                        <select class="criteria-values form-control no-add" name="${prefix}[${criteria.ID}][value]" id="${prefix}-crit-${criteria.ID}-value">
                            <option value="">-- Select option --</option>
                            ${criteria.SELECTION ? criteria.SELECTION.map(opt => `
                                <option value="${opt.ID}">${opt.DISPLAY || opt.ID}</option>
                            `).join('') : ''}
                        </select>
                    ` : criteria.VARTYPE === "MULTI_SELECTION" ? `
                        <select multiple class="criteria-values form-control no-add" name="${prefix}[${criteria.ID}][value]" id="${prefix}-crit-${criteria.ID}-value">
                            <option value="">-- Select option --</option>
                            ${criteria.SELECTION ? criteria.SELECTION.map(opt => `
                                <option value="${opt.ID}">${opt.DISPLAY || opt.ID}</option>
                            `).join('') : ''}
                        </select>
                    ` : criteria.VARTYPE === "BOOLEAN" ? `
                        <select class="criteria-values form-control" name="${prefix}[${criteria.ID}][value]" id="${prefix}-crit-${criteria.ID}-value">
                            <option value="">-- Select --</option>
                            <option value="1">True</option>
                            <option value="0">False</option>
                        </select>
                    ` : criteria.VARTYPE === "DATE" ? `
                        <input type="date" class="criteria-values-date form-control" name="${prefix}[${criteria.ID}][value]" id="${prefix}-crit-${criteria.ID}-value">
                    ` : criteria.VARTYPE === "NUMERIC" ? `
                        <input type="number" step="any" class="criteria-values-number form-control" name="${prefix}[${criteria.ID}][value]" id="${prefix}-crit-${criteria.ID}-value">
                    ` : `
                        <input type="text" class="criteria-values form-control" name="${prefix}[${criteria.ID}][value]" id="${prefix}-crit-${criteria.ID}-value">
                    `}
                </div>
        </div>
        `).join('');
    }

    const criteriaEntryOptions = generateCriteriaHtml(dunningCriteria, operatorOptions, 'entry');
    const criteriaExitOptions = generateCriteriaHtml(dunningCriteria, operatorOptions, 'exit');

    // let criteriaOptions = Object.values(dunningCriteria).map(criteria => `
    //     <div class="row mb-1" data-id="${criteria.ID}">
    //         <div class="col-1 d-flex align-items-center">
    //             <input type="checkbox" class="crit-enable-checkbox" name="criteria[${criteria.ID}][enable]" id="crit-${criteria.ID}"/>
    //         </div>
    //         <div class="col-3 d-flex align-items-center">
    //             ${criteria.DISPLAY} 
    //         </div>
    //         <div class="col-3 d-flex align-items-center">
    //             <select class="" class="crit-operators-select" name="criteria[${criteria.ID}][option]" id="crit-${criteria.ID}-option">
    //                 <option value="">-- Select operator --</option>
    //                 ${operatorOptions}
    //             </select>
    //         </div>
    //         <div class="col-4">
    //             ${criteria.VARTYPE === "SELECTION" ? `
    //                 <select class="criteria-values form-control no-add" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">
    //                     <option value="">-- Select option --</option>
    //                     ${criteria.SELECTION ? criteria.SELECTION.map(opt => `
    //                         <option value="${opt.ID}">${opt.DISPLAY || opt.ID}</option>
    //                     `).join('') : ''}
    //                 </select>
    //             ` : criteria.VARTYPE === "MULTI_SELECTION" ? `
    //                 <select multiple class="criteria-values form-control no-add" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">
    //                     <option value="">-- Select option --</option>
    //                     ${criteria.SELECTION ? criteria.SELECTION.map(opt => `
    //                         <option value="${opt.ID}">${opt.DISPLAY || opt.ID}</option>
    //                     `).join('') : ''}
    //                 </select>
    //             ` : criteria.VARTYPE === "BOOLEAN" ? `
    //                 <select class="criteria-values form-control" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">
    //                     <option value="">-- Select --</option>
    //                     <option value="1">True</option>
    //                     <option value="0">False</option>
    //                 </select>
    //             ` : criteria.VARTYPE === "DATE" ? `
    //                 <input type="date" class="criteria-values-date form-control" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">
    //             ` : criteria.VARTYPE === "NUMERIC" ? `
    //                 <input type="number" step="any" class="criteria-values-number form-control" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">
    //             ` : `
    //                 <input type="text" class="criteria-values form-control" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">
    //             `}
    //         </div>
    //     </div>
    // `).join('');

    const html = `
        <div class="edit-dunning-version-form-container">
            
            <div class="row">
                <div class="card">
                    <div class="card-body">
                        <h2><span id="dunning-version-form-action-title"></span> Dunning Group Version</h2>
                        <div class="mb-3">Dunning Group: <strong id="dunning-version-form-edit-dunning-name"></strong></div>

                        <form id="edit-dunning-version-form">
                            <input type="hidden" name="priority" id='dunning-group-version-dunning-priority-edit' value=''/>
                            <input type="hidden" name="dunningId" id='dunning-group-version-dunning-id-edit' value=''/>
                            <input type="hidden" name="id" id='dunning-group-version-id-edit' value=''/>
                            <input type="hidden" name="action" id='dunning-group-id-edit-action' value=''/>
                            <div class="col-6">
                                <div class="mb-1 field-group">
                                    <label>Version</label>
                                    <input type="number" name='version' id='dunning-group-version-edit'>
                                </div>

                                <div class="mb-1 field-group">
                                    <label>Status</label>
                                    <select id="dunning-group-version-status-edit" name="status">
                                        <option value="">-- Select Status --</option>
                                        ${statusOptions}
                                    </select>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Remark</label>
                                    <input type="text" name='remark' id='dunning-group-version-remark-edit'>
                                </div>
                            </div>

                            <div id="campaign-entry-criteria-container" class="col-12 d-none mb-1" >
                                <div class="row">
                                    <div class="col-12">
                                        <h3>Choose entry criteria for all selected conditions met (AND)</h3>
                                    </div>
                                    <div class="col-6">
                                        ${criteriaEntryOptions }
                                    </div>
                                </div>
                            </div>

                             <div id="campaign-exit-criteria-container" class="col-12 d-none mb-1" >
                                <div class="row">
                                    <div class="col-12">
                                        <h3>Choose exit criteria for all selected conditions met (OR)</h3>
                                    </div>
                                    <div class="col-6">
                                        ${criteriaExitOptions}
                                    </div>
                                </div>
                            </div>

                            <div id="edit-dunning-group-message" class="mb-3 error-message"></div>

                            <div class="row">
                                <div>
                                    <input type="submit" class="btn btn-primary" id="btn-submit-dunning-version-form">
                                    <button type="button" class="btn btn-secondary" id="btn-criteria-form-back">Back</button>
                                </div>
                            </div>   
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(function(){
        
        const criteriaValuesFields = document.querySelectorAll(".criteria-values");
        criteriaValuesFields.forEach(el => {
            let create = true;
            if ( el.classList.contains("no-add") ) {
                create = false;
            }

            new TomSelect(el, {
                create: create, 
                sortField: {
                    field: 'text',
                    direction: 'asc',
                   
                },
                createOnBlur: true,
            });
        });

        const selectDunningGroupVersionStatus = document.getElementById('dunning-group-version-status-edit');
        const campaignEntryCriteriaContainer = document.getElementById('campaign-entry-criteria-container');
        const campaignExitCriteriaContainer = document.getElementById('campaign-exit-criteria-container');
        selectDunningGroupVersionStatus.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            console.log(selectedValue);

            if (selectedValue == "1") {
                campaignEntryCriteriaContainer.classList.remove("d-none");
                campaignExitCriteriaContainer.classList.remove("d-none");
            }
            else {
                campaignEntryCriteriaContainer.classList.add("d-none");
                campaignExitCriteriaContainer.classList.add("d-none");
            }
        })

        const btnCriteriaFormBack = document.getElementById("btn-criteria-form-back");
        const dunningGroupVersionTableSection = document.getElementById('dunning-group-version-table-section');
        const dunningVersionEditFormSection = document.getElementById('dunning-version-edit-form-section');

        btnCriteriaFormBack.addEventListener("click", async(e) => {
            e.preventDefault();
            dunningGroupVersionTableSection.classList.remove("d-none");
            dunningVersionEditFormSection.classList.add("d-none");

            const dunningGroupId = document.getElementById("dunning-group-version-dunning-id-edit").value;
            const dunningGroupPriority = document.getElementById("dunning-group-version-dunning-priority-edit").value;
            const dunningGroupName = document.getElementById("dunning-version-form-edit-dunning-name").textContent;

            
            await loadDunningVersionTable(dunningGroupId, dunningGroupPriority, dunningGroupName, true);
        });
    }, 5000)

    return html;
};
