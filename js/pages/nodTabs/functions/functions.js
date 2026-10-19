import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";

import { mockNodProfileData } from "./mockData.js";

import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../../js/api/fetch-api.js';

import {renderTable} from '../../../api/render-table.js'

let nodFileStatusMapping;
const columnsConfig = {
    data: [
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn btn-primary btn-edit-distribution-profile">Edit</button>'
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
            render: function(data, type, row) {
                if (row.status == 1) {
                    return `<button class="btn btn-primary btn-dispatch-schedule-action" data-id="${row.schedule_id}">Dispatch</button>`;
                    
                } 
                else {
                    return `<button class="btn btn-primary btn-view-schedule-action" data-id="${row.schedule_id}">View</button>`;       
                }
            }
        },
        { title: "Schedule ID", data: "schedule_id" },
        { title: "File Name", data: "filename" },
        { title: "Account Total", data: "total_acc" },
        { title: "Amount Total", data: "total_amt" },
        { 
            title: "Status", 
            data: "status",
            render: function(data, type, row ) {
                const object = Object.values(nodFileStatusMapping).find(s => s.ID === Number(data));
                const statusDisplay = object ? object.DISPLAY : (data ?? "0");
                return `<span>${statusDisplay}</span>`;
            } 
        },
        { 
            title: "Error", 
            data: "error_message",
            render: function(data, type, row) {
                
                return `<span>${data ?? 'No error'}</span>`;
            } 
        },
        { title: "Upload date", data: "upload_date" },
        { title: "Assign Date", data: "assign_date" },
    ],
    viewSchedule: [
        { title: "Schedule ID", data: "schedule_id" },
        { title: "Solicitor", data: "solicitor_code" },
        { title: "Account Total", data: "total_acc" },
        { title: "Amount Total", data: "total_amt" },
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
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return mockNodProfileData["dispatch"] || [];

    const url = `${API_BASE}/dunningGroup.php?endpoint=list_nod_dispatch_schedule`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        const response = JSON.parse(responseJson.response);
        return response.schedule_list;
    }
    else {
        console.error("Failed to fetch Dunning Group data");
    }
}

let dispatchTable;
export async function loadDispatchTable() {

    const type = "NODFILE";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const nodFileJson  = await fetchAPI(url, body);
    nodFileStatusMapping = nodFileJson.Status;


    const data = await loadDispatcheData();
    renderTable("nod-dispatch-table", columnsConfig["dispatchData"] , data);
    // if (dispatchTable) {
    //     dispatchTable.destroy();
    //     document.querySelector("#nod-dispatch-table tbody").innerHTML = "";
    //     document.querySelector("#nod-dispatch-table thead").innerHTML = "";
    // }

    // dispatchTable = new DataTable("#nod-dispatch-table", {
    //     data: data,
    //     columns: columnsConfig["dispatchData"],
    //     searching: false,
    //     order: [],
    //     language: {
    //         emptyTable: "No Data"
    //     }
    // });
}


async function loadViewScheduleData(scheduleId) {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return mockNodProfileData["mockNodViewScheduleData"] || [];

    const url = `${API_BASE}/dunningGroup.php?endpoint=view_nod_dispatch_schedule&schedule_id=${scheduleId}`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        const response = JSON.parse(responseJson.response);
        // return response.schedule_list;
        return response.list;
    }
    else {
        console.error("Failed to fetch Dunning Group data");
    }
}

let viewScheduleTable;
export async function loadViewScheduleTable(scheduleId) {
    const data = await loadViewScheduleData(scheduleId);

    renderTable("nod-view-schedule-table", columnsConfig["viewSchedule"] , data);

    // if (viewScheduleTable) {
    //     viewScheduleTable.destroy();
    //     document.querySelector("#nod-view-schedule tbody").innerHTML = "";
    //     document.querySelector("#nod-view-schedule thead").innerHTML = "";
    // }

    // viewScheduleTable = new DataTable("#nod-view-schedule-table", {
    //     data: data,
    //     columns: columnsConfig["viewSchedule"],
    //     searching: false,
       
    //     language: {
    //         emptyTable: "No Data"
    //     }
    // });
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

