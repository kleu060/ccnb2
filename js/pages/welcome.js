import { login } from "../api/login-api.js";
import { APP_ROOT } from '../config.js';
import { logEvent } from '../logEvent.js';

export async function WelcomePage() {



    const html = `
        <section class="container-fluid login-section" id="login-section" x-data>
            <div class="card col-6 m-auto bg-transparent border-0">
                <div class="card-body">
                    <div class="row text-center"">
                        <div class="mb-3">
                            <img width="300px" src="img/celcomdigi_logo.png" />
                        </div>
                        <div class="m-auto">
                            <div class="h2">
                                Hello, <span x-text="$store.user_data.username" id="profile_name"></span>
                                (<span x-text="$store.user_data.groupName" id="group_name"></span>)
                            </div>
                            <h1>Welcome to CelcomDigi<br />Credit Control Portal</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Wait for DOM to render the form
    setTimeout(() => {
       
    }, 0);

    return html;
}
