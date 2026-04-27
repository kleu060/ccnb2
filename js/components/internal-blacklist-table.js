import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { mockInternalBlacklistInquiryData } from "./mockData.js";


// Keep reference to your DataTable
let table = null;

// Define column configs for each type
const columnsConfig = {
    data: [
        { title: "ID Number", data: "id_number" },
        { title: "ID Type", data: "id_type" },
        { title: "ID Blacklisted", data: "id_blacklisted" },
        { title: "Reason", data: "reason" },
        { title: "Sub reason", data: "sub_reason" },
        { title: "Update Date", data: "update_date" },
        { title: "Updated By", data: "updated_by" },
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn-deblacklist" onclick="deblacklist()">De blacklist</button>'
        }
        
    ],
};

// Mock API fetch for demonstration
async function fetchData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockInternalBlacklistInquiryData["data"] || [];
}


// Initialize or rebuild DataTable
export async function loadInternalBlacklistTable() {


    const data = await fetchData();
    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#internal-blacklist-table tbody").innerHTML = "";
        document.querySelector("#internal-blacklist-header").innerHTML = "";
    }

    // Create new DataTable
    table = new DataTable("#internal-blacklist-table", {
        data: data,
        columns: columnsConfig["data"],
        searching: false,
    });

}




// Load initial table
// loadTable(document.getElementById("choices").value);