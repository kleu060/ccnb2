import { loadDcaCommissionManageTable } from "./functions/functions.js";

export async function renderDcaManageCommissionTab() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed (0-11)
    let yearOptions = '';

    // Loop from 2000 to the current year
    for (let year = 2000; year <= currentYear; year++) {
        // Option: Select the current year by default, or change to a specific year if needed
        const isSelected = year === currentYear ? 'selected' : '';
        yearOptions += `<option value="${year}" ${isSelected}>${year}</option>`;
    }

    // Generate Month Options (January to December)
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    const monthOptions = monthNames.map((monthName, index) => {
        const monthValue = index + 1; // 1-12
        const isSelected = monthValue === currentMonth ? 'selected' : '';
        return `<option value="${monthValue}" ${isSelected}>${monthName}</option>`;
    }).join('');


    const html = `
        <section class="tab-pane fade show active"  role="tabpanel" aria-labelledby="dca-commission-manage-tab" id="dca-commission-manage-tab" >

            <h1>DCA Commission</h1>
            <div class="card mb-2">
                <div class="card-body">
                    <form id="commission-manage-search-form">
                        <div class="form-group">
                            <label class="col-1">Select Year</label>
                            <select name="sel-year" id='sel-year'>
                                ${yearOptions}
                            </select>  
                        </div>
                        <div class="form-group">
                            <label class="col-1" for="sel-month">Select Month</label>
                            <select name="sel-month" id="sel-month">
                                ${monthOptions}
                            </select>  
                            <button id="btn-submit-commission-manage-search-form" class="btn btn-primary">Submit</button>

                        </div>
                    </form>
                </div>
            </div>

            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <table id="dca-commission-table">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    setTimeout(async function(){
        const commissionManageSearchForm = document.getElementById('commission-manage-search-form');
        commissionManageSearchForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            const year = document.getElementById('sel-year').value;
            const month = document.getElementById('sel-month').value;
            await loadDcaCommissionManageTable(year, month);

        })
    }, 500);
    return html;
}
