import { API_BASE } from '../config.js';
import { fetchAPI } from '../api/fetch-api.js';

const columnsConfig = {
    subscriber: [
        { title: "Subscriber ID", data: "subscriber_id" },
        { title: "Account ID", data: "account_id" },
        { title: "Activation Date", data: "activation_date" },
        { title: "Status", data: "status" }, // 2= Active, 9 = Deactivation
        { title: "Status Reason", data: "status_reason" }, // 2= Active, 9 = Deactivation
        { title: "Status Date", data: "status_date" },
        { title: "MSISND", data: "msisdn" },
        { title: "IMSI", data: "imsi" },
        { title: "NAI", data: "nai" },
        { title: "Fixed-line No.", data: "fixed_line_no" },
        { title: "ICCID", data: "iccid" },
    ],
    dca: [
        { title: "Agency", data: "agency" },
        { title: "From (date)", data: "from" },
        { title: "Outstanding Amount", data: "outstanding" },
        { title: "Collected Amount", data: "collected_amount" }
    ],
    invoice: [
        { title: "Invoice Number", data: "invoice_number" },
        { title: "Invoice Date", data: "invoice_date" },
        { title: "Invoice Due Date", data: "inovice_due_date" },
        { title: "Amount", data: "amount" },
        { title: "Outstanding", data: "outstanding" },
        { title: "Status", data: "status" }, // Open / Close
        { title: "Invoice Close Date", data: "invoice_close_date" },
    ],
    payment: [
        { title: "Payment Id", data: "payment_id" },
        { title: "Payment Date", data: "payment_date" },
        { title: "Amount", data: "amount" },
        { title: "Payment Method", data: "payment_method" },
        { title: "Status", data: "status" }, // Payment, Pay Reversal, Adjustment, Adjust Reversal
        { title: "Reversal Date", data: "reversal_date" },
        { title: "Reversal Reason", data: "reversal_reason" },
    ],
    adjustment: [
        { title: "Adjustment Id", data: "adjustment_id" },
        { title: "Adjust Date", data: "adjust_date" },
        { title: "Amount", data: "amount" },
        { title: "Status", data: "status" }, // Payment, Pay Reversal, Adjustment, Adjust Reversal
        { title: "Reversal Date", data: "reversal_date" },
    ]
};


export async function getAccount(searchType, searchString) {


    const body = {
        searchType,
        searchString,
    };

    const url = `${API_BASE}/index.php?endpoint=acodeinq_2003`;
    const responseJson = await fetchAPI(url, body);
    
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch account data");
    }
}


export async function getAccountSubInfo(searchType, accId) {
    const body = {
        searchType,
        accId,
    };

    const url = `${API_BASE}/index.php?endpoint=acodeinq_2003_subinfo`;
    const responseJson = await fetchAPI(url, body);

    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch account data");
    }
}

export async function getAccountActionHistory(accountNo) {
    // simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
        {
            date: "2026-02-02T16:00:00",
            event: "call, ptp"
        },
        {
            date: "2026-03-02T16:00:00",
            event: "call, sched callback"
        }
    ];
}


export async function fetchInvoiceTable(data) {

}

export async function fetchPaymentTable(data) {
    
}
