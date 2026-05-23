import { API_BASE } from '../config.js';

export async function isLogin() {
    try {
        console.log("auth");
        const response = await fetch(`${API_BASE}/index.php?endpoint=checktoken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const responseJson = await response.json();

        
        console.log("Is Login");
        console.log(responseJson);
        let result = null;
        if (responseJson && typeof responseJson.response === 'string' && responseJson.response.trim() !== '') {
            try {
                result = JSON.parse(responseJson.response);
            } catch (err) {
                console.warn('isLogin: response.response is not valid JSON, using null', err);
                result = null;
            }
        } else if (responseJson && typeof responseJson.response === 'object' && responseJson.response !== null) {
            result = responseJson.response;
        }

        if (result && result.error_code == 0 && result.error_description == "No error") {
            return true;
        }
        return false;        
    } catch (error) {
        console.error('Error checking login:', error);
        return false;
    }
}