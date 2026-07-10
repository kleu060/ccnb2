import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';

// Define column configs for each type
const columnsConfig = {
    data: [
        { title: "ID Number", data: "id_num" },
        { title: "ID Type", data: "id_type" },
        { title: "reason", data: "reason" },
        { title: "sub reason", data: "subreason" }, 
        { title: "Updated Date", data: "updated_date" },
        { title: "Updated By", data: "updated_by" },
        {
            title: "Action",
            data: "action",
            defaultContent: '<button>Print</button>'
        }
        
    ],
    dataAdmin: [
        { title: "ID Number", data: "id_num" },
        { title: "ID Type", data: "id_type" },
        { title: "reason", data: "reason" },
        { title: "sub reason", data: "subreason" }, 
        { title: "Updated Date", data: "updated_date" },
        { title: "Updated By", data: "updated_by" },
        
        
    ],
};
let table = null;
let tableAdmim = null;

export async function fetcIdBlackListSearchData(idNum) {
    const body = {
        idNum
    };

    // console.log( JSON.stringify(body) );

    const url = `${API_BASE}/index.php?endpoint=id_blacklist_search`;
    const responseJson = await fetchAPI(url, body);
    
    return responseJson;
}
// internal-blacklist-table-fraud
export async function loadBlacklistFraudTable(fetchDataJson) {
    let errorMsg = "No record found";
    let data = [];
    if ( !fetchDataJson.success) {
        errorMsg = fetchDataJson.error_description
    }
    else {

        // const idBlacklist = JSON.parse(dataJsonString.id_blacklist);
        // const blacklist = JSON.parse(dataJsonString.blacklist);

        let parsed = JSON.parse(fetchDataJson.response);
        console.log(parsed);

        // const { id_blacklist = [], blacklist = [] } = parsed;

        parsed.forEach( function(bl) {
            
            let temp = {
                id_num: bl.id_num,
                id_type: bl.id_type,
                reason: bl.reason,
                subreason: bl.subreason,
                updated_date: bl.updated_date,
                updated_by: bl.updated_by,
                action: bl.reason == 2 ? 
                    '<button \
                        class="btn-internal-blacklist-fraud-deblacklist btn btn-primary ms-1 mb-1" \
                        data-id-type="' + bl.id_type + '" data-id-num="' + bl.id_num +'" \
                    > \
                        Deblacklist \
                    </button>' : ''
            };

            data.push(temp);
        });
    }

    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#internal-blacklist-table-fraud tbody").innerHTML = "";
        document.querySelector("#internal-blacklist-table-fraud thead").innerHTML = "";
    }
    
    console.log(data);
    // Create new DataTable
    table = new DataTable("#internal-blacklist-table-fraud", {
        data: data,
        columns: columnsConfig["data"],
        searching: false,
        language: {
            emptyTable: errorMsg
        }
    });
}

export async function loadBlacklistAdminTable(fetchDataJson) {
    let errorMsg = "No record found";
    let data = [];
    if ( !fetchDataJson.success) {
        errorMsg = fetchDataJson.error_description
    }
    else {

        // const idBlacklist = JSON.parse(dataJsonString.id_blacklist);
        // const blacklist = JSON.parse(dataJsonString.blacklist);

        let parsed = JSON.parse(fetchDataJson.response);
        console.log(parsed);

        // const { id_blacklist = [], blacklist = [] } = parsed;

        parsed.forEach( function(bl) {
            
            let temp = {
                id_num: bl.id_num,
                id_type: bl.id_type,
                reason: bl.reason,
                subreason: bl.subreason,
                updated_date: bl.updated_date,
                updated_by: bl.updated_by,
                
            };

            data.push(temp);
        });
    }

    // Destroy old table if exists
    if (tableAdmim) {
        tableAdmim.destroy();
        document.querySelector("#internal-blacklist-table-admin tbody").innerHTML = "";
        document.querySelector("#internal-blacklist-table-admin thead").innerHTML = "";
    }
    
    console.log(data);
    // Create new DataTable
    tableAdmim = new DataTable("#internal-blacklist-table-admin", {
        data: data,
        columns: columnsConfig["dataAdmin"],
        searching: false,
        language: {
            emptyTable: errorMsg
        }
    });
}