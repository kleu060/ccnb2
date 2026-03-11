import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { activeListAssignmentMockData } from "./mockData.js";


// Keep reference to your DataTable
let activeAssignmentListTable = null;

// Define column configs for each type
const columnsConfig = {
    activeListAssignment: [
        { title: "Customer name", data: "customer_name" },
        { title: "ID Number", data: "id_number" },
        { title: "Account Code", data: "account_code" },
        { title: "MSISDN", data: "msisdn" },
    ],
};

// Mock API fetch for demonstration
async function fetchData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return activeListAssignmentMockData["data"];
}


// Initialize or rebuild DataTable
export async function loadActiveListAssignmentTable() {

    const data = await fetchData();
    const adjustmentData = await fetchData();

    if (activeAssignmentListTable) {
        activeAssignmentListTable.destroy();
        document.querySelector("#active-assignment-list-table tbody").innerHTML = "";
        document.querySelector("#active-assignment-list-table thead").innerHTML = "";
    }

    // Create Adjustable DataTable
    activeAssignmentListTable = new DataTable("#active-assignment-list-table", {
        data: adjustmentData,
        columns: columnsConfig["activeListAssignment"],
        searching: false,
    });

}