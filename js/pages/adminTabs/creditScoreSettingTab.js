// Page 1002, Admin > Credit Score Setting

import { API_BASE } from '../../config.js';
import { PAGES } from '../../variables.js';
import { getGroups, getGroupAccess } from "./functions/functions.js";
import { fetchAPI } from '../../api/fetch-api.js';

export async function renderCreditScoreSettingTab() {
    const type = "CreditScore";
    const body = { type };
    const url = `${API_BASE}/getMapping.php`;
    const creditScoreJson = await fetchAPI(url, body);
    const creditScoreSettingsMapping = creditScoreJson.Settings;

    const creditScoreSettingsUrl = `${API_BASE}/settingsApi.php?endpoint=view_creditscore_settings`;
    const creditScoreSettingsResult = await fetchAPI(creditScoreSettingsUrl);
    const response = JSON.parse(creditScoreSettingsResult.response);
    const creditScoreSettingsData = response.data;

    const processedRows = [];
    const groupMaxScores = {};
    const groupCounts = {}; 
    let totalScore = 0;

    creditScoreSettingsData.forEach(item => {
        const matches = Object.entries(creditScoreSettingsMapping).filter(([key, config]) => config.ID === item.id);
        
        matches.forEach(([name, config]) => {
            const id = item.id;
            const display = config.DISPLAY;
            const parameter = config.PARAMETER;
            const value = parseFloat(item.value) || 0; 
            
            const groupMatch = name.match(/^[A-Z]+/);
            const group = groupMatch ? groupMatch[0] : 'Other';

            if (groupMaxScores[group] === undefined || value > groupMaxScores[group]) {
                groupMaxScores[group] = value;
            }

            groupCounts[group] = (groupCounts[group] || 0) + 1;
            totalScore += value;

            processedRows.push({ id, name, display, value, group, parameter });
        });
    });

    let table = ""; 
    const currentGroupCounts = {}; 

    processedRows.forEach(row => {
        currentGroupCounts[row.group] = (currentGroupCounts[row.group] || 0) + 1;

        let parameter = "";
        if ( currentGroupCounts[row.group] == 1 ) {
            parameter = row.parameter;
        }

        let highestScoreDisplay = "";

        // Add 'data-last-in-group="true"' to mark where the highest score should be displayed
        const isLastInGroup = currentGroupCounts[row.group] === groupCounts[row.group];
        if (isLastInGroup) {
            highestScoreDisplay = groupMaxScores[row.group];
        }

        // Added data attributes to inputs and cells for easy DOM querying
        table += `<tr class="score-row" data-group="${row.group}">
                <td>${parameter}</td>
                <td>${row.name}</td>
                <td>${row.display}</td>
                <td>
                    <input type="number" step="any" value="${row.value}" class="input-score form-control" data-credit-score-id="${row.id}">
                </td>
                <td class="highest-score-cell" data-last-in-group="${isLastInGroup}">${highestScoreDisplay}</td>
            </tr>`;
    });

    const totalHighestScore = Object.values(groupMaxScores).reduce((sum, val) => sum + val, 0);

    // Added specific classes to the total row cells for targeting during updates
    table += `<tr class="table-active total-row" style="font-weight: bold;">
            <td>&nbsp;</td>
            <td>Total</td>
            <td>&nbsp;</td>
            <td class="total-score-val"></td>
            <td class="total-highest-score-val">${totalHighestScore}</td>
        </tr>`;

    const html = `
        <div class="tab-pane fade" id="credit-score-setting-tab" role="tabpanel" aria-labelledby="credit-score-setting-tab" >
            <div class="card">
                <div class="card-header">
                    <h1>Credit Score Setting</h1>
                </div>
                <div class="card-body">
                    <div class="col-6">
                        <table class="table" id="credit-score-table">
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Grade</th>
                                    <th>Description</th>
                                    <th>Score</th>
                                    <th>Highest Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${table}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="btn btn-primary" id="btn-update-credit-score-setting">Update</div>
                </div>
            </div>
        </div>
    `;
// data\":[{\"id\":1,\"value\":0},{\"id\":2,\"value\":0},{\"id\":3,\"value\":0},{\"id\":4,\"value\":0},{\"id\":5,\"value\":0},{\"id\":6,\"value\":0},{\"id\":7,\"value\":0},{\"id\":8,\"value\":0},{\"id\":9,\"value\":0},{\"id\":10,\"value\":0},{\"id\":11,\"value\":0},{\"id\":12,\"value\":0},{\"id\":13,\"value\":0},{\"id\":14,\"value\":0},{\"id\":15,\"value\":0},{\"id\":16,\"value\":0},{\"id\":17,\"value\":0},{\"id\":18,\"value\":0},{\"id\":19,\"value\":0}]}"}
    setTimeout (function(){
        initCreditScoreListeners();

        const btnUpdateCreditScoreSetting = document.getElementById('btn-update-credit-score-setting');
        btnUpdateCreditScoreSetting.addEventListener('click', async function(){
            let data = [];
            const inputScores = document.querySelectorAll(".input-score");
            inputScores.forEach( input => {
                const id = input.dataset.creditScoreId;
                const value = input.value;
                data.push({
                    "id": id,
                    "value": value
                })
            });
            console.log(data);
            const body = { data };

            const editCreditScoreSettingsUrl = `${API_BASE}/settingsApi.php?endpoint=edit_creditscore_settings`;
            const editCreditScoreSettingsResult = await fetchAPI(editCreditScoreSettingsUrl, body);
            console.log(editCreditScoreSettingsResult);
        });


    }, 1000)
    return html;
}

/**
 * Initializes real-time calculations for the Credit Score table.
 * Run this function immediately after injecting the HTML into your DOM container.
 */
export function initCreditScoreListeners() {
    const table = document.getElementById('credit-score-table');
    if (!table) return;

    table.addEventListener('input', (event) => {
        if (!event.target.classList.contains('input-score')) return;

        const rows = Array.from(table.querySelectorAll('.score-row'));
        const groupMaxScores = {};
        let totalScore = 0;

        // 1. First pass: Collect all current input values and determine the max per group
        rows.forEach(row => {
            const group = row.getAttribute('data-group');
            const input = row.querySelector('.input-score');
            const val = parseFloat(input.value) || 0;

            totalScore += val;

            if (groupMaxScores[group] === undefined || val > groupMaxScores[group]) {
                groupMaxScores[group] = val;
            }
        });

        // 2. Second pass: Update the "Highest Score" cells in the DOM
        rows.forEach(row => {
            const group = row.getAttribute('data-group');
            const highestCell = row.querySelector('.highest-score-cell');
            
            // Only update the cell if it is marked as the container for the group's highest score
            if (highestCell.getAttribute('data-last-in-group') === 'true') {
                highestCell.textContent = groupMaxScores[group];
            }
        });

        // 3. Third pass: Calculate total of highest scores and update total rows
        const totalHighestScore = Object.values(groupMaxScores).reduce((sum, val) => sum + val, 0);
        
        // table.querySelector('.total-score-val').textContent = totalScore;
        table.querySelector('.total-highest-score-val').textContent = totalHighestScore;
    });
}
