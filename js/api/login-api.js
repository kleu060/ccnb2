import { API_BASE } from '../config.js';

export async function login() {
    const loginForm = document.getElementById("login-form");
    // Convert all form values to a JSON object
    const formData = new FormData(loginForm);
    const formObject = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject),
        credentials: "include"
    });

    return await res.json();
}