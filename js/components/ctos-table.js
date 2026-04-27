import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { mockBlacklistInquiryData } from "./mockData.js";


// Keep reference to your DataTable
let table = null;

// Define column configs for each type
const columnsConfig = {
    data: [
        { title: "Customer Name", data: "customer_name" },
        { title: "ID Type", data: "id_type" },
        { title: "ID Number", data: "id_number" },  // formal or test
        { title: "Account Code", data: "account_code" }, 
        { title: "Acct Blacklist", data: "acct_blacklist" },
        { title: "Status Date", data: "status_date" },
        { title: "ETR Blacklist", data: "etr_blacklist" },
        { title: "Outstanding Bal.", data: "outstanding_bal" },
        { title: "Aging Bal.", data: "aging_bal" },
        { title: "Acct ID", data: "acct_id" },
        { title: "Customer ID", data: "customer_id" },
        {
            title: "Action",
            data: "action",
            defaultContent: '<button>Print</button><button>Deblacklist</button>'
        }
        
    ],
};

// Mock API fetch for demonstration
async function fetchData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockBlacklistInquiryData["data"] || [];
}


// Initialize or rebuild DataTable
export async function loadCtosTable() {


    const data = await fetchData();
    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#ctos-table tbody").innerHTML = "";
        document.querySelector("#ctos-header").innerHTML = "";
    }

    // Create new DataTable
    table = new DataTable("#ctos-table", {
        data: data,
        columns: columnsConfig["data"],
        searching: false,
    });

}

// Load initial table
// loadTable(document.getElementById("choices").value);