// Page603
import * as bootstrap from 'bootstrap';
// import { renderLoginUserTable } from './components/functions.js';
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';
import { renderLoginUserTable } from "../dcaTabs/components/functions.js";


export async function renderLoginUserManagementTab() {

    const url = `${API_BASE}/dcaUserManage.php?endpoint=list_dca_user`;
    const result = await fetchAPI(url);
    let userOptions = "";
    
    if (result.success == true ) {
        const response = JSON.parse(result.response);
            const userList = response.user_list;

            userList.forEach(el => {
                userOptions += `<option value="${el.attachment_id}">[${el.attachment_id}]${el.user_name}</option>`;
            });
        
    }
    else {
        userOptions += `<option value="">Fail to retrieve User. Please reload the page 2</option>`;
    }


    const listDcaProfileUrl = `${API_BASE}/dunningGroup.php?endpoint=list_dca_profile`;
    const listDcaProfileResult = await fetchAPI(listDcaProfileUrl);

    
    let dcaProfileOption = "";

    if (listDcaProfileResult.success == true ) {
        const listDcaProfileResponse = JSON.parse(listDcaProfileResult.response);

        console.log("listDcaProfileResponse");
        console.log(listDcaProfileResponse);

        listDcaProfileResponse.forEach(el =>  {
            dcaProfileOption += `<option value="${el.dca_id}" data-dca-code="${el.dca_code}">${el.dca_code}</option>`;
        });
        
        
    }
    else {
        dcaProfileOption += `<option value="">Fail to retrieve DCA Profile. Please reload the page 1/option>`;
    }
    

    
    const html = `
        <div class="tab-pane fade" id="login-user-management-tab" role="tabpanel" aria-labelledby="login-user-management-tab">
            <div class="card" id="login-user-management-container">
                <div class="card-header">
                    <h1>Login User Management</h1>
                    <button class="btn btn-primary" id="btn-add-dca-login-user">Add New User</button>
                </div>
                <div class="card-body">
                    <table id="dca-login-user-table"></table>
                </div>
            </div>

            <div class="modal fade" id="dcaLoginUserModal" tabindex="-1" role="dialog" aria-labelledby="confirmChangeStatus" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="loginUserModalTItle">Add New User</h5>
                            
                        </div>
                        <div class="modal-body" id="confirmChangeStatusModalBody">
                            <form id="dca-login-user-form">
                                <input type="hidden" id="dca-login-user-form-action" name="dca-login-user-form-action" value="add" />
                                <input type="hidden" id="dca-login-user-attachment-id" name="attachment_id" value="" />
                                <div class="field-group mb-2">
                                    <label>Name</label>
                                    <select class="form-selec-sm" name="user_id" id="dca-login-user-name">
                                        ${userOptions}
                                    </select>
                                    
                                    <div id="dca-login-user-name-text" class="d-none"></div>
                                </div>
                                <div class="field-group mb-2">
                                    <label>DCA Code</label>
                                    <select class="form-selec-sm" name="dca_id" id="dca-login-user-dca-id">
                                        ${dcaProfileOption}
                                    </select>
                                </div>
                                <div id="error-message-dca-login-user-form" class="error-message"></div>
                                <div class="field-group">
                                    <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-primary" id="btn-confirm-dca-login-user" >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>`;

    setTimeout(async function(){
        // await renderLoginUserTable();

        const dcaLoginUserModal = document.getElementById('dcaLoginUserModal');
        var dcaLoginUserModalBoostrap = new bootstrap.Modal(dcaLoginUserModal);

        const btnAddDcaLoginUser = document.getElementById('btn-add-dca-login-user');
        btnAddDcaLoginUser.addEventListener('click', async(e) => {


                document.getElementById('error-message-dca-login-user-form').innerHTML = "";
                document.getElementById('loginUserModalTItle').innerHTML = "Add New User";
                document.getElementById('dca-login-user-form-action').value = "add";

                document.getElementById('dca-login-user-name-text').classList.add("d-none");
                document.getElementById('dca-login-user-name').classList.remove("d-none");
                
                document.getElementById('dca-login-user-name').value="";
                document.getElementById('dca-login-user-name').value="";
                document.getElementById('dca-login-user-dca-id').value="";
                dcaLoginUserModalBoostrap.show();
        });

        const dcaLoginUserTable = document.getElementById('dca-login-user-table');
        dcaLoginUserTable.addEventListener('click', async (e) => {
            const btn = e.target.closest('.btn-edit-dca-login-user');
            if (btn) {

                document.getElementById('error-message-dca-login-user-form').innerHTML = "";
                document.getElementById('loginUserModalTItle').innerHTML = "Edit New User";
                document.getElementById('dca-login-user-form-action').value = "edit";
                document.getElementById('dca-login-user-attachment-id').value= btn.dataset.id;

                document.getElementById('dca-login-user-name-text').classList.remove("d-none");
                document.getElementById('dca-login-user-name-text').innerHTML= btn.dataset.userName;
                
                
                document.getElementById('dca-login-user-name').classList.add("d-none");

                const dcaDropDown  = document.getElementById('dca-login-user-dca-id');
                const targetOption = dcaDropDown .querySelector('option[data-dca-code="'+ btn.dataset.dcaCode+'"]');
                dcaDropDown.value = targetOption.value; 

                dcaLoginUserModalBoostrap.show();
            }
        });

        const dcaLoginUserForm = document.getElementById('dca-login-user-form');
        dcaLoginUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const action = document.getElementById('dca-login-user-form-action').value;
            const formData = new FormData(e.target);
            let data = Object.fromEntries(formData.entries());
            let result
            if (action == "add") {
                const url = `${API_BASE}/dcaUserManage.php?endpoint=add_dca_user`;
                result = await fetchAPI(url, data);
            }
            else {
                const url = `${API_BASE}/dcaUserManage.php?endpoint=edit_dca_user`;
                result = await fetchAPI(url, data);
            }

            if (result.success == true ) {
                const response = JSON.parse(result.response);
                if (response.error_code == 0) {
                    document.getElementById('error-message-dca-login-user-form').innerHTML = `DCA login user ${action}ed successfully`;
                    await renderLoginUserTable();
                }
                else {
                    document.getElementById('error-message-dca-login-user-form').innerHTML = `DCA login user ${action}ed unsuccessfully - ${response.error_description}`;
                }
            }
            else {
                document.getElementById('error-message-dca-login-user-form').innerHTML = `DCA login user ${action}ed unsuccessfully - server error`;
            }
        });


        
    }, 500)

    return html;
}