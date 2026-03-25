import { Home } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { LogoutPage } from "./pages/logout.js";
import { ChangePassword } from "./pages/change-password.js";
import { Inquiry } from "./pages/inquiry.js";
import { CustomerSearch } from "./pages/customer.js";
import { AccountCodeMain } from "./pages/accountCodeMain.js";
import { KeyAccount } from "./pages/keyAccount.js";
import { BlackListMain } from "./pages/blacklistMain.js";
import { DcaMain } from "./pages/DcaMain.js";
import { DcaAgencyMain } from "./pages/DcaAgencyMain.js";
import { Nod } from "./pages/Nod.js";
import { CreditScore } from "./pages/CreditScore.js";
import { Commission } from "./pages/Commission.js";
import { DcaCommission } from "./pages/DcaCommission.js";
import { AdminMain } from "./pages/AdminMain.js";



import { loadDebtorTable } from "./components/debtor-table.js";


const routes = {
    "/": LoginPage,
    "/login": LoginPage,
    "/inquiry": Inquiry,
    "/customer-search": CustomerSearch,
    "/account-code-search": AccountCodeMain,
    "/key-account": KeyAccount,
    "/blacklist": BlackListMain,
    "/dca": DcaMain,
    "/dca-agency": DcaAgencyMain,
    "/nod": Nod,
    "/credit-score": CreditScore,
    "/commission": Commission,
    "/dca-commission": DcaCommission,
    "/admin": AdminMain,
    "/change-password": ChangePassword,
    "/logout": LogoutPage,
};

export async function router() {
    const path = window.location.pathname;
    const route = routes[path] || Home;

    const content = await route();
    const app = document.getElementById("main-app");

    app.innerHTML = content;

    Alpine.initTree(app); // 🔥 Important line

    // import DataTable

    // Event listener
    if ( path == "/account-code-search" ){
        const params = new URLSearchParams(window.location.search);
        const accountNo = params.get('account_code') || '';
        
        document.getElementById("choices").addEventListener("change", (e) => {
            loadDebtorTable(e.target.value, accountNo);
        });
        loadDebtorTable(document.getElementById("choices").value, accountNo);
    }


}