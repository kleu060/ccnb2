import { API_BASE } from '../config.js';

export async function getSessionVariable() {
    try {
        console.log("auth");
        const response = await fetch(`${API_BASE}/getSessionVariables.php`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error checking login:', error);
        return false;
    }


};