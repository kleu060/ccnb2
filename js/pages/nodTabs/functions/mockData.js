export const mockNodProfileData = {
    nodProfile: [
        {
            action: '<button class="btn btn-primary btn-edit-nod-profile">Edit</button>',
            solicitor_code: "AFNC",
            solicitor_name: "Amir Faezal Norzela & Chong",
            contact_name: "",
            contact_phone: "",
            status: "1",
            bg_expiry: ""
        }
    ],

    dispatch: [
        {
            action: '<button class="btn btn-primary btn-view-schedule-action">View</button>',
            schedule_id: "313572",
            file_id: "NOD_20260201_01.txt",
            account_total: "631",
            amount_total: "609111",
            dispatch: "Y",
            update_date: "2026-02-01",
            assign_date: "2026-02-02"
        },
        {
            action: '<button class="btn btn-primary btn-dispatch-schedule-action">Dispatch</button>',
            schedule_id: "313572",
            file_id: "NOD_20260201_01.txt",
            account_total: "631",
            amount_total: "609111",
            dispatch: "Y",
            update_date: "2026-02-01",
            assign_date: "2026-02-02"
        }
    ],
    mockNodViewScheduleData : [
        {
            schedule_id: "313572",
            batch_id: "29356",
            solicitor: "AFNC",
            account_total: "221",
            amount_total: "209111",
            assign_date: "2026-02-02",
        }
    ],
    mockdispatchScheduleData: [
        {
            solicitor_code: "AFNC",
            allocatioin_percentage: "<input type='text' value='33'></input>",
            estimate_number: "303",
        },
        {
            solicitor_code: "ADRO",
            allocatioin_percentage: "<input type='text' value='33'></input>",
            estimate_number: "303",
        },
        {
            solicitor_code: "WONG",
            allocatioin_percentage: "<input type='text' value='33'></input>",
            estimate_number: "302",
        },
    ],

};