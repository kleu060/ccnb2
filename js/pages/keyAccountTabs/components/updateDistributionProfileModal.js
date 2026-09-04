
export async function renderEditDistributionProfileModal() {

    const html = `<div class="modal" id="edit-distribution-profile-modal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Update Distribution Profile</h2>
                        </div>
                        <div class="modal-body">
                            <form id="update-distribution-profile-form">
                                <div class="mb-1 field-group">
                                    <label>Company Name</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Select Account Mgr</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>SAM Phone</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>SAM EMail</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Company Account Mgr</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>CAM Name</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>CAM Email</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Payment Type</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Payment Center</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Extended Data</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Emails</label>
                                    <input type="text"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Language</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        return html;
};
