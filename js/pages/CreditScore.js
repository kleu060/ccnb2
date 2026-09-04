import { fetchAPI } from '../api/fetch-api.js';
import { API_BASE } from '../../js/config.js';


export async function CreditScore() {

    const type = "CreditScore";
    const body = {
        type
    };
    const url = `${API_BASE}/getMapping.php`;
    const creditScoreJson  = await fetchAPI(url, body);
    const creditScoreSettingsMapping = creditScoreJson.Settings
    console.log(creditScoreSettingsMapping);


    const creditScoreSettingsUrl = `${API_BASE}/settingsApi.php?endpoint=view_creditscore_settings`;
    const creditScoreSettingsResult  = await fetchAPI(creditScoreSettingsUrl);
    const response = JSON.parse(creditScoreSettingsResult.response);
    const creditScoreSettingsData = response.data;
    console.log(creditScoreSettingsData);


    // 2. Loop through the array of values
    let table = "" ; 
    creditScoreSettingsData.forEach(item => {

        const matches = Object.entries(creditScoreSettingsMapping).filter(([key, config]) => config.ID === item.id);
        matches.forEach(([name, config]) => {
            const display = config.DISPLAY;
            const value = item.value;

            table += `<tr>
                    <td>&nbsp;</td>
                    <td>${name}</td>
                    <td>${display}</td>
                    <td>${value}</td>
                    <td>&nbsp;</td>
                </tr>`;
        });
    });

    
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