import { getAccount, getAccountSubInfo, getAccountActionHistory } from "../../api/account-api.js";
import { loadDebtorTable } from "../../components/debtor-table.js";
import { rendorAccountDetailSection } from "./components/accountDetailSection.js";

export async function renderAccountTab() {
    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accCode = params.get('acc_code') || '';
    // const account = await getAccount('acc_code');
    const actions = await getAccountActionHistory('acc_code');

    const html = `
        <div class="tab-pane fade show active" id="account-tab" role="tabpanel" aria-labelledby="account-tab">
            <section class="container-fluid" id="account-enquiry-account-tab">
                
                <!-- Search form -->
                <div class="row mb-2">
                    <div class="col-4">
                        <form id="account-enquiry-acc-code-form">
                            <label>Account Code</label>
                            <input type="text" id="account-enquiry-acc-code-form-acc-code" name="account-enquiry-acc-code-form-acc-code"  value="${accCode}"></input>
                            <input type="hidden" id="account-enquiry-acc-code-form-search-type" name="account-enquiry-acc-code-form-search-type" value="acc_code"></input>
                            <button type="button" id="btn-submit-account-enquiry-acc-code-form" class="btn btn-primary">Search</button>
                        </form>
                    </div>
                    <div class="col-4">
                        <form id="account-enquiry-acc-id-form">
                            <label>Account ID</label>
                            <input type="text" id="account-enquiry-acc-id-form-acc-id" name="account-enquiry-acc-id-form-acc-id" value=""></input>
                            <input type="hidden" id="account-enquiry-acc-id-form-search-type" name="account-enquiry-acc-id-form-search-type" value="acc_id"></input>
                            <button type="button" id="btn-submit-account-enquiry-acc-id-form" class="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>

                <!-- Account Not Found Section -->
                <div id="account-code-no-result-container" class="row  d-none">
                    <div class="card">
                        <div class="card-body">
                            Account not found
                        </div>
                    </div>
                </div>

                <div id="account-code-result-container" class="row d-none">
                    <div class="col-10" x-data="{ account: {} }" x-ref="accRow" @update-account.window="account = $event.detail">
                        
                        <!-- Account Detail -->
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-4">
                                    <div class="row">
                                        <div class="col-12 mb-2">
                                            <h4 class=""><span x-text="account.name"></span>(<span x-text="account.id"></span>)</h4>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-4">
                                            <div class="field-group justify-content-start">
                                                <label class="me-3">Customer Code</label>
                                                <span  x-text="account.acc_code"></span>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="field-group justify-content-start ">
                                                <label class="me-3">Customer ID</label>
                                                <span  x-text="account.cust_id"></span>
                                            </div>
                                        </div>
                                        
                                        <div class="col-4">
                                            <div class="field-group justify-content-start">
                                                <label class="me-3">Account ID</label>
                                                <span id="account-code-acc-id" x-text="account.acc_id"></span>
                                            </div>
                                            <div class="field-group justify-content-start">
                                                <label class="me-3">Parent Account ID</label>
                                                <span  x-text="account.parent_acc_id"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />


                                    <div class="row row-cols-2 row-cols-lg-4">
                                        <div class="col-4">
                                            <div class="field-group">
                                                <label class="">Status</label>
                                                <span  x-text="account.status"></span>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="field-group">
                                                <label class="">Status Date</label>
                                                <span  x-text="account.status_date"></span>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="field-group">
                                                <label class="">Acct Create Date</label>
                                                <span  x-text="account.acc_create_date"></span>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="field-group">
                                                <label class="">Writeoff</label>
                                                <span  x-text="account.writeoff"></span>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Over Due</label>
                                                <span  x-text="account.overdue"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Dunning Group</label>
                                                <span  x-text="account.dunning_grp"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Red List</label>
                                                <span  x-text="account.redlist"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">NPSI flag</label>
                                                <span  x-text="account.npsi"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">O/S Bal</label>
                                                <span  x-text="account.os_bal"></span>
                                            </div>
                                        </div>
                                        
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Overdue Amt</label>
                                                <span  x-text="account.overdue_amt"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Last pay date</label>
                                                <span  x-text="account.last_pay_date"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Last pay Amt</label>
                                                <span  x-text="account.last_pay_amt"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <div class="row row-cols-2 row-cols-lg-4">
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Bill Cycle</label>
                                                <span  x-text="account.bill_cycle"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Credit Limit</label>
                                                <span  x-text="account.credit_limit"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Payment Mode</label>
                                                <span  x-text="account.payment_mode"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Acct Category</label>
                                                <span  x-text="account.acc_cat"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">CTC Code</label>
                                                <span  x-text="account.ctc"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">BIG</label>
                                                <span  x-text="account.big"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Credit Score</label>
                                                <span  x-text="account.credit_score"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Credit balnce</label>
                                                <span  x-text="account.credit_bal"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <div class="row row-cols-2 row-cols-lg-4">    
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Assigned to</label>
                                                <span  x-text="account.assigned_to"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Campaign</label>
                                                <span  x-text="account.campaign"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">sched callback</label>
                                                <span  x-text="account.sched_callback"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">PTP</label>
                                                <span  x-text="account.ptp"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Current DCA</label>
                                                <span  x-text="account.current_dca"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">DCA Batch</label>
                                                <span  x-text="account.dca_batch"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Start Date</label>
                                                <span  x-text="account.start_date"></span>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">End Date</label>
                                                <span  x-text="account.end_date"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <div class="row row-cols-2 row-cols-lg-4">    
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Write Off Date</label>
                                                <span  x-text="account.write_off_date"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Last SUSP Date</label>
                                                <span  x-text="account.last_susp_date"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Termination Date</label>
                                                <span  x-text="account.termination_date"></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Agent Update -->
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-4">
                                    <div class="row row-cols-2 row-cols-lg-3">
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Update disposition</label>
                                                <select name="sel-update-disposition" id="sel-update-disposition">
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                </select>
                                                <button type="button" name="submit-update-disposition">Update</button>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Sched Call back</label>
                                                <input type="datetime-local" name="input-sched-call-back" id="input-sched-call-back"/>
                                                <button type="button" name="submit-sched-call-back">Update</button>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Contact Type</label>
                                                <select name="select-contact-type" id="select-contact-type">
                                                    <option value="mobile">Mobile</option>
                                                    <option value="phone">Phone</option>
                                                    <option value="email">E-mail</option>
                                                </select>
                                                <button type="button" name="submit-contact-type">Add</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Account Code Table -->
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-4">
                                    <div class="row row-cols-2 row-cols-lg-4">
                                        <div class="col">
                                            <select name="select-account-code-sub-info" id="select-account-code-sub-info">
                                                <option value="">Please select</option>
                                                <option value="subscriber">Subscriber</option>
                                                <option value="dca">DCA</option>
                                                <option value="invoice">Invoice</option>
                                                <option value="payment">Payment</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <table id="option-table">
                                                <thead >
                                                    <tr id="table-header"></tr>
                                                </thead>
                                                <tbody></tbody>
                                                
                                            </table>
                                        </div>
                                    </div>
                                    <div id="adjustment-table-container" class="d-none">
                                        <div class="row">
                                            <div class="col-12">
                                                <strong>Adjustment</strong>
                                            </div>
                                        </div>
                                        <div id="adjustment-table-row" class="row adjustment-table-row">
                                            <div class="col-12">
                                                <table id="adjustment-table">
                                                    <thead >
                                                        <tr id="adjustment-table-header"></tr>
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
                
                    <div class="col-2" x-data='{ actions: ${JSON.stringify(actions)} }'>
                        <div class="card">
                            <div class="card-header">
                                <h5>Action History</h5>
                            </div>
                            <div class="card-body">
                                <template x-for="(action, index) in actions" :key="index">
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <div x-text="action.date"></div>
                                            <div x-text="action.event"></div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>        
    `;

    setTimeout(() => {
        const btnSubmitAccountEnquiryAccCodeForm = document.getElementById("btn-submit-account-enquiry-acc-code-form");
        const btnSubmitAccountEnquiryIdCodeForm = document.getElementById("btn-submit-account-enquiry-acc-id-form");
        const selectAccountCodeSubInfo = document.getElementById("select-account-code-sub-info");

        selectAccountCodeSubInfo.addEventListener("change", async(e)=> {
            e.preventDefault();

            const searchType = e.target.value;
            const accId = document.getElementById("account-code-acc-id").textContent;
            let fetchSubInfoResult = await getAccountSubInfo(searchType, accId);

            console.log(fetchSubInfoResult);
            loadDebtorTable(searchType, fetchSubInfoResult);
        });
    
        btnSubmitAccountEnquiryAccCodeForm.addEventListener("click", async (e)=>{
            e.preventDefault();
            clearAccountData();

            document.getElementById("account-enquiry-acc-id-form-acc-id").value = "";
            const searchType = document.getElementById("account-enquiry-acc-code-form-search-type").value;
            const accCode = document.getElementById("account-enquiry-acc-code-form-acc-code").value;

            selectAccountCodeSubInfo.value = "";
            selectAccountCodeSubInfo.selectedIndex = 0;
            selectAccountCodeSubInfo.dispatchEvent(new Event('change', { bubbles: true }));

            let fetchResult = await getAccount(searchType, accCode);
            console.log(fetchResult);

            
            if (!isEmptyFetchResult(fetchResult))  {
                updateAccountData(fetchResult);
                
                document.getElementById("account-code-no-result-container").classList.add("d-none");
                document.getElementById("account-code-result-container").classList.remove("d-none");
                
            }
            else {
                document.getElementById("account-code-no-result-container").classList.remove("d-none");
                document.getElementById("account-code-result-container").classList.add("d-none");
                
            }
            
            
        });

        btnSubmitAccountEnquiryIdCodeForm.addEventListener("click", async (e)=>{
            e.preventDefault();
            clearAccountData();

            const searchType = document.getElementById("account-enquiry-acc-id-form-search-type").value;
            const accId = document.getElementById("account-enquiry-acc-id-form-acc-id").value;
            document.getElementById("account-enquiry-acc-code-form-acc-code").value = "";

            selectAccountCodeSubInfo.value = "";
            selectAccountCodeSubInfo.selectedIndex = 0;
            selectAccountCodeSubInfo.dispatchEvent(new Event('change', { bubbles: true }));

            let fetchResult = await getAccount(searchType, accId);
            console.log(fetchResult);

            if (!isEmptyFetchResult(fetchResult))  {
                updateAccountData(fetchResult);
                
                document.getElementById("account-code-no-result-container").classList.add("d-none");
                document.getElementById("account-code-result-container").classList.remove("d-none");
                
            }
            else {
                document.getElementById("account-code-no-result-container").classList.remove("d-none");
                document.getElementById("account-code-result-container").classList.add("d-none");
                
            }
        
        });

        function isEmptyFetchResult(v) {
            if (v == null) return true;                     // null or undefined
            if (typeof v === 'string') return v.trim() === ''; // empty string
            if (Array.isArray(v)) return v.length === 0;       // empty array
            if (typeof v === 'object') return Object.keys(v).length === 0; // empty object
            return false;
        }


    }, 0 );

    //{"success":true,"response":"{\"acc_code\":\"AXD2000038541928\",\"cust_id\":\"100000010303276102\",\"acc_id\":\"100000020529629468\",\"parent_acc_id\":null,\"status\":\"2\",\"status_date\":\"2016-06-14 06:28:58\",\"acc_create_date\":\"2016-06-14 06:28:58\",\"writeoff\":null,\"overdue_amt\":null,\"dunning_grp\":\"1\",\"redlist\":null,\"npsi\":null,\"os_bal\":null,\"last_pay_date\":null,\"bill_cycle\":null,\"credit_limit\":null,\"payment_mode\":\"0\",\"acc_cat\":null,\"ctc\":null,\"big\":null,\"credit_bal\":null}"}

    function clearAccountData() {
        window.dispatchEvent(new CustomEvent('update-account', {
            detail: {
                acc_code: "",
                cust_id: "",
                acc_id: "",
                parent_acc_id: "",
                status: "",
                status_date: "",
                writeoff: "",
                overdue_amt: "",
                dunning_grp: "",
                npsi: "",
                os_bal: "",
                last_pay_date: "",
                bill_cycle: "",
                credit_limit: "",
                payment_mode: "",
                acc_cat: "",
                ctc: "",
                big: "",
                credit_bal: "",
            }
        }));
    }

    function updateAccountData(account) {

        console.log("updateAccountData");
        console.log(account);
        window.dispatchEvent(new CustomEvent('update-account', {
            detail: {
                acc_code: account.acc_code,
                cust_id: account.cust_id,
                acc_id: account.acc_id,
                parent_acc_id: account.parent_acc_id,
                status: account.status,
                status_date: account.status_date,
                writeoff: account.writeoff,
                overdue_amt: account.overdue_amt,
                dunning_grp: account.dunning_grp,
                npsi: account.npsi,
                os_bal: account.os_bal,
                last_pay_date: account.last_pay_dte,
                bill_cycle: account.bill_cycle,
                credit_limit: account.credit_limit,
                payment_mode: account.payment_mode,
                acc_cat: account.acc_cat,
                ctc: account.ctc,
                big: account.big,
                credit_bal: account.credit_bal,
            }
        }));
    }


    return html;
}