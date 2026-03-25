import { login } from "../api/login-api.js";

export async function LoginPage() {
    const html = `
        <section class="container-fluid login-section" id="login-section">
            <div class="row">
                <div class="col-4">
                    <form id="login-form" class="border border-1 p-3">
                        <div class="field-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username"/>
                        </div>
                        <div class="field-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password"/>
                        </div>
                        <div id="error-message" class="mb-3 error-message"></div>
                        <div class="field-group">
                            <button class="btn btn-primary" type="submit" >Login</button>
                        </div>
                    </form>
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
            const result = await login();

            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = "Logging in...";

            try {
                const result = await login();

                if ( result.success) {
                    // login successful
                    window.location = "/active-assignment-list";
                } else {
                    errorMessage.textContent = "Invalid username or password.";
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
