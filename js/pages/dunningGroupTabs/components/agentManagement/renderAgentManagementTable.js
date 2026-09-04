import { loadAgentManagementTable } from "../../functions/functions.js";

export async function renderAgentManagementTable() {

    let tableName = "agent-management-table";
    const html =  `

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
            loadAgentManagementTable();
        }, 500);
    
        return html;
}
