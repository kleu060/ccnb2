import { login } from "../api/login-api.js";

export async function LoginPage() {
    const html = `
        <section class="container-fluid login-section" id="login-section">
            <div class="card col-10">
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <h5>Login</h5>
                            <form id="login-form" class="border border-1 p-3">
                                <div class="field-group">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" name="username" required/>
                                </div>
                                <div class="field-group">
                                    <label for="password">Password</label>
                                    <input type="password" id="password" name="password" required/>
                                </div>
                                <div class="field-group mt-2">
                                    <input type="checkbox" id="chk-agree-legal-notice" name="chk-agree-legal-notice" value="agree" class="me-1" required />
                                    <label for="chk-agree-legal-notice">I agree to <u>Legal Notice</u></label>
                                </div>
                                <div id="error-message" class="mb-3 error-message"></div>
                                <div class="field-group">
                                    <button class="btn btn-primary" type="submit" >Login</button>
                                </div>
                            </form>
                        </div>
                        <div class="col-8">
                            <h5>Legal Notice</h5>
                            <textarea class="legal-notice w-100">This computer may be accessed and used only by CelcomDigi Group (“CD”) employees or authorized persons. System access is allowed for legitimate purposes only and in accordance with CD applicable policies and Malaysian laws. CD may monitor access and use of this system to ensure appropriate use and for other legitimate business purpose. Unauthorized access or inappropriate use may result in administrative action, disciplinary action, and/or civil /criminal penalties in accordance with the applicable CD policies and/or law. By continuing, you consent to the relevant Malaysian laws and CD policies.</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Wait for DOM to render the form
    setTimeout(() => {
        const loginForm = document.getElementById("login-form");
        const errorMessage = document.getElementById("error-message");
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // prevent page reload

            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = "Logging in...";

            try {
                const result = await login();

                if ( result.success) {
                    // login successful
                    window.location = "/inquiry";
                } else {
                    errorMessage.textContent = result.error_description;
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Login";
                    return;                
                }

            } catch (err) {
                // Network errors, CORS issues, or server errors
                submitBtn.disabled = false;
                submitBtn.textContent = "Login";
                console.error("Login error:", err);
                errorMessage.textContent = "Login failed due to server error.";
            }
        });
    }, 0);

    return html;
}
