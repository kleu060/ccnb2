export async function ChangePassword() {

const html = `
        <section class="container-fluid login-section" id="login-section">
            <h1>Change Password</h1>
            <div class="row">
                <div class="col-4">
                    <form id="change-password-form" class="border border-1 p-3">
                        <div class="field-group">
                            <label for="new_password">New Password</label>
                            <input type="text" id="new_password" name="new_password"/>
                        </div>
                        <div class="field-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" id="confirm_password" name="confirm_password"/>
                        </div>
                        <div class="field-group">
                            <button class="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;

return html;
}