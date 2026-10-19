export async function rendorAccountDetailSection(tab) {
    

    return `
        <div class="card mb-1">
            <div class="card-body">
                <div class="row ">
                    <div class="col-12 mb-2" >
                        <div class="d-flex align-items-center">
                            <div class="round-icon-container bg-bright-blue me-2">
                                <span class="icon icon-address-card bg-white"></span>
                            </div>                    
                            <h4 class="mb-0"><span x-text="account.name"></span>(<span x-text="account.identity_id"></span>)</h4>
                        </div>
                    </div>
                    
                </div>
                
                <div class="row">
                    <div class="col-4">
                        <div class="">
                            <label class="d-block">Account Code</label>
                            <span class="fs-l fw-bold" x-text="account.acc_code"  id="${tab}-account-code-acc-code"></span>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="">
                            <label class="d-block">Customer ID</label>
                            <span class="fs-l fw-bold" x-text="account.cust_id" id="${tab}-account-code-customer-id"></span>
                        </div>
                        <div class="">
                            <label class="d-block">Billable</label>
                            <span class="fs-l fw-bold"  x-text="account.billable"></span>
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="">
                            <label class="d-block">Account ID</label>
                            <span class="fs-l fw-bold" id="${tab}-account-code-acc-id" x-text="account.acc_id"></span>
                        </div>
                        <div class="">
                            <label class="d-block">Parent Account ID</label>
                            <span class="fs-l fw-bold" x-text="account.parent_acc_id"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card mb-1">
            <div class="card-body">
                <div class="row row-cols-2 row-cols-lg-4">
                    <div class="col-4">
                        <div class="field-group">
                            <label class="">Acc Status</label>
                            <span  x-text="account.acc_status"></span>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="field-group">
                            <label class="">Acc Status Date</label>
                            <span  x-text="account.acc_status_date"></span>
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
                            <label class="">Overdue Days</label>
                            <span  x-text="account.overdue_days"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Oldest Due Date</label>
                            <span  x-text="account.oldest_due_date"></span>
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
                            <label class="">O/S Balance</label>
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
                            <label class="">Credit Balance</label>
                            <span  x-text="account.credit_bal"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Last pay date</label>
                            <span  x-text="account.last_pay_date"></span>
                        </div>
                    </div>
                </div>
                <hr />
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
                                <label class="">Writeoff Date</label>
                                <span  x-text="account.writeoff_date"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-1">
            <div class="card-body">
                <div class="row row-cols-2 row-cols-lg-4">    
                    <div class="col">
                        <div class="field-group">
                            <label class="">Dunning Group</label>
                            <span  x-text="account.dunning_group"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Collection Status</label>
                            <span  x-text="account.collection_status"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Collection Start Date</label>
                            <span  x-text="account.collection_start"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">End Date</label>
                            <span  x-text="account.collection_end"></span>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2 row-cols-lg-4">
                    <div class="col">
                        <div class="field-group">
                            <label class="">Campaign/DCA</label>
                            <span  x-text="account.campaign"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Call Agent</label>
                            <span  x-text="account.call_agent"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">DC Agency</label>
                            <span  x-text="account.dca_code"></span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="field-group">
                            <label class="">Disposition</label>
                            <span  x-text="account.disposition"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card mb-1">
            <div class="card-body">
                <div class="row row-cols-2 row-cols-lg-4">    
                    <div class="col">
                        <div class="field-group">
                            <label class="text-nowrap">Principle Subsciber ID</label>
                            <span  x-text="account.principle_subscriber_id"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">subs status</label>
                            <span  x-text="account.subs_status"></span>
                        </div>

                        <div class="field-group">
                            <label class="">Primary Offer</label>
                            <span  x-text="account.primary_offer"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Subs Status Date</label>
                            <span  x-text="account.subs_status_date"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Last Susp date</label>
                            <span  x-text="account.last_susp_date"></span>
                        </div>
                        <div class="field-group">
                            <label class="">Termination Date</label>
                            <span  x-text="account.termination_date"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-1">
            <div class="card-body">
                <div class="row row-cols-2 row-cols-lg-4">    
                    <div class="col">
                        <div class="field-group">
                            <label class="text-nowrap">blacklist status</label>
                            <span  x-text="account.blacklist_status"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Status Date</label>
                            <span  x-text="account.status_date"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">Subs Status Date</label>
                            <span  x-text="account.subs_status_date"></span>
                        </div>
                    </div>

                    <div class="col">
                        <div class="field-group">
                            <label class="">NOD</label>
                            <span  x-text="account.nod"></span>
                        </div>
                        <div class="field-group">
                            <label class="">NOD Date</label>
                            <span  x-text="account.nod_date"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}