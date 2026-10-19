import {  getGroups  } from "../functions/functions.js";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../api/fetch-api.js';
import { PAGES } from '../../../variables.js';

export async function renderEditUserForm() {

    const groupList = await getGroups();
    const groupOptions = Object.entries(groupList)
        .map(([key, value]) => {
            // Extract exact uppercase keys from your PHP payload array
            const groupId = value.ID;
            const groupName = value.NAME;

            // Capitalise the first letter and lower-case the rest for a cleaner label
            const formattedLabel = groupName.charAt(0).toUpperCase() + groupName.slice(1).toLowerCase();

            return `<option value="${groupId}">${formattedLabel}</option>`;
        })
        .join('');

    const html =  `
        <div class="row" x-data="{ user: {} }" x-ref="userRow" @update-user.window="user = $event.detail">
            <div class="col-12">
                <h1>Edit User</h1>
                <div><button id="btn-edit-user-back" type="button" class="btn btn-secondary btn-edit-user-cancel">Back</button></div>
                <form id="edit-user-form">
                    <input type="hidden" id="user-form-action" name="action" value="create" />
                    <input type="hidden" id="user_id" name="user_id" value="" />
                    <div class="mb-3">
                        <label for="user_name" class="form-label">Login Name</label>
                        <input type="text" class="form-control" id="user_name" name="user_name" x-model="user.user_name" required>
                    </div>
                    <div class="mb-3" id="edit-user-form-password">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password">
                    </div>
                    <div class="mb-3">
                        <label for="full-name" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="full_name" name="full_name" x-model="user.full_name" required>
                    </div>
                    <div class="mb-3">
                        <label for="department" class="form-label">Department</label>
                        <input type="text" class="form-control" id="department" name="department" x-model="user.department" required>
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="text" class="form-control" id="phone" name="phone" x-model="user.phone" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email" x-model="user.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="remark" class="form-label">Remark</label>
                        <textarea class="form-control" id="remark" name="remark" x-model="user.remark" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="group_id" class="form-label">Security Group</label>
                        <select id="group_id" name="group_id" x-model="user.group_id">
                            ${groupOptions}
                        </select>
                    </div>
                    <div class="mb-3 d-flex gap-3" id='edit-form-force-logout'>
                        <div>
                            <span x-show="user.online == 1" class="text-success fw-bold" id="online-status">Online</span>
                            <span x-show="user.online == 0" class="text-danger fw-bold" id="online-status">Offline</span>
                        </div>   
                        <div class="d-flex">                     
                            <button type="button" id="btn-force-logout" class="btn btn-primary me-2" :disabled="user.online == 0">Force Logout</button>
                            <div id="force-logout-message" class="error_message"></div>
                        </div>
                    </div>
                    <div class="mb-3 d-flex gap-3" id='edit-form-first-login'>
                        <label>First Login</label>
                        <div x-text="user.first_login"></div>
                    </div>
                    <div class="mb-3 d-flex gap-3" id='edit-form-lock-user'>
                        <div>
                            <span x-show="user.locked == 1" class="text-danger fw-bold" id="lock-status">Locked</span>
                            <span x-show="user.locked == 0" class="text-success fw-bold" id="lock-status">Not Locked</span>
                        </div>
                        
                        <!-- Dynamically switches text between 'Unlock User' and 'Lock User' -->
                        <div class="d-flex">  
                            <button type="button" 
                                    class="btn btn-primary me-2" 
                                    id="btn-lock-user"
                                    x-text="user.locked == 1 ? 'Unlock User' : 'Lock User'"
                                    :data-locked-id="user.locked">
                            </button>
                            <div id="lock-user-message" class="error_message"></div>
                        </div>
                    </div>

                    <div id="edit-form-error-message" class="mb-3 error-message">
                    </div>
                    
                    <button id="btn-edit-user-cancel" type="button" class="btn btn-secondary btn-edit-user-cancel">Back</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    `;

    setTimeout(function(){
        const btnForceLogout = document.getElementById('btn-force-logout');
        btnForceLogout.addEventListener('click', async(e) => {
            const userId = document.getElementById('user_id').value; 

            const body = {
                userId
            };
            try {
                const url = `${API_BASE}/user.php?endpoint=force_logout`;
                const result = await fetchAPI(url, body);
                if ( result.success == true ) {
                    const response = JSON.parse(result.response);
                    if (response.error_code == 0) {
                        document.getElementById('force-logout-message').innerHTML = "User is forced logout";
                        
                        document.getElementById('online-status').innerHTML = "Offline";
                        document.getElementById('online-status').classList.remove("text-success")
                        document.getElementById('online-status').classList.add("text-danger")
                    }
                    else {
                        document.getElementById('force-logout-message').innerHTML = "User forces logout failed - " + response.error_description;
                    }
                }
                else {
                    document.getElementById('force-logout-message').innerHTML = "User forces logout failed - server error";
                }
            }
            catch (error) {
                document.getElementById('force-logout-message').innerHTML = "User forces logout failed - " + error ;
            }
        });

        const btnLockUser = document.getElementById('btn-lock-user');
        btnLockUser.addEventListener("click", async(e) => {
            const userId = document.getElementById('user_id').value; 
            const currentLockStatus = btnLockUser.dataset.lockId;
            let lock = 0;
            let lockText = "Unlock";
            if ( currentLockStatus == 0 ){
                lock = 1;
                lockText = "lock";
            }

            const body = {
                userId,
                lock
            };
            try {
                const url = `${API_BASE}/user.php?endpoint=lock_user`;
                const result = await fetchAPI(url, body);
                if ( result.success == true ) {
                    const response = JSON.parse(result.response);
                    if (response.error_code == 0) {
                        document.getElementById('lock-user-message').innerHTML = `User is ${lockText}`;

                        btnLockUser.dataset.lockId = lock;
                        if ( lock == 0 ){
                            document.getElementById('lock-status').innerHTML = "Not Lock";
                            document.getElementById('lock-status').classList.add("text-success");
                            document.getElementById('lock-status').classList.remove("text-danger");
                        }
                        else {
                            document.getElementById('lock-status').innerHTML = "Lock";
                            document.getElementById('lock-status').classList.remove("text-success");
                            document.getElementById('lock-status').classList.add("text-danger");
                        }
                    }
                    else {
                        document.getElementById('lock-user-message').innerHTML = `${lockText} user failed - ` + response.error_description;
                    }
                }
                else {
                    document.getElementById('lock-user-message').innerHTML = `${lockText} user failed - server error`;
                }
            }
            catch(error) {
                document.getElementById('lock-logout-message').innerHTML = `${lockText} user failed - `+ error ;
            }
        })
    }, 1000);

    return html;
}
