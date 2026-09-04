import * as bootstrap from 'bootstrap'; // Add this at the top

import { renderDistributionProfileTable }  from './functions/functions.js';

import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';


import { renderEditDistributionProfileModal } from './components/updateDistributionProfileModal.js'

export async function renderbrnProfileTab() {
    const html =  `
        <div class="tab-pane fade" id="brn-profile-tab" role="tabpanel" aria-labelledby="brn-profile-tab">
            <div class="container-fluid">
                <h1>BRN Profile</h1>
                <div class="row mb-2">
                    <div class="col-12 mb-2">
                        <form id="brn-profile-form" class="d-flex align-items-end">
                            <div class="me-2">
                                <label>Enter BRN:</label>
                                <input type="text" name="brn" id="brn" value=""></input>
                            </div>
                            <div>
                                <button type="submit" id="btn-brn-profile-form-submit" class="btn btn-primary">View</button>
                            </div>
                        </form>
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary">Add New BRN</button>
                        <button class="btn btn-primary">Export BRN List</button>
                        <button class="btn btn-primary">Export Distribution Profile</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card ">
                            <div class="card-body">

                                <div id="add-brn-container" class="col-6">
                                    <div class="mb-1 field-group">
                                        <label>BRN</label>
                                        <input type="text"/>
                                    </div>
                                    <div class="mb-1 field-group">
                                        <label>Company Name</label>
                                        <input type="text"/>
                                    </div>
                                    <div class="mb-1 field-group">
                                        <label>Credit Account Mgr</label>
                                        <input type="text"/>
                                    </div>
                                    <div>
                                        <button id="btn-add-brn-profile">Add</button>
                                    </div>
                                </div>
                                
                                <div id="update-brn-profile-container" class="col-6 d-none">
                                    
                                    <div class="mb-1 field-group">
                                        <label>Credit Account Mgr</label>
                                        <select name="credit-account-mgr">
                                            <option>Azhariah Adnan</option>
                                            <option>Azhariah Adnan</option>
                                            <option>Azhariah Adnan</option>
                                        </select>
                                    </div>

                                    <div class="mb-1 field-group">
                                        <label>CAM Email</label>
                                        <input type="text"/>
                                    </div>

                                    <div class="mb-1 field-group">
                                        <label>CAM Phone</label>
                                        <input type="text"/>
                                    </div>

                                    <div class="mb-1 field-group">
                                        <label>Updated By</label>
                                        <input type="text"/>
                                    </div>

                                    <div class="mb-1 field-group">
                                        <label>Updated Date</label>
                                        <input type="text"/>
                                    </div>

                                    <div>
                                        <button id="btn-update-brn-profile">Update</button>
                                    </div>
                                </div>

                                <div id="distribution-profile-container" class="d-none">
                                    <h3>Distribution Profile</h3>
                                    <table id="distribution-profile-table">

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `+ await renderEditDistributionProfileModal() + `
        </div>
        
        `;

        setTimeout(async function(){

            const btnAddBrnProfile  = document.getElementById('btn-add-brn-profile');
            btnAddBrnProfile.addEventListener("click", async function(){

                const updateBrnProfileContainer = document.getElementById('update-brn-profile-container');
                const distributionProfileContainer = document.getElementById('distribution-profile-container');

                updateBrnProfileContainer.classList.remove("d-none");
                distributionProfileContainer.classList.remove("d-none");
                await renderDistributionProfileTable();
            });

            const distributionProfileTable = document.getElementById('distribution-profile-table');
            

            if (distributionProfileTable) {
                distributionProfileTable.addEventListener('click', async(e) => {

                    console.log("distributionProfileTable click " + e.target.classList.value);
                    const showCriteriaBtn = e.target.closest('.btn-edit-distribution-profile');
                    if (showCriteriaBtn) {
                        const modalElement = document.getElementById("edit-distribution-profile-modal");
                        const editDistributionProfileModal = new bootstrap.Modal(modalElement);

                        console.log("btn-edit-distribution-profile click");
                        editDistributionProfileModal.show();
                    }

                });
            }
        }, 500);

    return html;

}