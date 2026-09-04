import * as bootstrap from 'bootstrap'; // Add this at the top
import { loadDispatchTable, loadViewScheduleTable, loadDispatchScheduleTable } from "./functions/functions.js";

export async function renderDispatchTab() {

    const html = `
        <div class="tab-pane fade show active" id="dispatch-tab" role="tabpanel" aria-labelledby="dispatch-tab">
            <button class="btn btn-primary" id="btn-dispatch-upload">Upload</button>

            <div class="row">
                <div class="col-12">
                    <table id="nod-dispatch-table">
                        <thead></thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        
        <div class="modal" id="nod-view-schedule-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>View Schedule</h2>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <table id="nod-view-schedule-table">
                                    <thead></thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="nod-dispatch-schedule-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>NOD Dispatch</h2>
                    </div>
                    <div class="modal-body">
                        <div class="mb-1 field-group">
                            <label>Schdule ID</label>
                            <span >313574</span>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Account Count</label>
                            <span >908</span>
                        </div>

                        <div class="mb-1 field-group">
                            <button class="btn btn-primary  me-2">Confirm Dispatch</button>
                            <button class="btn btn-primary">Refresh</button>
                        </div>    
                        <div class="row">
                            <div class="col-12">
                                <table id="nod-dispatch-schedule-table">
                                    <thead></thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        `;

        setTimeout(function(){
                loadDispatchTable();

                const nodDispatchTable = document.getElementById('nod-dispatch-table');

                const viewScheduleModalElement = document.getElementById("nod-view-schedule-modal");
                const viewScheduleModal = new bootstrap.Modal(viewScheduleModalElement);

                const viewDisplayModalElement = document.getElementById("nod-dispatch-schedule-modal");
                const viewDispatchModal = new bootstrap.Modal(viewDisplayModalElement);

                nodDispatchTable.addEventListener("click" , async (e) => {
                    const viewSchuduleBtn = e.target.closest('.btn-view-schedule-action');
                    if (viewSchuduleBtn) {
                        loadViewScheduleTable();
                        viewScheduleModal.show();
                    }

                    const dispatchSchuduleBtn = e.target.closest('.btn-dispatch-schedule-action');
                    if (dispatchSchuduleBtn) {
                        loadDispatchScheduleTable();
                        viewDispatchModal.show();
                    }
                });

        }, 500);

        return html;
}