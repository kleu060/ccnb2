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
    const dunningStatus = DunningJson.Status;
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

    let criteriaOptions = Object.values(dunningCriteria).map(criteria => `
        <div class="row mb-1" data-id="${criteria.ID}">
            <div class="col-1 d-flex align-items-center">
                <input type="checkbox" class="crit-enable-checkbox" name="criteria[${criteria.ID}][enable]" id="crit-${criteria.ID}"/>
            </div>
            <div class="col-3 d-flex align-items-center">
                ${criteria.DISPLAY}
            </div>
            <div class="col-3 d-flex align-items-center">
                <select class="" class="crit-operators-select" name="criteria[${criteria.ID}][option]" id="crit-${criteria.ID}-option">
                    <option value="">-- Select operator --</option>
                    ${operatorOptions}
                </select>
            </div>
            <div class="col-4">
                ${criteria.ID == 9 ?   
                    `<select multiple class="tomselect criteria-values no-add" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">
                        ${npsiOptions}
                    </select>
                    `
                    : `<input type="text" class="tomselect criteria-values" name="criteria[${criteria.ID}][value]" id="crit-${criteria.ID}-value">`}
            </div>
        </div>
    `).join('');

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

                            <div id="campaign-criteria-container" class="col-6 d-none mb-1" >
                                ${criteriaOptions}
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
    }, 500)

    return html;
};
