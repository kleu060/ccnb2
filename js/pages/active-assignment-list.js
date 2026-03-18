import { loadActiveListAssignmentTable } from "../components/active-list-assignment-table.js";


export async function ActiveAssignmentList() {
    // const activeAssignmentList = await getActiveAssignmentList();
    // const getActiveAssignmentListTableactions = await getActiveAssignmentListTableData();
    
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
                                    <h4>Active Assignment List</h4>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="col-8 border border-1 p-3">
                                    <form id="active-assignment-list-form">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="field-group">
                                                    <label for="account_code" >Field Name</label>
                                                    <select name="field_name">
                                                        <option value="">Select Field</option>
                                                        <option value="account_code">Account Code</option>
                                                        <option value="customer_name">Customer Name</option>
                                                        <option value="id_number">ID Number</option>
                                                        <option value="msisdn">Phone Number</option>
                                                        <option value="invoice_number">Invoice Number</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="field-group">
                                                    <label for="account_code" >Value</label>
                                                    <input type="text" id="field_name" name="field_value" value="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row row-cols-2 ">
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="account_code" >Account No.</label>
                                                    <input class="search-input" type="text" id="account_code" name="account_code"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="customer_name">Customer Name</label>
                                                    <input class="search-input" type="text" name="customer_name" id="customer_name"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="id_number" >ID Number</label>
                                                    <input class="search-input" type="text" id="id_number" name="id_number"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="msisdn" >MSISDN</label>
                                                    <input class="search-input" type="date" id="msisdn" name="msisdn"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="invoice_number" >Invoice Number</label>
                                                    <input class="search-input" type="text" id="invoice_number" name="invoice_number"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="iccid" >ICCID</label>
                                                    <input class="search-input" type="text" id="iccid" name="iccid"/>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="row text-center mt-4">
                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary">Search</button>
                                                <button type="button" id="btn-cancel-search" class="btn btn-secondary">Cancel</button>
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
        const searchInputs = document.querySelectorAll('.search-input');
        
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {

            console.log("input");
            if (this.value.trim() !== '') {
                // Disable and clear all other inputs
                searchInputs.forEach(otherInput => {
                if (otherInput !== this) {
                    otherInput.value = '';
                    otherInput.disabled = true;
                }
                });
            } else {
                // Enable all inputs when current input is empty
                searchInputs.forEach(otherInput => {
                    otherInput.disabled = false;
                });
            }
            });
        });
        document.getElementById("btn-cancel-search").addEventListener("click", function(){
            const searchInputs = document.querySelectorAll('.search-input');
            searchInputs.forEach(input => {
                input.disabled = false;
                input.value = "";
            });
        });

        document.getElementById("active-assignment-list-form").addEventListener("submit", async (e) => {
            e.preventDefault();

            console.log("form submit");
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            loadActiveListAssignmentTable(data);
        });
        
    }, 0);
    
    return html;
}