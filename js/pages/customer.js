// import { getAccount, getAccountActionHistory } from "../api/account-api.js";
import { loadCustomerTable, loadCustomerContactTable } from "../components/customer.js";


export async function CustomerSearch() {
    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accountNo = params.get('account_code') || '';

    const html = `
        <section class="container-fluid debtor-information">
            <div class="row">
                <div class="col">
                    <label>Customer</label>
                    <input type="text" name="customer_no" id="customer_no" value="${accountNo}"></input>
                    <button type="button" id="btn-submit" class="btn btn-primary">Submit</button>
                </div>
            </div>

            <div class="card d-none mt-2" id="customer-result-container">
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
                                <label class="me-3">Address</label>
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


            <div class="card d-none mt-2" id='customer-contact-list-conatiner'>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                        <h2>Contact List</h2>
                        
                        <table id="customer-contact-table">
                            <thead >
                                <tr id="customer-contact-table-header"></tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        
                        </div>
                    </div>
                </div>
            </div>

                    
        </section>

        
    `;

    setTimeout(() => {
        const customerResultContainer = document.getElementById('customer-result-container');
        const customerContactListconatiner = document.getElementById('customer-contact-list-conatiner');
        const btnSubmit = document.getElementById('btn-submit');
        const customerNo = document.getElementById('customer_no');
        btnSubmit.addEventListener('click', function(){
            customerResultContainer.classList.remove('d-none');
            customerContactListconatiner.classList.remove('d-none');
            loadCustomerTable(customerNo);
            loadCustomerContactTable(customerNo);
        });
        
    }, 500);

    return html;
}