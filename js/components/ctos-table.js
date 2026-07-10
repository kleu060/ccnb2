import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
// import { mockBlacklistInquiryData } from "./mockData.js";
import { API_BASE } from '../config.js';
import { logEvent } from '../logEvent.js';
import { fetchAPI } from '../api/fetch-api.js';

// Keep reference to your DataTable
let table = null;

// Define column configs for each type
const columnsConfig = {
    data: [
        { title: "Customer Name", data: "cust_name" },
        { title: "ID Type", data: "id_type" },
        { title: "ID Number", data: "id_num" },
        { title: "Account Code", data: "acc_code" },

        {
            title: "Acct Blacklist",
            data: "bl_status",
            render: (data) => data == 1 ? "Yes" : "No"
        },

        { title: "Status Date", data: "bl_status_date" },

        {
            title: "ETR Blacklist",
            data: "etr_bl",
            render: (data) => data == 1 ? "Yes" : "No"
        },

        { title: "Acct ID", data: "acc_id" },
        { title: "Overdue Amount", data: "overdue_amt" },

        {
            title: "Action",
            data: null,
            orderable: false,
            searchable: false,
            render: function (data, type, row) {

                return `
                    <button
                        class="btn-account-blacklist-print btn btn-primary mb-1"
                        data-customer-name="${row.cust_name}"
                        data-id-type="${row.id_type}"
                        data-id-number="${row.id_num}"
                        data-acct-blacklist="${row.bl_status}"
                        data-acct-id="${row.acc_id}"
                        data-status-date="${row.bl_status_date}"
                    >
                        Print
                    </button>

                    <button
                        class="btn-ctos-deblacklist btn btn-primary ms-1 mb-1"
                        data-account-code="${row.acc_code}"
                    >
                        Deblacklist
                    </button>
                `;
            }
        }
    ]
};

// Mock API fetch for demonstration
export async function fetchData(searchType, searchString, idType) {
    const body = {
        searchType,
        searchString,
        idType
    };

    const url = `${API_BASE}/index.php?endpoint=blacklist_search`;
    const responseJson = await fetchAPI(url, body);

    return responseJson;
}


// Initialize or rebuild DataTable
export async function loadCtosTable(fetchDataJson) {

    let errorMsg = "No record found";
    let data = [];
    if ( !fetchDataJson.success) {
        errorMsg = fetchDataJson.error_description
    }
    else {

        // const idBlacklist = JSON.parse(dataJsonString.id_blacklist);
        // const blacklist = JSON.parse(dataJsonString.blacklist);

        let parsed = JSON.parse(fetchDataJson.response);
        console.log(parsed.blacklist);

        // const { id_blacklist = [], blacklist = [] } = parsed;
        data = parsed.blacklist || [];
        // parsed.blacklist.forEach( function(bl) {
        //     let temp = {
        //         cust_name: bl.cust_name,
        //         id_type: bl.id_type,
        //         id_num: bl.id_num,
        //         acc_code: bl.acc_code,
        //         bl_status: bl.bl_status == 1 ? "Yes" : "No",
        //         status_date: bl.bl_status_date,
        //         etr_bl: bl.etr_bl == 1 ? "Yes" : "No",
        //         acct_id: bl.acc_id,
        //         overdue_amt: bl.overdue_amt,
        //         action: '<button class="btn-account-blacklist-print btn btn-primary mb-1" data-customer-name="' + bl.cust_name + '" \
        //         data-id-type="'+ bl.id_type+'" \
        //         data-id-number="'+ bl.id_num+'" \
        //         data-acct-blacklist="'+ bl.bl_status+'" \
        //         data-acct-id="'+ bl.acc_id+'" \
        //         data-status-date="'+ bl.bl_status_date+'"> \
        //             Print \
        //             </button> \
        //             <button class="btn-ctos-deblacklist btn btn-primary ms-1 mb-1" data-account-code="' + bl.acc_code + '">Deblacklist</button>'

        //     };

        //     data.push(temp);
        // });
    }

    // Destroy old table if exists
    if (table) {
        table.destroy();
        document.querySelector("#ctos-table tbody").innerHTML = "";
        document.querySelector("#ctos-table-header").innerHTML = "";
    }

    // Create new DataTable
    table = new DataTable("#ctos-table", {
        data: data,
        columns: columnsConfig["data"],
        searching: false,
        language: {
            emptyTable: errorMsg
        }
    });

}

// Load initial table
// loadTable(document.getElementById("choices").value);