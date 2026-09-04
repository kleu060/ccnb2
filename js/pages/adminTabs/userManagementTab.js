import { logEvent } from '../../logEvent.js';
import { loadUserTable, loadUser, getGroups  } from "./functions/functions.js";
import { renderEditUserForm } from "./components/editUserForm.js";
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderUserManagementTab() {

    const html =  `
        <div class="tab-pane fade show active" id="user-level-tab" role="tabpanel" aria-labelledby="user-level-tab">
            <section id="user-management-section">
                <div class="row">
                    <div class="col-12">
                        <div class="d-flex gap-3">
                            <h1>User Management</h1>
                            <button class="btn btn-primary" id="btn-create-user">Add New User</button>
                        </div>
                        <table id="user-management-table">
                            <thead></thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section id="user-management-edit-form" class="d-none">
                `+ await renderEditUserForm() + `
            </section>
        </div>`;

        setTimeout( async function(){
            const groupList = await getGroups();

            await loadUserTable(groupList);

            const btnCreateUser = document.getElementById('btn-create-user');
            const userManagementSection = document.getElementById('user-management-section');
            const userManagementEditFormSection = document.getElementById('user-management-edit-form');
            const userFormAction = document.getElementById('user-form-action');
            const userIdInput = document.getElementById('user_id');
            const userNameInput = document.getElementById('user_name');

            const editUserForm = document.getElementById('edit-user-form');
            const editUserFormPassword = document.getElementById('edit-user-form-password');
            const editFormForceLogout = document.getElementById('edit-form-force-logout');
            const editFormFirstLogin = document.getElementById('edit-form-first-login');
            const editFormLockUser = document.getElementById('edit-form-lock-user');

            const editFormErrorMessage = document.getElementById('edit-form-error-message');

            userManagementEditFormSection.addEventListener('submit', async(e) => {
                e.preventDefault();
                editFormErrorMessage.innerHTML = "";

                const formData = new FormData(editUserForm);
                const body = Object.fromEntries(formData.entries());
                
                let url, successMessage, errorMessage;
                const currentAction = body.action; 
                if ( currentAction == "create" ) {
                    url = `${API_BASE}/user.php?endpoint=add_user`;
                    successMessage = "User successfully created.";
                    errorMessage = "User fail to create.";

                    
                }
                else {
                    url = `${API_BASE}/user.php?endpoint=edit_user`;
                    successMessage = "User successfully updated.";
                    errorMessage = "User fail to update.";
                }

                const response = await fetchAPI(url, body);
                console.log(response.response);


                if ( response.success  ) {
                    const result = JSON.parse(response.response);
                    if ( result.error_code == 0) {
                        editFormErrorMessage.innerHTML = successMessage;
                    }
                    else {
                        editFormErrorMessage.innerHTML = errorMessage + response.response.error_description + "(" + response.response.error_code+ ")";
                    }
                }
                else {
                    // const result = JSON.parse(response.response);
                    editFormErrorMessage.innerHTML = "User fail to create.  "  + response.response.error_description + "(" + response.response.error_code+ ")";;
                }
            })

            btnCreateUser.addEventListener('click', (e) => {
                userFormAction.value="create";
                
                editFormErrorMessage.innerHTML = "";
                userIdInput.value = "";
                userNameInput.readOnly = false;
                editFormForceLogout.classList.add("d-none");
                editFormFirstLogin.classList.add("d-none");
                editFormLockUser.classList.add("d-none");
                // editUserFormPassword.classList.remove("d-none");
                editUserFormPassword.value = "";
                
                clearUserData();

                userManagementSection.classList.add("d-none");
                userManagementEditFormSection.classList.remove("d-none");
                
            });

            const tableContainer = document.getElementById('user-management-table');
            if (tableContainer) {
                tableContainer.addEventListener('click', async (e) => {
                
                    const btn = e.target.closest('.btn-edit-user');
                    if (btn) {
                        const userId = btn.getAttribute('data-user-id');

                        editFormErrorMessage.innerHTML = "";
                        userFormAction.value="edit";
                        userIdInput.value = userId;
                        userNameInput.readOnly = true;
                        editFormForceLogout.classList.remove("d-none");
                        editFormFirstLogin.classList.remove("d-none");
                        editFormLockUser.classList.remove("d-none");
                        // editUserFormPassword.classList.add("d-none");
                        editUserFormPassword.value = "";
                        
                        userManagementSection.classList.add("d-none");
                        userManagementEditFormSection.classList.remove("d-none");
                        userFormAction.value="edit";
                        clearUserData();

                        const user = await loadUser(userId);

                        updateUserData(user);
                    }
                });
            }

            const backButton = document.querySelectorAll('.btn-edit-user-cancel');
            backButton.forEach(button => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    userManagementSection.classList.remove("d-none");
                    userManagementEditFormSection.classList.add("d-none");
                    
                    clearUserData();
                    await loadUserTable(groupList);
                });
            });

        }, 500);

        

        function clearUserData() {
            window.dispatchEvent(new CustomEvent('update-user', {
                detail: {
                    login_name: "",
                    full_name: "",
                    department: "",
                    phone: "",
                    email: "",
                    remark: "",
                    online: "",
                    first_login: "",
                    locked: "",
                }
            }));
        }

        function updateUserData(user) {
            window.dispatchEvent(new CustomEvent('update-user', {
                detail: {
                    user_name: user.user_name,
                    full_name: user.full_name,
                    department: user.department,
                    phone: user.phone,
                    email: user.email,
                    remark: user.remark,
                    group_id: user.group_id,
                    online: user.online,
                    last_login_time: user.last_login_time,
                    first_login: user.firstLogin,
                    locked: user.locked,
                }
            }));
        }


    return html;
}
