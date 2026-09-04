import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';

import { mockData } from "./mockData.js";


const columnsConfig = {
    accountListData: [
        { title: "Account Number", data: "account_number" },
        { title: "Region", data: "region" },
        { title: "Subscriber status", data: "subscriber_status" },
        { 
            title: "Extended Data", 
            data: "extended_date",
            defaultContent: `
                <select>
                    <option value="0">Not Defined</option>
                    <option value="1">BAP</option>
                    <option value="2">BKK</option>
                </select>
            `
        }, 

        
    ],
    accountHierarchyData: [
        { title: "Account Number", data: "account_number" },
        { title: "Subscriber Status", data: "subscriber_status" },
        { title: "MSISDN", data: "msisdn" },
        { title: "Account Type", data: "account_type" },
        { title: "CTC", data: "ctc" },
        { title: "Credit Limit", data: "credit_limit" },   
    ],
    distirubtionProfileData: [
        
        { title: "Action", data: "action" },
        { title: "Company Name", data: "company_name" },
        { title: "Payment Type", data: "payment_type" },
        { title: "Payment Center", data: "payment_center" },
        { title: "Language", data: "language" },
        { title: "Extended Data", data: "extended_data" },
        { title: "Frequency", data: "frequency" },
    ],
    picData: [
        { title: "Action", data: "action" },
        { title: "Name", data: "name" },
        { title: "Full Name", data: "full_name" },
        { title: "Email", data: "email" },
        { title: "Phone", data: "phone" },

    ]
};



export async function getAccountListingData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["accountListingData"] || [];
}

let table = null;
export async function renderAccoutListingTable () {
    const data = await getAccountListingData();

    if (table) {
        table.destroy();
        document.querySelector("#account-listing-table tbody").innerHTML = "";
        document.querySelector("#account-listing-table thead").innerHTML = "";
    }
    
    console.log(data);
    // Create new DataTable
    table = new DataTable("#account-listing-table", {
        data: data,
        columns: columnsConfig["accountListData"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });

}

export async function getAccountHierarchyData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["accountHierarchygData"] || [];
}


let accountHierarchytable = null;
export async function renderAccountHierarchyTable () {
    const data = await getAccountHierarchyData();

    if (accountHierarchytable) {
        accountHierarchytable.destroy();
        document.querySelector("#account-hierarchy-table tbody").innerHTML = "";
        document.querySelector("#account-hierarchy-table thead").innerHTML = "";
    }
    
    console.log(data);
    // Create new DataTable
    table = new DataTable("#account-hierarchy-table", {
        data: data,
        columns: columnsConfig["accountHierarchyData"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });

}

export async function getDistributionProfileyData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["distirubtionProfileData"] || [];
}

let distributionProfileTable = null;
export async function renderDistributionProfileTable() {
    const data = await getDistributionProfileyData();

    if (distributionProfileTable) {
        distributionProfileTable.destroy();
        document.querySelector("#distribution-profile-table tbody").innerHTML = "";
        document.querySelector("#distribution-profile-table thead").innerHTML = "";
    }
    
    console.log(data);
    // Create new DataTable
    distributionProfileTable = new DataTable("#distribution-profile-table", {
        data: data,
        columns: columnsConfig["distirubtionProfileData"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });

}


async function getPicData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["picData"] || [];
}

let picTable = null;
export async function renderPicTable() {
    const data = await getPicData();

    if (picTable) {
        picTable.destroy();
        document.querySelector("#pic-table tbody").innerHTML = "";
        document.querySelector("#pic-table thead").innerHTML = "";
    }
    
    // Create new DataTable
    picTable = new DataTable("#pic-table", {
        data: data,
        columns: columnsConfig["picData"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });
}