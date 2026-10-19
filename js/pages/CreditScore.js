// Page 701, Credit Score

import { fetchAPI } from '../api/fetch-api.js';
import { API_BASE } from '../../js/config.js';

export async function CreditScore() {

    const type = "CreditScore";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const creditScoreJson  = await fetchAPI(url, body);
    const creditScoreSettingsMapping = creditScoreJson.Settings;
    console.log(creditScoreSettingsMapping);


    const creditScoreSettingsUrl = `${API_BASE}/settingsApi.php?endpoint=view_creditscore_settings`;
    const creditScoreSettingsResult  = await fetchAPI(creditScoreSettingsUrl);
    const response = JSON.parse(creditScoreSettingsResult.response);
    const creditScoreSettingsData = response.data;
    console.log(creditScoreSettingsData);


    // --- 1. First pass: Process rows and find the highest score for each group ---
    const processedRows = [];
    const groupMaxScores = {};
    const groupCounts = {}; // Track total count of rows per group
    let totalScore = 0;

    creditScoreSettingsData.forEach(item => {
        const matches = Object.entries(creditScoreSettingsMapping).filter(([key, config]) => config.ID === item.id);
        
        matches.forEach(([name, config]) => {
            const parameter = config.PARAMETER;
            const display = config.DISPLAY;
            const value = parseFloat(item.value) || 0; // Ensure it's a number
            
            // Extract the group prefix (e.g., "LOS" from "LOS1")
            const groupMatch = name.match(/^[A-Z]+/);
            const group = groupMatch ? groupMatch[0] : 'Other';

            // Track the maximum value for this specific group
            if (groupMaxScores[group] === undefined || value > groupMaxScores[group]) {
                groupMaxScores[group] = value;
            }

            // Count occurrences to identify the last row later
            groupCounts[group] = (groupCounts[group] || 0) + 1;

            totalScore += value;

            processedRows.push({
                name,
                display,
                value,
                group,
                parameter
            });
        });
    });

    // --- 2. Second pass: Build the table rows with the highest group values ---
    let table = ""; 
    const currentGroupCounts = {}; // Track our progress as we loop

    processedRows.forEach(row => {
        // Increment the current row index for this group (1-based)
        

        currentGroupCounts[row.group] = (currentGroupCounts[row.group] || 0) + 1;

        let parameter = "";
        if ( currentGroupCounts[row.group] == 1 ) {
            parameter = row.parameter;
        }

        let highestScoreDisplay = "";

        // Display the highest score only if we are on the LAST row of the group
        if (currentGroupCounts[row.group] === groupCounts[row.group]) {
            highestScoreDisplay = groupMaxScores[row.group];
        }

        

        table += `<tr>
                <td>${parameter}</td>
                <td>${row.name}</td>
                <td>${row.display}</td>
                <td>${row.value}</td>
                <td>${highestScoreDisplay}</td>
            </tr>`;
    });

    // --- 3. Calculate total of highest scores and append the Total row ---
    const totalHighestScore = Object.values(groupMaxScores).reduce((sum, val) => sum + val, 0);

    table += `<tr class="table-active" style="font-weight: bold;">
            <td>&nbsp;</td>
            <td>Total</td>
            <td>&nbsp;</td>
            <td></td>
            <td>${totalHighestScore}</td>
        </tr>`;

    
    const html =  `
        <section class="container-fluid credit-score-section">
            <div class="row">
                <div class="col">
                    <h1>Credit Score Configuration</h1>
                    <div class="col-6">
                        <table class="table">
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
            </div>
        </section>
    `;

    return html;
}
