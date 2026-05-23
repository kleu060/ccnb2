import { fetchData , loadBlacklistTable } from "../../components/blacklist-inquiry-table.js";
import { APP_ROOT } from "../../config.js"


export async function renderBlacklistInquiryTab() {
    let blData = [];
    

    const html =  `
        <section class="tab-pane fade show active" id="inquiry-tab" role="tabpanel" aria-labelledby="inquiry-tab">
            <div class="container-fluid debtor-information">
                <h1>Blacklist Inquiry</h1>

                <div class="row">
                    <form id="blacklist-enquiry-account-code-form" class="d-flex align-items-end">
                        <div class="col-3">
                            <div class="field-group justify-content-start flex-column me-2">
                                <label>Account Code</label>
                                <input type="text" name="account-code" id="account-code" value=""></input>
                                
                            </div>
                        </div>
                        <div class="col-2">
                            <input type="hidden" name="search-type" id="blacklist-enquiry-account-code-form-search-type" value="acc_code"/>
                            <button type="submit" id="btn-blacklist-enquiry-account-code-form-submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>    
                </div>

                <div class="row mb-3">
                    <form id="blacklist-enquiry-id-number-form" class="d-flex align-items-end">
                        <div class="col-3 me-2">    
                            <div class="field-group justify-content-start flex-column ">
                                <label>ID Number</label>
                                <input type="text" name="ID Number" id="id-number" value=""></input>
                            </div>
                        </div>
                        <div class="col-3 me-2">
                            <div class="field-group justify-content-start flex-column">
                                <label>ID type</label>
                                <select name="id-type" id="id-type">
                                    <option value="1">New NRIC</option>
                                    <option value="2">Passport</option>
                                    <option value="4">BRN</option>
                                    <option value="5">Old NRIC</option>
                                    <option value="6">Police</option>
                                    <option value="7">Military</option>
                                    <option value="15">MyPR</option>
                                    <option value="16">MyKAS</option>
                                    <option value="17">IKAD</option>
                                    <option value="18">IMM13/IMM13P</option>
                                    <option value="19">Work Permit</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-2">
                            <input type="hidden" id="blacklist-enquiry-id-number-form-search-type" value="id_num"/>
                            <button type="button" id="btn-blacklist-enquiry-id-number-form-submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>

                <div class="row mb-3" x-data="{ blData: {} }" x-ref="blRow" @update-bl-data.window="blData = $event.detail">
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">ID Blacklist</label>
                            <span x-text="blData.name"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Reason</label>
                            <span x-text="blData.reason"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Sub Reason</label>
                            <span x-text="blData.subreason"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Date</label>
                            <span x-text="blData.updated_date"></span>
                        </div>
                    </div>
                    <div class="col-2 ">
                        <div class="field-group justify-content-start">
                            <label class="me-3 w-auto">By</label>
                            <span x-text="blData.updated_by"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <button id="btn-print-id-blacklist" class="btn btn-primary">Print</button>
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
        setTimeout(() => {
            
            const btnBlacklistEnquiryAccountCodeFormSubmit = document.getElementById("btn-blacklist-enquiry-account-code-form-submit");
            const btnBlacklistEnquiryIdNumberFormSubmit = document.getElementById("btn-blacklist-enquiry-id-number-form-submit");


            btnBlacklistEnquiryAccountCodeFormSubmit.addEventListener("click", async (e) => {
                e.preventDefault();

                clearBlData();
                document.getElementById("id-number").value = "";
                
                const searchType = document.getElementById("blacklist-enquiry-account-code-form-search-type").value;
                const accountCode = document.getElementById("account-code").value;

                let fetchResult = await fetchData(searchType, accountCode);
                loadBlacklistTable( fetchResult );

                let parsed = JSON.parse(fetchResult.response);
                if (parsed.id_blacklist && parsed.id_blacklist.length > 0) {
                    updateBlData(parsed.id_blacklist[0]);
                }

            });

            btnBlacklistEnquiryIdNumberFormSubmit.addEventListener("click", async (e)=>{
                e.preventDefault();

                clearBlData();
                document.getElementById("account-code").value = "";

                const searchType = document.getElementById("blacklist-enquiry-id-number-form-search-type").value;
                const idNumber = document.getElementById("id-number").value

                const idType = document.getElementById("id-type").value
                let fetchResult = await fetchData( searchType, idNumber, idType );
                loadBlacklistTable( fetchResult );

                
                let parsed = JSON.parse(fetchResult.response);
                if (parsed.id_blacklist && parsed.id_blacklist.length > 0) {
                    updateBlData(parsed.id_blacklist[0]);
                }

            })

            const btnPrintIdBlacklist = document.getElementById("btn-print-id-blacklist");
            btnPrintIdBlacklist.addEventListener("click", (e) => {
                const accountCode = document.getElementById("account-code").value;
                const searchString = document.getElementById("id-number").value;
                const idType = document.getElementById("id-type").value;

                window.open( APP_ROOT + "/print_blacklist.html?accountCode="+ accountCode + "&idNumber=" + searchString + "&idType=" + idType);
            })
            
            const tableContainer = document.getElementById('blacklist-inquiry-table-container');
            if (tableContainer) {
                tableContainer.addEventListener('click', (e) => {
                    const btn = e.target.closest('.btn-account-blacklist-print');
                    if (!btn) return;

                    const customerName = btn.getAttribute("data-customer-name") || '';
                    const idType = btn.getAttribute("data-id-type") || '';
                    const idNumber = btn.getAttribute("data-id-number") || '';
                    const acctBlacklist = btn.getAttribute("data-acct-blacklist") || '';
                    const acctId = btn.getAttribute("data-acct-id") || '';
                    const statusDate = btn.getAttribute("data-status-date") || '';
                    const accountNumber = document.getElementById("account-code").value;

                    const url = APP_ROOT + "/print.html?customerName=" + encodeURIComponent(customerName)
                        + "&idType=" + encodeURIComponent(idType)
                        + "&idNumber=" + encodeURIComponent(idNumber)
                        + "&acctBlacklist=" + encodeURIComponent(acctBlacklist)
                        // + "&acctId=" + encodeURIComponent(acctId)
                        + "&statusDate=" + encodeURIComponent(statusDate)
                        + "&accountNumber=" + encodeURIComponent(accountNumber);

                    window.open(url);
                })
            }

        }, 0);


        //btn-account-blacklist-print

        function clearBlData(idBlackList) {
            window.dispatchEvent(new CustomEvent('update-bl-data', {
                detail: {
                    name: "",
                    reason: "",
                    subreason: "",
                    updated_date: "",
                    updated_by: ""
                }
            }));


        }


        function updateBlData(idBlackList) {
            window.dispatchEvent(new CustomEvent('update-bl-data', {
                detail: {
                    name: idBlackList.id_type,
                    reason: idBlackList.reason,
                    subreason: idBlackList.subreason,
                    updated_date: idBlackList.updated_date,
                    updated_by: idBlackList.updated_by
                }
            }));
        }



    return html;
}