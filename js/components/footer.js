export function renderFooter() {
    const year = new Date().getFullYear();

    return `
        <footer>
            <p>© <span class="footer-year">${year}</span> DTIL</p>
        </footer>
    `;
}