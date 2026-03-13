import { API_BASE } from '../config.js';

export async function login() {

    const loginForm = document.getElementById("login-form");
    const username = loginForm.querySelector('input[name="username"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    const res = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    });

    return await res.json();
}