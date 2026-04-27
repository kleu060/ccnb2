export async function renderInternalBlackListTab() {

    return `
        <div class="tab-pane fade" id="internal-blacklist-tab" role="tabpanel" aria-labelledby="internal-blacklist-tab">
            <div class="container-fluid debtor-information">
                <h1>Internal Blacklist</h1>

                <div class="row mb-2">
                    <div class="col-6">

                        <div class="d-flex justify-content-between align-items-center">
                            <div class="field-group justify-content-start">
                                <label>Search ID<label>
                                <input type="text" name="search_id" id="search_id" value=""></input>
                            </div>
                            
                            <button type="button" id="btn-download-list" class="btn btn-primary">Download List</button>
                            <button type="button" id="btn-bulk-update" class="btn btn-primary">Bulk Upload</button>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div id="internal-blacklist-table-container">
                                            <div id="internal-blacklist-table-row" class="row internal-blacklist-table-row">
                                                <div class="col-12">
                                                    <table id="internal-blacklist-table">
                                                        <thead >
                                                            <tr id="internal-blacklist-table-header"></tr>
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
                    </div>
                </div>
                
            </div>
        </div>`;
}