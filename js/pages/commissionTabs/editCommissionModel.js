export async function renderEditCommissionModal() {
    const html = ` 
        <div class="modal modal-xl" id="edit-commission-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                            <h2>Edit Commission</h2>
                    </div>
                    <div class="modal-body">
                        <form id="edit-commission-form">
                            <div class="mb-1 field-group">
                                <label>ID</label>
                                <span id="commission_id">103</span>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Version Name</label>
                                <input type="text" name="version_name" id="commission_version_name" value="Normal Rate 2026"/>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Remark</label>
                                <textarea name="remark" id="commission_remark">migrate from xD</textarea>
                            </div>

                            <table id="edit-commission-table">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                            <div id="edit-commission-error-message" class="mb-3 error-message"></div>

                            <div class="d-flex">
                                <input type="submit" id="save-commission-btn" class="btn btn-primary me-1" value="Save Changes"/>
                                <button id="close-commission-btn" data-bs-dismiss="modal" class="btn btn-secondary">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return html;
}
