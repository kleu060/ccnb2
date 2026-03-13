import { API_BASE } from '../config.js';


export async function LogoutPage() {
    try {
        const result = await fetch(`${API_BASE}/index.php?endpont=logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (result.success) {
            // login successful
            window.location = "/change-password";
        } else {
            return "Login failed: " + (result.message || "Unknown error");
        }

    } catch (err) {
        console.error("Logout failed", err);
    }

}