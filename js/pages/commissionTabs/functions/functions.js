import { mockData } from "../../../components/mockData.js";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../../js/api/fetch-api.js';
import {renderTable} from '../../../api/render-table.js'

let  commissionVersionStatuses;
let dunningCallGroupMapping;
let commissionInternalBucketMapping;
let commissionInternalBracketMapping;

const columnsConfig = {
    editCommission: [
        { 
            title: "Tier", 
            data: "callgroup",
            render: function(data, type, row, meta) {
                const obj = Object.values(dunningCallGroupMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span data-callgroup-id="${data}">${display}</span>`;
            }
        },
        { 
            title: "Plan", 
            data: "bucket",
            render: function(data, type, row, meta) {
                const obj = Object.values(commissionInternalBucketMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span data-bucket-id="${data}">${display}</span>`;
            }
        },
        { 
            title: "collection$", 
            data: "bracket",
            render: function(data, type, row, meta) {
                const obj = Object.values(commissionInternalBracketMapping).find(s => s.ID === Number(data));
                const display = obj ? obj.DISPLAY : (data ?? "1");
                return `<span data-bracket-id="${data}">${display}</span>`;
            }
        },
        { 
            title: "Normal Commission (%)", 
            data: "rate_normal",
            render : function(data, type, row, meta) {
                return `<input type="text" class="input_rate_normal" value="${data}"></input>`;
            }
        },
        { 
            title: "New-Hire Commission(%)", 
            data: "rate_newhire",
            render : function(data, type, row, meta) {
                return `<input type="text" class="input_rate_newhire" value="${data}"></input>`;
            }
        },
        { 
            title: "Bonus(RM) on reaching level", 
            data: "bonus",
            render : function(data, type, row, meta) {
                return `<input type="text" class="input_bonus" value="${data}"></input>`;
            }
        },
    ],
    agent: [
        
        { title: "Plan", data: "plan" },
        { title: "Aging", data: "aging" },
        { title: "collection$", data: "collection" },
        { title: "Normal Commission (%)", data: "normal_commission" },
        { title: "New-Hire Commission(%)", data: "new_hire_commission" },
        { title: "Bonus(RM) on reaching level", data: "bonus_on_reaching_level" }

    ],
    manage: [
        
        {
            title: "Action",
            data: "id", // 1. Map this directly to your unique row ID property (e.g., dca_id)
            render: function(data, type, row) {
                return `<button class="btn btn-primary text-nowrap btn-edit-dca-profile" data-dca-profile-id="${data}">Download ACCT List</button>`;
            }
        },
        { title: "Record ID", data: "id" },
        { title: "YYYMM", data: "yyyymm" },
        { title: "Agent ID", data: "agent_name" },
        { title: "Plan", data: "plan" },
        { title: "Case Count", data: "case_count" },
        { title: "Collect Amount", data: "collect_amount" },
        { title: "Collect include reversal day 1", data: "collect_include_rev_day_1" },
        { title: "Commission Day 1", data: "commission_1" },
        { title: "Collect include reversal day 7", data: "collect_include_rev_day_7" },
        { title: "Commission day 7", data: "commission_7" },
        { title: "commission deduction", data: "commission_deduct" },

    ],
    setup: [
        { 
            title: "Action", 
            data: "id",
            render: function(data, type, row) {
                let buttons = "";
                if ( row.status == 3 ) {
                    buttons += `<button class="btn btn-primary text-nowrap btn-edit-internal-commission" data-dca-version-name="${row.name}" data-dca-remark="${row.remark}" data-dca-profile-id="${data}">Edit</button>`;
                }
                else {
                    buttons += `<button class="btn btn-primary text-nowrap btn-view-internal-commission"  data-dca-version-name="${row.name}" data-dca-remark="${row.remark}" data-dca-profile-id="${data}">View</button>`;
                }
                buttons += `<button class="ms-1 btn btn-primary text-nowrap btn-change-status-internal-commission" data-dca-profile-id="${data}">Change Status</button>`;
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
                let options = `<select class="sel-internal-commission-status form-select-sm">`;
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
    extra: [
        { title: "Action", data: "action" },
        { title: "ID", data: "id" },
        { title: "Version Name", data: "version_name" },
        { title: "Status", data: "status" },
        { title: "Remark", data: "remark" },

    ],
    download_commission_summary: [
        { title: "Agent ID", data: "agent_id" },
        { title: "Collected", data: "collected" },
        { title: "Commisson", data: "commisson" },
        { title: "Last Month Reduction", data: "last_month_reduction" },
        { title: "After Adjustment", data: "after_adjustment" },

    ],
};


const commissionMockData = {
    downloadCommissionSummary: [
        {
            agent_id: 'V11201', 
            collected: 20000,
            commisson: 300,
            last_month_reduction: '', 
            after_adjustment: 300
        }
    ],
    editCommission: [
        {
            plan: 'tier individual',
            aging: 'Aging30',
            collection: 'under 30,000',
            normal_commission: '<input type="text" value="0.01"/>',
            new_hire_commission: '<input type="text" value="0.01"/>',
            bonus_on_reaching_level: '<input type="text" value="0"/>',

        },
        {
            plan: 'tier individual',
            aging: 'Aging30',
            collection: '30,000-39,999',
            normal_commission: '<input type="text" value="0.02"/>',
            new_hire_commission: '<input type="text" value="0.02"/>',
            bonus_on_reaching_level: '<input type="text" value="0"/>',

        },
    ], 
    extra: [
        {
            action: "<button class='btn btn-primary me-1 btn-edit-extra-commission'>Edit</button><button class='btn btn-primary'>Status</button>",
            id: "2101",
            version_name: "Christmas 2021",
            status: "0",
            remark: "",
        },
        {
            action: "<button class='btn btn-primary me-1 btn-view-extra-commission'>View</button><button class='btn btn-primary'>Status</button>",
            id: "2102",
            version_name: "Christmas 2025",
            status: "0",
            remark: "migrate from xC",
        }
    ],

    setup: [
        {
            action: "<button class='btn btn-primary me-1 btn-edit-commission'>Edit</button><button class='btn btn-primary'>Status</button>",
            id: "101",
            version_name: "Before 2018",
            status: "0",
            remark: "",
        },
        {
            action: "<button class='btn btn-primary me-1 btn-view-commission'>View</button><button class='btn btn-primary'>Status</button>",
            id: "101",
            version_name: "Before 2018",
            status: "0",
            remark: "",
        }
    ],
    agent :[
        {
            plan: 'tier individual',
            aging: 'Aging30',
            collection: 'under 30,000',
            normal_commission: '0.01',
            new_hire_commission: '0.01',
            bonus_on_reaching_level: '0',

        },
        {
            plan: 'tier individual',
            aging: 'Aging30',
            collection: '30,000-39,999',
            normal_commission: '0.02',
            new_hire_commission: '0.02',
            bonus_on_reaching_level: '0',

        },
    ],

    manage: [
        {
            title: "Action",
            data: "id", // 1. Map this directly to your unique row ID property (e.g., dca_id)
            render: function(data, type, row) {
                return `<button class="btn btn-primary text-nowrap btn-edit-dca-profile" data-dca-profile-id="${data}">Download ACCT List</button>`;
            }
        },
        { title: "Record ID", data: "id" },
        { title: "YYYMM", data: "yyyymm" },
        { title: "Agent ID", data: "agent_name" },
        { title: "Plan", data: "plan" },
        { title: "Case Count", data: "case_count" },
        { title: "Collect Amount", data: "collect_amount" },
        { title: "Collect include reversal day 1", data: "collect_include_rev_day_1" },
        { title: "Commission Day 1", data: "commission_1" },
        { title: "Collect include reversal day 7", data: "collect_include_rev_day_7" },
        { title: "Commission day 7", data: "commission_7" },
        { title: "commission deduction", data: "commission_deduct" },
    ]
};

async function getComissionAgentData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return commissionMockData["agent"] || [];
}

let agentTable = null;
export async function loadCommissionAgentTable() {
    const data = await getComissionAgentData();

    if (agentTable) {
        agentTable.destroy();
        document.querySelector("#commission-agent-table tbody").innerHTML = "";
        // document.querySelector("#user-management-table-header").innerHTML = "";
    }

    agentTable = new DataTable("#commission-agent-table", {
        data: data,
        columns: columnsConfig["agent"],
        searching: false,
        stateSave: true,
        order: [] // FIXED: Disables the initial default sort

    });
}


// async function getComissionManageData() {
//     await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
//     return commissionMockData["manage"] || [];
// }

// let manageTable = null;
// export async function loadCommissionManageTable() {
//     const data = await getComissionManageData();

//     if (manageTable) {
//         manageTable.destroy();
//         document.querySelector("#commission-manage-table tbody").innerHTML = "";
//         // document.querySelector("#user-management-table-header").innerHTML = "";
//     }

//     manageTable = new DataTable("#commission-manage-table", {
//         data: data,
//         columns: columnsConfig["manage"],
//         searching: false,
//         stateSave: true,
//         order: [] // FIXED: Disables the initial default sort

//     });
// }


async function getComissionManageData(year, month) {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return commissionMockData["dca"] || [];

    const url = `${API_BASE}/commissionManage.php?endpoint=view_internal_commission_table`;
    const data = {
        "year": year,
        "month": month,
    };
    const responseJson = await fetchAPI(url, data);
    // console.log(responseJson);
    if ( responseJson.success == true ) {
        const json = JSON.parse(responseJson.response);
        return json.comm_table;
    }
    else {
        console.error("Failed to fetch commission table data");
    }
}

export async function loadCommissionManageTable(year, month) {
    let data = await getComissionManageData(year, month);
    
    // 2. Ensure data exists, then format and map the year and month to every row
    if (data && Array.isArray(data)) {
        // Formats "2026" and "09" into "202609"
        const formattedYYYYMM = `${year}${String(month).padStart(2, '0')}`; 
        
        data = data.map(row => ({
            ...row,
            yyyymm: formattedYYYYMM // This maps directly to your column data: "yyyymm"
        }));
    }

    renderTable("commission-manage-table", columnsConfig["manage"] , data);
    
}


async function getComissionSetupData() {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return commissionMockData["setup"] || [];

    const type = "Commission";
    const body = {
        type
    };
    const url2 = `${API_BASE}/getMapping.php`;
    const commissionJson  = await fetchAPI(url2, body);
    commissionVersionStatuses  = commissionJson.Version.Status;
 

    const url = `${API_BASE}/commissionManage.php?endpoint=list_int_comm_version`;

    const responseJson = await fetchAPI(url);
    // console.log(responseJson);
    if ( responseJson.success == true ) {
        const json = JSON.parse(responseJson.response);
        return json.comm_version;
    }
    else {
        console.error("Failed to fetch commission table data");
    }
}

let setupTable = null;
export async function loadCommissionSetupTable() {
    const data = await getComissionSetupData();
    renderTable("commission-setup-table", columnsConfig["setup"] , data);
}



async function getComissionExtraData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return commissionMockData["extra"] || [];
}

let extraTable = null;
export async function loadCommissionExtraTable() {
    const data = await getComissionExtraData();

    if (extraTable) {
        extraTable.destroy();
        document.querySelector("#commission-extra-table tbody").innerHTML = "";
        // document.querySelector("#user-management-table-header").innerHTML = "";
    }

    manageTable = new DataTable("#commission-extra-table", {
        data: data,
        columns: columnsConfig["extra"],
        searching: false,
        stateSave: true,
        order: [] // FIXED: Disables the initial default sort

    });
}


async function getComissionEditCommissionData(version_id) {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return commissionMockData["editCommission"] || [];
    const url = `${API_BASE}/commissionManage.php?endpoint=view_int_comm_rate`;

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

let editCommissionTable = null;


export async function loadCommissionEditComissionTable(version_id) {

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

    const data = await getComissionEditCommissionData(version_id);

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


async function getCommissionEditExtraComissionData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return commissionMockData["editCommission"] || [];
}

let editExtraCommissionTable = null;
export async function loadCommissionEditExtraComissionTable() {
    const data = await getCommissionEditExtraComissionData();

    if (editExtraCommissionTable) {
        editExtraCommissionTable.destroy();
        document.querySelector("#edit-extra-commission-table tbody").innerHTML = "";
        // document.querySelector("#user-management-table-header").innerHTML = "";
    }

    editExtraCommissionTable = new DataTable("#edit-extra-commission-table", {
        data: data,
        columns: columnsConfig["editCommission"],
        searching: false,
        stateSave: true,
        order: [] // FIXED: Disables the initial default sort

    });
}


async function getComissionEditExtraCommissionData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return commissionMockData["downloadCommissionSummary"] || [];
}

let downloadCommissionSummaryTable = null;
export async function downloadCommssionSummaryTable() {
    const data = await getComissionEditExtraCommissionData();

    if (downloadCommissionSummaryTable) {
        downloadCommissionSummaryTable.destroy();
        document.querySelector("#commission-summary-table tbody").innerHTML = "";
        // document.querySelector("#user-management-table-header").innerHTML = "";
    }

    downloadCommissionSummaryTable = new DataTable("#commission-summary-table", {
        data: data,
        columns: columnsConfig["download_commission_summary"],
        searching: false,
        stateSave: true,
        order: [] // FIXED: Disables the initial default sort

    });
}


