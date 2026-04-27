import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { mockCustomerData } from "./mockData.js";
// import { mockAdjustmentData } from "./mockData.js";


// Keep reference to your DataTable
let table = null;

// Define column configs for each type
const columnsConfig = {
    customer: [
        { title: "Account Code", data: "account_code" },
        { title: "Account ID", data: "account_id" },  // formal or test
        { title: "Subscriber ID", data: "subscriber_id" }, // 2= Active, 9 = Deactivation
        { title: "parent acct ID", data: "parent_acct_ID" },
        { title: "Acct Status", data: "acct_status" },
        { title: "Billable Flag", data: "billable_flag" },
        { title: "Credit Limit", data: "credit_limit" },
        { title: "Outstanding", data: "outstanding" },
    ],
};

// Mock API fetch for demonstration
async function fetchData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockCustomerData["data"] || [];
}


// Initialize or rebuild DataTable
export async function loadCustomerTable() {


    const data = await fetchData();
    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#option-table tbody").innerHTML = "";
        document.querySelector("#table-header").innerHTML = "";
    }

    // Create new DataTable
    table = new DataTable("#customer-table", {
        data: data,
        columns: columnsConfig["customer"],
        searching: false,
    });

}




// Load initial table
// loadTable(document.getElementById("choices").value);