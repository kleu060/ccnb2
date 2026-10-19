// Page 803, Commission > Extra Commission
import * as bootstrap from 'bootstrap'; // Add this at the top
import { renderExtraEditCommissionModal } from './editExtraCommissionModal.js';
import { loadCommissionEditExtraComissionTable } from './functions/functions.js';

export async function renderExtraCommissionTab(activeTab) {
    const html =  `
        <div class="tab-pane fade ${activeTab === 'extra' ? 'show active' : ''}" id="extra-commission-tab" role="tabpanel" aria-labelledby="extra-commission-tab">
            <div class="container-fluid">
                <h1>Extra Commssion</h1>
                <section id="commission-setup-section">
                    

                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <h2>Extra Commission</h2>
                                    <table id="commission-extra-table">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </div>
            ` + await renderExtraEditCommissionModal() + `
        </div>
    `;

    setTimeout(async function(){

        const commissionExtraTable = document.getElementById('commission-extra-table');
        
        const editExtraCommissionModalElement = document.getElementById("edit-extra-commission-modal");
        const editExtraCommissionModal = new bootstrap.Modal(editExtraCommissionModalElement);

        commissionExtraTable.addEventListener("click", async(e) => {
            const btnEdit = e.target.closest('.btn-edit-extra-commission');

            if (btnEdit) {
                await loadCommissionEditExtraComissionTable();
                editExtraCommissionModal.show();
            }
        });

    }, 1000);

    return html;
}
