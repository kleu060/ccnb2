// main.js or account-code-search.js
import { renderUserManagementTab } from "./adminTabs/userManagementTab.js";
import { renderAccessSettingTab } from "./adminTabs/accessSettingTab.js";
import * as bootstrap from 'bootstrap';




export async function AdminMain() {

    // Render all tabs
    const userManagementHtml = await renderUserManagementTab();
    const accessSettingHtml = await renderAccessSettingTab();

    const html =  `
        <section class="container-fluid admin-section">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="adminTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-user-level-tab" data-bs-toggle="tab" data-bs-target="#user-level-tab" type="button" role="tab" aria-controls="user-level-tab" aria-selected="true">User Management</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-access-setting-tab" data-bs-toggle="tab" data-bs-target="#access-setting-tab" type="button" role="tab" aria-controls="access-setting-tab" aria-selected="false">Access Setting</button>
                        </li>

                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AdminTabContent">
                ${userManagementHtml}
                ${accessSettingHtml}
            </div>
        </section>
    `;
    setTimeout(function () {
        var triggerTabList = [].slice.call(document.querySelectorAll('#adminTab button'))
        triggerTabList.forEach(function (triggerEl) {
            var tabTrigger = new bootstrap.Tab(triggerEl)

            triggerEl.addEventListener('click', function (event) {
                event.preventDefault();
                console.log("tab click");

                const userManagementSection = document.getElementById('user-management-section');
                const userManagementEditFormSection = document.getElementById('user-management-edit-form');

                userManagementSection.classList.remove("d-none");
                userManagementEditFormSection.classList.add("d-none");

                tabTrigger.show();
            })
        })
    }, 500 );

    return html;
}
