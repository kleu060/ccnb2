import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';
import { calcuatePercenInputListener, recalculateEstimateCounts } from '../../../api/calculate-percentage.js';

import { mockData } from "./mockData.js";
import {renderTable} from '../../../api/render-table.js'



const columnsConfig = {
    dcaCampaign: [
        { title: "ID", data: "id" },
        { title: "Campaign Name", data: "campaign_name" },
        { title: "Dunning Group", data: "dunning_group_name" },
        { title: "Overdue Days", data: "overdue_days" },
        { title: "Validity", data: "validity" },

    ],
    dcaManage: [
        { title: "Action", data: "action" },
        { title: "Campaign ID", data: "id" },
        { title: "Campaign Name", data: "campaign_name" },
        { title: "Dunning Group", data: "dunning_group_name" },
        { title: "Overdue Days", data: "overdue_days" },
        { title: "Validity", data: "validity" },
        { title: "Status", data: "status" },

    ],
    dcaDispatch: [
        { title: "DCA Code", data: "dca_code" },
        { title: "DCA Name", data: "dca_name" },
        { title: "Ranking", data: "ranking" },
        { title: "Weight", data: "weight" },
        { title: "Est amount %", data: "estimate_count" },

    ],
    accountListData: [
        { title: "Action", data: "action" },
        { title: "Campaign ID", data: "id" },
        { title: "Campaign Name", data: "campaign_name" },
        { title: "Dunning Group", data: "dunning_group_name" },
        { title: "Overdue Days", data: "overdue_days" },
        { title: "Validity", data: "validity" },
        { title: "Status", data: "status" },
    ],
    dcaProfile: [
        {
            title: "Action",
            data: "dca_id", // 1. Map this directly to your unique row ID property (e.g., dca_id)
            render: function(data, type, row) {
                return `<button class="btn btn-primary btn-edit-dca-profile" data-dca-profile-id="${data}">Edit</button>`;
            }
        },
        { title: "DCA Code", data: "dca_code" },
        { title: "DCA Name", data: "dca_name" },
        { title: "Contact Name", data: "contact_name",
            render: function(data, type, row) {
                return `KW`;
            }
        },
        { title: "Contact Phone", data: "contact_phone",
            render: function(data, type, row) {
                return `1111111`;
            }
        },
        { title: "Status", data: "status",
            render: function(data, type, row) {
                return `1`;
            }
        },
        { title: "BG Expiry", data: "bg_expiry",
            render: function(data, type, row) {
                return `2026-12-12`;
            }
         },
    ],
    weight: [
        { title: "Action", data: "action" },
        { title: "Group", data: "group" },
        { title: "Active DCA Count", data: "active_dca_count" },
    ],
    weightGroup: [
        { title: "DCA Code", data: "dca_code" },
        { title: "DCA Name", data: "dca_name" },
        { title: "Ranking", data: "ranking" },
        { 
            title: "Weight", 
            data: "weight",
            render: function ( data, type, row ) {
                return `
                    <input type="hidden" class="dca_id" value="${row.dca_id}">
                    <input type="text" value="${data}" class="input-weight"/>
                `;
            } 
        },
        { 
            title: "Estiamted %", 
            data: "estimate_count",
            render: function ( data, type, row ) {
                  return data || '0%'; 
            } 
        },
    ],
    loginUserTable: [
        { 
            title: "Action", 
            data: "action",
            render: function ( data, type, row ) {
                return `<button class="btn btn-primary btn-edit-dca-login-user" 
                            data-id="${row.attachment_id}"
                            data-user-name="${row.user_name}"
                            data-dca-code="${row.dca_code}"
                            ">Edit</button>`
            }
        },
        { title: "User ID", data: "attachment_id"},
        { title: "Name", data: "user_name"},
        { title: "DCA Code", data: "dca_code"},
        { title: "Modify Date", data: "modify_date"},
    ]
};




export async function getDcaCampaignData() {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return mockData["dcaCampaignData"] || [];
    const url = `${API_BASE}/dunningGroup.php?endpoint=list_dca_campaign`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        const response =  JSON.parse(responseJson.response);
        return response.list;
    }
    else {
        console.error("Failed to fetch campaign data");
    }
}

let dcaCampaignTable = null;
export async function renderDcaCampaignTable() {
    const data = await getDcaCampaignData();

    if (dcaCampaignTable) {
        dcaCampaignTable.destroy();
        document.querySelector("#dca-campaign-table tbody").innerHTML = "";
        document.querySelector("#dca-campaign-table thead").innerHTML = "";
    }
    
    // Create new DataTable
    dcaCampaignTable = new DataTable("#dca-campaign-table", {
        data: data,
        columns: columnsConfig["dcaCampaign"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });
} 


// export async function getCampaignSetupData() {
//     await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
//     return mockData["campaignSetupData"] || [];
// }

let campaignSetupTable = null;
export async function renderCampaignSetupTable() {
    const campaigns = await getDcaCampaignData();

    const type = "Dunning";
    const body = {type};
    const url = `${API_BASE}/getMapping.php`;
    const dunningConstantJson  = await fetchAPI(url, body);
    const campaignStatus = dunningConstantJson.Campaign.Status;

    let data=[];
    campaigns.forEach(function(campaign) {
        const statusObj = Object.values(campaignStatus).find(s => s.ID === Number(campaign.status));
        const statusDisplay = statusObj ? statusObj.DISPLAY : (campaign.status ?? "0");
        

        let tmp = {  
            action: `<button class="btn btn-primary btn-edit-campaign-setting" data-campaign-id="${campaign.id}">Edit</button>`,
            id: campaign.id,
            campaign_name: campaign.campaign_name,
            dunning_group_name: campaign.dunning_group_name,
            overdue_days: campaign.overdue_days,
            validity: campaign.validity,
            status: statusDisplay,
        }
        data.push(tmp);
    });

    if (campaignSetupTable) {
        campaignSetupTable.destroy();
        document.querySelector("#campaign-setup-table tbody").innerHTML = "";
        document.querySelector("#campaign-setup-table thead").innerHTML = "";
    }
    
    // Create new DataTable
    campaignSetupTable = new DataTable("#campaign-setup-table", {
        data: data,
        columns: columnsConfig["accountListData"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });
} 



// export async function getDcaManageData() {
//     // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
//     // return mockData["dcaManageData"] || [];

//     const url = `${API_BASE}/dunningGroup.php?endpoint=list_internal_campaign`;
//     const responseJson = await fetchAPI(url);
//     if ( responseJson.success == true ) {
//         return JSON.parse(responseJson.response);
//     }
//     else {
//         console.error("Failed to fetch campaign data");
//     }

// }

let dcaManageTable;
export async function renderDcaManageTable() {
    let data = [];
    const campaigns = await getDcaCampaignData();
    
    const type = "Dunning";
    const body = {type};
    const url = `${API_BASE}/getMapping.php`;
    const dunningConstantJson  = await fetchAPI(url, body);
    const campaignStatus = dunningConstantJson.Campaign.Status;

    campaigns.forEach(function(campaign) {
        const statusObj = Object.values(campaignStatus).find(s => s.ID === Number(campaign.status));
        const statusDisplay = statusObj ? statusObj.DISPLAY : (campaign.status ?? "0");
        

        let tmp = {  
            action: `<button class="btn btn-primary btn-dca-dispatch" data-campaign-id="${campaign.id}">Dispatch</button>`,
            id: campaign.id,
            campaign_name: campaign.campaign_name,
            dunning_group_name: campaign.dunning_group_name,
            overdue_days: campaign.overdue_days,
            validity: campaign.validity,
            status: statusDisplay,
        }
        data.push(tmp);
    });
    
    renderTable("dca-manage-table", columnsConfig["dcaManage"] , data)    

    // if (dcaManageTable) {
    //     dcaManageTable.destroy();
    //     document.querySelector("#dca-manage-table tbody").innerHTML = "";
    //     document.querySelector("#dca-manage-table thead").innerHTML = "";
    // }
    
    // // Create new DataTable
    // dcaManageTable = new DataTable("#dca-manage-table", {
    //     data: data,
    //     columns: columnsConfig["dcaManage"],
    //     searching: false,
    //     language: {
    //         emptyTable: "No Data"
    //     }
    // });
}


export async function getDcaDispatchData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["dcaDispatchData"] || [];
}
let dcaDispatchTable; 

export async function renderDcaDispatchTable() {
    const data = await getDcaDispatchData();

    if (dcaDispatchTable) {
        dcaDispatchTable.destroy();
        document.querySelector("#dca-dispatch-table tbody").innerHTML = "";
        document.querySelector("#dca-dispatch-table thead").innerHTML = "";
    }

    // Bind the global delegated listener ONCE to the stable parent wrapper
    calcuatePercenInputListener("#dca-dispatch-table", 'dca-dispatch-weight', 3, 4);
    
    // Create new DataTable
    dcaDispatchTable = new DataTable("#dca-dispatch-table", {
        data: data,
        columns: columnsConfig["dcaDispatch"],
        searching: false,
        language: {
            emptyTable: "No Data"
        },
        // The footerCallback runs every time the table draws
        footerCallback: function (row, data, start, end, display) {
            let api = new DataTable.Api(this);
            
            // Calculate total weight by reading the live value from the inputs in the data
            let totalWeight = api
                .column(3) // Index 3 is the 'weight' column
                .data()
                .reduce(function (sum, htmlString) {
                    let tempDiv = document.createElement('div');
                    tempDiv.innerHTML = htmlString;
                    let input = tempDiv.querySelector('input');
                    
                    // Get the 'value' attribute which holds our current state
                    let val = input ? parseFloat(input.getAttribute('value')) : parseFloat(htmlString);
                    return sum + (isNaN(val) ? 0 : val);
                }, 0);

            // Update the footer cell
            let footerCell = api.column(3).footer();
            if (footerCell) {
                footerCell.innerHTML = totalWeight;
            }
        }
    });
    console.log("render dcs dispatch table");
    console.log(dcaDispatchTable);
    // Attach delegated change/input event listener to the table body
    // const tbody = document.querySelector('#dca-dispatch-table tbody');
    recalculateEstimateCounts(3, 4, 1, 1, dcaDispatchTable);

    // if (tbody && !tbody.dataset.listenerAttached) {
    //     calcuatePercenInputListener(tbody, 'dca-dispatch-weight', dcaDispatchTable);        
    // }
}

// function calcuatePercenInputListener(tbody, inputClassName) {
//     tbody.addEventListener('input', function (e) {
//         if (e.target && e.target.classList.contains(inputClassName)) {

//             console.log("input");
//             let input = e.target;
//             let newValue = input.value || "0";
            
//             // Fetch the DataTables API row wrapper
//             let tr = input.closest('tr');
//             let row = dcaDispatchTable.row(tr);
//             let rowData = row.data();
            
//             // Update raw cell data HTML so cache matches user interface state
//             rowData.weight = `<input type="text" class="dca-dispatch-weight" value="${newValue}"/>`;
//             row.data(rowData); // Saves state to internal cache
            
//             // Re-calculate percentages across all sibling rows
//             recalculateEstimateCounts(tr.rowIndex, input.selectionStart);
//         }
//     });
//     // Prevents duplicate event listeners if initialized multiple times
//     tbody.dataset.listenerAttached = "true"; 
// }

// // Helper calculation engine that handles weights and updates estimate counts
// function recalculateEstimateCounts(activeRowIndex, cursorPosition) {
//     let api = dcaDispatchTable;
//     let totalWeight = 0;

//     // Step 1: Calculate aggregate weight total from fresh cache strings
//     api.column(3).data().each(function (htmlString) {
//         let tempDiv = document.createElement('div');
//         tempDiv.innerHTML = htmlString;
//         let input = tempDiv.querySelector('input');
//         let val = input ? parseFloat(input.getAttribute('value')) : 0;
//         totalWeight += isNaN(val) ? 0 : val;
//     });

//     // Step 2: Scale estimate counts using the calculated ratio
//     api.rows().every(function () {
//         let rowData = this.data();
//         let tempDiv = document.createElement('div');
//         tempDiv.innerHTML = rowData.weight;
//         let input = tempDiv.querySelector('input');
//         let weight = input ? parseFloat(input.getAttribute('value')) : 0;
        
//         let percentage = totalWeight > 0 ? ((weight / totalWeight) * 100).toFixed(0) + '%' : '0%';
        
//         rowData.estimate_count = percentage;
//         this.data(rowData); 
//     });

//     // Step 3: Redraw table view display structures non-destructively 
//     dcaDispatchTable.draw(false);

//     // Step 4: Re-target input DOM nodes to preserve cursor typing focus
//     if (activeRowIndex) {
//         let targetInput = document.querySelector(`#dca-dispatch-table tr:nth-child(${activeRowIndex}) .dca-dispatch-weight`);
//         if (targetInput) {
//             targetInput.focus();
//             targetInput.setSelectionRange(cursorPosition, cursorPosition);
//         }
//     }
// }

export async function getWeightData() {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return mockData["weightData"] || [];

    const url = `${API_BASE}/dunningGroup.php?endpoint=view_dca_weight`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch campaign data");
    }
}
// "[{\"group\":1,\"dca\":[{\"dca_id\":1,\"dca_code\":\"dca\\/test\",\"dca_name\":\"testing company limited\",\"ranking\":1,\"weight\":0},{\"dca_id\":2,\"dca_code\":\"dca\\/test2\",\"dca_name\":\"testing2 company limited\",\"ranking\":1,\"weight\":0}]},{\"group\":2,\"dca\":[{\"dca_id\":1,\"dca_code\":\"dca\\/test\",\"dca_name\":\"testing company limited\",\"ranking\":1,\"weight\":0}]},{\"group\":3,\"dca\":[]}]"

let weightTable;
export async function renderWeightTable() {

    const type = "DCA";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const dcaJson  = await fetchAPI(url, body);
    const dcaGroupMapping = dcaJson.GROUP;

    const tmpData = await getWeightData();
    console.log(tmpData);
    let data = [];
    tmpData.forEach(function(group) {
        // { title: "Action", data: "action" },
        // { title: "Group", data: "group" },
        // { title: "Active DCA Count", data: "active_dca_count" },

        const dcaGroupObj = Object.values(dcaGroupMapping).find(s => s.ID === Number(group.group));
        const dcaGroupDisplay = dcaGroupObj ? dcaGroupObj.DISPLAY : (group.group ?? "1");

        console.log(group.dca);
        let tmp = {  
            action: `<button class="btn btn-primary btn-weight" data-weight-group-name="${dcaGroupDisplay}" data-group-id=${group.group}>Weight</button>`,
            group: dcaGroupDisplay, 
            active_dca_count: group.dca.length  

        }
        data.push(tmp);
    });
    console.log("weight")
    console.log(data);

    renderTable("weight-table", columnsConfig["weight"] , data);

}


export async function getWeightGroupData(group) {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return mockData["weightGroupData"] || [];

    console.log("group: " + group);
    const url = `${API_BASE}/dunningGroup.php?endpoint=view_dca_weight`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        const dataArray = JSON.parse(responseJson.response);
        console.log(dataArray);
        console.log(dataArray.find(item => Number(item.group) === Number(group)) || null);
        // return JSON.parse(responseJson.response);

        const dcaWeightObject = dataArray.find(item => Number(item.group) === Number(group)) || null;
        return dcaWeightObject.dca;
    }
    else {
        console.error("Failed to fetch campaign data");
    }
}

let weightGroupTable;
export async function renderWeightGroupTable(group) {
    const data = await getWeightGroupData(group);

    
    // Bind the global delegated listener ONCE to the stable parent wrapper
    calcuatePercenInputListener("#weight-group-table", 'input-weight', 3, 4);
    
    const weightGroupTable = renderTable("weight-group-table", columnsConfig["weightGroup"] , data)    

    // Attach delegated change/input event listener to the table body
    const tbody = document.querySelector('#weight-group-table tbody');
    recalculateEstimateCounts(3, 4, 1, 1, weightGroupTable);

    // if (tbody && !tbody.dataset.listenerAttached) {
        // calcuatePercenInputListener(tbody, 'input-weight', weightGroupTable);        
    // }
}



export async function getDcaProfileData() {

    const url = `${API_BASE}/dunningGroup.php?endpoint=list_dca_profile`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch campaign data");
    }
}

let dcaProfileTable = null;
export async function renderDcaProfileTable() {
    const data = await getDcaProfileData();

    if (dcaProfileTable) {
        dcaProfileTable.destroy();
        document.querySelector("#dca-profile-table tbody").innerHTML = "";
        document.querySelector("#dca-profile-table thead").innerHTML = "";
    }
    
    // Create new DataTable
    dcaProfileTable = new DataTable("#dca-profile-table", {
        data: data,
        columns: columnsConfig["dcaProfile"],
        searching: false,
        language: {
            emptyTable: "No Data"
        }
    });
} 

async function getLoginUserData() {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return mockData["dcaLoginUserData"] || [];

    const url = `${API_BASE}/dcaUserManage.php?endpoint=list_dca_user`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        const response =  JSON.parse(responseJson.response);
        return response.user_list;
    }
    else {
        console.error("Failed to fetch campaign data");
    }
}

export async function renderLoginUserTable() {
    const data = await getLoginUserData();

    renderTable("dca-login-user-table", columnsConfig["loginUserTable"] , data)    
}
