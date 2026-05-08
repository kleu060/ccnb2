import { APP_ROOT, API_BASE } from '../config.js';


export async function LogoutPage() {
    let msg = "";
    try {
        const response= await fetch(`${API_BASE}/index.php?endpoint=logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const result= await response.json();
        if (result.error_code == 0) {
            // login successful
            msg= "Logout success.  Redirect to login page...";

        } 
        else {
            msg = "Logout... " + (result.description|| "Unknown error") + ". Redirect to login page...";	
            console.log(document.getElementById("main-app"));

        }

    } catch (err) { //Not Authenticated
        console.error("Logout failed", err);
        msg = "Logout success .  Redirect to login page...";
        
    }
    
    // Trigger the redirect after 2 seconds so the user can read the message
    setTimeout(() => {
        
        window.location.href = "${APP_ROOT}/login";
    }, 2000);

    return msg;


}
