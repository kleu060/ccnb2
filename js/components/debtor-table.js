import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { mockData } from "./mockData.js";
import { mockAdjustmentData } from "./mockData.js";
import { API_BASE } from '../config.js';
import { fetchAPI } from '../api/fetch-api.js';

// Keep reference to your DataTable
let table = null;
let adjustmentTable = null;
let contactStatusMapping;
let accountDispositionCodeMapping;
let dunningCampaignCollectionStatusMapping;
let contactTypeMapping;
let contactTypeOptions;
// Define column configs for each type
const columnsConfig = {
    subscriber: [
        { title: "Subscriber ID", data: "subscriber_id" },
        { title: "Account ID", data: "acc_id" },
        { title: "Activation Date", data: "activation_date" },
        { title: "Status", data: "status" }, // 2= Active, 9 = Deactivation
        { title: "Status Reason", data: "status_reason" }, // 2= Active, 9 = Deactivation
        { title: "Status Date", data: "status_date" },
        { title: "MSISDN", data: "msisdn" },
        // { title: "IMSI", data: "imsi" },
        { title: "NAI", data: "nai" },
        { title: "Fixed-line No.", data: "fixed_line_number" },
        { title: "ICCID", data: "iccid" },
    ],
    collection: [
        { title: "Collection ID", data: "collection_id" },
        { title: "Campaign", data: "campaign_name" },
        { title: "Start Date", data: "start" },
        { title: "End Date", data: "end" },
        { title: "Agent", data: "agent" },
        // { title: "DCA", data: "agent" },
        { 
            title: "Action", 
            data: "acc_disp",
            render: function(data, type, row) {
                const obj = Object.values(accountDispositionCodeMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span>${display}</span>`;
            }
        },
        { 
            title: "Status", 
            data: "status",
            render: function (data, type, row) {
                const obj = Object.values(dunningCampaignCollectionStatusMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span>${display}</span>`;
            } 
        },
    ],
    invoice: [
        { title: "Invoice Number", data: "invoice_number" },
        { title: "Invoice Date", data: "invoice_date" },
        { title: "Invoice Due Date", data: "invoice_close_date" },
        { title: "Amount", data: "amount" },
        { title: "Outstanding Amount", data: "outstanding_amount" },
        { title: "Status", data: "status" }, // Open / Close
    ],
    payment: [
        { title: "Payment Id", data: "payment_id" },
        { title: "Payment Date", data: "payment_date" },
        { title: "Amount", data: "amount" },
        { title: "Payment Method", data: "payment_method" },
        { title: "Status", data: "status" }, // Payment, Pay Reversal, Adjustment, Adjust Reversal
        { title: "Reversal Date", data: "reversal_date" },
        { title: "Reversal Reason", data: "reversal_reason" },
    ],
    adjustment: [
        { title: "Adjustment Id", data: "adjustment_id" },
        { title: "Adjust Date", data: "adjustment_date" },
        { title: "Amount", data: "amount" },
        { title: "Status", data: "status" }, // Payment, Pay Reversal, Adjustment, Adjust Reversal
        { title: "Reversal Date", data: "reversal_date" },
    ],
    aging: [
        { title: "Current" , data: "current" },
        { title: "Aging 30" , data: "aging30" },
        { title: "Aging" , data: "aging60" },
        { title: "Aging 90" , data: "aging90" },
        { title: "Aging 120" , data: "aging120" },
        { title: "Aging 150" , data: "aging150" },
        { title: "Aging 180" , data: "aging180" },
        { title: "Over 180" , data: "ov180" },
    ],
    blhistory: [
        { title: "ID Number", data: "id_number" },
        { title: "CTOS Blacklist", data: "ctos_blacklist" },
        { title: "ETR Blacklist", data: "etr_blacklist" },
        { title: "Date", data: "date" },
    ],
    contact: [
        { 
            title: "Contact Type", 
            data: "contact_type",
            render: function (data, type, row) {
                const obj = Object.values(contactTypeMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span>${display}</span>`;
            }

        },
        {
            title: "Contact Info", 
            data: "contact_info" 
        },
        { 
            title: "Status", 
            data: "status",
            render: function(data, type, row) {
                const obj = Object.values(contactStatusMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span>${display}</span>`;
            }
        },
        { title: "Updated By", data: "updated_by" },
        { title: "Update Date", data: "update_date" },
        { title: "Result code", data: "result_code" },
    ],
    contact_edit: [
        {
            title: "Action",
            data: "id",
            render: function(data, type, row) {
                return `
                    <select class="form-select-sm sel-change-contact-status d-inline-block">
                        <option value="">Select Status</option>
                        ${contactTypeOptions}
                    </select>
                    <button class="btn btn-primary d-inline-block btn-change-contact-status" data-id="${data}" data-contact-type="${row.contact_type}" data-contact-info="${row.contact_info}">Change Status</button>
                `;
            }
        },
        { 
            title: "Contact Type", 
            data: "contact_type",
            render: function (data, type, row) {
                const obj = Object.values(contactTypeMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span>${display}</span>`;
            }

        },
        { title: "Contact Info", data: "contact_info" },
        { 
            title: "Status", 
            data: "status",
            render: function(data, type, row) {
                const obj = Object.values(contactStatusMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span>${display}</span>`;
            }
        },
        { title: "Updated By", data: "updated_by" },
        { title: "Update Date", data: "update_date" },
        { title: "Result code", data: "result_code" },
    ],
};

// Mock API fetch for demonstration
async function fetchData(type) {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData[type] || [];
}

async function fetchAdjustTableData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockAdjustmentData['adjustment'] || [];
}

// Initialize or rebuild DataTable

export async function loadDebtorTable(tableType, data, tab) {
    console.log("tab 2: " + tab);
    // console.log(data);
    // let parsedResposne = JSON.parse(data.response);
    // console.log(parsedResposne);

    console.log(data);
    let tableData, adjustmentData
    let type, body;

    const url = `${API_BASE}/getMapping.php`;

    if (tableType == "payment") {
        tableData = data.payment;
        adjustmentData = data.adjustment
    }
    else if (tableType == "invoice") {
        tableData = data.invoice;
    }
    else if ( tableType == "subscriber") {
        tableData = data.subscriber;
    }
    else if ( tableType == "collection") {

        type = "Account";
        body = {
            type
        };
        const accountJson  = await fetchAPI(url, body);
        accountDispositionCodeMapping = accountJson.DispositionCode

        type = "Dunning";
        body = {
            type
        }
        const dunningJson  = await fetchAPI(url, body);
        dunningCampaignCollectionStatusMapping = dunningJson.Campaign.Collection.Status



        tableData = data.collection;
    }
    else if ( tableType == "aging") {
        tableData = data.aging;
    }
    else if ( tableType == "blhistory") {
        tableData = data.blhistory;
    }
    else if ( tableType == "contact") {

        type = "Contact";
        body = {
            type
        };
        const contactJson  = await fetchAPI(url, body);
        contactStatusMapping  = contactJson.Status;
        contactTypeMapping = contactJson.Type

        contactTypeOptions = Object.values(contactStatusMapping).map(status => `
            <option value="${status.ID}">${status.DISPLAY}</option>
        `).join('');

        if ( tab == "account" ) {
            tableData = data.contact;
        }
        else {
            tableData = data.contact;
            tableType ="contact_edit";
        }
    }
    
    // const data = await fetchData(type);
    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#" + tab + "-option-table tbody").innerHTML = "";
        document.querySelector("#" + tab + "-table-header").innerHTML = "";
    }

    // Create new DataTable
    table = new DataTable("#"+ tab + "-option-table", {
        data: tableData,
        columns: columnsConfig[tableType],
        searching: false,
    });

    const adjustmentTableContainer = document.getElementById(tab + "-adjustment-table-container");
    console.log(adjustmentTableContainer);
    if ( type == "payment" ) {
        // const adjustmentData = await fetchAdjustTableData(type);

        if (adjustmentTable) {
            adjustmentTable.destroy();
            document.querySelector("#" + tab + "-adjustment-table tbody").innerHTML = "";
            document.querySelector("#" + tab + "-adjustment-table-header").innerHTML = "";
        }

        adjustmentTableContainer.classList.remove("d-none");

        // Create Adjustable DataTable
        adjustmentTable = new DataTable("#" + tab + "-adjustment-table", {
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