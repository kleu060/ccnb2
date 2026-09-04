export async function renderPicModal() {

    const html = `<div class="modal" id="pic-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                            <h2><span id="pic-modal-title">Add</span></h2>
                        </div>
                        <div class="modal-body">
                            <form id="pic-form">
                                <input type="hidden" name="action" id="pic-form-action" value="add"/>
                                <div class="mb-1 field-group">
                                    <label>Name</label>
                                    <input type="text" name="name" id="pic-form-name"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Full Name</label>
                                    <input type="text" name="full_name" id="pic-form-full-name"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Email</label>
                                    <input type="text" name="email" id="pic-form-email"/>
                                </div>
                                <div class="mb-1 field-group">
                                    <label>Phone</label>
                                    <input type="text" name="phone" id="pic-form-phone"/>
                                </div>
                                <div>
                                    <button type="submit" class="btn btn-primary" id="btn-pic-form-submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    `;

    return html;
}