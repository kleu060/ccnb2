import { API_BASE } from '../config.js';

export async function isLogin() {
    try {
        console.log("auth");
        const response = await fetch(`${API_BASE}/auth.php`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const responseJson = await response.json();
        return responseJson.isLogin === true;
    } catch (error) {
        console.error('Error checking login:', error);
        return false;
    }
}