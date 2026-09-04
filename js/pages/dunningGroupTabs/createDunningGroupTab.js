import { renderCreateDunningGroupForm } from "./components/createDunningGroupForm.js";

export async function renderCreateDunningTab(activeTab) {
    const html =  `
        <div class="tab-pane fade ${activeTab === 'create' ? 'show active' : ''}" id="create-dunning-group-tab" role="tabpanel" aria-labelledby="create-dunning-group-tab">
            <div class="container-fluid">
                <h1>Create Dunning Group</h1>
                <section id="dunning-group-create-form-section">
                    `+ await renderCreateDunningGroupForm() + `
                </section>
            </div>
        </div>
    `;

    return html;
}
