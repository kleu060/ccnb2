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
                        <div class="field-group">
                            <button class="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;

    // Wait for DOM to render the form
    setTimeout(() => {
        const loginForm = document.getElementById("login-form");
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // prevent page reload
            const result = await login();
            try {
                const result = await login();

                // If PHP returned HTTP 401, fetch won’t throw, so we check result
                if (result && result.error && result.error === "Unauthorized") {
                    alert("Unauthorized: Invalid username or password.");
                    return;
                }

                if (result.success) {
                    // login successful
                    window.location = "/change-password";
                } else {
                    alert("Login failed: " + (result.message || "Unknown error"));
                }

            } catch (err) {
                // Network errors, CORS issues, or server errors
                console.error("Login error:", err);
                alert("Login failed due to server error.");
            }
        });
    }, 0);

    return html;
}