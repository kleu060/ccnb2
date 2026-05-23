import { isLogin } from "./auth/auth.js";

import { Home } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { LogoutPage } from "./pages/logout.js";
import { ChangePassword } from "./pages/change-password.js";
import { Inquiry } from "./pages/inquiry.js";
import { CustomerSearch } from "./pages/customer.js";
import { AccountInquiryMain } from "./pages/accountInquiryMain.js";
import { KeyAccount } from "./pages/keyAccount.js";
import { BlackListMain } from "./pages/blacklistMain.js";
import { DunningGroupMain } from "./pages/dunningGrouptMain.js";
import { DcaMain } from "./pages/DcaMain.js";
import { DcaAgencyMain } from "./pages/DcaAgencyMain.js";
import { Nod } from "./pages/Nod.js";
import { CreditScore } from "./pages/CreditScore.js";
import { Commission } from "./pages/Commission.js";
import { DcaCommission } from "./pages/DcaCommission.js";
import { AdminMain } from "./pages/AdminMain.js";

import { loadDebtorTable } from "./components/debtor-table.js";
import { loadCustomerTable } from "./components/customer-table.js";
import { loadBlacklistTable } from "./components/blacklist-inquiry-table.js";
import { loadCtosTable } from "./components/ctos-table.js";
import { loadInternalBlacklistTable } from "./components/internal-blacklist-table.js";

import { APP_ROOT } from "./config.js";
import { logEvent } from './logEvent.js';


const routes = {
    [ APP_ROOT + "/" ]: LoginPage,
    [ APP_ROOT + "/login" ]: LoginPage,
    [ APP_ROOT + "/inquiry" ]: Inquiry,
    [ APP_ROOT + "/customer-search" ]: CustomerSearch,
    [ APP_ROOT + "/account-inquiry" ]: AccountInquiryMain,
    [ APP_ROOT + "/key-account" ]: KeyAccount,
    [ APP_ROOT + "/blacklist" ]: BlackListMain,
    [ APP_ROOT +  "/dunning-group" ]: DunningGroupMain,
    [ APP_ROOT + "/dca" ]: DcaMain,
    [ APP_ROOT + "/dca-agency" ]: DcaAgencyMain,
    [ APP_ROOT +  "/nod" ]: Nod,
    [ APP_ROOT + "/credit-score" ]: CreditScore,
    [ APP_ROOT + "/commission"]: Commission,
    [ APP_ROOT + "/dca-commission" ]: DcaCommission,
    [ APP_ROOT + "/admin" ]: AdminMain,
    [ APP_ROOT + "/change-password" ]: ChangePassword,
    [ APP_ROOT + "/logout" ]: LogoutPage,
};

export async function router() {
    // Get the full URL (protocol + host + pathname)
    const path = window.location.pathname;
    console.log(path);
    // check Auth if not in login page
    if ( path != APP_ROOT + "/" && path != APP_ROOT + "/login" ) {
        const loggedIn = await isLogin();
        console.log("is login: " + loggedIn);
        if ( !loggedIn ) {
            console.log("here");
        
            document.getElementById("expire-container").style.display = "block";
            //access token expire;
            setTimeout(function(){
                document.getElementById("expire-container").style.display = "none";
                window.location.href="/ccnb2/login?msg=Access token expired";
                
                return false;
            }, 3000);
        }
    }

    const route = routes[path] || Home;

    const content = await route();
    const app = document.getElementById("main-app");

    app.innerHTML = content;

    Alpine.initTree(app); // 🔥 Important line



    // Event listener
    if ( path == "/account-enquiry" ){
        const params = new URLSearchParams(window.location.search);
        const accountNo = params.get('account_code') || '';
        
        document.getElementById("choices").addEventListener("change", (e) => {
            loadDebtorTable(e.target.value, accountNo);
        });
        loadDebtorTable(document.getElementById("choices").value, accountNo);
    }
    else if ( path == "/customer-search" ){
        loadCustomerTable();
    }
    else if ( path == "/blacklist" ){
        loadBlacklistTable("{}");
        loadCtosTable("{}");
        loadInternalBlacklistTable();
    }


    /* Write event to log file when click on tabs */
    const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]')
    tabEls.forEach(tabEl => {

        tabEl.addEventListener('shown.bs.tab', event => {
            const parent = event.target.dataset.parent ?? 'No Defined';
            logEvent('info', 'Visit ' + parent  + ' page - ' + event.target.getAttribute("aria-controls"));
        })
    });

}
