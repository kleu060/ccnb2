export async function rendorSearchFormSection(tab, accCode = "") {
    return `
        <div class="card mb-2">
            <div class="card-body">
                <div class="row mb-2">
                    <div class="col-4">
                        <form id="${tab}-account-enquiry-acc-code-form">
                            <label class="d-block">Account Code</label>
                            <div class="d-flex gap-1">
                                <input type="text" id="${tab}-account-enquiry-acc-code-form-acc-code" name="account-enquiry-acc-code-form-acc-code"  value="${accCode}"></input>
                                <input type="hidden" id="${tab}-account-enquiry-acc-code-form-search-type" name="account-enquiry-acc-code-form-search-type" value="acc_code"></input>
                                <button type="submit" id="${tab}-btn-submit-account-enquiry-acc-code-form" class="btn btn-primary">Search</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-4">
                        <form id="${tab}-account-enquiry-acc-id-form">
                            <label  class="d-block">Account ID</label>
                            <div class="d-flex gap-1">
                                <input type="text" id="${tab}-account-enquiry-acc-id-form-acc-id" name="account-enquiry-acc-id-form-acc-id" value=""></input>
                                <input type="hidden" id="${tab}-account-enquiry-acc-id-form-search-type" name="account-enquiry-acc-id-form-search-type" value="acc_id"></input>
                                <button type="submit" id="${tab}-btn-submit-account-enquiry-acc-id-form" class="btn btn-primary">Search</button>
                            </div>        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    
}
