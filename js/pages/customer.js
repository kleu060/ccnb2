// Page 202, Customer Search

// import { getAccount, getAccountActionHistory } from "../api/account-api.js";
import { loadCustomerTable, loadCustomerContactTable } from "../components/customer.js";
import { fetchAPI } from '../api/fetch-api.js';
import { API_BASE } from '../config.js';
// customer id Search Sample - 100000000000121217 


// {"success":true,"response":"{\"error_code\":0,\"error_description\":\"No error\",\"customer\":{\"id_number\":\"760905145565\",\"id_type\":1,\"address\":\"Block A, 20-3A, Nadi Bangsar Condo 18, Jalan Tandok Bangsar Kuala Lumpur Kuala Lumpur MYS\",\"customer_name\":\"pandu Yosuf\",\"email\":\"pandu.yosuf663@gmail.com\",\"fax\":null},\"account\":[{\"acc_id\":100030000000728088,\"acc_code\":\"5000002933088\",\"subscriber_id\":100030000000728087,\"parent_account_id\":null,\"account_status\":2,\"billable\":null,\"credit_limit\":0,\"outstanding\":0}],\"contact\":[{\"contact_id\":589,\"contact_type\":1,\"contact_info\":\"01162088514\",\"status\":1,\"updated_by\":null,\"update_date\":\"2025-11-19\"},{\"contact_id\":590,\"contact_type\":9,\"contact_info\":\"pandu.yosuf663@gmail.com\",\"status\":1,\"updated_by\":null,\"update_date\":\"2025-11-19\"}]}"}



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
                    <button type="button" id="btn-submit-customer" class="btn btn-primary">Submit</button>
                </div>
            </div>

            <div class="card d-none mt-2" id="customer-no-result-container">
                <div class="card-body">
                    Customer not found
                </div>
            </div>

            <div class="card d-none mt-2" id="customer-result-container">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-12">
                            <div class="h2"><span id="customer_name">Chan Tai Meng</span> (<span id="customer_identity_number"></span>)</div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-3">
                            <div class="field-group justify-content-start">
                                <label class="me-3">ID Number</label>
                                <span id="customer_id_number"></span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="field-group justify-content-start">
                                <label class="me-3">ID Type</label>
                                <span id="customer_id_type"></span>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-3">
                            <div class="field-group justify-content-start">
                                <label class="me-3">Fax</label>
                                <span id="customer_fax"></span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="field-group justify-content-start">
                                <label class="me-3">Email</label>
                                <span id="customer_email"></span>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-6">
                            <div class="field-group justify-content-start">
                                <label class="me-3">Address</label>
                                <span id="customer_address"></span>
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
                <hr />
                <div class="card d-none mt-2 bg-light-grey" id='customer-contact-list-conatiner'>
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
            </div>


            

                    
        </section>

        
    `;

    setTimeout(() => {
        const customerResultContainer = document.getElementById('customer-result-container');
        const customerNoResultContainer = document.getElementById('customer-no-result-container');
        const customerContactListconatiner = document.getElementById('customer-contact-list-conatiner');
        const btnSubmit = document.getElementById('btn-submit-customer');
        const customerNo = document.getElementById('customer_no');
        btnSubmit.addEventListener('click', async function(){
            const customerNoValue = customerNo.value;
            console.log(customerNoValue);
        
            const url = `${API_BASE}/custinq_2002.php?endpoint=getdetails&customer_id=${customerNoValue}`;
            const result = await fetchAPI(url);

            customerResultContainer.classList.add('d-none');
            customerNoResultContainer.classList.add('d-none');

            if (result.success = true) {
                const response = JSON.parse(result.response);
                console.log(response);
                
                if ( response.error_code == 0 ) {

                    if (response.customer.length === 0) { 
                        customerNoResultContainer.classList.remove('d-none');
                    }
                    else {
                        const type = "Customer";
                        const body = {
                            type
                        };
                        const url = `${API_BASE}/getMapping.php`;
                        const customerJson  = await fetchAPI(url, body);
                        const customerIdTypeMapping = customerJson.IDType;

                        const idTypeObj = Object.values(customerIdTypeMapping).find(s => s.ID === Number(response.customer.id_type));
                        const idTypeDisplay = idTypeObj ? idTypeObj.DISPLAY : (response.customer.id_type ?? "0");

                        document.getElementById('customer_name').innerHTML = response.customer.customer_name;
                        document.getElementById('customer_identity_number').innerHTML = response.customer.id_number;
                        document.getElementById('customer_id_number').innerHTML = response.customer.id_number;
                        document.getElementById('customer_id_type').innerHTML = idTypeDisplay;
                        document.getElementById('customer_fax').innerHTML = response.customer.fax ?? "N/A";
                        document.getElementById('customer_email').innerHTML = response.customer.email;
                        document.getElementById('customer_address').innerHTML = response.customer.address;
                    
                        loadCustomerTable(response.account);
                        loadCustomerContactTable(response.contact);


                        customerResultContainer.classList.remove('d-none');
                        customerContactListconatiner.classList.remove('d-none');
                    
                    }

                }
                else {

                }
            }
            else {
                
            }

            
        });
        
    }, 500);

    return html;
}