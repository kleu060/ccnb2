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
        { title: "Class", data: "class" },  // formal or test
        { title: "Status", data: "status" }, // 2= Active, 9 = Deactivation
        { title: "Status Reason", data: "status_reason" },
        { title: "Activation Date", data: "activation_date" }
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
        { title: "Payment Method", data: "payment_method" },
        { title: "Pay Time", data: "pay_time" },
        { title: "Pay Reversal ID", data: "pay_reversal_id" },
        { title: "Reversal Time", data: "reversal_time" },
        { title: "Status", data: "status" } // Payment, Pay Reversal, Adjustment, Adjust Reversal
    ],
    adjustment: [
        { title: "Adjustment Id", data: "adjustment_id" },
        { title: "Payment Method", data: "payment_method" },
        { title: "Adj Time", data: "adj_time" },
        { title: "Adj Reversal ID", data: "adj_reversal_id" },
        { title: "Reversal Time", data: "reversal_time" },
        { title: "Status", data: "status" } // Payment, Pay Reversal, Adjustment, Adjust Reversal
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
export async function loadDebtorTable(type) {


    const data = await fetchData(type);
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