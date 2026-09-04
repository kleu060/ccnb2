import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { mockData } from "./mockData.js";
import { mockAdjustmentData } from "./mockData.js";


// Keep reference to your DataTable
let table = null;
let adjustmentTable = null;

// Define column configs for each type
const columnsConfig = {
    subscriber: [
        { title: "Subscriber ID", data: "subscriber_id" },
        { title: "Account ID", data: "acc_id" },
        { title: "Activation Date", data: "activation_date" },
        { title: "Status", data: "status" }, // 2= Active, 9 = Deactivation
        { title: "Status Reason", data: "status_reason" }, // 2= Active, 9 = Deactivation
        { title: "Status Date", data: "status_date" },
        { title: "MSISND", data: "msisdn" },
        // { title: "IMSI", data: "imsi" },
        { title: "NAI", data: "nai" },
        { title: "Fixed-line No.", data: "fixed_line_number" },
        { title: "ICCID", data: "iccid" },
    ],
    collection: [
        { title: "Collection ID", data: "collection_id" },
        { title: "Campaign", data: "campaign_name" },
        { title: "Start Date", data: "start" },
        { title: "End Date", data: "end" },
        { title: "Agent", data: "agent" },
        { title: "Action", data: "action" },
        { title: "Status", data: "status" },
    ],
    invoice: [
        { title: "Invoice Number", data: "invoice_number" },
        { title: "Invoice Date", data: "invoice_date" },
        { title: "Invoice Due Date", data: "invoice_close_date" },
        { title: "Amount", data: "amount" },
        { title: "Outstanding Amount", data: "outstanding_amount" },
        { title: "Status", data: "status" }, // Open / Close
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
        { title: "Adjust Date", data: "adjustment_date" },
        { title: "Amount", data: "amount" },
        { title: "Status", data: "status" }, // Payment, Pay Reversal, Adjustment, Adjust Reversal
        { title: "Reversal Date", data: "reversal_date" },
    ],
    aging_bucket: [
        { title: "Current" , data: "current" },
        { title: "Aging 30" , data: "aging_30" },
        { title: "Aging" , data: "aging_60" },
        { title: "Aging 90" , data: "aging_90" },
        { title: "Aging 120" , data: "aging_120" },
        { title: "Aging 150" , data: "aging_150" },
        { title: "Aging 180" , data: "aging_180" },
        { title: "Over 180" , data: "over_180" },
    ],
    blacklist_history: [
        { title: "Account Code", data: "account_code" },
        { title: "ID Number", data: "id_number" },
        { title: "CTOS Blacklist", data: "ctos_blacklist" },
        { title: "ETR Blacklist", data: "etr_blacklist" },
        { title: "Date", data: "date" },
    ],
    contact: [
        { title: "Contact Type", data: "contact_type" },
        { title: "Contact Info", data: "contact_info" },
        { title: "Status", data: "status" },
        { title: "Updated By", data: "updated_by" },
        { title: "Update Date", data: "update_date" },
        { title: "Result code", data: "result_code" },
    ],
    contact_edit: [
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn btn-primary">Change Status</button>'
        },
        { title: "action", data: "contact_type" },
        { title: "Contact Info", data: "contact_info" },
        { title: "Status", data: "status" },
        { title: "Updated By", data: "updated_by" },
        { title: "Update Date", data: "update_date" },
        { title: "Result code", data: "result_code" },
    ],
};

// Mock API fetch for demonstration
async function fetchData(type) {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData[type] || [];
}

async function fetchAdjustTableData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockAdjustmentData['adjustment'] || [];
}

// Initialize or rebuild DataTable
export async function loadDebtorTable(type, data, tab) {
    console.log("tab 2: " + tab);
    // console.log(data);
    // let parsedResposne = JSON.parse(data.response);
    // console.log(parsedResposne);

    console.log(data);
    let tableData, adjustmentData
    if (type == "payment") {
        tableData = data.payment;
        adjustmentData = data.adjustment
    }
    else if (type == "invoice") {
        tableData = data.invoice;
    }
    else if ( type == "subscriber") {
        tableData = data.subscriber;
    }
    else if ( type == "collection") {
        tableData = data.collection;
    }
    else if ( type == "aging_bucket") {
        tableData = await fetchData(type);
    }
    else if ( type == "blacklist_history") {
        tableData = await fetchData(type);
    }
    else if ( type == "contact") {
        if ( tab == "account" ) {
            tableData = await fetchData(type);
        }
        else {
            tableData = await fetchData(type+"_edit");
        }
    }
    
    // const data = await fetchData(type);
    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#" + tab + "-option-table tbody").innerHTML = "";
        document.querySelector("#" + tab + "-table-header").innerHTML = "";
    }

    // Create new DataTable
    table = new DataTable("#"+ tab + "-option-table", {
        data: tableData,
        columns: columnsConfig[type],
        searching: false,
    });

    const adjustmentTableContainer = document.getElementById(tab + "-adjustment-table-container");
    console.log(adjustmentTableContainer);
    if ( type == "payment" ) {
        // const adjustmentData = await fetchAdjustTableData(type);

        if (adjustmentTable) {
            adjustmentTable.destroy();
            document.querySelector("#" + tab + "-adjustment-table tbody").innerHTML = "";
            document.querySelector("#" + tab + "-adjustment-table-header").innerHTML = "";
        }

        adjustmentTableContainer.classList.remove("d-none");

        // Create Adjustable DataTable
        adjustmentTable = new DataTable("#" + tab + "-adjustment-table", {
            data: adjustmentData,
            columns: columnsConfig["adjustment"],
            searching: false,
        });
    }
    else {
        adjustmentTableContainer.classList.add("d-none");
    }

}




// Load initial table
// loadTable(document.getElementById("choices").value);