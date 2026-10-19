import { getAccount, getAccountSubInfo, getAccountActionHistory } from "../../../api/account-api.js";
import { loadDebtorTable } from "../../../components/debtor-table.js";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';

export async function accCodeFormSubmit(tab) {

    document.getElementById(tab +"-account-enquiry-acc-id-form-acc-id").value = "";

    const searchType = document.getElementById(tab + "-account-enquiry-acc-code-form-search-type").value;
    const accCode = document.getElementById(tab + "-account-enquiry-acc-code-form-acc-code").value;
    const selectAccountCodeSubInfo = document.getElementById(tab + "-select-account-code-sub-info");

    selectAccountCodeSubInfo.value = "";
    selectAccountCodeSubInfo.selectedIndex = 0;
    selectAccountCodeSubInfo.dispatchEvent(new Event('change', { bubbles: true }));

    let fetchResultPart = await getAccount(searchType, accCode);

    console.log(fetchResultPart);

    
    
    // if (!fetchResultPart)  {
    if (fetchResultPart !== undefined && fetchResultPart !== null) {

        console.log("acc_code: " + fetchResultPart.acc_code)
        console.log("acc_id: " + fetchResultPart.acc_id)
        const actions = await getAccountActionHistory(fetchResultPart.acc_id);

        console.log(actions);
        
        updateAccountData(fetchResultPart);
        updateActionData(actions.result);
        
        document.getElementById(tab + "-account-code-no-result-container").classList.add("d-none");
        document.getElementById(tab + "-account-code-result-container").classList.remove("d-none");
        
    }
    else {
        document.getElementById(tab + "-account-code-no-result-container").classList.remove("d-none");
        document.getElementById(tab + "-account-code-result-container").classList.add("d-none");
        
    }
}

export async function accIdFormSubmit(tab) {
    clearAccountData();

    const searchType = document.getElementById(tab + "-account-enquiry-acc-id-form-search-type").value;
    const accId = document.getElementById(tab + "-account-enquiry-acc-id-form-acc-id").value;
    document.getElementById(tab + "-account-enquiry-acc-code-form-acc-code").value = "";
    const selectAccountCodeSubInfo = document.getElementById(tab + "-select-account-code-sub-info");

    selectAccountCodeSubInfo.value = "";
    selectAccountCodeSubInfo.selectedIndex = 0;
    selectAccountCodeSubInfo.dispatchEvent(new Event('change', { bubbles: true }));

    let fetchResult = await getAccount(searchType, accId);
    console.log(fetchResult);

    

    if (fetchResult !== undefined && fetchResult !== null) {

        console.log("acc_code: " + fetchResult.acc_code)
        console.log("acc_id: " + fetchResult.acc_id)
        const actions = await getAccountActionHistory(fetchResult.acc_id);

        console.log(actions);
        
        updateAccountData(fetchResult);
        updateActionData(actions.result);
        
        document.getElementById(tab + "-account-code-no-result-container").classList.add("d-none");
        document.getElementById(tab + "-account-code-result-container").classList.remove("d-none");
        
    }
    else {
        document.getElementById(tab + "-account-code-no-result-container").classList.remove("d-none");
        document.getElementById(tab + "-account-code-result-container").classList.add("d-none");
        
    }
}

export async function getAccountCodeSubInfo(e, tab) {
    const searchType = e.target.value;

    console.log("search type: " + searchType);
    let accId;
    /* Ricky: for blhistory, need to supply acc_code, for contact, need cust_id */

    if (searchType == "blhistory") {
        accId = document.getElementById(tab + "-account-code-acc-code").textContent;
        console.log("1: " + accId);
    }
    else if (searchType == "contact") {
        accId = document.getElementById(tab + "-account-code-customer-id").textContent;
        console.log("2: " + accId);
    }
    else {
        accId = document.getElementById(tab + "-account-code-acc-id").textContent;
        console.log("3: " + accId);
    }

    let fetchSubInfoResult = await getAccountSubInfo(searchType, accId);

    console.log(fetchSubInfoResult);

    console.log("tab 1: " + tab);
    loadDebtorTable(searchType, fetchSubInfoResult, tab);
}

/* deprecated */
export async function updateContactType(contactType, contact_info, tab) {
    const accId = document.getElementById(tab + "-account-code-acc-id").textContent;

    const body = {
        accId,
        contact_info
    };

    const url = `${API_BASE}/index.php?endpoint=agent-update-contact`;
    const responseJson = await fetchAPI(url, body);

    return responseJson;


}


function isEmptyFetchResult(v) {
    if (v == null) return true;                     // null or undefined
    if (typeof v === 'string') return v.trim() === ''; // empty string
    if (Array.isArray(v)) return v.length === 0;       // empty array
    if (typeof v === 'object') return Object.keys(v).length === 0; // empty object
    return false;
}

function clearAccountData() {
    window.dispatchEvent(new CustomEvent('update-account', {
        detail: {
            acc_cat: '',
            acc_code: '',
            acc_create_date: '',
            acc_id: '',
            acc_status: '',
            acc_status_date: '',
            big: '',
            bill_cycle: '',
            billable: '',
            blacklist_status: '',
            call_agent: '',
            campaign: '',
            collection_end: '',
            collection_start: '',
            collection_status: '',
            credit_bal: '',
            credit_limit: '',
            credit_score: '',
            ctc: '',
            cust_id: '',
            dca_code: '',
            disposition: '',
            dunning_group: '',
            id_number: '',
            last_pay_date: '',
            last_suspend_date: '',
            last_term_date: '',
            nod: '',
            nod_date: '',
            npsi: '',
            oldest_due_date: '',
            os_bal: '',
            overdue_amt: '',
            overdue_days: '',
            parent_acc_id: '',
            payment_mode: '',
            primary_offer: '',
            principle_sub_id: '',
            status_date: '',
            subs_status: '',
            subs_status_date: '',
            writeoff: '',
            writeoff_date: '',
            name: '',
            identity_id: '',
        }
    }));
}

function updateAccountData(account) {
    console.log("updateAccountData");
    console.log(account);
    window.dispatchEvent(new CustomEvent('update-account', {
        detail: {
            acc_cat: account.acc_cat,
            acc_code: account.acc_code,
            acc_create_date: account.acc_create_date,
            acc_id: account.acc_id,
            acc_status: account.acc_status,
            acc_status_date: account.acc_status_date,
            big: account.big,
            bill_cycle: account.bill_cycle,
            billable: account.billable,
            blacklist_status: account.blacklist_status,
            call_agent: account.call_agent,
            campaign: account.campaign,
            collection_end: account.collection_end,
            collection_start: account.collection_start,
            collection_status: account.collection_status,
            credit_bal: account.credit_bal,
            credit_limit: account.credit_limit,
            credit_score: account.credit_score,
            ctc: account.ctc,
            cust_id: account.cust_id,
            dca_code: account.dca_code,
            disposition: account.disposition,
            dunning_group: account.dunning_group,
            id_number: account.id_number,
            last_pay_date: account.last_pay_date,
            last_suspend_date: account.last_suspend_date,
            last_term_date: account.last_term_date,
            nod: account.nod,
            nod_date: account.nod_date,
            npsi: account.npsi,
            oldest_due_date: account.oldest_due_date,
            os_bal: `$${account?.os_bal ?? "0"}`,
            overdue_amt: "$"+account.overdue_amt,
            overdue_days: account.overdue_days,
            parent_acc_id: account.parent_acc_id,
            payment_mode: account.payment_mode,
            primary_offer: account.primary_offer,
            principle_sub_id: account.principle_sub_id,
            status_date: account.status_date,
            subs_status: account.subs_status,
            subs_status_date: account.subs_status_date,
            writeoff: account.writeoff,
            writeoff_date: account.writeoff_date,
            name: account.cust_name ?? "Unknown",
            identity_id: account.id_number ?? "0",
            
        }
    }));
}

function clearActionData(actions) {
    window.dispatchEvent(new CustomEvent('update-actions', {
        detail: []
    }));
}

function updateActionData(actions) {
    window.dispatchEvent(new CustomEvent('update-actions', {
        detail: actions
    }));
}