import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { activeListAssignmentMockData } from "./mockData.js";
import { API_BASE } from '../config.js';

// Keep reference to your DataTable
let activeAssignmentListTable = null;

// Define column configs for each type
const columnsConfig = {
    activeListAssignment: [
        { title: "Customer name", data: "customer_name" },
        { title: "ID Number", data: "id_number" },
        { title: "Account Code", data: "account_code" },
        { title: "MSISDN", data: "msisdn" },
        { title: "Invoice Number", data: "invoice_number" },
        { title: "ICCID", data: "iccid" },
    ],
};

// Mock API fetch for demonstration
async function fetchData(formData) {
    console.log("active-list-assignment-table fetch");
    const queryString = new URLSearchParams(formData).toString();
    const response= await fetch(`${API_BASE}/index.php?endpoint=accinq_2001&${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // body: JSON.stringify(formData),
        credentials: "include"
    });


    return response.json();
}

// Initialize or rebuild DataTable
export async function loadActiveListAssignmentTable(formData) {
    const activeListAssignmentData = await fetchData(formData);

    if (activeAssignmentListTable) {
        activeAssignmentListTable.destroy();
        document.querySelector("#active-assignment-list-table tbody").innerHTML = "";
        document.querySelector("#active-assignment-list-table thead").innerHTML = "";
    }

    // Create Adjustable DataTable
    console.log(activeListAssignmentData);
    activeAssignmentListTable = new DataTable("#active-assignment-list-table", {
        data: activeListAssignmentData,
        columns: columnsConfig["activeListAssignment"],
        searching: false,
    });

}