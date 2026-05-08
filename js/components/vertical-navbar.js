import { isLogin } from "../auth/auth.js";

export async function renderVerticalNavBar() {
    const loggedIn = await isLogin();
    
    
    let html = '<ul>';
    if ( loggedIn ) {
        html += `
            <li id="menu-item-inquiry" data-bs-toggle="tooltip" data-bs-placement="right" title="Account Search">
                <a href="inquiry">
                    <span class="icon icon-inquiry bg-white"></span>
                </a>
            </li>

            <li id="menu-item-customer-search" data-bs-toggle="tooltip" data-bs-placement="right" title="Customer Search">
                <a href="customer-search">
                    <span class="icon icon-customer bg-white"></span>
                </a>
            </li>


            <li id="menu-item-account-code-search" data-bs-toggle="tooltip" data-bs-placement="right" title="Account Code Search">
                <a href="account-code-search">
                    <span class="icon icon-user bg-white"></span>
                </a>
            </li>

            <li id="menu-item-key-account" data-bs-toggle="tooltip" data-bs-placement="right" title="Key Account">
                <a href="key-account">
                    <span class="icon icon-key-account bg-white"></span>
                </a>
            </li>



            <li id="menu-item-blacklist" data-bs-toggle="tooltip" data-bs-placement="right" title="Blacklist">
                <a href="blacklist">
                    <span class="icon icon-blacklist bg-white"></span>
                </a>
            </li>

            <li id="menu-item-dunning-group" data-bs-toggle="tooltip" data-bs-placement="right" title="Dunning Group">
                <a href="dunning-group">
                    <span class="icon icon-dunning-group bg-white"></span>
                </a>
            </li>

            <li id="menu-item-dca" data-bs-toggle="tooltip" data-bs-placement="right" title="DCA">
                <a href="dca">
                    <span class="icon icon-dca bg-white"></span>
                </a>
            </li>

            <li id="menu-item-nod" data-bs-toggle="tooltip" data-bs-placement="right" title="NOD">
                <a href="nod">
                    <span class="icon icon-user bg-white"></span>
                </a>
            </li>

            <li id="menu-item-credit-score" data-bs-toggle="tooltip" data-bs-placement="right" title="Credit Score">
                <a href="credit-score">
                    <span class="icon icon-credit-score bg-white"></span>
                </a>
            </li>

            <li id="menu-item-comission" data-bs-toggle="tooltip" data-bs-placement="right" title="Comission">
                <a href="commission">
                    <span class="icon icon-commission bg-white"></span>
                </a>
            </li>

            <li id="menu-item-dca-commission" data-bs-toggle="tooltip" data-bs-placement="right" title="DCA Comission">
                <a href="dca-commission">
                    <span class="icon icon-dca-commission bg-white"></span>
                </a>
            </li>

            <li id="menu-item-admin" data-bs-toggle="tooltip" data-bs-placement="right" title="Admin">
                <a href="admin">
                    <span class="icon icon-admin bg-white"></span>
                </a>
            </li>

            <li id="menu-item-change-password" data-bs-toggle="tooltip" data-bs-placement="right" title="Change Password">
                <a href="change-password">
                    <span class="icon icon-change-password bg-white"></span>
                </a>
            </li>
        `;
    }

    if ( loggedIn ) {
        html += `
            <li id="menu-item-logout" data-bs-toggle="tooltip" data-bs-placement="right" title="Logout">
                <a href="logout">
                    <span class="icon icon-logout bg-white"></span>
                </a>
            </li>`;
    }
    else {
        html += `
        <li id="menu-item-logout" data-bs-toggle="tooltip" data-bs-placement="right" title="Login">
                <a href="login">
                    <span class="icon icon-login bg-white"></span>
                </a>
            </li>
            `;
    }
    
    html += '</ul>';

    
    

    return html ;
   
}