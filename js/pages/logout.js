import { API_BASE } from '../config.js';


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
            msg= "Logou success.  Redirect to login page...";

        } 
        else {
            msg = "Login failed: " + (result.description|| "Unknown error") + ". Redirect to login page...";	
            console.log(document.getElementById("main-app"));

        }

    } catch (err) { //Not Authenticated
        console.error("Logout failed", err);
        msg = "Logout failed.  Redirect to login page...";
        
    }
    
    // Trigger the redirect after 2 seconds so the user can read the message
    setTimeout(() => {
        window.location.href = "/login";
    }, 2000);

    return msg;


}
