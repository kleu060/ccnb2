export async function Login() {

return `
        <section class="container-fluid login-section" id="login-section">
            <div class="row">
                <div class="col-4">
                    <form id="login-form" class="border border-1 p-3">
                        <div class="field-group">
                            <label for="username" >Username</label>
                            <input type="text" id="username" name="username"/>
                        </div>
                        <div class="field-group">
                            <label for="password" >Password</label>
                            <input type="text" id="password" name="password"/>
                        </div>
                        <div class="field-group">
                            <button class="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        `;
}