import { loadCampaignListTable } from "../functions/functions.js";

export async function renderCampaignTable(isEdit = false) {

    let tableName = "campaign-list-table";
    if (isEdit) {
        tableName = "campaign-list-setup-table";
    }

    const html =  `

            <h1>Campaign List</h1>
            <div class="row">
                <div class="col-12">
                    <table id="${tableName}">
                        <thead></thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        `;
    
        setTimeout(function(){
            loadCampaignListTable(isEdit);
        }, 500);
    
        return html
}
