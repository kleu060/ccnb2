import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';

import { mockData } from "./mockData.js";



const columnsConfig = {
    accountListData: [
        { title: "Action", data: "action" },
        { title: "ID", data: "id" },
        { title: "Campaign Name", data: "campaign_name" },
        { title: "Dunning Group", data: "dunning_group" },
        { title: "Type", data: "type" },
        { title: "Overdue Days", data: "overdue_days" },
        { title: "Validity", data: "validity" },
        { title: "Status", data: "status" },
        { title: "Display Name", data: "display_name" },
        { title: "Call Group", data: "call_group" },
        { title: "Remark", data: "remark" },
    ],
};


export async function getCampaignSetupData() {
    await new Promise(resolve => setTimeout(resolve, 200)); // simulate API
    return mockData["campaignSetupData"] || [];
}

let campaignSetupTable = null;
export async function renderCampaignSetupTable() {
    const data = await getCampaignSetupData();

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