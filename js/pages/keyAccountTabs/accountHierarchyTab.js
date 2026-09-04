import { renderAccountHierarchyTable }  from './functions/functions.js';
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderAccountHierarchyTab() {
    const html =  `
        <div class="tab-pane fade" id="account-hierarchy-tab" role="tabpanel" aria-labelledby="account-hierarchy-tab">
            <div class="container-fluid">
                <h1>Account Hierarchy</h1>
                <div class="row mb-2">
                    <div class="col-12">
                        <form id="account-hierarchy-form" class="d-flex align-items-end">
                            <div class="me-2">
                                <label>Account Number</label>
                                <input type="text" name="account-number" id="account-number" value=""></input>
                            </div>
                            <div>
                                <button type="submit" id="btn-account-hierarchy-form-submit" class="btn btn-primary">View</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div id="account-hierarchy-table-container">
                                    <table id="account-hierarchy-table">
                                        <thead >
                                            <tr id="account-hierarchy-header"></tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        setTimeout(async function(){
            await renderAccountHierarchyTable();
        }, 500);

    return html;

}