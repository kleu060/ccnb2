import { getAccount, getAccountActionHistory } from "../../api/account-api.js";
// import { loadDebtorTable } from "../components/debtor-table.js";


export async function renderAccountTab( accountNo, account, actions ) {
    // Get account_no from query string
    // const params = new URLSearchParams(window.location.search);
    // const accountNo = params.get('account_code') || '';
    // const account = await getAccount(accountNo);
    // const actions = await getAccountActionHistory(accountNo);
    
    return `
        <div class="tab-pane fade show active" id="account-tab" role="tabpanel" aria-labelledby="account-tab">
            <section class="container-fluid debtor-information">
                <div class="row">
                    <div class="col">
                        <label>Account No</label>
                        <input type="text" name="account_no" id="account_no" value="${accountNo}"></input>
                        <button type="button" id="btn-submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10" x-data='${JSON.stringify({ account })}'>
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
                                            <div class="field-group justify-content-start ">
                                                <label class="me-3">Customer ID</label>
                                                <span  x-text="account.customer_id"></span>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="field-group justify-content-start">
                                                <label class="me-3">Customer Code</label>
                                                <span  x-text="account.account_code"></span>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="field-group justify-content-start">
                                                <label class="me-3">Account ID</label>
                                                <span  x-text="account.account_id"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row row-cols-2 row-cols-lg-4">
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Over Due</label>
                                                <span  x-text="account.overdue"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Dunning Group</label>
                                                <span  x-text="account.dunning_group"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Red List</label>
                                                <span  x-text="account.red_list"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">NPSI flag</label>
                                                <span  x-text="account.npsi_flag"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">O/S Bal</label>
                                                <span  x-text="account.os_balance"></span>
                                            </div>
                                        </div>
                                        
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">Overdue Amt</label>
                                                <span  x-text="account.overdue_amount"></span>
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
                                                <span  x-text="account.acct_category"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">CTC Code</label>
                                                <span  x-text="account.ctc_code"></span>
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
                                                <label class="">Assigned to</label>
                                                <span  x-text="account.assigned_to"></span>
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
                                                <label class="">Current DCA</label>
                                                <span  x-text="account.current_dca"></span>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">from</label>
                                                <span  x-text="account.from"></span>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="field-group">
                                                <label class="">to</label>
                                                <span  x-text="account.to"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <div class="row row-cols-2 row-cols-lg-4">
                                        <div class="col">
                                            <select name="choices" id="choices">
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
}