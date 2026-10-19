// Page 602, DCA > Manage
import { renderDcaManageTable, renderDcaDispatchTable } from "./components/functions.js";

export async function renderDcaManageTab() {

    const html = `
        <div class="tab-pane fade" id="dca-manage-tab" role="tabpanel" aria-labelledby="dca-manage-tab">
            <h1>Manage</h1>
            <div class="card" id="dca-manage-main-container">
                <div class="card-body">
                    <table id="dca-manage-table">
                        <thead>
                            <tr id="dca-manage-table-header"></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

            <div class="card d-none bg-light-grey-2" id="dispatch-campaign-container">
                <div class="card-body">
                    <h1>Dispatch Campaign</h1>
                    <form id="dispatch-campaign-form">
                        <div class="row mb-1">
                            <div class="col-3">
                                <div class="field-group">
                                    <label>Campaign ID</label>
                                    <input type="text" id="dcs-patch-campaign-id" name="campaign-id" value="400105">
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="field-group">
                                    <label>Name</label>
                                    <input type="text" id="dcs-dispatch-name" name="name" value="MASS WRITTEN OFF">
                                </div>
                            </div>

                            <div class="col-3">
                                <div class="field-group">
                                    <label>Record Count</label>
                                    <input type="text" id="dcs-dispatch-record-count" name="record-count" value="2406">
                                </div>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col-3">
                                <div class="field-group">
                                    <label>Weight</label>
                                    <input type="text" id="dcs-dispatch-weight" name="weight" value="">
                                </div>
                            </div>
                            <div class="col-3">
                                <button id="dis-dispatch-refresh" type="button" class="btn btn-primary">Refresh</button>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="">
                                <label>Group</label>
                                <span>DCA Group SPDCA</span>
                            </div>
                        </div>
                        <div class="row">
                            <table id="dca-dispatch-table">
                                <thead>
                                    <tr id="dca-dispatch-header"></tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th style="font-weight:bold;">Total Weight:</th>
                                    <th id="total-weight-cell" style="font-weight:bold;">6</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-primary" id="btn-confirm-dispatch">Confirm Dispatch</button>
                                <button type="button" class="btn btn-secondary" id="btn-cancel-dispatch">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;

    
    setTimeout(async function(){
        await renderDcaManageTable();
    
        const dcaManageTTable = document.getElementById('dca-manage-table');
        const dcaManageMainContainer = document.getElementById('dca-manage-main-container');
        const dispatchCampaignContainer = document.getElementById('dispatch-campaign-container');

        dcaManageTTable.addEventListener("click", async(e) => {
            const btnDispatch = e.target.closest('.btn-dca-dispatch');

            if (btnDispatch) {
                

                renderDcaDispatchTable();
                dcaManageMainContainer.classList.add("d-none");
                dispatchCampaignContainer.classList.remove("d-none");
            }
        })

        const btnCancelDispatch = document.getElementById('btn-cancel-dispatch');
        btnCancelDispatch.addEventListener("click", (e) => {
            dcaManageMainContainer.classList.remove("d-none");
            dispatchCampaignContainer.classList.add("d-none");
        })
        
    }, 1000)


        
    return html;
}