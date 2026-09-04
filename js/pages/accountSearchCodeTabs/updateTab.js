import { rendorSearchFormSection } from "./components/searchFormSection.js";
import { rendorAccountDetailSection } from "./components/accountDetailSection.js";
import { rendorNoResultSection } from "./components/noResultSection.js";
import { rendorAgentUpdateSection } from "./components/agentUpdateSection.js";
import { rendorAccountTableSection } from "./components/accountTableSection.js";
import { rendorActionHistorySection } from "./components/actionHistorySection.js";
import { accCodeFormSubmit, accIdFormSubmit, getAccountCodeSubInfo, updateContactType} from "./functions/functions.js";
// import TomSelect from 'tom-select';
import { fetchAPI } from '../../api/fetch-api.js';
import { API_BASE } from '../../config.js';



export async function renderUpdateTab() {
    
    const html =  `
        <div class="tab-pane fade" id="update-tab" role="tabpanel" aria-labelledby="update-tab">
            <section class="container-fluid" id="update-tab">
                <h1>Update</h1>
                
                
                </div>
            </section>
        </div>`;

        setTimeout( async() => {

        }, 0 );

    return html;
}