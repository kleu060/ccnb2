import DataTable from "datatables.net-bs5";


export function calcuatePercenInputListener(tableElementSelector, inputClassName, inputColumn, percentColumn) {
    const tableEl = document.querySelector(tableElementSelector);
    if (!tableEl || tableEl.dataset.listenerAttached === "true") return;

    tableEl.addEventListener('input', function (e) {
        if (e.target && e.target.classList.contains(inputClassName)) {
            let input = e.target;
            let newValue = input.value || "0";
            let tr = input.closest('tr');
            
            let activeTable = new DataTable.Api(tableEl); 
            let row = activeTable.row(tr);
            let rowData = row.data();
            
            if (!rowData) {
                let currentIndex = Array.from(tableEl.querySelectorAll('tbody tr')).indexOf(tr);
                row = activeTable.row(currentIndex);
                rowData = row.data();
            }

            if (!rowData) return;
            
            // FIX: Save ONLY the clean raw value to the cache instead of an HTML input string
            rowData.weight = newValue; 
            
            // Invalidate the row cache without destroying focus
            // row.data(rowData).invalidate(); 
            
            recalculateEstimateCounts(inputColumn, percentColumn, tr.rowIndex, input.selectionStart, activeTable);
        }
    });
    
    tableEl.dataset.listenerAttached = "true"; 
}


// Helper calculation engine that handles weights and updates estimate counts
export function recalculateEstimateCounts(inputColumn, percentColumn, activeRowIndex, cursorPosition, table, inputClassName = 'input-weight') {
    console.log("recalculateEstimateCounts");
    let api = table;
    let totalWeight = 0;

    // Helper to extract numeric value whether it is a raw number or an input HTML string
    function getNumericWeight(cellData) {
        if (typeof cellData === 'string' && cellData.includes('<input')) {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = cellData;
            let input = tempDiv.querySelector('input');
            // Try input.value first (live user state) then fallback to value attribute
            let val = input ? parseFloat(input.value || input.getAttribute('value')) : 0;
            return isNaN(val) ? 0 : val;
        }
        // Fallback for raw numbers/strings during the initial render phase
        let rawVal = parseFloat(cellData);
        return isNaN(rawVal) ? 0 : rawVal;
    }

    // Step 1: Calculate aggregate weight total dynamically
    api.column(inputColumn).data().each(function (cellData) {
        totalWeight += getNumericWeight(cellData);
    });

    console.log("Total Weight:", totalWeight);

    // Step 2: Scale estimate counts and invalidate cache data rows
    api.rows().every(function (rowIndex) {
        let rowData = this.data();
        let weight = getNumericWeight(rowData.weight);
        
        let percentage = totalWeight > 0 ? ((weight / totalWeight) * 100).toFixed(0) + '%' : '0%';
        
        console.log(percentage);
        rowData.estimate_count = percentage;
        
        // Use invalidate() + data() to save without instantly clearing DOM cursor focus cycles
        // this.data(rowData).invalidate();
        api.cell(rowIndex, percentColumn).data(percentage);
    });

    // Step 3: Redraw table view display structures non-destructively 
    // table.draw(false);

    // Step 4: Re-target input DOM nodes to preserve cursor typing focus smoothly
    if (activeRowIndex !== undefined && activeRowIndex !== null) {
        // Targets rows safely inside tbody to avoid counting standard headers/footers
        let targetInput = document.querySelector(`#dca-dispatch-table tbody tr:nth-child(${activeRowIndex}) .${inputClassName}`);
        if (targetInput) {
            targetInput.focus();
            // Wrap in a micro-task loop to bypass rendering race conditions completely
            setTimeout(() => {
                targetInput.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
        }
    }
}