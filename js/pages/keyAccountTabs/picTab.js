import * as bootstrap from 'bootstrap'; // Add this at the top

import { renderPicTable }  from './functions/functions.js';
import { renderPicModal }  from './components/picModal.js';
export async function renderPicTab() {

    const html = `
        <div class="tab-pane fade" id="pic-tab" role="tabpanel" aria-labelledby="pic-tab">
            <div class="container-fluid">
                <h1>PIC</h1>
                <div class="row mb-2">
                    <div class="col-12 mb-2">
                        
                        <div class="me-2">
                            <label class="me-2">Credit Account Manager</label>
                            <button type="button" id="btn-pic-add-new" class="btn btn-primary">Add New</button>
                        </div>                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                
                                <div id="pic-table-container">
                                    <table id="pic-table">
                                        <thead >
                                            <tr id="pic-header"></tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ` + await renderPicModal()+ `
        </div>
    `;



    setTimeout(async function(){
        await renderPicTable();

        const picModalElement = document.getElementById("pic-modal");
        const picModal = new bootstrap.Modal(picModalElement);

        const btnPicAddNew = document.getElementById('btn-pic-add-new');
        btnPicAddNew.addEventListener("click", async(e) => {
            document.getElementById('pic-modal-title').innerHTML = "Add";
            document.getElementById('pic-form-action').value = "add";

            picModal.show();
        });

        const picTable = document.getElementById('pic-table');
        picTable.addEventListener("click", async(e) => {
            const editPidBtn = e.target.closest('.btn-edit-pic');
            if (editPidBtn) {
                document.getElementById('pic-modal-title').innerHTML = "Edit";
                document.getElementById('pic-form-action').value = "edit";

                picModal.show();
            }
        });
    }, 500);

    return html;
}
