
export async function renderExtraEditCommissionModal() {
    const html = ` 
        <div class="modal" id="edit-extra-commission-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                            <h2>Edit Extra Commission</h2>
                    </div>
                    <div class="modal-body">
                        <form id="edit-extra-commission-form">
                            <div class="mb-1 field-group">
                                <label>ID</label>
                                <span>103</span>
                            </div>
                            <div class="mb-1 field-group">
                                <label>Version Name</label>
                                <input type="text" name="version_name" id="extra_commission_version_name" value="Normal Rate 2026"/>
                            </div>

                            <div class="mb-1 field-group">
                                <label>Start Date</label>
                                <input type="date" name="start_date" id="extra_commission_start_date"/>
                            </div>

                            <div class="mb-1 field-group">
                                <label>End Date</label>
                                <input type="date" name="end_date" id="extra_commission_end" />
                            </div>
                            <div class="mb-1 field-group">
                                <label>Remark</label>
                                <textarea name="remark" id="extra_comission_remark">migrate from xD</textarea>
                            </div>

                            <table id="edit-extra-commission-table">
                                <thead></thead>
                                <tbody></tbody>
                            </table>

                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    `;

    return html;
}
