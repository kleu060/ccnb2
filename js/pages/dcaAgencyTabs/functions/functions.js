import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../../js/api/fetch-api.js';

const columnsConfig = {
    campaignTable: [
        { title: "Action", data: "action"},
        { title: "ID", data: "id"},
        { title: "Date", data: "date"},
        { title: "Record Count", data: "record_count"},

    ],
};

const mockData = {
    campaignTableData: [
        {
            action: '<button class="btn btn-primary btn-dca-agency-download">Download</button>',
            id: '103211',
            date: '20260501',
            record_count: '321',
        },
        {
            action: '<button class="btn btn-primary btn-dca-agency-download">Download</button>',
            id: '103212',
            date: '20260502',
            record_count: '355',
        },
        {
            action: '<button class="btn btn-primary btn-dca-agency-download">Download</button>',
            id: '103213',
            date: '20260504',
            record_count: '450',
        },
        {
            action: '<button class="btn btn-primary btn-dca-agency-download">Download</button>',
            id: '103214',
            date: '20260505',
            record_count: '482',
        },
        {
            action: '<button class="btn btn-primary btn-dca-agency-download">Download</button>',
            id: '103215',
            date: '20260505',
            record_count: '102',
        },
    ], 
};


async function getCampaignData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["campaignTableData"] || [];
}

let campaignTable = null;
export async function loadCampaignTable() {
    const data = await getCampaignData();

    if (campaignTable) {
        campaignTable.destroy();
        // document.querySelector("#commission-agent-table tbody").innerHTML = "";
        // document.querySelector("#user-management-table-header").innerHTML = "";
    }

    campaignTable = new DataTable("#dca-agency-campaign-table", {
        data: data,
        columns: columnsConfig["campaignTable"],
        searching: false,
        stateSave: true,
        order: [] // FIXED: Disables the initial default sort

    });
}
