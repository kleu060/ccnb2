import * as bootstrap from 'bootstrap'; // Add this at the top
import { loadDcaCommissionManageTable , loadDcaCommissionSetupTable, loadEditComissionTable} from "./dcaCommissionTabs/functions/functions.js";
import { renderEditCommissionModal } from './dcaCommissionTabs/editComissionnModal.js';
import { renderDcaManageCommissionTab } from './dcaCommissionTabs/dcaCommissionManageTab.js';
import { renderDcaCommissionSetupTab } from './dcaCommissionTabs/dcaCommissionSetupTab.js';

export async function DcaCommission() {

    // Render all tabs
    const dcaManageCommissionHtml = await renderDcaManageCommissionTab();
    const dcaCommissionSetupHtml = await renderDcaCommissionSetupTab();

    

    const html = `
        <section class="container-fluid" id="dca-commission-main-section">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">

                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-dca-commission-manage-tab" data-bs-toggle="tab" data-bs-target="#dca-commission-manage-tab" type="button" role="tab" aria-controls="dca-dca-commission-manage-tab" aria-selected="true">Manage</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-dca-commission-setup-tab" data-bs-toggle="tab" data-bs-target="#dca-commission-setup-tab" type="button" role="tab" aria-controls="dca-dca-commission-setup-tab" aria-selected="false">Commission Setup</button>
                        </li>

                    </ul>
                </div>
            </div>

            <div class="tab-content" id="dcaCommissionTabContent">
                ${dcaManageCommissionHtml}
                ${dcaCommissionSetupHtml}

            </div>
        </section>

        
    `;
    setTimeout(async function(){
       
    }, 500);
    return html;
}