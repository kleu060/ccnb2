import { isLogin } from "./auth/auth.js";
import { getSessionVariable } from "./auth/getSessionVariable.js";

import { Home } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { WelcomePage } from "./pages/welcome.js";
import { LogoutPage } from "./pages/logout.js";
import { ChangePassword } from "./pages/change-password.js";
import { Inquiry } from "./pages/inquiry.js";       //Page 2001
import { CustomerSearch } from "./pages/customer.js";
import { AccountInquiryMain } from "./pages/accountInquiryMain.js";
import { account } from "./pages/account.js";
import { KeyAccount } from "./pages/keyAccount.js";
import { BlackListMain } from "./pages/blacklistMain.js";
import { DunningGroupMain } from "./pages/dunningGroupMain.js";
import { DcaMain } from "./pages/DcaMain.js";
import { DcaAgencyMain } from "./pages/DcaAgencyMain.js";
import { NodMain } from "./pages/nodMain.js";
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
import TomSelect from 'tom-select';


// const routes = {
//     [ APP_ROOT + "/" ]: LoginPage,
//     [ APP_ROOT + "/login" ]: LoginPage,
//     [ APP_ROOT + "/inquiry" ]: Inquiry,                                 //2001
//     [ APP_ROOT + "/customer-search" ]: CustomerSearch,                  //2002
//     [ APP_ROOT + "/account-inquiry" ]: AccountInquiryMain,              //2003, 2004, 2005
//     [ APP_ROOT + "/key-account" ]: KeyAccount,                          //3001
//     [ APP_ROOT + "/blacklist" ]: BlackListMain,                         //4001, 4002, 4003
//     [ APP_ROOT +  "/dunning-group" ]: DunningGroupMain,                 //5001, 5002, 5003
//     [ APP_ROOT + "/dca" ]: DcaMain,
//     [ APP_ROOT + "/dca-agency" ]: DcaAgencyMain,
//     [ APP_ROOT +  "/nod" ]: Nod,
//     [ APP_ROOT + "/credit-score" ]: CreditScore,
//     [ APP_ROOT + "/commission"]: Commission,
//     [ APP_ROOT + "/dca-commission" ]: DcaCommission,
//     [ APP_ROOT + "/admin" ]: AdminMain,
//     [ APP_ROOT + "/change-password" ]: ChangePassword,
//     [ APP_ROOT + "/logout" ]: LogoutPage,
// };

const routes = {
    [ APP_ROOT + "/" ]: { component: LoginPage },
    [ APP_ROOT + "/welcome" ]: { component: WelcomePage },
    [ APP_ROOT + "/login" ]: { component: LoginPage },
    [ APP_ROOT + "/inquiry" ]: { component: Inquiry, pageId: ['2001'] },
    [ APP_ROOT + "/customer-search" ]: { component: CustomerSearch, pageId: ['2002'] },
    [ APP_ROOT + "/account-inquiry" ]: { component: AccountInquiryMain, pageId: ['2003', '2004', '2005'] }, 
    [ APP_ROOT + "/account" ]: { component: account}, 
    [ APP_ROOT + "/key-account" ]: { component: KeyAccount, pageId: ['3001'] },
    [ APP_ROOT + "/blacklist" ]: { component: BlackListMain, pageId: ['4001', '4002', '4003', '4004'] },
    [ APP_ROOT + "/dunning-group" ]: { component: DunningGroupMain, pageId: ['5001', '5002', '5003'] },
    [ APP_ROOT + "/dca" ]: { component: DcaMain, pageId: ['6001'] },
    [ APP_ROOT + "/dca-agency" ]: { component: DcaAgencyMain, pageId: ['6008'] },
    [ APP_ROOT + "/nod" ]: { component: NodMain, pageId: ['6003'] },
    [ APP_ROOT + "/credit-score" ]: { component: CreditScore, pageId: ['7001'] },
    [ APP_ROOT + "/commission"]: { component: Commission , pageId: ['8001'] },
    [ APP_ROOT + "/dca-commission" ]: { component: DcaCommission },
    [ APP_ROOT + "/admin" ]: { component: AdminMain, pageId: ['10001', '10002'] },
    [ APP_ROOT + "/change-password" ]: { component: ChangePassword },
    [ APP_ROOT + "/logout" ]: { component: LogoutPage },
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
        
            document.getElementById("expire-container").style.display = "block";
            //access token expire;
            setTimeout(function(){
                document.getElementById("expire-container").style.display = "none";
                window.location.href="/ccnb2/login?msg=Access token expired";
                
                return false;
            }, 3000);
        }
        else {            
            if (window.force_change_pw == 1){   // iff user isLogin and force to change password
                if ( path != APP_ROOT + "/change-password" && path != APP_ROOT + "/logout" ) { // don't redirect if user already in change password page or attempt to logout
                    window.location.href="/ccnb2/change-password";
                    return;
                }
            }
        }
    }
    

    // const route = routes[path] || Home;
    // const content = await route();

    // Get matched route configuration
    const routeConfig = routes[path];
    console.log(routes);
    console.log(routes[path]);
    console.log("path: " + path);
    console.log(routeConfig);

    // Check permissions if the route requires specific pageId arrays
    if (routeConfig && Array.isArray(routeConfig.pageId)) {
        const allowedPages = window.allowed_pages || [];
        // const allowedPages = (window.allowed_pages || []).map(String);

        // Check if at least one pageId from the route matches the allowed user pages
        console.log("check permission");
        console.log(allowedPages);
        console.log(routeConfig.pageId);
        // const hasAccess = routeConfig.pageId.some(id => allowedPages.includes(id));
        const hasAccess = routeConfig.pageId.some(id => allowedPages.includes(id));
        // const hasAccess = routeConfig.pageId.some(id => allowedPages.includes(Number(id)));

        if (!hasAccess) {
            console.warn(`Access denied for route: ${path}. Required one of:`, routeConfig.pageId);
            
            // Redirect unauthorized users to login page or an access denied page
            window.location.href = APP_ROOT + "/403.html";
            return;
        }
    }

    // Fallback to Home if route is not defined
    const routeComponent = routeConfig ? routeConfig.component : Login;
    const content = await routeComponent();

    const app = document.getElementById("main-app");
    app.innerHTML = content;

    Alpine.initTree(app); // 🔥 Important line

    // if (path != "/change-password") {
    //     if (Alpine.store('user_data').force_change_pw) {
    //         window.location.href = APP_ROOT + "/change-password";
    //     }
    // }

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
                console.log("blacklist event");

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

    const tomSelectElements = document.querySelectorAll(".tomselect");
    tomSelectElements.forEach(el => {
        new TomSelect(el, {
            create: true, 
            sortField: {
                field: 'text',
                direction: 'asc',
                
            },
            createOnBlur: true,
        });
    });

    const tomSelectSingleElements = document.querySelectorAll(".tomselect-single");
    tomSelectSingleElements.forEach(el => {
        new TomSelect(el, {
            create: false, 
        });
    });
    // if (document.querySelector('.tomselect')) {
    //     console.log("tomselect");
    //     new TomSelect('.tomselect', {
    //         create: true, // Allows users to create new items
    //         sortField: {
    //             field: 'text',
    //             direction: 'asc'
    //         },
    //         createOnBlur: true
    //     });
    // }

    const menuItems = document.querySelectorAll('.menu-item');
    // Get the current path from the browser window

    menuItems.forEach(el => {
        // 1. Find the anchor link inside or on the menu item
        const addressElement = el.closest('a') || el.querySelector('a');
        
        if (addressElement) {
            // 2. Use .pathname to get just the path (e.g., "/ccnb2/print") 
            // to avoid domain mismatch issues with full .href strings
            const addressElementPath = addressElement.pathname;
            
            el.classList.remove("active");
            
            // 3. Use .includes() for string matching
            if (path.includes(addressElementPath)) {
                el.classList.add("active");
            }
        }
    });


}

document.addEventListener('alpine:init', async () => {
    // Registering the global store
    Alpine.store('user_data', {
        username: '',
        groupName: '',
        allowedPages: '',
        latest_id_blacklist_file: '',
        force_change_pw: '',
    });

    // const variables = await getSessionVariable();
    Alpine.store('user_data').username = window.username;
    Alpine.store('user_data').groupName = window.group_name;
    Alpine.store('user_data').allowedPages = window.allowed_pages;
    Alpine.store('user_data').latest_id_blacklist_file_fraud = window.latest_id_blacklist_file_fraud;
    Alpine.store('user_data').latest_id_blacklist_file_admin = window.latest_id_blacklist_file_admin;
    Alpine.store('user_data').force_change_pw = window.force_change_pw;



});

