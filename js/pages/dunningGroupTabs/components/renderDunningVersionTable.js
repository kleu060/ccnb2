import * as bootstrap from 'bootstrap'; // Add this at the top
import { loadDunningVersionTable } from "../functions/functions.js";


export async function renderDunningVersionTable(isEdit = false) {

    
    let criteriaId = "criteria-setup-modal";
    let criteriaContainer = "criterias-setupcontainer";

    const html = `
        <h2>Dunning Group Version</h2>
        <div class="row">
            <div class="col-12">
                <table id="dunning-group-version-table">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <div class="modal" id="criteria-version-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Criteria</h2>
                    </div>
                    <div class="modal-body">
                        <div id="criteria-detail-container">
                            <div class="d-flex mb-3">
                                <div class="col-6 field-group">
                                    <label class="">Dunning Group</label>
                                    <span id="criteria-modal-dunning-group-name"></span>
                                </div>
                                <div class="col-4 field-group">
                                    <label class="">Status</label>
                                    <span id="criteria-modal-dunning-group-status">not used</span>
                                </div>
                            </div>
                            <table id="criteria-version-table" class="w-100 table">
                                <thead>
                                    <th>Criteria</th>
                                    <th>Operator</th>
                                    <th>Values</th>
                                </thead>
                                <tbody id="criteria-version-table-body">
                                </body>

                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}