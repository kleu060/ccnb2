import { Home } from "./pages/home.js";
import { Debtor } from "./pages/debtor.js";
import { LoginPage } from "./pages/login.js";
import { LogoutPage } from "./pages/logout.js";
import { ChangePassword } from "./pages/change-password.js";
import { ActiveAssignmentList } from "./pages/active-assignment-list.js";
import { loadDebtorTable } from "./components/debtor-table.js";
import { loadActiveListAssignmentTable } from "./components/active-list-assignment-table.js";


const routes = {
    "/": LoginPage,
    "/login": LoginPage,
    "/change-password": ChangePassword,
    "/debtor": Debtor,
    "/active-assignment-list": ActiveAssignmentList,
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
    console.log(path);
    if ( path == "/debtor" ){
        document.getElementById("choices").addEventListener("change", (e) => {
            loadDebtorTable(e.target.value);
        });
        loadDebtorTable(document.getElementById("choices").value);
    }
    // else if ( path == "/active-assignment-list" ){
    //     loadActiveListAssignmentTable();
    // }

}