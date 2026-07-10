<?php
abstract class CONSTMAPPING {
	public const ContactType = [
		'MOBILE_PHONE' => [
			'ID' => 1
		],
		'OFFICE_PHONE' => [
			'ID' => 2
		],
		'HOME_PHONE' => [
			'ID' => 3
		],
		'FAX' => [
			'ID' => 8
		],
		'EMAIL' => [
			'ID' => 9
		]
	];
	public const Blacklist = [
		'Reason' => [
			'FRAUD' => [
				'ID' => 2
			],
			'DECEASED' => [
				'ID' => 3
			]
		]
	];
	public const Dunning = [
		'OPERATORS' => [
			'INCLUDE' => [
				'ID' => 1,
				'DISPLAY' => 'Include',
				'MIN_PARAM' => 1
			],
			'EXCLUDE' => [
				'ID' => 2,
				'DISPLAY' => 'Exclude',
				'MIN_PARAM' => 1
			],
			'BIGGER' => [
				'ID' => 3,
				'DISPLAY' => '>',
				'MIN_PARAM' => 1
			],
			'BIGGER_EQUAL' => [
				'ID' => 4,
				'DISPLAY' => '>=',
				'MIN_PARAM' => 1
			],
			'EQUAL' => [
				'ID' => 5,
				'DISPLAY' => '=',
				'MIN_PARAM' => 1
			],
			'SMALLER_EQUAL' => [
				'ID' => 6,
				'DISPLAY' => '<=',
				'MIN_PARAM' => 1
			],
			'SMALLER' => [
				'ID' => 7,
				'DISPLAY' => '<',
				'MIN_PARAM' => 1
			],
			'BETWEEN' => [
				'ID' => 8,
				'DISPLAY' => 'Between (inclusive)',
				'MIN_PARAM' => 2
			]
		],
		'NPSI' => [
			'Y' => [
				'ID' => 1,
				'DISPLAY' => 'Y'
			],
			'Y1' => [
				'ID' => 2,
				'DISPLAY' => 'Y1'
			],
			'N' => [
				'ID' => 3,
				'DISPLAY' => 'N'
			],
			'N1' => [
				'ID' => 4,
				'DISPLAY' => 'N1'
			]
		],
		'Status' => [
			'NOT_USED' => [
				'ID' => 1,
				'DISPLAY' => 'Not used'
			],
			'ACTIVE' => [
				'ID' => 2,
				'DISPLAY' => 'Active'
			],
			'SUSPEND' => [
				'ID' => 3,
				'DISPLAY' => 'Suspended'
			]
		],
		'CRITERIA' => [
			'PAYMENT_METHOD' => [
				'ID' => 1,
				'DISPLAY' => 'Payment Method'
			],
			'DUNNING_FLAG' => [
				'ID' => 2,
				'DISPLAY' => 'Dunning'
			],
			'ACC_CREATION' => [
				'ID' => 3,
				'DISPLAY' => 'Account Creation Date'
			],
			'ACC_STATUS' => [
				'ID' => 4,
				'DISPLAY' => 'Account Status'
			],
			'SUBS_STATUS' => [
				'ID' => 5,
				'DISPLAY' => 'Subscriber Status'
			],
			'ACC_CAT' => [
				'ID' => 6,
				'DISPLAY' => 'Account Category'
			],
			'CTC' => [
				'ID' => 7,
				'DISPLAY' => 'CTC'
			],
			'BIG' => [
				'ID' => 8,
				'DISPLAY' => 'BIG Code'
			],
			'NPSI' => [
				'ID' => 9,
				'DISPLAY' => 'NPSI'
			],
			'BILLABLE' => [
				'ID' => 10,
				'DISPLAY' => 'Billable'
			],
			'DEV_PLAN' => [
				'ID' => 11,
				'DISPLAY' => 'Device Plan'
			],
			'ACC_RISK' => [
				'ID' => 12,
				'DISPLAY' => 'Account Risk'
			],
			'BILLCYCLE_TYPE' => [
				'ID' => 13,
				'DISPLAY' => 'Billcycle Type'
			],
			'WRITEOFF_STATUS' => [
				'ID' => 14,
				'DISPLAY' => 'Writeoff Status'
			],
			'WRITEOFF_TIME' => [
				'ID' => 15,
				'DISPLAY' => 'Writeoff Time'
			],
			'CREDITLIMIT' => [
				'ID' => 16,
				'DISPLAY' => 'Creditlimit ID'
			],
			'TOTAL_DUE' => [
				'ID' => 17,
				'DISPLAY' => 'Total Due'
			],
			'REDLIST' => [
				'ID' => 18,
				'DISPLAY' => 'Redlist Flag'
			],
			'PA' => [
				'ID' => 19,
				'DISPLAY' => 'PA Flag'
			],
			'PTP' => [
				'ID' => 20,
				'DISPLAY' => 'PTP'
			]
		]
	];
	public const Credit = [
		'Rating' => [
			'LOS1' => [
				'ID' => 1,
				'CATEGORY' => 'Length of Stay',
				'DISPLAY' => '<= 180 days'
			],
			'LOS2' => [
				'ID' => 2,
				'CATEGORY' => 'Length of Stay',
				'DISPLAY' => '> 180 <= 360 days'
			],
			'LOS3' => [
				'ID' => 3,
				'CATEGORY' => 'Length of Stay',
				'DISPLAY' => '> 360 <= 720 days'
			],
			'LOS4' => [
				'ID' => 4,
				'CATEGORY' => 'Length of Stay',
				'DISPLAY' => '> 720 <= 1080 days'
			],
			'LOS5' => [
				'ID' => 5,
				'CATEGORY' => 'Length of Stay',
				'DISPLAY' => '> 1080 days'
			],
			'IOS1' => [
				'ID' => 6,
				'CATEGORY' => 'Invoice Overdue Status',
				'DISPLAY' => 'current'
			],
			'IOS2' => [
				'ID' => 7,
				'CATEGORY' => 'Invoice Overdue Status',
				'DISPLAY' => 'aging30'
			],
			'IOS3' => [
				'ID' => 8,
				'CATEGORY' => 'Invoice Overdue Status',
				'DISPLAY' => 'aging60'
			],
			'IOS4' => [
				'ID' => 9,
				'CATEGORY' => 'Invoice Overdue Status',
				'DISPLAY' => 'aging90'
			],
			'IOS5' => [
				'ID' => 10,
				'CATEGORY' => 'Invoice Overdue Status',
				'DISPLAY' => 'aging120'
			],
			'IOS6' => [
				'ID' => 11,
				'CATEGORY' => 'Invoice Overdue Status',
				'DISPLAY' => 'over120'
			],
			'PT1' => [
				'ID' => 12,
				'CATEGORY' => 'Payment Trend',
				'DISPLAY' => '1 payment before due'
			],
			'PT2' => [
				'ID' => 13,
				'CATEGORY' => 'Payment Trend',
				'DISPLAY' => '2 payments before due'
			],
			'PT3' => [
				'ID' => 14,
				'CATEGORY' => 'Payment Trend',
				'DISPLAY' => '3 payments before due'
			],
			'PT4' => [
				'ID' => 15,
				'CATEGORY' => 'Payment Trend',
				'DISPLAY' => '4 payments before due'
			],
			'PT5' => [
				'ID' => 16,
				'CATEGORY' => 'Payment Trend',
				'DISPLAY' => '5 payments before due'
			],
			'PT6' => [
				'ID' => 17,
				'CATEGORY' => 'Payment Trend',
				'DISPLAY' => '6 payments before due'
			],
			'ARPU1' => [
				'ID' => 18,
				'CATEGORY' => 'ARPU',
				'DISPLAY' => '<= 150'
			],
			'ARPU2' => [
				'ID' => 19,
				'CATEGORY' => 'ARPU',
				'DISPLAY' => '> 150 <= 300'
			],
			'ARPU3' => [
				'ID' => 20,
				'CATEGORY' => 'ARPU',
				'DISPLAY' => '> 300'
			]
		]
	];
}
?>
