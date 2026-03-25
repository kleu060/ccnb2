// import { getAccount, getAccountActionHistory } from "../api/account-api.js";
// import { loadDebtorTable } from "../components/debtor-table.js";


export async function CustomerSearch() {
    // Get account_no from query string
    const params = new URLSearchParams(window.location.search);
    const accountNo = params.get('account_code') || '';

    return `
        <section class="container-fluid debtor-information">
            <div class="row">
                <div class="col">
                    <label>Customer</label>
                    <input type="text" name="customer_no" id="customer_no" value="${accountNo}"></input>
                    <button type="button" id="btn-submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </section>

        
    `;
}