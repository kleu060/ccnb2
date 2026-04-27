export async function renderBlacklistInquiryTab() {

    return `
        <section class="tab-pane fade show active" id="inquiry-tab" role="tabpanel" aria-labelledby="inquiry-tab">
            <div class="container-fluid debtor-information">
                <h1>Blacklist Inquiry</h1>

                <div class="row mb-3">
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
                <div class="row mb-3">
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">ID Blacklist</label>
                            <span>Yes</span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">ID Blacklist</label>
                            <span>(3)deceased</span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Sub Reason</label>
                            <span></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Date</label>
                            <span>2026-01-02</span>
                        </div>
                    </div>
                    <div class="col-2 ">
                        <div class="field-group justify-content-start">
                            <label class="me-3 w-auto">By</label>
                            <span >('System' or user ID)</span>
                        </div>
                    </div>
                    <div class="col-2">
                        <a target="_blank" href="/print_blacklist" class="btn btn-primary">Print</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div id="blacklist-inquiry-table-container">
                                            <div id="blacklist-inquiry-table-row" class="row blacklist-inquiry-table-row">
                                                <div class="col-12">
                                                    <table id="blacklist-inquiry-table">
                                                        <thead >
                                                            <tr id="blacklist-inquiry-table-header"></tr>
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
        </section>`;
}