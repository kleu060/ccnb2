// Page 603, DCA > Weight
import { renderWeightTable, renderWeightGroupTable } from './components/functions.js';
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderWeightTab() {

    const html = `
        <div class="tab-pane fade" id="weight-tab" role="tabpanel" aria-labelledby="weight-tab">
            <div class="card" id="weight-container">
                <div class="card-header">
                    <h1>Weight</h1>
                </div>
                <div class="card-body">
                    <table id="weight-table">
                    
                    </table>
                </div>
            </div>

            <div class="card" id="weight-group-container">
                <div class="card-header">
                    <h1>Weight Group</h1>
                </div>
                <div class="card-body">
                    <form id="weight-group-form">

                        <div class="field-group col-6">
                            <label>Group</label>
                            <span class="" id="weight-group-name">DCA Group Standard</span>
                            <input type="hidden" id="weight-group-id" value=""/>
                        </div>
                        <table id="weight-group-table"></table>
                        <div id="edit-dca-weight-error-message" class="mb-3 error-message"></div>
                        <div>
                            <button type="submit" class="btn btn-primary" id="btn-submit-weight-group">Submit</button>
                            <button class="btn btn-secondary" id="btn-back-weight-group">Back</button>
                        </div>
                    </form>

                </div>
            </div>  
        </div>`;

    setTimeout(async function(){
        await renderWeightTable();

        const weightContainer = document.getElementById('weight-container');
        const weightGroupContainer = document.getElementById('weight-group-container');

        const weightTable = document.getElementById('weight-table');
        weightTable.addEventListener("click", async(e) => {
            const button = e.target.closest('.btn-weight');
            if (button) {
                const group = button.dataset.groupId;
                document.getElementById('weight-group-name').innerHTML = button.dataset.weightGroupName;
                document.getElementById('weight-group-id').value = button.dataset.groupId;

                weightContainer.classList.add("d-none");
                weightGroupContainer.classList.remove("d-none");
                renderWeightGroupTable(group);
            }
        });

        const btnBackWeightGroup = document.getElementById('btn-back-weight-group');
        btnBackWeightGroup.addEventListener('click' , (e) => {
            weightContainer.classList.remove("d-none");
            weightGroupContainer.classList.add("d-none");
        });

        const weightGroupForm = document.getElementById('weight-group-form');
        weightGroupForm.addEventListener("submit", async(e) => {
            e.preventDefault();

            const url = `${API_BASE}/dunningGroup.php?endpoint=edit_dca_weight`;
            const weightRows = document.querySelectorAll("#weight-group-table tbody tr");
            
            let body = {
                dca_group: document.getElementById('weight-group-id').value,
                dca_weight:[]
            }
            weightRows.forEach(row => {
                const weightData = {
                    dca_id: row.querySelector(".dca_id").value,
                    weight: row.querySelector(".input-weight").value,
                };
                body.dca_weight.push(weightData);
            });
            try {
                const result = await fetchAPI(url, body);
                if ( result.success == true ) {
                    const response = JSON.parse(result.response);

                    if ( response.error_code == 0) {
                        document.getElementById('edit-dca-weight-error-message').innerHTML = "DCA Weight updated successfully";
                    }
                    else {
                        document.getElementById("edit-dca-weight-error-message").innerHTML = "DCA Weight updated failed: " + response.error_description;
                    }
                    
                }
            }
            catch (error) {
                document.getElementById("edit-dca-weight-error-message").innerHTML = "DCA Weight update failed: Server error " + error;
            }
        });
         
    }, 500)

    return html;
}