import { renderAccountListingTab } from "./keyAccountTabs/accountListingTab.js";
import { renderAccountHierarchyTab } from "./keyAccountTabs/accountHierarchyTab.js";
import { renderbrnProfileTab } from "./keyAccountTabs/brnProfileTab.js";
import { renderPicTab } from "./keyAccountTabs/picTab.js";

export async function KeyAccount() {

    const accountListHtml = await renderAccountListingTab();
    const accountHierarchyHtml = await renderAccountHierarchyTab();
    const brnProfileHtml = await renderbrnProfileTab();
    const picHtml = await renderPicTab();

    const html = `
            <section class="container-fluid key-account-section" id="key-account-section">
                <h1>Key Account</h1>

                <div class="row mb-3">
                    <div class="col">
                        <ul class="nav nav-tabs" id="key-account-tabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="btn-account-listing-tab" data-bs-toggle="tab" data-bs-target="#account-listing-tab" type="button" role="tab" aria-controls="dunning-group-tab" aria-selected="true">Account Listing</button>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="btn-account-hierarchy-tab" data-bs-toggle="tab" data-bs-target="#account-hierarchy-tab" type="button" role="tab" aria-controls="account-hierarchy-tab" aria-selected="true">Account Hierarchy</button>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="btn-brn-profile-tab" data-bs-toggle="tab" data-bs-target="#brn-profile-tab" type="button" role="tab" aria-controls="brn-profile-tab" aria-selected="true">BRN Profile</button>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="btn-pic-tab" data-bs-toggle="tab" data-bs-target="#pic-tab" type="button" role="tab" aria-controls="pic-tab" aria-selected="true">PIC</button>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="tab-content" id="AccountTabContent">
                    ${accountListHtml}
                    ${accountHierarchyHtml}
                    ${brnProfileHtml}
                    ${picHtml}
                </div>
            </section>
        `;

    return html;
}