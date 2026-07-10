//Page 2001
import { loadInquiryTable } from "../components/inquiry.js";
import { logEvent } from '../logEvent.js';

export async function Inquiry() {
    // const activeAssignmentList = await getActiveAssignmentList();
    // const getActiveAssignmentListTableactions = await getActiveAssignmentListTableData();
    logEvent('info', 'Visit Account Search page');
    
    const fields = {
        "account_code": "Customer Name",
        "customer_name": "Customer Name",
        "id_number": "Customer Name",
        "msisdn": "Customer Name",
        "invoice_number": "Customer Name",

    }
    const html =  `
        <section class="container-fluid active-assignment-list-section">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body" >
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <h4>Account Search</h4>
                                </div>
                            </div>
                            <div class="row justify-content-start">
                                <div class="col-8 border border-1 p-3">
                                    <form id="active-assignment-list-form">
                                        <div class="row">
                                            <div class="col-12 d-flex">
                                                <div class="me-5">
                                                    <label for="field_name" class="w-auto ">Field Name</label>
                                                    <select name="field_name" id="field_name" class="search-input">
                                                        <option value="">Select Field</option>
                                                        <option value="account_code">Account Code</option>
                                                        <option value="customer_name">Customer Name</option>
                                                        <option value="id_number">ID Number</option>
                                                        <option value="msisdn">Phone Number</option>
                                                        <option value="invoice_number">Invoice Number</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label for="field_value" class="w-auto" >Value</label>
                                                    <input type="text" id="field_value" name="field_value" value="" class="search-input"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="error-message" class="mb-3 error-message"></div>
                                        <div class="row text-start mt-2">
                                            <div class="col-12">
                                                <button type="button" id="btn-cancel-search" class="btn btn-secondary">Cancel</button>
                                                <button type="submit" class="btn btn-primary">Search</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            
                            <div class="row>
                                <div class="col-12">
                                    <table id="active-assignment-list-table">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
    `;

    setTimeout(() => {

        document.getElementById("btn-cancel-search").addEventListener("click", function(){
            const searchInputs = document.querySelectorAll('.search-input');
            searchInputs.forEach(input => {
                input.disabled = false;
                input.value = "";
            });
        });

        document.getElementById("active-assignment-list-form").addEventListener("submit", async (e) => {
            e.preventDefault();

            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = "";

            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = "Searching...";

            try {
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());

                if (!data.field_name || data.field_name.trim() === "") {
                    errorMessage.textContent = "Please Select Field";
                    return;
                }
                if (!data.field_value || data.field_value.trim() === "") {
                    errorMessage.textContent = "Please Enter Value";
                    return;
                }

                const submitData = {
                    [data.field_name]: data.field_value.trim()
                };
                console.log(submitData);

                await loadInquiryTable(submitData);
            } catch (err) {
                errorMessage.textContent = "An error occurred. Please try again.";
                console.error(err);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Search";
            }
        });
        
    }, 0);
    
    return html;
}