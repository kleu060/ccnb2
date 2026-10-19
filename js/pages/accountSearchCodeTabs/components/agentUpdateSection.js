import { fetchAPI } from '../../../api/fetch-api.js';
import { API_BASE } from '../../../config.js';

export async function rendorAgentUpdateSection() {

    const type = "Account";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const accountJson  = await fetchAPI(url, body);
    const DispositionCodeMapping = accountJson.DispositionCode;

    const DispositionCodeOptions = Object.entries(DispositionCodeMapping)
        .map(([key, value]) => {

            return `<option value="${value.ID}">${value.CODE}</option>`;
        })
        .join('');



    // type = "ContactType";
    // body = {
    //     type
    // };

    // const contactTypeJson  = await fetchAPI(url, body);

    // console.log(contactTypeJson);
    // // Loop through the object entries and create option strings
    // const contactOptions = Object.entries(contactTypeJson)
    //     .map(([key, value]) => {
    //         // Capitalise the first letter and lower-case the rest for a cleaner label
    //         const label = key.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    //         return `<option value="${value.ID}">${label}</option>`;
    //     })
    //     .join('');

    const html = `
        <div class="card bg-light-grey"  >
            <div class="card-body">
                <div class="row">
                    <div class="col-8">
                        <form id="update-disposition-form">
                            <div class="row align-items-end">
                                <div class="col-6">
                                    <div>
                                        <label class="">Update disposition</label>
                                    </div>
                                    <div class="field-group">
                                        <select name="sel-update-disposition" id="sel-update-disposition" class="me-1 flex-fill">
                                            ${DispositionCodeOptions}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-4 d-none"  id="sched-call-back-container">
                                    <label class="">Sched Call back</label>
                                    <div class="field-group">                                
                                        <input type="datetime-local" name="input-sched-call-back" id="input-sched-call-back" class="me-1"/>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <button type="submit" name="submit-update-disposition" class="btn btn-primary">Update</button>
                                </div>
                            </div>
                            <div class="error-message" id="update-disposition-error-message"></div>
                        </form>
                    </div>

                    <div class="col-4"> <!-- Note: Ensure account is declared in your parent x-data scope -->
                        <label class="">Contact Number</label>
                        <div class="field-group">
                            <form id="agent-update-contact-type-form">
                                <div class="d-flex">
                                    <!-- 1. :disabled grays out and locks the input if cust_id is false -->
                                    <input 
                                        type="text" 
                                        name="contact_value" 
                                        id="contact_value" 
                                        class="me-1"
                                        :disabled="!account || !account.cust_id  === ''"
                                        :placeholder="(!account || !account.cust_id  === '') ? 'No customer ID' : ''"
                                    />
                                    
                                    <!-- 2. :disabled safely deactivates the action button -->
                                    <button 
                                        type="submit" 
                                        id="btn-submit-contact-type" 
                                        name="submit-contact-type" 
                                        class="btn btn-primary"
                                        :disabled="!account || !account.cust_id  === ''"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div class="error-message" id="add-contact-error-message"></div>
                            </form>
                        </div>
                        <div id="agent-update-contact-type-error-message" class="mb-3 error-message"></div>
                    </div>
                </div>
            </div>
        </div>  
    `;

    return html;
}