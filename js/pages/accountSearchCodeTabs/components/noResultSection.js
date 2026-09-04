export async function rendorNoResultSection(tab) {

    return `
        <div id="${tab}-account-code-no-result-container" class="card d-none">
            <div class="card-body">
                Account not found
            </div>
        </div>
    `;

}