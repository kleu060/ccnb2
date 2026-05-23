import { API_BASE } from '../config.js';
import { logEvent } from '../logEvent.js';

export async function login() {
    const loginForm = document.getElementById("login-form");
    // Convert all form values to a JSON object
    const formData = new FormData(loginForm);
    const formObject = Object.fromEntries(formData.entries());

    // console.log(`${API_BASE}/login.php`);
    const url = `${API_BASE}/login.php`;

    logEvent('info', 'User login request ' + url );
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject),
        credentials: "include"
    });

    return await res.json();
}