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

    let fetchResult = await getAccount(searchType, accCode);
    console.log(fetchResult);

    console.log("acc_code: " + fetchResult.acc_code)
    console.log("acc_id: " + fetchResult.acc_id)
    const actions = await getAccountActionHistory(fetchResult.acc_id);

    console.log(actions);
    
    if (!isEmptyFetchResult(fetchResult))  {
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

    console.log("acc_code: " + fetchResult.acc_code)
    console.log("acc_id: " + fetchResult.acc_id)
    const actions = await getAccountActionHistory(fetchResult.acc_id);

    console.log(actions);

    if (!isEmptyFetchResult(fetchResult))  {
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
    const accId = document.getElementById(tab + "-account-code-acc-id").textContent;
    let fetchSubInfoResult = await getAccountSubInfo(searchType, accId);

    console.log(fetchSubInfoResult);

    console.log("tab 1: " + tab);
    loadDebtorTable(searchType, fetchSubInfoResult, tab);
}

export async function updateContactType(contactType, contactTypeValue, tab) {
    const accId = document.getElementById(tab + "-account-code-acc-id").textContent;

    const body = {
        accId,
        contactType,
        contactTypeValue
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
            name: "",
            identity_id: "",
            acc_code: "",
            cust_id: "",
            acc_id: "",
            parent_acc_id: "",
            acc_create_date: "",
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
            redlist: "",
        }
    }));
}

function updateAccountData(account) {
    console.log("updateAccountData");
    console.log(account);
    window.dispatchEvent(new CustomEvent('update-account', {
        detail: {
            name: account.name ?? "Chan Tai Meng",
            identity_id: account.identity_id ?? "730212345678",
            acc_code: account.acc_code,
            cust_id: account.cust_id,
            acc_id: account.acc_id,
            acc_create_date: account.acc_create_date ? account.acc_create_date.split(' ')[0] : account.acc_create_date,
            parent_acc_id: account.parent_acc_id,
            status: account.status,
            status_date: account.status_date ? account.status_date.split(' ')[0] : account.status_date,
            writeoff: account.writeoff,
            overdue_amt: account.overdue_amt,
            dunning_grp: account.dunning_grp,
            npsi: account.npsi,
            os_bal: account.os_bal,
            last_pay_date: account.last_pay_date ? account.last_pay_date.split(' ')[0]: account.last_pay_date,
            bill_cycle: account.bill_cycle,
            credit_limit: account.credit_limit,
            payment_mode: account.payment_mode,
            acc_cat: account.acc_cat,
            ctc: account.ctc,
            big: account.big,
            credit_bal: account.credit_bal,
            redlist: account.redlist,
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