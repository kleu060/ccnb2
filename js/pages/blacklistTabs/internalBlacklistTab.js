import { API_BASE } from '../../../js/config.js';
import { logEvent } from '../../../js/logEvent.js';
import { fetchAPI } from '../../api/fetch-api.js';
import { fetcIdBlackListSearchData, loadBlacklistFraudTable  } from './functions/functions.js';


export async function renderInternalBlackListTab() {
    const userType = "fraud";

    const html =  `
        <div class="tab-pane fade" id="internal-blacklist-tab" role="tabpanel" aria-labelledby="internal-blacklist-tab">
            <div class="container-fluid debtor-information">
                <h1>Internal Blacklist (Fraud)</h1>

                <div class="row mb-2 d-flex justify-content-between align-items-center">
                    <div class="col-3 ">
                        <div class="field-group justify-content-start">
                            <form id="internal-blacklist-fraud-form">
                                <label>Search ID</label>
                                <input type="text" name="id_num_fraud" id="id_num_fraud" value=""></input>
                                <button type="submit" id="btn-internal-blaklist-fraud-form-submit" class="btn btn-primary">Submit</button>

                            </form>
                        </div>
                    </div>

                    <div class="col-6 d-flex gap-2 align-self-end align-items-center" x-data>
                        <a href="#" class="btn btn-primary" id="btn-id-blacklist-excel-download">ID Blacklist Excel Download</a>
                        <div id="id-blacklist-excel-download-message">
                            <template x-if="$store.user_data.latest_id_blacklist_file_${userType}">
                                <div>
                                    Download 
                                    <a :href="'${API_BASE}/download-blocklist.php?file=' + $store.user_data.latest_id_blacklist_file" download>
                                        <span x-text="$store.user_data.latest_id_blacklist_file_${userType}"></span>
                                    </a>
                                </div>
                            </template>
                        </div>
                    </div>
                        
                    <div class="col-3">
                        <form id="internal-blacklist-bulk-upload-form" enctype="multipart/form-data">

                            <div class="col-12 d-flex align-items-end gap-2">
                                <div class="field-group justify-content-start flex-column ">
                                    <div class="d-flex align-items-center">
                                        <label>Bulk Upload</label> 
                                        <a class="text-nowrap" href="${API_BASE}/download-blocklist.php?file=sample-id-blacklist.xlsx">Download Sample</a>
                                    </div>
                                    <input type="file" id="file-bulk-upload">
                                </div>
                                <button type="submit" id="file-bulk-upload" class="btn btn-primary mb-0">Upload</button>
                                <div id="internal-black-list-bulk-upload-loading" class="d-none">
                                    <img width="24px" height="24px" src="img/loading.gif"/>
                                </div>
                            </div>
                            <div id="internal-blacklist-bulk-upload-response" class="form-response upload-response-message"></div>
                        </form>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div id="internal-blacklist-fraud-table-container">
                                            <div id="internal-blacklist-fraud-table-row" class="row internal-blacklist-table-row">
                                                <div class="col-12">
                                                    <table id="internal-blacklist-table-fraud">
                                                        <thead >
                                                            <tr id="internal-blacklist-table-fraud-header"></tr>
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

            /* Submit Search form */
            // const btnInternalBlaklistFraudFormSubmit = document.getElementById("btn-internal-blaklist-fraud-form-submit");
            const internalBlacklistFraudForm = document.getElementById("internal-blacklist-fraud-form");
            internalBlacklistFraudForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const idNum = document.getElementById("id_num_fraud").value;

                let fetchResult = await fetcIdBlackListSearchData(idNum);
                loadBlacklistFraudTable( fetchResult );

            });

            const tableContainer = document.getElementById('internal-blacklist-fraud-table-container');
            tableContainer.addEventListener('click', async (e) => {
                const btn = e.target.closest('.btn-internal-blacklist-fraud-deblacklist');
                if (!btn) return;
                if ( confirm("Confirm Deblacklist Account?") ) {
                    const blacklistType = "id_num";
                    const searchString = btn.dataset.idNum ;
                    const idType = btn.dataset.idType ;
                    const body = {
                        blacklistType,
                        searchString,
                        idType
                    };
                    // console.log(JSON.stringify(body));
                    const url = `${API_BASE}/index.php?endpoint=deblacklist`;
                    await fetchAPI(url, body);

                    const idNum = document.getElementById("id_num_fraud").value;

                    let fetchResult = await fetcIdBlackListSearchData(idNum);
                    loadBlacklistFraudTable( fetchResult );
                    
                }

            });


            const internalBlacklistBulkUploadForm = document.getElementById("internal-blacklist-bulk-upload-form");
            const btnIdBlacklistExcelDownload = document.getElementById("btn-id-blacklist-excel-download");

            btnIdBlacklistExcelDownload.addEventListener("click", async (e) => {
                e.preventDefault();

                const url = `${API_BASE}/index.php?endpoint=id_blacklist_excel_download`;
                const idBlacklistExcelDownloadMessage = document.getElementById("id-blacklist-excel-download-message");
                idBlacklistExcelDownloadMessage.innerHTML = "Download link will appear when it is ready";

                // Trigger the fetch request
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        requester: userType // Replace with your actual variable or string
                    }),
                    credentials: "include"
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse JSON response from PHP
                })
                .then(data => {
                    // SUCCESS: Executed when the fetch completely finishes                    
                    // Show the download link or success message
                    if (data.success) {
                        idBlacklistExcelDownloadMessage.innerHTML = `Download <a href="${API_BASE}/download-blocklist.php?file=${data.response}" download> ${data.response}`;
                    }
                    else {
                        if ( data.response.error_code == 2) {
                            document.getElementById("expire-container").style.display = "block";
                            //access token expire;
                            setTimeout(function(){
                                document.getElementById("expire-container").style.display = "none";
                                window.location.href="/ccnb2/login?msg=Access token expired";
                            }, 3000);
                        }

                        idBlacklistExcelDownloadMessage.innerHTML = `Error: ${data.response.error_description}`;
                    }
                })

                .catch(error => {
                    // ERROR: Executed if the network fails or PHP returns an error
                    console.error("Fetch failed:", error);
                    idBlacklistExcelDownloadMessage.innerHTML = "Failed to generate download link. Please try again.";
                });

                
            });

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
                formData.append("requester", userType);

                // Create an AbortController instance
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

                const url = `${API_BASE}/index.php?endpoint=id_blacklist_excel_upload`;
                
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        body: formData,
                        credentials: "include",
                        signal: controller.signal // Pass the abort signal here
                    });
                    
                    // Clear the timeout if the request completes successfully
                    clearTimeout(timeoutId);

                    const result = await response.json();
                    // const result = await fetchAPI(url, formData);

                    const inner = JSON.parse(result.response);
                    internalBlackListBulkUploadLoading.classList.add("d-none");
                    if ( !result.success ) {

                        if ( inner.error_code == 2) {
                            document.getElementById("expire-container").style.display = "block";
                            //access token expire;
                            setTimeout(function(){
                                document.getElementById("expire-container").style.display = "none";
                                window.location.href="/ccnb2/login?msg=Access token expired";
                            }, 3000);
                        }

                        internalBlacklistBulkUploadResponse.innerHTML = inner.error_description;
                        internalBlacklistBulkUploadResponse.classList.add("invalid");
                        
                        
                    }
                    else {
                        if ( inner.error_code == 0) {
                            internalBlacklistBulkUploadResponse.innerHTML = "Excel file uploaded successfully";
                            internalBlacklistBulkUploadResponse.classList.add("valid");

                        }
                        else {

                            if ( inner.error_code == 2) {
                                document.getElementById("expire-container").style.display = "block";
                                //access token expire;
                                setTimeout(function(){
                                    document.getElementById("expire-container").style.display = "none";
                                    window.location.href="/ccnb2/login?msg=Access token expired";
                                }, 3000);
                            }
                            
                            internalBlacklistBulkUploadResponse.innerHTML = inner.error_description;
                            internalBlacklistBulkUploadResponse.classList.add("invalid");
                        }
                    }

                    fileInput.value = "";
                    console.log(result);

                } catch (error) {
                    // Clear timeout to prevent memory leaks
                    clearTimeout(timeoutId);
                    
                    // Hide loading spinner
                    internalBlackListBulkUploadLoading.classList.add("d-none");
                    // Style the response text as invalid (usually red)
                    internalBlacklistBulkUploadResponse.classList.add("invalid");

                    if (error.name === 'AbortError') {
                        // User retry notification text
                        internalBlacklistBulkUploadResponse.innerHTML = "The request timed out after 30 seconds. Please try uploading your file again.";
                    } else {
                        internalBlacklistBulkUploadResponse.innerHTML = "A network error occurred. Please check your connection and retry.";
                    }
                    console.error("Upload error details:", error);
                }
                console.log(result);
            })
        , 0});



    return html;
}