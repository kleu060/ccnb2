import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { customerMockData, customerContactMockData } from "./mockData.js";
import { API_BASE } from '../config.js';
import { logEvent } from '../logEvent.js';
import { fetchAPI } from '../api/fetch-api.js';


// Keep reference to your DataTable
let customerTable = null;
let customerContactTable = null;

// Define column configs for each type
const columnsConfig = {

    customerCol: [
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

        { title: "Account ID", data: "account_id" },
        { title: "Subscriber ID", data: "subscribe_id" },
        
        { title: "Parent Acct ID", data: "parent_acct_id" },
        { title: "Acct Status", data: "acct_status" },
        { title: "Billing Flag", data: "billing_flag" },
        { title: "Credit Limit", data: "credit_limit" },
        { title: "Outstanding", data: "outstanding" },
    ],
    customerContactCol: [
        { title: "Contact Type" , data: "contact_type"},
        { title: "Contact Info" , data: "contact_info"},
        { title: "Status" , data: "status"},
        { title: "Updated By" , data: "updated_by"},
        { title: "Updaate Date" , data: "update_date"},
    ]
};

// Mock API fetch for demonstration
async function fetchData(customerNo) {
    // const queryString = new URLSearchParams(formData).toString();
    // const url = `${API_BASE}/index.php?endpoint=accinq_2001`;
    // const response= await fetchAPI(url, formData); 
    // return response;
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return customerMockData["data"] || [];
}

// Initialize or rebuild DataTable
export async function loadCustomerTable(customerNo) {
    const customerData = await fetchData(customerNo);

    if (customerTable) {
        customerTable.destroy();
        document.querySelector("#customer-table tbody").innerHTML = "";
        document.querySelector("#customer-table thead").innerHTML = "";
    }

    // Create Adjustable DataTable
    // let errorMsg = "No record found";
    // let data;
    // if ( !customerData.success) {
    //     errorMsg = activeListAssignmentData.error_description
    //     data = [];
    // }
    // else {
    //     data = JSON.parse(customerData.response);
    // }
    let errorMsg = "No Data";

    customerTable = new DataTable("#customer-table", {
            data:  customerData,
            columns: columnsConfig["customerCol"],
            searching: false,
            language: {
                emptyTable: errorMsg
            }
        });

}

async function fetchCustomerContactData(customerNo) {

    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return customerContactMockData["data"] || [];
}


export async function loadCustomerContactTable(customerNo) {
    const customerContactData = await fetchCustomerContactData(customerNo);

    if (customerContactTable) {
        customerContactTable.destroy();
        document.querySelector("#customer-contact-table tbody").innerHTML = "";
        document.querySelector("#customer-contact-table thead").innerHTML = "";
    }

    // Create Adjustable DataTable
    // let errorMsg = "No record found";
    // let data;
    // if ( !customerData.success) {
    //     errorMsg = activeListAssignmentData.error_description
    //     data = [];
    // }
    // else {
    //     data = JSON.parse(customerData.response);
    // }
    let errorMsg = "No Data";

    customerTable = new DataTable("#customer-contact-table", {
            data:  customerContactData,
            columns: columnsConfig["customerContactCol"],
            searching: false,
            language: {
                emptyTable: errorMsg
            }
        });
}