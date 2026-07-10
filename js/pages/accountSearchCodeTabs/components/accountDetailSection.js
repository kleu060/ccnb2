export async function rendorAccountDetailSection(tab) {
    
    return `
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
                                <label class="me-3">Account Code</label>
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
                                <span id="${tab}-account-code-acc-id" x-text="account.acc_id"></span>
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
    `;
}