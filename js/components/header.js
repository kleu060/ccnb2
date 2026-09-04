import { APP_ROOT } from '../config.js';


export function renderHeader() {
    const html = `
        <header class="d-flex align-items-center justify-content-between" x-data>
            <div class="d-flex align-items-center">
                <a class="logo pe-2 border-end" href="/" data-link><img src="img/celcomdigi_logo.png" /></a>
                <h1 class="ps-2">Credit Control Portal</h1>
            </div>
            <div>
                <a href="${APP_ROOT}/welcome">Hello, <span x-text="$store.user_data.username" id="profile_name"></span></a>
                (<span x-text="$store.user_data.groupName" id="group_name"></span>)
            </div>
        </header>
    `;



    return html;
}