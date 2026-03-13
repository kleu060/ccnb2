export function renderVerticalNavBar() {
    return `
        <ul>
            <li id="menu-item-debtor">
                <a href="/debtor">
                    <span class="icon icon-user bg-white"></span>
                </a>
            </li>

            <li id="menu-item-active-assignment-list">
                <a href="active-assignment-list">
                    <span class="icon icon-list bg-white"></span>
                </a>
            </li>

            <li id="menu-item-logout">
                <a href="logout">
                    <span class="icon icon-logout bg-white"></span>
                </a>
            </li>
        </ul>
    `;
}