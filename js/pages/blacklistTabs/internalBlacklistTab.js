import { API_BASE } from '../../../js/config.js';
import { logEvent } from '../../../js/logEvent.js';
import { fetchAPI } from '../../api/fetch-api.js';


export async function renderInternalBlackListTab() {

    const html =  `
        <div class="tab-pane fade" id="internal-blacklist-tab" role="tabpanel" aria-labelledby="internal-blacklist-tab">
            <div class="container-fluid debtor-information">
                <h1>Internal Blacklist</h1>

                <div class="row mb-2 d-flex justify-content-between align-items-center">
                    <div class="col-3 ">
                        <div class="field-group justify-content-start">
                            <form id="internal-blacklist-form">
                                <label>Search ID</label>
                                <input type="text" name="search_id" id="search_id" value=""></input>
                                <button type="button" id="btn-internal-blaklist-form-submit" class="btn btn-primary">Submit</button>

                            </form>
                        </div>
                    </div>
                        
                    <div class="col-8">
                        <form id="internal-blacklist-bulk-upload-form" enctype="multipart/form-data">

                            <div class="col-12 d-flex align-items-end gap-2">
                                <div class="field-group justify-content-start flex-column ">
                                    <label>Bulk Upload</label>
                                    <input type="file" id="file-bulk-upload">
                                </div>
                                <button type="submit" id="btn-etr-upload" class="btn btn-primary mb-0">Upload</button>
                                <div id="internal-black-list-bulk-upload-loading" class="d-none">
                                    <img width="24px" height="24px" src="img/loading.gif"/>
                                </div>
                                <div id="internal-blacklist-bulk-upload-response" class="form-response upload-response-message">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div id="internal-blacklist-table-container">
                                            <div id="internal-blacklist-table-row" class="row internal-blacklist-table-row">
                                                <div class="col-12">
                                                    <table id="internal-blacklist-table">
                                                        <thead >
                                                            <tr id="internal-blacklist-table-header"></tr>
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>`;

        setTimeout(() => {
            const internalBlacklistBulkUploadForm = document.getElementById("internal-blacklist-bulk-upload-form");

            internalBlacklistBulkUploadForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const internalBlackListBulkUploadLoading = document.getElementById("internal-black-list-bulk-upload-loading");
                internalBlackListBulkUploadLoading.classList.remove("d-none");

                const internalBlacklistBulkUploadResponse = document.getElementById("internal-blacklist-bulk-upload-response");
                internalBlacklistBulkUploadResponse.classList.remove("invalid");
                internalBlacklistBulkUploadResponse.classList.remove("valid");

                const formData = new FormData();
                const fileInput = document.getElementById("file-bulk-upload");
                if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                    alert('Please select a file to upload.');
                    return;
                }

                formData.append("file", fileInput.files[0]);


                const url = `${API_BASE}/index.php?endpoint=id_blacklist_excel_upload`;
                const response = await fetch(url, {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });
                const result = await response.json();
                // const result = await fetchAPI(url, formData);




                const inner = JSON.parse(result.response);
                internalBlackListBulkUploadLoading.classList.add("d-none");
                if ( !result.success ) {

                    internalBlacklistBulkUploadResponse.innerHTML = inner.error_description;
                    internalBlacklistBulkUploadResponse.classList.add("invalid");
                    
                    
                }
                else {
                    if ( inner.error_code == 0) {
                        internalBlacklistBulkUploadResponse.innerHTML = "Excel file uploaded successfully";
                        internalBlacklistBulkUploadResponse.classList.add("valid");

                    }
                    else {
                        internalBlacklistBulkUploadResponse.innerHTML = inner.error_description;
                        internalBlacklistBulkUploadResponse.classList.add("invalid");
                    }
                }
                console.log(result);
            })
        , 0});



    return html;
}