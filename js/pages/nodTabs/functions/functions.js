import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";

import { mockNodProfileData } from "./mockData.js";
            
const columnsConfig = {
    data: [
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn-edit-distribution-profile">Edit</button>'
        },
        { title: "Customer Name", data: "solicitor_code" },
        { title: "ID Type", data: "solicitor_name" },
        { title: "ID Number", data: "contact_name" },  // formal or test
        { title: "Account Code", data: "contact_phone" }, 
        { title: "Acct Blacklist", data: "status" },
        { title: "Status Date", data: "bg_expiry" },        
    ],
    dispatchData: [
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn-update-dispatch-action">View</button>'
        },
        { title: "Schedule ID", data: "schedule_id" },
        { title: "File ID", data: "file_id" },
        { title: "Account Total", data: "account_total" },
        { title: "Amount Total", data: "amount_total" },
        { title: "Dispatch", data: "dispatch" },
        { title: "Upload date", data: "update_date" },
        { title: "Assign Date", data: "assign_date" },
    ],
    viewSchedule: [
        { title: "Schedule ID", data: "schedule_id" },
        { title: "Batch ID", data: "batch_id" },
        { title: "Solicitor", data: "solicitor" },
        { title: "Account Total", data: "account_total" },
        { title: "Amount Total", data: "amount_total" },
        { title: "Assign Date", data: "assign_date" },
    ],
    displatchSchedule: [
        { title: "Solicitor Code", data: "solicitor_code" },
        { title: "Allocation %", data: "allocatioin_percentage" },
        { title: "Estimate Number", data: "estimate_number" },
    ]
};

async function loadNodProfileData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockNodProfileData["nodProfile"] || [];
}

let table = null;

export async function loadNodProfileTable() {
    const data = await loadNodProfileData();

    if (table) {
        table.destroy();
        document.querySelector("#nod-profile-table tbody").innerHTML = "";
        document.querySelector("#nod-profile-table thead").innerHTML = "";
    }

    table = new DataTable("#nod-profile-table", {
        data: data,
        columns: columnsConfig["data"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });
}

async function loadDispatcheData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockNodProfileData["dispatch"] || [];
}

let dispatchTable;
export async function loadDispatchTable() {
    const data = await loadDispatcheData();

    if (dispatchTable) {
        dispatchTable.destroy();
        document.querySelector("#nod-dispatch-table tbody").innerHTML = "";
        document.querySelector("#nod-dispatch-table thead").innerHTML = "";
    }

    dispatchTable = new DataTable("#nod-dispatch-table", {
        data: data,
        columns: columnsConfig["dispatchData"],
        searching: false,
        order: [],
        language: {
            emptyTable: "No Data"
        }
    });
}


async function loadViewScheduleData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockNodProfileData["mockNodViewScheduleData"] || [];
}

let viewScheduleTable;
export async function loadViewScheduleTable() {
    const data = await loadViewScheduleData();

    if (viewScheduleTable) {
        viewScheduleTable.destroy();
        document.querySelector("#nod-view-schedule tbody").innerHTML = "";
        document.querySelector("#nod-view-schedule thead").innerHTML = "";
    }

    viewScheduleTable = new DataTable("#nod-view-schedule-table", {
        data: data,
        columns: columnsConfig["viewSchedule"],
        searching: false,
       
        language: {
            emptyTable: "No Data"
        }
    });
}


async function loadDisplatchScheduleData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockNodProfileData["mockdispatchScheduleData"] || [];
}

let dispatchScheduleTable;
export async function loadDispatchScheduleTable() {
    const data = await loadDisplatchScheduleData();

    if (dispatchScheduleTable) {
        dispatchScheduleTable.destroy();
        document.querySelector("#nod-dispatch-schedule-table tbody").innerHTML = "";
        document.querySelector("#nod-dispatch-schedule-table thead").innerHTML = "";
    }

    viewScheduleTable = new DataTable("#nod-dispatch-schedule-table", {
        data: data,
        columns: columnsConfig["displatchSchedule"],
        searching: false,
       
        language: {
            emptyTable: "No Data"
        }
    });
}

