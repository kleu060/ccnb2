export async function renderEditDunningGroupForm() {
    const html = `
        <h2>Edit Dunning Group</h2>
        <form id="edit-dunning-group-form">
            <input type="hidden" id="dunning-group-id-edit" name="id">
            <div class="mb-1 field-group">
                <label>Dunning Group Name</label>
                <select id="select-dunning-group-name-edit" name="name" class="tomselect">
                    <option value="Mass_Mgmt">Mass_Mgmt</option>
                    <option value="Mass_VVIP">Mass_VVIP</option>
                    <option value="Remaining VIP Account">Remaining VIP Account</option>
                    <option value="Mass_Fraud">Mass_Fraud</option>
                    <option value="Mass_deceased">Mass_deceased</option>
                    <option value="Mass_auto pay">Mass_auto pay</option>
                    <option value="Mass_Redlist">Mass_Redlist</option>
                    <option value="Test Account">Test Account</option>
                    <option value="Push to External Mass">Push to External Mass</option>
                    <option value="Mass_UHVC">Mass_UHVC</option>
                </select>
            </div>

            <div class="mb-1 field-group">
                <label>Priority</label>
                <input type="text" name="priority" id="dunning-group-priority-edit" value=""/>

            </div>

            <div class="mb-1 field-group">
                <label>Remark</label>
                <textarea name="remark"  id="dunning-group-remark-edit" cols="60" rows="10"></textarea>

            </div>
            <div id="edit-dunning-group-form-error-message" class="mb-3 error-message"></div>

            <div class="row">
                <div>
                    <input type="submit" class="btn btn-primary">
                    <button type="button" class="btn btn-secondary" id="btn-edit-dunning-group-form-back">Back</button>
                </div>
            </div>

            

        </form>
    `;

    return html;

}
