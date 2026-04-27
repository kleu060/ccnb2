// import { getAccount, getAccountActionHistory } from "../api/account-api.js";
// import { loadDebtorTable } from "../components/debtor-table.js";


export async function CustomerSearch() {
    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accountNo = params.get('account_code') || '';

    return `
        <section class="container-fluid debtor-information">
            <div class="row">
                <div class="col">
                    <label>Customer</label>
                    <input type="text" name="customer_no" id="customer_no" value="${accountNo}"></input>
                    <button type="button" id="btn-submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="h2">Chan Tai Meng (730212345678)</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <div class="field-group justify-content-start">
                                        <label class="me-3">ID Number</label>
                                        <span>A1239982</span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="field-group justify-content-start">
                                        <label class="me-3">ID Type</label>
                                        <span>Passport</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-3">
                                    <div class="field-group justify-content-start">
                                        <label class="me-3">Office phone</label>
                                        <span></span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="field-group justify-content-start">
                                        <label class="me-3">Home Phone</label>
                                        <span>Passport</span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="field-group justify-content-start">
                                        <label class="me-3">Fax</label>
                                        <span></span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="field-group justify-content-start">
                                        <label class="me-3">Email</label>
                                        <span></span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-3">
                                    <div class="field-group justify-content-start">
                                        <label class="me-3">Address: </label>
                                        <span></span>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div id="customer-table-container">
                                <div id="customer-table-row" class="row customer-table-row">
                                    <div class="col-12">
                                        <table id="customer-table">
                                            <thead >
                                                <tr id="customer-table-header"></tr>
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
                    
        </section>

        
    `;
}