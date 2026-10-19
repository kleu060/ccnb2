import { mockData } from "../../../components/mockData.js";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';
import {renderTable} from '../../../api/render-table.js'

let commissionVersionStatuses;
let dunningCallGroupMapping;
let commissionInternalBucketMapping;
let commissionInternalBracketMapping;

const columnsConfig = {
    dca: [ 
       {
            title: "Action",
            data: "id", // 1. Map this directly to your unique row ID property (e.g., dca_id)
            render: function(data, type, row) {
                return `<button class="btn btn-primary text-nowrap btn-edit-dca-profile" data-dca-profile-id="${data}">Download ACCT List</button>`;
            }
        },
        { title: "Record ID", data: "id" },
        { title: "DCA Code", data: "agent_name" },
        { title: "Plan", data: "plan" },
        { title: "Case Count", data: "case_count" },
        { title: "Collect Amount", data: "collect_amount" },
        { title: "Collect include reversal day 1", data: "collect_include_rev_day_1" },
        { title: "Commission Day 1", data: "commission_1" },
        { title: "Collect include reversal day 7", data: "collect_include_rev_day_7" },
        { title: "Commission day 7", data: "commission_7" },
        { title: "commission deduction", data: "commission_deduct" },

    ],
    dcaSetup: [
        { 
            title: "Action", 
            data: "id",
            render: function(data, type, row) {
                let buttons = "";
                if ( row.status == 3 ) {
                    buttons += `<button class="btn btn-primary text-nowrap btn-edit-dca-commission" data-dca-version-name="${row.name}" data-dca-remark="${row.remark}" data-dca-profile-id="${data}">Edit</button>`;
                }
                else {
                    buttons += `<button class="btn btn-primary text-nowrap btn-view-dca-commission"  data-dca-version-name="${row.name}" data-dca-remark="${row.remark}" data-dca-profile-id="${data}">View</button>`;
                }
                buttons += `<button class="btn btn-primary text-nowrap btn-change-status-dca-commission" data-dca-profile-id="${data}">Change Status</button>`;
                
                return buttons;
            }
        },
        { title: "ID", data: "id" },
        { title: "Version Name", data: "name" },
        { 
            title: "Status", 
            data: "status",
            render: function (data, type, row) {
                // const statusObj = Object.values(campaignStatus).find(s => s.ID === Number(campaign.status));
                // const statusDisplay = statusObj ? statusObj.DISPLAY : (campaign.status ?? "0");
                console.log(data);
                let options = `<select class="sel-dca-commission-status form-select-sm">`;
                options += Object.entries(commissionVersionStatuses)
                    .map(([key, value]) => {
                        console.log(data );
                        console.log(value.ID);
                        console.log(value.DISPLAY);

                        if ( data == value.ID ) {
                            return `<option value="${value.ID}" selected>${value.DISPLAY}</option>`
                        }
                        else {
                            return `<option value="${value.ID}">${value.DISPLAY}</option>`
                        }
                        
                    })
                    .join('');
                options += `</select>`;

                console.log(options);
                return options;
            } 
        },
        { title: "Remark", data: "remark" },
    ],
    editCommission: [
        { 
            title: "Aging Bucket", 
            data: "bucket",
            render: function(data, type, row, meta) {
                const obj = Object.values(commissionInternalBucketMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span data-bucket-id="${data}">${display}</span>`;
            } 

        },
        { 
            title: "Collection Amount", 
            data: "bracket",
            render: function(data, type, row, meta) {
                const obj = Object.values(commissionInternalBracketMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span data-bracket-id="${data}">${display}</span>`;
            }
        },
        { 
            title: "Commission (%)", 
            data: "rate" ,
            render : function(data, type, row, meta) {
                return `<input type="text" class="input_rate" value="${data}"></input>`;
            }
        },
    ]

};


const commissionMockData = {
    dca: [
        {
            action: "<button class='btn btn-primary'>Download</button>",
            yyyymm: "202602",
            agent_id: "V11201",
            case_count: "100",
            collect_amount: "10000",
            reversal_amount: "0",
            commission: "100",
        }
    ],
    dcaSetup: [
        {
            action: "<button class='btn btn-primary me-1 btn-edit-dca-setup'>Edit</button>",
            id: "3101",
            version_name: "Before 2018",
            status: "0",
            remark: "",
        },
        {
            action: "<button class='btn btn-primary me-1 btn-view-dca-setup'>View</button>",
            id: "3102",
            version_name: "2018 to 2026",
            status: "1",
            remark: "version approved 2026-06-29",
        }
    ],

    editCommission: [
        {
            aging_bucket: "Aging 61 - 120",
            collection_amount: "under 200,000",
            commission: "10%",
        },
        {
            aging_bucket: "Aging 61 - 120",
            collection_amount: "200,001 to 250,000",
            commission: "10%",
        },
        {
            aging_bucket: "Aging 61 - 120",
            collection_amount: "250,001 to 300,000",
            commission: "10%",
        },

    ]
};

async function getDcaComissionManageData(year, month) {

    // Pending API Endpoint, temporarily call view_internal_commission_table for dev 
    const url = `${API_BASE}/dcaCommission.php?endpoint=view_dca_comm_table`;
    const data = {
        "year": year,
        "month": month,
    };
    const responseJson = await fetchAPI(url, data);
    if ( responseJson.success == true ) {
        const json = JSON.parse(responseJson.response);
        return json.comm_table;
    }
    else {
        console.error("Failed to fetch commission table data");
    }
}

export async function loadDcaCommissionManageTable(year, month) {
    let data = await getDcaComissionManageData(year, month);
    
    // 2. Ensure data exists, then format and map the year and month to every row
    if (data && Array.isArray(data)) {
        // Formats "2026" and "09" into "202609"
        const formattedYYYYMM = `${year}${String(month).padStart(2, '0')}`; 
        
        data = data.map(row => ({
            ...row,
            yyyymm: formattedYYYYMM // This maps directly to your column data: "yyyymm"
        }));
    }
    renderTable("dca-commission-table", columnsConfig["dca"] , data)
    
}


async function getDcaComissionSetupData() {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return commissionMockData["dcaSetup"] || [];

    
    
    const url = `${API_BASE}/dcaCommission.php?endpoint=list_dca_comm_version`;

    const responseJson = await fetchAPI(url);
    console.log(responseJson);
    if ( responseJson.success == true ) {
        const json = JSON.parse(responseJson.response);
        return json.comm_version;
    }
    else {
        console.error("Failed to fetch commission table data");
    }
}

let dcaCommissionSetupTable = null;
export async function loadDcaCommissionSetupTable() {

    const type = "Commission";
    const body = {
        type
    };
    const url2 = `${API_BASE}/getMapping.php`;
    const commissionJson  = await fetchAPI(url2, body);
    commissionVersionStatuses  = commissionJson.Version.Status;

    console.log(commissionVersionStatuses);
    const data = await getDcaComissionSetupData();

    renderTable("dca-commission-setup-table", columnsConfig["dcaSetup"] , data);
    
    // if (dcaCommissionSetupTable) {
    //     dcaCommissionSetupTable.destroy();
    //     document.querySelector("#dca-commission-setup-table tbody").innerHTML = "";
    //     // document.querySelector("#user-management-table-header").innerHTML = "";
    // }

    // dcaCommissionSetupTable = new DataTable("#dca-commission-setup-table", {
    //     data: data,
    //     columns: columnsConfig["dcaSetup"],
    //     searching: false,
    //     stateSave: true,
    //     order: [] // FIXED: Disables the initial default sort

    // });
}

let editCommissionTable = null;
async function loadComissionData(version_id) {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return commissionMockData["editCommission"] || [];
    const url = `${API_BASE}/dcaCommission.php?endpoint=view_dca_comm_rate`;

    const body = {
        version_id
    };
    const responseJson = await fetchAPI(url, body);
    // console.log(responseJson);
    if ( responseJson.success == true ) {
        const json = JSON.parse(responseJson.response);
        return json.rate_table;
        
    }
    else {
        console.error("Failed to fetch commission table data");
    }
} 

export async function loadEditComissionTable(version_id) {

    let type = "Dunning";
    let body = {
        type
    };
    const url2 = `${API_BASE}/getMapping.php`;
    const dunningJson  = await fetchAPI(url2, body);
    dunningCallGroupMapping  = dunningJson.CallGroup;

    type = "Commission";
    body = {
        type
    };
    const commissionJson  = await fetchAPI(url2, body);
    commissionInternalBucketMapping  = commissionJson.Internal.Bucket;
    commissionInternalBracketMapping  = commissionJson.Internal.Bracket;


    const data = await loadComissionData(version_id);
    renderTable("edit-commission-table", columnsConfig["editCommission"] , data, false);

    // if (editCommissionTable) {
    //     editCommissionTable.destroy();
    //     document.querySelector("#edit-commission-table tbody").innerHTML = "";
    //     // document.querySelector("#user-management-table-header").innerHTML = "";
    // }

    // editCommissionTable = new DataTable("#edit-commission-table", {
    //     data: data,
    //     columns: columnsConfig["editCommission"],
    //     searching: false,
    //     stateSave: true,
    //     order: [] // FIXED: Disables the initial default sort

    // });
}