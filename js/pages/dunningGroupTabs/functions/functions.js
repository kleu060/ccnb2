import { mockData } from "../../../components/mockData.js";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../../js/api/fetch-api.js';


const columnsConfig = {
    dunning_group: [
        
        { title: "ID", data: "id" },
        { title: "Dunn Group Name", data: "dunn_group_name" },
        { title: "Priority", data: "priority" },
        { title: "Remark", data: "remark" },

    ],
    dunning_group_setup: [
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn btn-primary">Edit</button>'
        },
        { title: "ID", data: "id" },
        { title: "Dunn Group Name", data: "dunn_group_name" },
        { title: "Priority", data: "priority" },
        { title: "Remark", data: "remark" },
    ],

    campaign_list: [
        { title: "Campaign ID", data: "campaign_id" },
        { title: "Campaign Name", data: "campaign_name" },
        { title: "Dunning Group Name", data: "dunning_group_name" },
        { title: "Type", data: "type" },
        { title: "Priority", data: "priority" },
        { title: "Call Group", data: "call_group" },
        { title: "Create Date", data: "create_date" },
        { title: "Start Date", data: "start_date" },
        { title: "Expiry Date", data: "expiry_date" },
    ],
    campaign_list_setup: [
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn btn-primary">Edit</button>'
        },
        { title: "Campaign ID", data: "campaign_id" },
        { title: "Campaign Name", data: "campaign_name" },
        { title: "Dunning Group Name", data: "dunning_group_name" },
        { title: "Type", data: "type" },
        { title: "Priority", data: "priority" },
        { title: "Call Group", data: "call_group" },
        { title: "Create Date", data: "create_date" },
        { title: "Start Date", data: "start_date" },
        { title: "Expiry Date", data: "expiry_date" },
    ],
    dunning_group_version: [
        { title: "ID", data: "id" },
        { title: "Dunning_group_name", data: "dunn_group_name" },
        { title: "Version", data: "version" },
        { title: "Status", data: "status" },
        { title: "Priority", data: "priority" },
        { title: "Criteria", data: "criteria" },
        { title: "Remark", data: "remark" },
    ],
    dunning_group_version_setup: [
        {
            title: "Action",
            data: "action",
            defaultContent: '<button class="btn btn-primary">Edit</button>'
        },
        { title: "ID", data: "id" },
        { title: "Dunning_group_name", data: "dunn_group_name" },
        { title: "Version", data: "version" },
        { title: "Status", data: "status" },
        { title: "Priority", data: "priority" },
        { title: "Criteria", data: "criteria" },
        { title: "Remark", data: "remark" },
    ],
    
};


// let table = null;
let campaignTable = null;
// let dunningGroupSetupTable = null;
let campaignSetupTable = null;

async function getDunningGroups() {
    // await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    // return mockData["dunning_group"] || [];

    const url = `${API_BASE}/dunningGroup.php?endpoint=list_dunning`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch Dunning Group data");
    }
}

async function getDunningVersion(dunningId) {
    const url = `${API_BASE}/dunningGroup.php?endpoint=list_dunning_version&dunning_id=${dunningId}`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch Dunning Group Version data");
    }
}

async function getDunningGroupsSetup() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["dunning_group_setup"] || [];
}

const tableInstances = {
    read: null,
    setup: null,

};

export async function loadDunningGroupTable(isEdit = false) {

    let data = [];
    let columnConfg = "";
    let instanceKey  = "";
    let tableName = "";

    const type = "Dunning";
    const body = {type};
    const url = `${API_BASE}/getMapping.php`;
    const dunningConstantJson  = await fetchAPI(url, body);
    
    if ( isEdit ) {
        // const tmpData = await getDunningGroupsSetup();
        tableName = "dunning-group-setup-table";
        columnConfg = "dunning_group_setup";
        instanceKey  = "setup";
    }
    else {
        // const tmpData = await getDunningGroups();
        tableName = "dunning-group-table";
        columnConfg = "dunning_group";
        instanceKey  = "read";
    }
    // const dunningGroupStatus = dunningConstantJson.Status;
    const tmpData = await getDunningGroups();
    for (const dg of tmpData) {
        if ( isEdit ) {
            let tmp = {   
                action: '<button class="btn btn-primary btn-edit-dunning-group" data-dunning-id="'+dg.id+'" data-dunning-name="'+dg.name+'" data-dunning-priority="'+dg.priority+'" data-dunning-remark="'+dg.remark+'">Edit</button> \
                        <button class="btn btn-primary btn-dunning-group-view-version" data-dunning-id='+ dg.id+' data-dunning-priority="'+dg.priority+'" data-dunning-group-name="'+dg.name+'">Version</button>',
                id: dg.id,
                dunn_group_name: dg.name,
                priority: dg.priority ?? "0",
                remark: dg.remark ?? "0",
                
            };
            data.push(tmp);
        }
        else {
            let tmp = {   
                
                id: dg.id,
                dunn_group_name: dg.name,
                priority: dg.priority ?? "0",
                remark: dg.remark ?? "0",
                
            };
            data.push(tmp);
        }

        // let versions = await getDunningVersion(dg.id);
        // if (Array.isArray(versions)) {
        //     versions.forEach(function(version) {
        //         const statusObj = Object.values(dunningGroupStatus).find(s => s.ID === Number(version.status));
        //         const statusDisplay = statusObj ? statusObj.DISPLAY : (version.status ?? "0");

        //         if ( isEdit ) {
        //             let tmp = {   
        //                 action: '<button class="btn btn-primary btn-edit-dunning-group">Edit</button> \
        //                             <button class="btn btn-primary btn-dunning-group-create-version" data-dunning-id='+ dg.id+' data-dunning-group-name="'+dg.name+'">Version</button>',
        //                 id: dg.id,
        //                 dunn_group_name: dg.name,
        //                 version: version.version ?? "1",
        //                 status: statusDisplay,
        //                 priority: dg.priority ?? "0",
        //                 criteria: '<button class="btn btn-primary show-criteria" data-dunning-group-id="'+ version.id +'">Show Criteria</button>',
        //                 create_date: version.create_date ?? "0000-00-00 00:00:00",
        //                 end_date: version.end_date ?? "0000-00-00 00:00:00",
        //             };
        //             data.push(tmp);
        //         }
        //         else {
           
        //             console.log(version);
        //             let tmp = {
        //                     id: dg.id,
        //                     dunn_group_name: dg.name,
        //                     version: version.version ?? "1",
        //                     status: statusDisplay,
        //                     priority: dg.priority ?? "0",
        //                     criteria: '<button class="btn btn-primary show-criteria" data-dunning-group-id="'+ version.id +'">Show Criteria</button>',
        //                     create_date: version.create_date ?? "0000-00-00 00:00:00",
        //                     end_date: version.end_date ?? "0000-00-00 00:00:00",
        //                 };

        //                 console.log(tmp);
        //                 data.push(tmp);
                   
        //         }
        //     });
        // }

    }
    
    console.log(data);
    // Cleanly destroy an existing instance if it was already initialized
    if (tableInstances[instanceKey]) {
        tableInstances[instanceKey].destroy();
        tableInstances[instanceKey] = null;
        const tableBody = document.querySelector(`#${tableName} tbody`);
        if (tableBody) tableBody.innerHTML = "";
    }

    // Create new DataTable
    tableInstances[instanceKey] = new DataTable("#" + tableName, {
        data: data,
        columns: columnsConfig[columnConfg],
        searching: false,
        stateSave: true
    });
}



// export async function loadDunningGroupSetupTable() {

//     const data = await getDunningGroupsSetup();
//     if (dunningGroupSetupTable) {
//         dunningGroupSetupTable.destroy();
//         document.querySelector("#dunning-group-setup-table tbody").innerHTML = "";
//         // document.querySelector("#user-management-table-header").innerHTML = "";
//     }

//     // Create new DataTable
//     dunningGroupSetupTable = new DataTable("#dunning-group-setup-table", {
//         data: data,
//         columns: columnsConfig["dunning_group_setup"],
//         searching: false,
//     });
// }


async function getCampaignList () {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["campaigns"] || [];
}

async function getCampaignListSetup () {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["campaigns_setup"] || [];
}


let versionTable = null;
export async function loadDunningVersionTable(dunningGroupId, dunningGroupPriority, dunningGroupName , isEdit) {
    let versions = await getDunningVersion(dunningGroupId);
    
    const type = "Dunning";
    const body = {type};
    const url = `${API_BASE}/getMapping.php`;
    const dunningConstantJson  = await fetchAPI(url, body);
    const dunningGroupStatus = dunningConstantJson.Status;
    let data = [];

    if (Array.isArray(versions)) {
        versions.forEach(function(version) {
            const statusObj = Object.values(dunningGroupStatus).find(s => s.ID === Number(version.status));
            const statusDisplay = statusObj ? statusObj.DISPLAY : (version.status ?? "0");
        
            if ( isEdit ) {
                let tmp = {   
                    action: '<button class="btn btn-primary btn-edit-dunning-version"' +  
                                'data-version-id="'+version.id+'" ' + 
                                'data-dunning-id="'+ dunningGroupId+'" ' +
                                'data-dunning-group-name="'+dunningGroupName+'" ' + 
                                'data-dunning-group-priority="'+dunningGroupPriority+'" ' + 
                                'data-version-number="'+version.version+'" ' + 
                                'data-version-status="'+version.status+'" ' +
                                'data-version-remark="'+version.remark+'">Edit</button> \
                            <button class="btn btn-primary btn-dunning-group-create-version" data-dunning-group-name="'+dunningGroupName+'" data-dunning-id="'+ dunningGroupId+'" data-dunning-group-priority="'+dunningGroupPriority+'" data-version-id="'+version.id+'" data-dunning-group-priority="'+dunningGroupPriority+'">New</button> \
                        ',
                    id: version.id,
                    dunn_group_name: dunningGroupName,
                    version: version.version ?? "1",
                    status: statusDisplay,
                    priority: dunningGroupPriority,
                    criteria: '<button class="btn btn-primary show-criteria" ' +  
                                'data-version-id="'+version.id+'" '+
                                'data-dunning-group-name="'+dunningGroupName+'" '+
                                'data-dunning-group-status="'+statusDisplay+'" '+
                                
                                '>Show Criteria</button>',
                    remark: version.remark,
                    
                };
                data.push(tmp);
            }
            else {
        
                let tmp = {
                        id: dg.id,
                        dunn_group_name: dunningGroupName,
                        version: version.version ?? "1",
                        status: statusDisplay,
                        priority: dunningGroupPriority ?? "0",
                        criteria: '<button class="btn btn-primary show-criteria" data-dunning-group-id="0">Show Criteria</button>',
                        remark: version.remark,
                        
                    };
                    console.log(tmp);
                    data.push(tmp);
            }
        });
    }

    console.log("version data:" );
    console.log(data);

    if (versionTable) {
        versionTable.destroy();
        versionTable = null;
        const tableBody = document.querySelector(`#dunning-group-version-table tbody`);
        if (tableBody) tableBody.innerHTML = "";
    }

    // Create new DataTable
    versionTable = new DataTable("#dunning-group-version-table", {
        data: data,
        columns: columnsConfig["dunning_group_version_setup"],
        searching: false,
        stateSave: true
    });


}

export async function loadCampaignListTable(isEdit) {

    let campaignTable = null;
    let data = null;

    let tableName = "";
    let columnConfg = "";

    if ( isEdit ) {
        data = await getCampaignListSetup();
        tableName = "campaign-list-setup-table";
        columnConfg = "campaign_list_setup";


    }
    else {

        tableName = "campaign-list-table";
        data = await getCampaignList();
        columnConfg = "campaign_list";

    }
    
    if (campaignTable) {
        campaignTable.destroy();
        document.querySelector("#" + tableName + " tbody").innerHTML = "";
        // document.querySelector("#user-management-table-header").innerHTML = "";
    }

    // Create new DataTable
    campaignTable = new DataTable("#" + tableName, {
        data: data,
        columns: columnsConfig[columnConfg],
        searching: false,
        stateSave: true
    });
}






// export async function loadCampaignListSetupTable() {
//     const data = await getCampaignListSetup();
//     if (campaignSetupTable) {
//         campaignSetupTable.destroy();
//         document.querySelector("#campaign-list-setup-table tbody").innerHTML = "";
//         // document.querySelector("#user-management-table-header").innerHTML = "";
//     }

//     // Create new DataTable
//     campaignSetupTable = new DataTable("#campaign-list-setup-table", {
//         data: data,
//         columns: columnsConfig["campaign_list_setup"],
//         searching: false,
//     });
// }
