export async function renderCTOSTab() {

    return `
        <div class="tab-pane fade" id="ctos-tab" role="tabpanel" aria-labelledby="ctos-tab">
            <div class="container-fluid debtor-information">
                <h1>CTOS</h1>

                <div class="row">
                    <div class="col-3">


                        <div class="field-group justify-content-start">
                            <label>Account Code</label>
                            <input type="text" name="customer_no" id="customer_no" value=""></input>
                        </div>
                        <div class="field-group justify-content-start">
                            <label>ID Number</label>
                            <input type="text" name="ID Number" id="id_number" value=""></input>
                        </div>
                        <button type="button" id="btn-submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div id="ctos-table-container">
                                            <div id="ctos-table-row" class="row ctos-table-row">
                                                <div class="col-12">
                                                    <table id="ctos-table">
                                                        <thead >
                                                            <tr id="ctos-table-header"></tr>
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