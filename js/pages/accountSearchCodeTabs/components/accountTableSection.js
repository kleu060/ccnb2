export async function rendorAccountTableSection(tab) {
    return `
        <div class="mb-4">
            <div class="row row-cols-2 row-cols-lg-4">
                <div class="col">
                    <select name="select-account-code-sub-info" id="${tab}-select-account-code-sub-info">
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
