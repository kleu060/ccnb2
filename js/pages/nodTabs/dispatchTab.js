// Page 605, NOD > Dispatch
import * as bootstrap from 'bootstrap'; // Add this at the top
import { loadDispatchTable, loadViewScheduleTable, loadDispatchScheduleTable } from "./functions/functions.js";
import { API_BASE } from '../../config.js';
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderDispatchTab() {

    const html = `
        <div class="tab-pane fade show active" id="dispatch-tab" role="tabpanel" aria-labelledby="dispatch-tab">
            <div class="card">
                <div class="card-header">
                    <h1>Dispatch</h1>
                    <div class="d-flex">
                        <div class="col-4">
                            <button class="btn btn-primary " id="btn-dispatch-download">Download</button>
                            <div id="dispatch-download-message"></div>
                        </div>
                        <div class="col-4">
                            <form id="dispatch-upload-form" enctype="multipart/form-data">
                                <input type="file" id="dispatch-upload-file"/>
                                <div class="d-flex me-1"
                                    <button class="btn btn-primary" id="btn-dispatch-upload">Upload</button>
                                    <div id="dispatch-upload-loading" class="d-none">
                                        <img width="24px" height="24px" src="img/loading.gif"/>
                                    </div>
                                </div>

                                <div id="dispatch-upload-response" class="form-response upload-response-message error-message"></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <table id="nod-dispatch-table">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal" id="nod-view-schedule-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>View Schedule</h2>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <table id="nod-view-schedule-table">
                                    <thead></thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="nod-dispatch-schedule-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>NOD Dispatch</h2>
                    </div>
                    <div class="modal-body">
                        <div class="mb-1 field-group">
                            <label>Schdule ID</label>
                            <span >313574</span>
                        </div>

                        <div class="mb-1 field-group">
                            <label>Account Count</label>
                            <span >908</span>
                        </div>

                        <div class="mb-1 field-group">
                            <button class="btn btn-primary  me-2">Confirm Dispatch</button>
                            <button class="btn btn-primary">Refresh</button>
                        </div>    
                        <div class="row">
                            <div class="col-12">
                                <table id="nod-dispatch-schedule-table">
                                    <thead></thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        `;

        setTimeout(function(){
                loadDispatchTable();

                const nodDispatchTable = document.getElementById('nod-dispatch-table');
                const viewScheduleModalElement = document.getElementById("nod-view-schedule-modal");
                const viewScheduleModal = new bootstrap.Modal(viewScheduleModalElement);
                const viewDisplayModalElement = document.getElementById("nod-dispatch-schedule-modal");
                const viewDispatchModal = new bootstrap.Modal(viewDisplayModalElement);

                nodDispatchTable.addEventListener("click" , async (e) => {
                    const viewSchuduleBtn = e.target.closest('.btn-view-schedule-action');
                    if (viewSchuduleBtn) {
                        const scheduleId = viewSchuduleBtn.dataset.id;
                        loadViewScheduleTable(scheduleId);
                        viewScheduleModal.show();
                    }

                    const dispatchSchuduleBtn = e.target.closest('.btn-dispatch-schedule-action');
                    if (dispatchSchuduleBtn) {
                        loadDispatchScheduleTable();
                        viewDispatchModal.show();
                    }
                });

                const btnDispatchDownload = document.getElementById('btn-dispatch-download');
                btnDispatchDownload.addEventListener("click", async(e) => {
                    console.log("download dispatch");
                    const url = `${API_BASE}/dunningGroup.php?endpoint=download_nod_account_list`;
                    document.getElementById('dispatch-download-message').innerHTML = "Download link will appear when it is ready";

                    fetch(url, {
                        method: "POST",
                        credentials: "include"
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json(); // Parse JSON response from PHP
                    })
                    .then(data => {
                        if (data.success) {
                            document.getElementById('dispatch-download-message').innerHTML = `Download <a href="${API_BASE}/download-blacklist.php?file=${data.response}" download> ${data.response}`;
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

                            document.getElementById('dispatch-download-message').innerHTML = `Error: ${data.response.error_description}`;
                        }
                    });
                });

                const dispatchUploadForm = document.getElementById('dispatch-upload-form');
                dispatchUploadForm.addEventListener("submit", async(e) => {
                    e.preventDefault();

                    document.getElementById('dispatch-upload-loading').classList.remove("d-none");

                    document.getElementById('dispatch-upload-response').classList.remove("invalid");
                    document.getElementById('dispatch-upload-response').classList.remove("valid");

                    const formData = new FormData();
                    const fileInput = document.getElementById("dispatch-upload-form");
                    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                        alert('Please select a file to upload.');
                        return;
                    }

                    formData.append("file", fileInput.files[0]);

                    // Create an AbortController instance
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

                    const url = `${API_BASE}/dunningGroup.php?endpoint=upload_nod_account_list`;

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

                        const inner = JSON.parse(result.response);
                        document.getElementById('dispatch-upload-loading').classList.add("d-none");
                        if ( !result.success ) {
                            if ( inner.error_code == 2) {
                                document.getElementById("expire-container").style.display = "block";
                                //access token expire;
                                setTimeout(function(){
                                    document.getElementById("expire-container").style.display = "none";
                                    window.location.href="/ccnb2/login?msg=Access token expired";
                                }, 3000);
                            }

                            document.getElementById('dispatch-upload-response').innerHTML = inner.error_description;
                            document.getElementById('dispatch-upload-response').classList.add("invalid");
                        }
                        else {
                            if ( inner.error_code == 0) {
                                document.getElementById('dispatch-upload-response').innerHTML  = "File uploaded successfully";
                                document.getElementById('dispatch-upload-response').classList.add("valid");

                                if ( inner.error_code == 2) {
                                    document.getElementById("expire-container").style.display = "block";
                                    //access token expire;
                                    setTimeout(function(){
                                        document.getElementById("expire-container").style.display = "none";
                                        window.location.href="/ccnb2/login?msg=Access token expired";
                                    }, 3000);
                                }
                                
                                document.getElementById('dispatch-upload-response').innerHTML = inner.error_description;
                                document.getElementById('dispatch-upload-response').classList.add("invalid");

                            }
                        }
                    }
                    catch(error) {
                        // Clear timeout to prevent memory leaks
                        clearTimeout(timeoutId);
                        
                        // Hide loading spinner
                        document.getElementById('dispatch-upload-loading').classList.add("d-none");
                        // Style the response text as invalid (usually red)
                        document.getElementById('dispatch-upload-response').classList.add("invalid");

                        if (error.name === 'AbortError') {
                            // User retry notification text
                            document.getElementById('dispatch-upload-response').innerHTML = "The request timed out after 30 seconds. Please try uploading your file again.";
                        } else {
                            document.getElementById('dispatch-upload-response').innerHTML = "A network error occurred. Please check your connection and retry.";
                        }
                        console.error("Upload error details:", error);
                    }
                });


        }, 1000);

        return html;
}