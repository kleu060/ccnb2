import { getActiveAssignmentList , getActiveAssignmentListTableData } from "../api/active-assignment-list-api.js";

export async function ActiveAssignmentList() {
    const activeAssignmentList = await getActiveAssignmentList();
    // const getActiveAssignmentListTableactions = await getActiveAssignmentListTableData();
    
    return `
        <section class="container-fluid active-assignment-list-section">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body" x-data='${JSON.stringify({ activeAssignmentList })}'>
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <h4 class=""><span x-text="activeAssignmentList.account_name"></span></h4>
                                    <div>Active Assignment List</div>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="col-8 border border-1 p-3">
                                    <form>
                                        <div class="row row-cols-2 ">
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="account_no" >Account No.</label>
                                                    <input type="text" id="account_no" name="account_no"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="customer_id">Customer ID No.</label>
                                                    <input type="text" name="customer_id_no" id="customer_id"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="agency" >Agency</label>
                                                    <input type="text" id="agency" name="agency"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="assignment_date" >Assignment Date</label>
                                                    <input type="date" id="assignment_date" name="assignment_date"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="assignment_expiry_date" >Assignment Expiry Date</label>
                                                    <input type="date" id="assignment_expiry_date" name="assignment_expiry_date"/>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="field-group">
                                                    <label for="account_grouping" >Assignment Groupoing</label>
                                                    <input type="text" id="account_grouping" name="account_grouping"/>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="row text-center mt-4">
                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary">Search</button>
                                                <button type="button" class="btn btn-secondary">Cancel</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            
                            <div class="row>
                                <div class="col-12">
                                    <table id="active-assignment-list-table">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
    `;
}