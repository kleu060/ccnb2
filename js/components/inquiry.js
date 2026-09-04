import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
// import { activeListAssignmentMockData } from "./mockData.js";
import { API_BASE } from '../config.js';
import { logEvent } from '../logEvent.js';
import { fetchAPI } from '../api/fetch-api.js';


// Keep reference to your DataTable
let activeAssignmentListTable = null;

// Define column configs for each type
const columnsConfig = {
    activeListAssignment: [
        { title: "Customer name", data: "customer_name" },
        { title: "Customer ID", data: "customer_id" },
        {
            title: "Account Code",
            data: "account_code",
            render: function(data, type, row, meta) {
                if (type === 'display') {
                    return `<a href="/account-enquiry?account_code=${encodeURIComponent(data)}">${data}</a>`;
                }
                return data;
            }
        },
        { title: "MSISDN", data: "msisdn" },
        { title: "ICCID", data: "iccid" },
        { title: "Outstanding Balance", data: "outstanding_balance" },
        { title: "Aging Balance", data: "aging_balance" },
    ]
};

// Mock API fetch for demonstration
async function fetchData(formData) {
    // const queryString = new URLSearchParams(formData).toString();
    const url = `${API_BASE}/index.php?endpoint=accinq_2001`;
    const response= await fetchAPI(url, formData); 
    return response;
}

// Initialize or rebuild DataTable
export async function loadInquiryTable(formData) {
    const activeListAssignmentData = await fetchData(formData);

    console.log(activeListAssignmentData);

    if (activeAssignmentListTable) {
        activeAssignmentListTable.destroy();
        document.querySelector("#active-assignment-list-table tbody").innerHTML = "";
        document.querySelector("#active-assignment-list-table thead").innerHTML = "";
    }

    // Create Adjustable DataTable
    let errorMsg = "No record found";
    let data;
    if ( !activeListAssignmentData.success) {
        errorMsg = activeListAssignmentData.error_description
        data = [];
    }
    else {
        data = JSON.parse(activeListAssignmentData.response);
    }

    
    activeAssignmentListTable = new DataTable("#active-assignment-list-table", {
            data:  data,
            columns: columnsConfig["activeListAssignment"],
            searching: false,
            language: {
                emptyTable: errorMsg
            }
        });

}