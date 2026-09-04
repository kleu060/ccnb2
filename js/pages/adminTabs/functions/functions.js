import { mockData } from "../../../components/mockData.js";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { API_BASE } from '../../../config.js';
import { fetchAPI } from '../../../../js/api/fetch-api.js';

let userTable = null;

async function getUsers() {

    const url = `${API_BASE}/index.php?endpoint=list_users`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch users data");
    }



}

export async function loadUserTable(groups) {
    console.log(groups);
    const columnsConfig = {
        users: [
            {
                title: "Action",
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <button data-user-id="${row.user_id}" class="btn btn-primary btn-edit-user">Edit</button>
                    `;
                }
            },
            { title: "Username", data: "user_name" },
            { title: "Full Name", data: "full_name" },
            { title: "Department", data: "department" },
            { title: "Phone", data: "phone" },
            { title: "Email", data: "email" }, 
            { title: "Remarks", data: "remark" }, 
            { 
                title: "Group", 
                data: "group_id",
                render: function (data, type, row) {
                    // Look up the description inside the constant map, not the user list
                    const matchedGroup = Object.values(groups).find(g => g.ID == data);
                    
                    // Use capitalized key .DESCRIPTION as returned by your PHP API
                    return matchedGroup ? matchedGroup.NAME : (data || "No Group");
                }
            },
            { title: "Last Login", data: "last_login_time" },
            { 
                title: "Online", 
                data: null,
                render: function (data, type, row) {
                    return row.online == 0 ? "Offline" : "Online"
                    
                }
            },
            { title: "Created Date", data: "created" },
        ],
    };

    console.log("loadUserTable");
    const userData = await getUsers();
    
    console.log(userData);
    if (userTable) {
        userTable.destroy();
        document.querySelector("#user-management-table tbody").innerHTML = "";
        // document.querySelector("#user-management-table-header").innerHTML = "";
    }

    // Create new DataTable
    userTable = new DataTable("#user-management-table", {
        data: userData,
        columns: columnsConfig["users"],
        searching: false,
    });
    console.log(userTable);
}

export async function loadUser(user_id) {
    const body = {
        user_id,
        
    };

    const url = `${API_BASE}/user.php?endpoint=view_user`;
    const responseJson = await fetchAPI(url, body);
    console.log(responseJson);


    // const responseJson = {
    //     "loginName": "kw",
    //     "fullName": "KW Leung",
    //     "department": "Department",
    //     "phone": "12314",
    //     "email": "kw@dascomtechnology.com",
    //     "remark": "remark",
    //     "securityGroup": "system1",
    //     "online": "Yes",
    //     "firstLogin": "No",
    //     "locked": "No",
    // };

    return JSON.parse(responseJson.response);
}

export async function getGroups() {
    const url = `${API_BASE}/index.php?endpoint=list_groups`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch groups data");
    }
}

export async function getGroupAccess() {
    const url = `${API_BASE}/index.php?endpoint=list_group_access`;
    const responseJson = await fetchAPI(url);
    if ( responseJson.success == true ) {
        return JSON.parse(responseJson.response);
    }
    else {
        console.error("Failed to fetch access list data");
    }
}