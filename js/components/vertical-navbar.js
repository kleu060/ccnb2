import { isLogin } from "../auth/auth.js";

export async function renderVerticalNavBar() {
    const loggedIn = await isLogin();
    const allowedPages = window.allowed_pages;
    // const allowedPages = (window.allowed_pages || []).map(String);

    let html = '<ul>';
    if ( loggedIn ) {

        // 2001 controls the "Account Search" (Inquiry) menu item
        html += allowedPages.includes("2001") ? `
            <li id="menu-item-inquiry" class="menu-item pending">
                <a href="inquiry">
                    <span class="icon icon-inquiry"></span>Account Search
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("2002") ? `
            <li id="menu-item-customer-search" class="menu-item pending">
                <a href="customer-search">
                    <span class="icon icon-customer"></span>Customer Search
                </a>
            </li>
        `: '';


        html += ["2003", "2043", "2005"].some(id => allowedPages.includes(id)) ? `
            <li id="menu-item-account-inquiry" class="menu-item">
                <a href="account-inquiry">
                    <span class="icon icon-user bg-white"></span>Account Inquiry
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("3001") ? `
            <li id="menu-item-key-account" class="menu-item pending">
                <a href="key-account">
                    <span class="icon icon-key-account bg-white"></span>Key Account
                </a>
            </li>

        ` : '';

        html += ["4001", "4002", "4003", "4004"].some(id => allowedPages.includes(id)) ? `
            <li id="menu-item-blacklist" class="menu-item">
                <a href="blacklist">
                    <span class="icon icon-blacklist bg-white"></span>Blacklist
                </a>
            </li>
        ` : '';

        html += ["5001", "5002", "5003", "5004"].some(id => allowedPages.includes(id)) ? `
            <li id="menu-item-dunning-group" class="menu-item">
                <a href="dunning-group">
                    <span class="icon icon-dunning-group bg-white"></span>Dunning Group
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("6001") ? `
            <li id="menu-item-dca" class="menu-item pending" >
                <a href="dca">
                    <span class="icon icon-dca bg-white"></span>DCA
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("6003") ? `
            <li id="menu-item-nod" class="menu-item pending">
                <a href="nod">
                    <span class="icon icon-user bg-white"></span>NOD
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("6008") ? `
            <li id="menu-item-nod" class="pending" class="menu-item">
                <a href="dca-agency">
                    <span class="icon icon-dca-agency bg-white"></span>DCA Agency
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("7001") ? `
            <li id="menu-item-credit-score" class="menu-item">
                <a href="credit-score">
                    <span class="icon icon-credit-score bg-white"></span>Credit Score
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("8001") ? `
            <li id="menu-item-comission" class="menu-item pending">
                <a href="commission">
                    <span class="icon icon-commission bg-white"></span>Comission
                </a>
            </li>
        ` : '';

        html += allowedPages.includes("9001") ? `
            <li id="menu-item-dca-commission" class="menu-item pending">
                <a href="dca-commission">
                    <span class="icon icon-dca-commission bg-white"></span>DCA Comission
                </a>
            </li>
        ` : '';
        
        html += allowedPages.includes("10002") ? `
            <li id="menu-item-admin" class="menu-item">
                <a href="admin">
                    <span class="icon icon-admin bg-white"></span>Admin
                </a>
            </li>
        ` : '';
        html += `
            
            <li id="menu-item-change-password" class="menu-item">
                <a href="change-password">
                    <span class="icon icon-change-password bg-white"></span>Change Password
                </a>
            </li>
        `;
    }

    if ( loggedIn ) {
        html += `
            <li id="menu-item-logout" class="menu-item">
                <a href="logout">
                    <span class="icon icon-logout bg-white"></span>Logout
                </a>
            </li>`;
    }
    else {
        html += `
        <li id="menu-item-logout" class="menu-item">
                <a href="login">
                    <span class="icon icon-login bg-white"></span>Login
                </a>
            </li>
            `;
    }
    
    html += '</ul>';

    
    

    return html ;
   
}