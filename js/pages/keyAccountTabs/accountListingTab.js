import { renderAccoutListingTable }  from './functions/functions.js';

import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderAccountListingTab() {
    const html =  `
        <div class="tab-pane fade active show" id="account-listing-tab" role="tabpanel" aria-labelledby="account-list-tab">
            <div class="container-fluid">
                <h1>Account Listing</h1>
                <div class="row mb-2">
                    <div class="col-8">
                        <form id="account-listing-form" class="d-flex align-items-end">
                            <div class="col-4">
                                <div class="me-4">
                                    <label>Enter BRN:</label>
                                    <input type="text" name="brn" id="brn" value=""></input>
                                </div>
                            </div>
                            <div class="col-6 d-flex gap-2">
                                <div>
                                    <input type="radio" name="type" value="all"/> 
                                    <label>All</label>
                                </div>
                                <div>
                                    <input type="radio" name="type" value="undefined"/> 
                                    <label>Only Undefined Extended Data</label>
                                </div>
                                <div>
                                    <button type="submit" id="btn-account-listing-form-submit" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-2">
                        <div class="btn btn-primary">Download Account List</div>
                    </div>
                    <div class="col-2">
                        <div>
                            <input type="file">
                            <div class="btn btn-primary">Upload Accout list</div>
                        </div>
                    </div>
                </div>


                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div id="account-listing-table-container">
                                    <table id="account-listing-table">
                                        <thead >
                                            <tr id="account-listing-header"></tr>
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
        await renderAccoutListingTable();
    }, 500);

    return html
};