export async function renderCommissionAgentTab(activeTab) {
    const html =  `
        <div class="tab-pane fade ${activeTab === 'agent' ? 'show active' : ''}" id="commission-agent-tab" role="tabpanel" aria-labelledby="commission-agent-tab">
            <div class="container-fluid">
                <h1>Commission Table</h1>
                <section id="commission-agent-section">
                    <div class="card mb-2">
                        <div class="card-body">
                            <div class="form-group">
                                <label>ID</label>
                                <span>103</span>  
                            </div>

                            <div class="form-group">
                                <label>Version Name</label>
                                <span>103</span>  
                            </div>

                            <div class="form-group">
                                <label>Remarks</label>
                                <span>migrate from xD</span>  
                            </div>
                        </div>
                    </div>

                    <div class="card mb-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <table id="commission-agent-table">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </section>
            </div>
        </div>
    `;

    
    return html;
}
