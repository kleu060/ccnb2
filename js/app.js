// import alpine
import Alpine from 'alpinejs'

window.Alpine = Alpine
Alpine.start()

import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import '../scss/app.scss';
import 'bootstrap';

// import "./components/table.js";   // relative path from app.js

import { renderVerticalNavBar } from "./components/vertical-navbar.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { router } from "./router.js";


document.getElementById("header").innerHTML = renderHeader();
document.getElementById("footer").innerHTML = renderFooter();
document.getElementById("vertical-navbar").innerHTML = renderVerticalNavBar();


router();

document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        window.history.pushState({}, "", e.target.href);
        router();
    }
});

window.addEventListener("popstate", router);



window.addEventListener('load', () => {
    const id = 'menu-item-' + window.location.pathname.replace('/', '');
    document.getElementById(id)?.classList.add('active');
});