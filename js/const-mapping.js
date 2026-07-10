const CONST_MAPPING = Object.freeze({
	ContactType: {
		MOBILE_PHONE: {
			ID:1
		},
		OFFICE_PHONE: {
			ID:2
		},
		HOME_PHONE: {
			ID:3
		},
		FAX: {
			ID:8
		},
		EMAIL: {
			ID:9
		}
	},
	Dunning: {
		OPERATORS: {
			INCLUDE: {
				ID:1,
				DISPLAY:'Include'
			},
			EXCLUDE: {
				ID:2,
				DISPLAY:'Exclude'
			},
			BIGGER: {
				ID:3,
				DISPLAY:'>'
			},
			BIGGER_EQUAL: {
				ID:4,
				DISPLAY:'>='
			},
			EQUAL: {
				ID:5,
				DISPLAY:'='
			},
			SMALLER_EQUAL: {
				ID:6,
				DISPLAY:'<='
			},
			SMALLER: {
				ID:7,
				DISPLAY:'<'
			},
			BETWEEN: {
				ID:8,
				DISPLAY:'Between (inclusive)'
			}
		},
		CRITERIA: {
			PAYMENT_METHOD: {
				ID:1,
				DISPLAY:'Payment Method'
			},
			DUNNING_FLAG: {
				ID:2,
				DISPLAY:'Dunning'
			},
			ACC_CREATION: {
				ID:3,
				DISPLAY:'Account Creation Date'
			},
			ACC_STATUS: {
				ID:4,
				DISPLAY:'Account Status'
			},
			SUBS_STATUS: {
				ID:5,
				DISPLAY:'Subscriber Status'
			},
			ACC_CAT: {
				ID:6,
				DISPLAY:'Account Category'
			},
			CTC: {
				ID:7,
				DISPLAY:'CTC'
			},
			BIG: {
				ID:8,
				DISPLAY:'BIG Code'
			},
			NPSI: {
				ID:9,
				DISPLAY:'NPSI'
			},
			BILLABLE: {
				ID:10,
				DISPLAY:'Billable'
			},
			DEV_PLAN: {
				ID:11,
				DISPLAY:'Device Plan'
			},
			ACC_RISK: {
				ID:12,
				DISPLAY:'Account Risk'
			},
			BILLCYCLE_TYPE: {
				ID:13,
				DISPLAY:'Billcycle Type'
			},
			WRITEOFF_STATUS: {
				ID:14,
				DISPLAY:'Writeoff Status'
			},
			WRITEOFF_TIME: {
				ID:15,
				DISPLAY:'Writeoff Time'
			},
			CREDITLIMIT: {
				ID:16,
				DISPLAY:'Creditlimit ID'
			},
			TOTAL_DUE: {
				ID:17,
				DISPLAY:'Total Due'
			},
			REDLIST: {
				ID:18,
				DISPLAY:'Redlist Flag'
			},
			PA: {
				ID:19,
				DISPLAY:'PA Flag'
			},
			PTP: {
				ID:20,
				DISPLAY:'PTP'
			}
		},
		NPSI: {
			Y: {
				ID:1,
				DISPLAY:'Y'
			},
			Y1: {
				ID:2,
				DISPLAY:'Y1'
			},
			N: {
				ID:3,
				DISPLAY:'N'
			},
			N1: {
				ID:4,
				DISPLAY:'N1'
			}
		}
	}
});
