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
        { title: "Invoice Due Date", data: "invoice_due_date" },
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
        { title: "Adjust Date", data: "adjust_date" },
        { title: "Amount", data: "amount" },
        { title: "Status", data: "status" }, // Payment, Pay Reversal, Adjustment, Adjust Reversal
        { title: "Reversal Date", data: "reversal_date" },
    ]
};

// Mock API fetch for demonstration
async function fetchData(type, accountNo) {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData[type] || [];
}

async function fetchAdjustTableData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockAdjustmentData['adjustment'] || [];
}

// Initialize or rebuild DataTable
export async function loadDebtorTable(type, data) {

    // console.log(data);
    // let parsedResposne = JSON.parse(data.response);
    // console.log(parsedResposne);


    // const data = await fetchData(type);
    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#option-table tbody").innerHTML = "";
        document.querySelector("#table-header").innerHTML = "";
    }

    // Create new DataTable
    table = new DataTable("#option-table", {
        data: data,
        columns: columnsConfig[type],
        searching: false,
    });

    const adjustmentTableContainer = document.getElementById("adjustment-table-container")
    if ( type == "payment" ) {
        const adjustmentData = await fetchAdjustTableData(type);

        if (adjustmentTable) {
            adjustmentTable.destroy();
            document.querySelector("#adjustment-table tbody").innerHTML = "";
            document.querySelector("#adjustment-table-header").innerHTML = "";
        }

        adjustmentTableContainer.classList.remove("d-none");

        // Create Adjustable DataTable
        adjustmentTable = new DataTable("#adjustment-table", {
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