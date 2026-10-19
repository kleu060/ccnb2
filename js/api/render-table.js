import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";

export function renderTable(tableId, columns, data, pagination = true) {
    const selector = "#" + tableId;

    // 1. Check if a DataTable instance already exists on this element
    if (DataTable.isDataTable(selector)) {
        // 2. Retrieve the existing instance and completely destroy it
        const existingTable = new DataTable.Api(selector);
        existingTable.destroy();
        
        // 3. Manually clear out the HTML to avoid ghost rows/headers
        const tableEl = document.querySelector(selector);
        if (tableEl) {
            const tbody = tableEl.querySelector("tbody");
            if (tbody) tbody.innerHTML = "";
        }
    }

    // 4. It is now perfectly safe to initialise a clean new instance
    const dataTable = new DataTable(selector, {
        data: data,
        columns: columns,
        searching: false,
        stateSave: true,
        paging: pagination,
        order: [],
    });

    return dataTable;
}