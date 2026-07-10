import * as bootstrap from 'bootstrap'; // Add this at the top
import { loadDunningGroupTable } from "../functions/functions.js";

export async function renderDunningGroupTable(isEdit = false) {
    let tableName = "dunning-group-table";
    let criteriaId = "criteria-modal";
    let criteriaContainer = "criterias-container";
    if (isEdit) {
        tableName = "dunning-group-setup-table";
        criteriaId = "criteria-setup-modal";
        criteriaContainer = "criterias-setupcontainer";

    }

    const html = `
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
        loadDunningGroupTable(isEdit);

        const tableContainer = document.getElementById(tableName);
        // const setupTableContainer = document.getElementById('dunning-group-setup-table');


        function getCriteria() {
            const html = `
                    <tr class="">
                        <td>acct_status</td>
                        <td>=</td>
                        <td>2</td>
                    </tr>
                    <tr class="">
                        <td>ctc</td>
                        <td>include</td>
                        <td>10</td>
                    </tr>
                    <tr class="">
                        <td>device plan</td>
                        <td>=</td>
                        <td>1</td>
                    </tr>
            `;
            return html;
        }

        // if (tableContainer) {
        //     tableContainer.addEventListener('click', async (e) => {
            
        //         const btn = e.target.closest('.show-criteria');
        //         if (btn) {

        //             const criteriasContainer = document.getElementById(criteriaContainer);
        //             const html = getCriteria();

        //             criteriasContainer.innerHTML = html;
        //             const modalElement = document.getElementById(criteriaId);
        //             const criteriaModal = new bootstrap.Modal(modalElement);
        //             criteriaModal.show();
        //         }

        //     });
        // }

    }, 500);

    return html;
}
