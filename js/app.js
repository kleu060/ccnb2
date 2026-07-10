import Alpine from 'alpinejs'

window.Alpine = Alpine
Alpine.start()

import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import '../scss/app.scss';
import * as bootstrap from 'bootstrap';

// Import the default CSS theme (requires a bundler like Webpack or Vite)
import 'tom-select/dist/css/tom-select.default.css';

// import "./components/table.js";   // relative path from app.js

import { renderVerticalNavBar } from "./components/vertical-navbar.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { router } from "./router.js";
import { API_BASE } from './config.js';
import { getSessionVariable } from "./auth/getSessionVariable.js";




/* import functions */
const header =  document.getElementById("header");
if ( header ) {
    header.innerHTML = renderHeader();
}
document.getElementById("footer").innerHTML = renderFooter();
const verticalNavBar = document.getElementById("vertical-navbar");
if (verticalNavBar) {
    verticalNavBar.innerHTML = await renderVerticalNavBar();
}

const id = 'menu-item-' + window.location.pathname.replace('/', '');
document.getElementById(id)?.classList.add('active');

// Enable tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})





router();

document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        window.history.pushState({}, "", e.target.href);
        router();
    }
});
window.addEventListener("popstate", router);


