import { fetchData , loadCtosTable } from "../../components/ctos-table.js";
import { APP_ROOT, API_BASE } from '../../config.js';

export async function renderCTOSTab() {

    const html = `
        <div class="tab-pane fade" id="ctos-tab" role="tabpanel" aria-labelledby="ctos-tab">
            <div class="container-fluid debtor-information">
                <h1>CTOS</h1>

                <div class="row">
                    <form id="blacklist-ctos-account-code-form" class="d-flex align-items-end">
                        <div class="col-3">
                            <div class="field-group justify-content-start flex-column me-2">
                                <label>Account Code</label>
                                <input type="text" name="ctos-account-code" id="ctos-account-code" value=""></input>
                                
                            </div>
                        </div>
                        <div class="col-2">
                            <input type="hidden" name="search-type" id="blacklist-ctos-account-code-form-search-type" value="acc_code"/>
                            <button type="submit" id="btn-blacklist-ctos-account-code-form-submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>    
                </div>

                <div class="row mb-3">
                    <form id="blacklist-ctos-id-number-form" class="d-flex align-items-end">
                        <div class="col-3 me-2">    
                            <div class="field-group justify-content-start flex-column ">
                                <label>ID Number</label>
                                <input type="text" name="ctos-id-number" id="ctos-id-number" value=""></input>
                            </div>
                        </div>
                        <div class="col-3 me-2">
                            <div class="field-group justify-content-start flex-column">
                                <label>ID type</label>
                                <select name="ctos-id-type" id="ctos-id-type">
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
                            <input type="hidden" id="blacklist-ctos-id-number-form-search-type" value="id_num"/>
                            <button type="button" id="btn-blacklist-ctos-id-number-form-submit" class="btn btn-primary">Submit</button>
                        
                            
                        </div>
                        <div class="col-3 d-flex align-items-end">
                            <div class="field-group justify-content-start flex-column ">
                                <label>ETR Upload</label>
                                <input type="file" id="file-etr-upload">
                            </div>
                            <button type="button" id="btn-etr-upload" class="btn btn-primary mb-0">Upload</button>
                        </div>
                    </form>
                </div>

                <div class="row mb-3" x-data="{ blDataCtos: {} }" x-ref="blRow" @update-bl-data-ctos.window="blDataCtos = $event.detail">
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">ID Blacklist</label>
                            <span x-text="blDataCtos.name"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Reason</label>
                            <span x-text="blDataCtos.reason"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Sub Reason</label>
                            <span x-text="blDataCtos.subreason"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="field-group justify-content-start">
                            <label class="me-3">Date</label>
                            <span x-text="blDataCtos.updated_date"></span>
                        </div>
                    </div>
                    <div class="col-2 ">
                        <div class="field-group justify-content-start">
                            <label class="me-3 w-auto">By</label>
                            <span x-text="blDataCtos.updated_by"></span>
                        </div>
                    </div>
                    <div class="col-2">
                        <button id="btn-ctos-print-id-blacklist" class="btn btn-primary">Print</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div id="ctos-table-container"
                                        data-search-search-type=""
                                        data-search-account-code="" data-search-id-num="" data-search-id-type="">
                                            <div id="ctos-table-row" class="row ctos-table-row">
                                                <div class="col-12">
                                                    <table id="ctos-table">
                                                        <thead >
                                                            <tr id="ctos-table-header">
                                                            
                                                            </tr>
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

        setTimeout(() => {
                    
            const btnBlacklistCtosAccountCodeFormSubmit = document.getElementById("btn-blacklist-ctos-account-code-form-submit");
            const btnBlacklistCtosIdNumberFormSubmit = document.getElementById("btn-blacklist-ctos-id-number-form-submit");
            const btnEtrUpload = document.getElementById("btn-etr-upload");

            btnEtrUpload.addEventListener("click", async (e) => {
                e.preventDefault();
                const fileEtrUpload = document.getElementById("file-etr-upload");
                const formData = new FormData();
                formData.append("file", fileEtrUpload.files[0]);

                console.log("etr upload");

                // let fetchResult = await fetchData("upload", formData);
                // loadCtosTable( fetchResult );
                // let parsed = JSON.parse(fetchResult.response);
            })

            btnBlacklistCtosAccountCodeFormSubmit.addEventListener("click", async (e) => {
                e.preventDefault();

                clearBlData();
                document.getElementById("ctos-id-number").value = "";

                const searchType = document.getElementById("blacklist-ctos-account-code-form-search-type").value;
                const accountCode = document.getElementById("ctos-account-code").value;

                let fetchResult = await fetchData(searchType, accountCode);
                loadCtosTable( fetchResult );

                let parsed = JSON.parse(fetchResult.response);
                if (parsed.id_blacklist && parsed.id_blacklist.length > 0) {
                    updateBlData(parsed.id_blacklist[0]);
                }

                const ctosTableContainer = document.getElementById("ctos-table-container");
                ctosTableContainer.setAttribute("data-search-account-code", accountCode);
                ctosTableContainer.dataset.searchSearchType = searchType;
                ctosTableContainer.dataset.searchAccountCode = accountCode;

            });

            btnBlacklistCtosIdNumberFormSubmit.addEventListener("click", async (e)=>{
                e.preventDefault();

                clearBlData();
                document.getElementById("account-code").value = "";

                const searchType = document.getElementById("blacklist-ctos-id-number-form-search-type").value;
                const idNumber = document.getElementById("ctos-id-number").value

                const idType = document.getElementById("ctos-id-type").value
                let fetchResult = await fetchData( searchType, idNumber, idType );
                loadCtosTable( fetchResult );
                
                let parsed = JSON.parse(fetchResult.response);
                if (parsed.id_blacklist && parsed.id_blacklist.length > 0) {
                    updateBlData(parsed.id_blacklist[0]);
                }

                const ctosTableContainer = document.getElementById("ctos-table-container");
                ctosTableContainer.setAttribute("data-search-id-num", idNumber);

                ctosTableContainer.dataset.searchSearchType = searchType;
                ctosTableContainer.dataset.searchIdNum = idNumber;
                ctosTableContainer.dataset.searchIdType = idType;
            })

            const btnPrintIdBlacklist = document.getElementById("btn-ctos-print-id-blacklist");
            btnPrintIdBlacklist.addEventListener("click", (e) => {
                const accountCode = document.getElementById("ctos-account-code").value;
                const searchString = document.getElementById("ctos-id-number").value;
                const idType = document.getElementById("ctos-id-type").value;

                window.open(APP_ROOT + "/print_blacklist.html?accountCode="+ accountCode + "&idNumber=" + searchString + "&idType=" + idType);
            })
            
            /* print button in table click Event Listener */
            const tableContainer = document.getElementById('ctos-table-container');
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
                
                tableContainer.addEventListener('click', async (e) => {
                    const btn = e.target.closest('.btn-ctos-deblacklist');
                    if (!btn) return;
                    if ( confirm("Confirm Deblacklist Account to CTOS?") ) {
                        const blacklistType = "acc_code";
                        const searchString = btn.dataset.accountCode ;
                        const body = {
                            blacklistType,
                            searchString,
                        };
                        // console.log(JSON.stringify(body));
                        const response = await fetch(`${API_BASE}/index.php?endpoint=deblacklist`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(body),
                            credentials: "include"
                        });

                        console.log(response);


                        const ctosTableContainer = document.getElementById("ctos-table-container");
                        const searchSearchType = ctosTableContainer.dataset.searchSearchType;
                        if ( searchSearchType == "acc_code" ) {
                            const accountCode = ctosTableContainer.dataset.searchAccountCode;

                            let fetchResult = await fetchData(searchSearchType, accountCode);
                            loadCtosTable( fetchResult );
                        }
                        else {
                            const idNumber = ctosTableContainer.dataset.searchIdNum;
                            const idType = ctosTableContainer.dataset.searchIdType;

                            let fetchResult = await fetchData( searchType, idNumber, idType );
                            loadCtosTable( fetchResult );
                        }
                        
                    }

                });
            
            }
        }, 0);


        //btn-account-blacklist-print

        function clearBlData(idBlackList) {
            window.dispatchEvent(new CustomEvent('update-bl-data-ctos', {
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
            window.dispatchEvent(new CustomEvent('update-bl-data-ctos', {
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