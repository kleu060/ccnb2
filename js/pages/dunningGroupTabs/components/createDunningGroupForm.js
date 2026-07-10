import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';

export async function renderCreateDunningGroupForm() {
    const html = `
        <div class="create-dunning-group-form-form">
            <div class="card">
                <div class="card-body">
                <h2>Create Dunning Group</h2>
                    <form id="create-dunning-group-form">
                        <div class="mb-1 field-group">
                            <label>Dunning Group Name</label>
                            <select id="select-dunning-group-name" name="name" class="tomselect">
                                <option value="Mass_Mgmt">Mass_Mgmt</option>
                                <option value="Mass_VVIP">Mass_VVIP</option>
                                <option value="Remaining VIP Account">Remaining VIP Account</option>
                                <option value="Mass_Fraud">Mass_Fraud</option>
                                <option value="Mass_deceased">Mass_deceased</option>
                                <option value="Mass_auto pay">Mass_auto pay</option>
                                <option value="Mass_Redlist">Mass_Redlist</option>
                                <option value="Test Account">Test Account</option>
                                <option value="Push to External Mass">Push to External Mass</option>
                                <option value="Mass_UHVC">Mass_UHVC</option>
                            </select>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Priority</label>
                            <input type="text" name="priority" id="priority" value=""/>

                        </div>

                        <div class="mb-1 field-group">
                            <label>Remark</label>
                            <textarea name="remark" id="remark" cols="60" rows="10"></textarea>

                        </div>
                        <div id="create-dunning-group-form-error-message" class="mb-3 error-message"></div>

                        <div class="row">
                            <div>
                                <input type="submit" class="btn btn-primary">
                                <button type="button" class="btn btn-secondary" id="btn-create-dunning-group-form-back">Back</button>
                            </div>
                        </div>

                        

                    </form>
                </div>
            </div>
        </div>
    `;

    setTimeout(function(){

        const createDunningGroupForm = document.getElementById("create-dunning-group-form");
        const createDunningGroupFormErrorMessage = document.getElementById("create-dunning-group-form-error-message");

        createDunningGroupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(createDunningGroupForm);
            const body = Object.fromEntries(formData.entries());

            const url = `${API_BASE}/dunningGroup.php?endpoint=add_dunning`;
            const response = await fetchAPI(url, body);
            console.log(response.response);

            if ( response.success  ) {
                const result = JSON.parse(response.response);
                if ( result.error_code == 0) {
                    createDunningGroupFormErrorMessage.innerHTML = "Dunning Group created successfully";
                }
                else {
                    createDunningGroupFormErrorMessage.innerHTML = "Dunning Group fail to create. " + response.response.error_description + "(" + response.response.error_code+ ")";
                }
            }
            else {
                // const result = JSON.parse(response.response);
                createDunningGroupFormErrorMessage.innerHTML = "User fail to create.  "  + response.response.error_description + "(" + response.response.error_code+ ")";;
            }
        })

    },500)

    return html;
}
