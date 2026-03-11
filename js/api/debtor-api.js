export async function getDebtor() {
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
        acct_category: "",
        ctc_code: "",
        credit_score: "",
        assigned_to: "NA",
        sched_callback: "NA",
        current_dca: "AgencyB",
        from: "2-Feb-2026",
        to: "2-Apr-2026"

    };
}


export async function getDebtorActionHistory() {
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
