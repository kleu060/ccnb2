// main.js or account-code-search.js
import { renderUserLevelTab } from "./adminTabs/userLevelTab.js";
import { renderSettingTab } from "./adminTabs/settingTab.js";



export async function AdminMain() {

    // Render all tabs
    const userLevelHtml = await renderUserLevelTab();
    const settingHtml = await renderSettingTab();

    return `
        <section class="container-fluid admin-section">
            <!-- Tabs Navigation -->
            <div class="row mb-3">
                <div class="col">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-user-level-tab" data-bs-toggle="tab" data-bs-target="#user-level-tab" type="button" role="tab" aria-controls="user-level-tab" aria-selected="true">User Level</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-setting-tab" data-bs-toggle="tab" data-bs-target="#setting-tab" type="button" role="tab" aria-controls="setting-tab" aria-selected="false">Setting</button>
                        </li>

                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="AdminTabContent">
                ${userLevelHtml}
                ${settingHtml}
            </div>
        </section>
    `;
}
