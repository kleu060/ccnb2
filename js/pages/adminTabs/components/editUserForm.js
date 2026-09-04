import {  getGroups  } from "../functions/functions.js";
import { API_BASE } from '../../../config.js';
import { PAGES } from '../../../variables.js';
import { fetchAPI } from '../../../api/fetch-api.js';

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

    return `
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
                        <label for="online">Online</label>
                        <div x-text="user.online"></div>                        
                        <button type="button" class="btn btn-primary">Force Logout</button>
                    
                    </div>
                    <div class="mb-3 d-flex gap-3" id='edit-form-first-login'>
                        <label>First Login</label>
                        <div x-text="user.first_login"></div>
                    </div>
                    <div class="mb-3 d-flex gap-3" id='edit-form-lock-user'>
                        <label>Locked</label>
                        <div x-text="user.locked"></div>
                        <button type="button" class="btn btn-primary">Lock User</button>
                    </div>

                    <div id="edit-form-error-message" class="mb-3 error-message">
                    </div>
                    
                    <button id="btn-edit-user-cancel" type="button" class="btn btn-secondary btn-edit-user-cancel">Back</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    `;
}
