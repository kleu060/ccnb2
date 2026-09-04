export function renderFooter() {
    const year = new Date().getFullYear();

    return `
        <footer>
            <div>© <span class="footer-year">${year}</span> DTIL</div>
        </footer>
    `;
}