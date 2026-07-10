import { fetchAPI } from '../api/fetch-api.js';
import { API_BASE } from '../config.js';
import { logEvent } from '../logEvent.js';


export async function ChangePassword() {

    logEvent('info', 'Visit Change Password page');
    let passwordLength = 9;
    if (window.group_name == "System1" || window.group_name == "SystemAdmin1" || window.group_name == "SystemAdmin2" || window.group_name == "Usertermination" ) {
        passwordLength = 15;
    }

const html = `
        <section class="container-fluid login-section" id="login-section">
            <h1>Change Password</h1>
            <div class="row">
                <div class="col-4">
                    <form id="change-password-form" class="border border-1 p-3">
                        <div class="field-group">
                            <label for="new_password">New Password</label>
                            <input type="password" id="new_password" name="new_password"/>
                        </div>
                        <div class="field-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" id="confirm_password" name="confirm_password"/>
                        </div>
                        <div id="error-message" class="mb-3 error-message"></div>
                        <div class="field-group">
                            <button class="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="card">
                        <div class="card-body">
                            <div>The password should meet the following requirement:</div>
                                <ul>
                                    <li>Must be at least ${passwordLength} characters long</li>
                                    <li>Maximum 20 characters</li>
                                    <li>Must contain at least:<li>
                                        <ul>
                                            <li>One uppercase letter [A-Z]</li>
                                            <li>One lowercase letter [a-z]</li>
                                            <li>One numeric character [0-9]</li>
                                            <li>One special character from the set ! @ $ % ^ & * ( ) ; : , < . > / ?</li>
                                        </ul>    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    setTimeout(() => {
        // Run this code on page load
        const errorMessage = document.getElementById("error-message");
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.get('message'));
        if (urlParams.get('message') === 'success') {
            errorMessage.textContent = "Change password success";
        }
        

        document.getElementById("change-password-form").addEventListener("submit", async (e) => {
            e.preventDefault();

            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = "";

            const submitBtn = e.target.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";

            try {
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());

                const url = `${API_BASE}/index.php?endpoint=change_password`;
                const result = await fetchAPI(url, data);
                console.log(result.success);
                console.log(result.response);

                const responseJson = JSON.parse(result.response);


                if ( result.success === false ) {
                    console.log('1');
                    errorMessage.textContent = responseJson.error_description;
                }
                else {
                    console.log('2');
                    console.log(responseJson);
                    if (responseJson.error_code == 0) {
                        
                        // errorMessage.textContent = "Change password success";
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.set('message', 'success');
                        window.location.href = "/ccnb2/change-password?message=success";
                    }
                }

            
            } catch (err) {
                    errorMessage.textContent = "An error occurred. Please try again.";
                    console.error(err);

            }
            finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit";
            }
        });
    }, 500);

    return html;
}