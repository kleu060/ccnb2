export const mockData = {

    subscriber: [
        { 
            subscriber_id: "100030000000380475", 
            account_id: "100030000000360232", 
            activation_date: "",
            status: "Active", 
            status_reason: "",
            status_date: "2-Apr-2026",
            msisdn: "1016600799",
            imsi: "",
            nai: "",
            fixed_line_no: "",
            iccid: "",
        },
        { 
            subscriber_id: "100030000000380435", 
            account_id: "100030000000380438", 
            activation_date: "",
            status: "Deactivation", 
            status_reason: "customer applies barring",
            status_date: "",
            msisdn: "",
            imsi: "",
            nai: "070200063@celcomhome",
            fixed_line_no: "",
            iccid: "",
        },
        
    ],
    dca: [
        { 
            agency: "Celcom", 
            from: "2025-01-01", 
            outstanding: "$5000.00", 
            collected_amount : "$2000.00"
        },
        { 
            agency: "Celcom", 
            from: "2025-01-01", 
            outstanding: "$5000.00", 
            collected_amount : "$2000.00"
        },
        { 
            agency: "Celcom", 
            from: "2025-01-01", 
            outstanding: "$5000.00", 
            collected_amount : "$2000.00"
        },
        { 
            agency: "Celcom", 
            from: "2025-01-01", 
            outstanding: "$5000.00", 
            collected_amount : "$2000.00"
        },
        
    ],

    invoice: [
        {
            invoice_number: "INV001",
            invoice_date: "2026-03-01",
            inovice_due_date: "2026-04-01",
            amount: 1000,
            outstanding: 250,
            status: "Open",
            invoice_close_date: "2026-05-01"
        },
        {
            invoice_number: "INV002",
            invoice_date: "2026-02-10",
            inovice_due_date: "2026-03-10",
            amount: 500,
            outstanding: 0,
            status: "Closed",
            invoice_close_date: "2026-03-15"
        }
    ],

    payment: [
        { 
            payment_id: "876043", 
            payment_date: "20251119065524", 
            amount: "500", 
            payment_method: "" ,
            status: "N",
            reversal_date: "",
            reversal_reason: "" 
        },
        { 
            payment_id: "876044", 
            payment_date: "20251119031106", 
            amount: "150", 
            payment_method: "" ,
            status: "R",
            reversal_date: "20251119091433",
            reversal_reason: "3000045:DR_reversal_rebate" 
        },
        { 
            payment_id: "876243", 
            payment_date: "20251119071536", 
            amount: "80", 
            payment_method: "" ,
            status: "D",
            reversal_date: "",
            reversal_reason: "" 
        },
        
    ]
};


export const mockAdjustmentData = {

    adjustment: [
        { 
            adjustment_id: "", 
            adjust_date: "", 
            amount: "", 
            status: "" ,
            reversal_date: "",
        },
    ]
};

export const activeListAssignmentMockData = {
    data: [
        { 
            customer_name: "C001", 
            id_number: "123123", 
            account_code: "5464561", 
            msisdn: "45654afda" ,

        },
        { 
            customer_name: "C001", 
            id_number: "123123", 
            account_code: "5464561", 
            msisdn: "45654afda" ,

        },
        { 
            customer_name: "C001", 
            id_number: "123123", 
            account_code: "5464561", 
            msisdn: "45654afda" ,

        },
        { 
            customer_name: "C001", 
            id_number: "123123", 
            account_code: "5464561", 
            msisdn: "45654afda" ,

        },
        { 
            customer_name: "C001", 
            id_number: "123123", 
            account_code: "5464561", 
            msisdn: "45654afda" ,

        },
       
        
    ]
}

export const mockCustomerData = {
    data: [
        { 
            account_code: "", 
            account_id: "100000000000122154", 
            subscriber_id: "", 
            parent_acct_ID: "" ,
            acct_status: "" ,
            billable_flag: "0" ,
            credit_limit: "500" ,
            outstanding: "" ,

        },
        { 
            account_code: "", 
            account_id: "100000000000700502", 
            subscriber_id: "", 
            parent_acct_ID: "" ,
            acct_status: "" ,
            billable_flag: "0" ,
            credit_limit: "200" ,
            outstanding: "" ,

        },
        { 
            account_code: "", 
            account_id: "100000000000693668", 
            subscriber_id: "", 
            parent_acct_ID: "100000000000122154" ,
            acct_status: "" ,
            billable_flag: "1" ,
            credit_limit: "300" ,
            outstanding: "" ,

        },
        { 
            account_code: "", 
            account_id: "100000000000693668", 
            subscriber_id: "", 
            parent_acct_ID: "100000000000700502" ,
            acct_status: "" ,
            billable_flag: "1" ,
            credit_limit: "200" ,
            outstanding: "" ,

        },
        
    ]
}

export const mockBlacklistInquiryData = {
    data: [
        { 
            customer_name: "ABC Lee", 
            id_type: "1", 
            id_number: "1921000", 
            account_code: "9012123333", 
            acct_blacklist: "Yes" ,
            status_date: "" ,
            etr_blacklist: "Yes" ,
            outstanding_bal: "225.5" ,
            aging_bal: "120" ,
            acct_id: "100000000000370679" ,
            customer_id: "100000000000370677",
            action: "<a target='_blank' href='/print.html?id=100000000000370679' class='btn btn-primary mb-1'>Print</a> <a class='btn btn-primary'>Deblacklist</a>"

        },

        { 
            customer_name: "ABC Lee", 
            id_type: "2", 
            id_number: "1921000",
            account_code: "9012123333", 
            acct_blacklist: "No" ,
            status_date: "" ,
            etr_blacklist: "No" ,
            outstanding_bal: "120" ,
            aging_bal: "0" ,
            acct_id: "100030000000359943" ,
            customer_id: "100030000000359941",
            action: "<a target='_blank' href='/print.html?id=100000000000370679' class='btn btn-primary mb-1'>Print</a> <a class='btn btn-primary'>Deblacklist</a>"

        },

        { 
            customer_name: "ABC Lee", 
            id_type: "4", 
            id_number: "902222",
            account_code: "9012902222", 
            acct_blacklist: "No" ,
            status_date: "" ,
            etr_blacklist: "No" ,
            outstanding_bal: "120" ,
            aging_bal: "0" ,
            acct_id: "100000000000363248" ,
            customer_id: "100000000000370431",
            action: "<a target='_blank' href='/print.html?id=100000000000370679' class='btn btn-primary mb-1'>Print</a> <a class='btn btn-primary'>Deblacklist</a>"

        },
    ]
};


export const mockInternalBlacklistInquiryData = {
    data: [
        {
            id_number: "7701020304",
            id_type: "NewIC",
            id_blacklisted: "yes",
            reason: "deceased",
            sub_reason: "deceased",
            update_date: "2024-02-03",
            updated_by: "C2288",
            action: "<a class='btn btn-primary btn-deblacklist' onclick='deblacklist()'>Deblacklist</a>"
        },
        {
            id_number: "7701020304",
            id_type: "nonIC",
            id_blacklisted: "no",
            reason: "Fraud",
            sub_reason: "Fraud one",
            update_date: "2024-03-04",
            updated_by: "C1218",
            action: "<a class='btn btn-primary btn-deblacklist' onclick='deblacklist()'>Deblacklist</a>"
        },
    ]
};