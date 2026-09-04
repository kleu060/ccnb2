import { renderDispatchTab } from "./nodTabs/dispatchTab.js";
import { renderProfileTab } from "./nodTabs/profileTab.js";


export async function NodMain() {
    const allowedPages = window.allowed_pages;
    const hasNodAccess = allowedPages.includes('6003');   

    const dispatchHtml = hasNodAccess ? await renderDispatchTab() : '';
    const profileHtml = hasNodAccess ? await renderProfileTab() : '';

    const html =  `
        <section class="container-fluid nod-section">
            <div class="row">
                <div class="col">
                    <h1>NOD</h1>
                    <ul class="nav nav-tabs" id="nodTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="btn-dispatch-tab" data-bs-toggle="tab" data-bs-target="#dispatch-tab" type="button" role="tab" aria-controls="dispatch-tab" aria-selected="true">Dispatch</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="btn-nod-profile-tab" data-bs-toggle="tab" data-bs-target="#nod-profile-tab" type="button" role="tab" aria-controls="nod-profile-tab" aria-selected="true">NOD Profile</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tab Content Containers -->
            <div class="tab-content" id="nodTabContent">
                ${dispatchHtml}
                ${profileHtml}
            </div>
        </section>

        
    `;

    

    return html;
}