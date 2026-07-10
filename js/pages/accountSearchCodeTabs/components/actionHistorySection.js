export async function rendorActionHistorySection() {
    return `
        <div class="card">
            <div class="card-header">
                <h5>Action History</h5>
            </div>
            <div class="card-body">
                <template x-for="(action, index) in actions" :key="index">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <div x-text="action.date"></div>
                            <div x-text="action.event"></div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    `;
}
