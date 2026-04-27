export async function getAccount(accountNo) {
    // const res = await fetch("https://fakestoreapi.com/debtor");
    // return await res.json();

    // simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
        id: "730212345678",
        name: "Chan Tai Meng",
        customer_id: "100030000000360232",
        account_code: "100030000000360232",
        account_id: "100030000000360232",
        parent_account_id: "100030000000360238",
        status: "9 Deactivation",
        status_date: "12-Oct-2025",
        account_create_date: "12-Oct-2019",
        write_off: "A",
        overdue: "123(days)",
        dunning_group: "MASS HVC",
        red_list: "No",
        npsi_flag: "No",
        os_balance: "210.00",
        overdue_amount: "125.00",
        last_pay_date: "No",
        last_pay_amt: "125.00",
        bill_cycle: "01(Day 1 of month)",
        credit_limit: "RM200",
        payment_mode: "cash",
        acct_category: "40 SMI/SME",
        ctc_code: "43(Voice Enterprise)",
        big: "02 Sdn Bhd Company",
        credit_score: "65",
        credit_balance: "Credit Balance",
        assigned_to: "NA",
        campaign: "MASS_RE_VOICE_1_DD_17",
        sched_callback: "2026-03-18 10:00:00",
        ptp: "PTP3",
        current_dca: "AgencyB",
        dca_batch: "ENTERPRISE 91-120",
        start_date: "2-Feb-2026",
        end_date: "2-Apr-2026",
        write_off_date: "",
        last_susp_date: "",
        termination_date: "",

    };
}


export async function getAccountActionHistory(accountNo) {
    // simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
        {
            date: "2026-02-02T16:00:00",
            event: "call, ptp"
        },
        {
            date: "2026-03-02T16:00:00",
            event: "call, sched callback"
        }
    ];
}
