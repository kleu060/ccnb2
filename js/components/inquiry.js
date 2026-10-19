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
        { title: "Customer ID", data: "cust_id" },
        {
            title: "Account Code",
            data: "account_code",
            render: function(data, type, row, meta) {
                if (type === 'display') {
                    return `<a href="/ccnb2/account-inquiry?acc_code=${encodeURIComponent(data)}">${data}</a>`;
                }
                return data;
            }
        },
        { title: "MSISDN", data: "msisdn" },
        { title: "ICCID", data: "iccid" },
        { title: "Outstanding Balance", data: "total_due" },
        { title: "Aging Balance", data: "total_overdue" },
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
        const raw = activeListAssignmentData.response;

        const safeJson = raw.replace(/("[\w_]+"\s*:\s*)([0-9]{15,})/g, '$1"$2"');
        data = JSON.parse(safeJson);
        
        // data = JSON.parse(activeListAssignmentData.response);
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