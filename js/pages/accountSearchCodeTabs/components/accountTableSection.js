export async function rendorAccountTableSection(tab) {
    return `
        <div class="mb-4">
            <div class="row">
                <div class="col-4">
                    <div class="form-control">
                        <select name="select-account-code-sub-info" class="tomselect-single" id="${tab}-select-account-code-sub-info">
                            <option value="">Please select</option>
                            <option value="subscriber">Subscriber</option>
                            <option value="invoice">Invoice</option>
                            <option value="payment">Payment</option>
                            <option value="collection">Collection</option>
                            <option value="aging_bucket" class="dummy">Aging Bucket</option>
                            <option value="blacklist_history">Blacklist History</option>
                            <option value="contact">Contact</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table id="${tab}-option-table">
                        <thead >
                            <tr id="${tab}-table-header"></tr>
                        </thead>
                        <tbody></tbody>
                        
                    </table>
                </div>
            </div>
            <div id="${tab}-adjustment-table-container" class="d-none">
                <div class="row">
                    <div class="col-12">
                        <strong>Adjustment</strong>
                    </div>
                </div>
                <div id="adjustment-table-row" class="row adjustment-table-row">
                    <div class="col-12">
                        <table id="${tab}-adjustment-table">
                            <thead >
                                <tr id="${tab}-adjustment-table-header"></tr>
                            </thead>
                            <tbody></tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
};
