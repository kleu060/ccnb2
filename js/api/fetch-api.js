import { logEvent } from '../logEvent.js';

export async function fetchAPI(url, data = "", contentType = "") {

    logEvent('info', 'API Request - ' + url + " with body: " + JSON.stringify(data));

    let body = null;
    if (contentType == "file ") {
        body = data;
    }
    else {
        body = JSON.stringify(data);
    }
    const response= await fetch(url, {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        body: body,
        credentials: "include"
    });

    const responseJson = await response.json();
    console.log(responseJson.success);
    console.log(responseJson.error_code);
    if (!responseJson.success && responseJson.error_code ==  2) {

        console.log("here");
        document.getElementById("expire-container").style.display = "block";
        //access token expire;
        setTimeout(function(){
            document.getElementById("expire-container").style.display = "none";
            window.location.href="/ccnb2/login?msg=Access token expired";
        }, 3000);
        return;
    }

    logEvent('info', 'API response - ' + JSON.stringify(responseJson) );
    console.log(responseJson);

    return responseJson;
}