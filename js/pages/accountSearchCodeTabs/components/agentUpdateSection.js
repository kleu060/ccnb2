import { fetchAPI } from '../../../api/fetch-api.js';
import { API_BASE } from '../../../config.js';

export async function rendorAgentUpdateSection() {

    const type = "ContactType";
    const body = {
        type
    };

    const url = `${API_BASE}/getMapping.php`;
    const contactTypeJson  = await fetchAPI(url, body);

    console.log(contactTypeJson);
    // Loop through the object entries and create option strings
    const contactOptions = Object.entries(contactTypeJson)
        .map(([key, value]) => {
            // Capitalise the first letter and lower-case the rest for a cleaner label
            const label = key.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            return `<option value="${value.ID}">${label}</option>`;
        })
        .join('');

    return `
        <div class="card">
            <div class="card-body">
                <div class="mb-4">
                    <div class="row row-cols-2 row-cols-lg-3">
                        <div class="col">
                            <div>
                                <label class="">Update disposition</label>
                            </div>
                            <div class="field-group">
                            
                        
                                <select name="sel-update-disposition" id="sel-update-disposition" class="me-1 flex-fill tomselect">
                                    <option value="LM">LM</option>
                                    <option value="PTP">PTP</option>
                                    <option value="PTP3">PTP3</option>
                                    <option value="PTP5">PTP5</option>
                                    <option value="PTP7">PTP7</option>
                                    <option value="DC">DC</option>
                                    <option value="DNC">DNC</option>
                                    <option value="CFP">CFP</option>
                                    <option value="CPP">CPP</option>
                                    <option value="PF">PF</option>
                                    <option value="PAP">PAP</option>
                                    <option value="SC">SC</option>
                                    <option value="SFR">SFR</option>
                                    <option value="BD">BD</option>
                                    <option value="RD">RD</option>
                                    <option value="WA">WA</option>
                                    <option value="KAM">KAM</option>
                                    <option value="FAIL">FAIL</option>
                                    <option value="SFO">SFO</option>
                                    <option value="ULN">ULN</option>
                                    <option value="V">V</option>
                                    <option value="B">B</option>
                                    <option value="F">F</option>
                                    <option value="W">W</option>
                                    <option value="NOD">NOD</option>
                                    <option value="UN">UN</option>
                                    <option value="UNT">UNT</option>
                                </select>
                                <button type="button" name="submit-update-disposition" class="btn btn-primary">Update</button>
                                
                            </div>
                        </div>

                        <div class="col">
                            <label class="">Sched Call back</label>
                            <div class="field-group">
                                
                                <input type="datetime-local" name="input-sched-call-back" id="input-sched-call-back" class="me-1"/>
                                <button type="button" name="submit-sched-call-back" class="btn btn-primary">Update</button>
                            </div>
                        </div>

                        <div class="col">
                            <div class="field-group">
                                <label class="">Contact Type</label>
                                <form id="agent-update-contact-type-form">
                                    <select name="select-contact-type" id="select-contact-type">
                                        ${contactOptions}
                                    </select>
                                    <div class="d-flex">
                                        <input type="text" name="contact-value" id="contact-value" class="me-1"/>
                                        <button type="submit" name="submit-contact-type" class="btn btn-primary">Add</button>
                                    </div>
                                </form>
                            </div>
                            <div id="agent-update-contact-type-error-message" class="mb-3 error-message"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
`;
}