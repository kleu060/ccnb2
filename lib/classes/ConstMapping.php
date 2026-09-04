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
		'Campaign' => [
			'Collection' => [
				'Status' => [
					'NEW_RECORD_CAMPAIGN' => [
						'ID' => 1
					],
					'MANUAL_UPLOAD_CAMPAIGN' => [
						'ID' => 2
					],
					'PULLBACK' => [
						'ID' => 3
					],
					'IPCC' => [
						'ID' => 4
					],
					'SCHEDULE_CALLBACK' => [
						'ID' => 5
					],
					'BROKEN_PTP' => [
						'ID' => 6
					],
					'TALKED_TO_AGENT' => [
						'ID' => 7
					],
					'EXIT_CRITERIA' => [
						'ID' => 8
					],
					'NEW_RECORD_DCA' => [
						'ID' => 9
					],
					'MANUAL_UPLOAD_DCA' => [
						'ID' => 10
					],
					'PUSHED_TO_DCA' => [
						'ID' => 11
					],
					'AGENT_ACCEPT_ACC' => [
						'ID' => 12
					],
					'DCA_END' => [
						'ID' => 13
					]
				]
			],
			'Status' => [
				'ACTIVE' => [
					'ID' => 1,
					'DISPLAY' => 'Run daily add new record'
				],
				'INACTIVE' => [
					'ID' => 2,
					'DISPLAY' => 'Do not run daily add new record'
				]
			],
			'Type' => [
				'INTERNAL' => [
					'ID' => 1,
					'DISPLAY' => 'Call campaign internal collection'
				],
				'DCA' => [
					'ID' => 2,
					'DISPLAY' => 'DCA'
				]
			]
		],
		'Disposition' => [
			'Source' => [
				'AGENT' => [
					'ID' => 1
				],
				'CALLRESULT' => [
					'ID' => 2
				],
				'DCA' => [
					'ID' => 3
				],
				'OTHER' => [
					'ID' => 4
				]
			]
		],
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
		'CallGroup' => [
			'MASS' => [
				'ID' => 1,
				'DISPLAY' => 'Mass'
			],
			'CORPORATE' => [
				'ID' => 2,
				'DISPLAY' => 'Corporate'
			]
		],
		'Agent' => [
			'Status' => [
				'ACTIVE' => [
					'ID' => 1,
					'DISPLAY' => 'Active'
				],
				'NEWHIRE' => [
					'ID' => 2,
					'DISPLAY' => 'Active new hire'
				]
			]
		],
		'DunningVersion' => [
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
				],
				'OBSOLETE' => [
					'ID' => 4,
					'DISPLAY' => 'Obsolete'
				]
			]
		],
		'Collection' => [
			'Status' => [
				'NEW_CALL' => [
					'ID' => 1,
					'DISPLAY' => 'New record added for call campaign'
				],
				'MANUAL_CALL' => [
					'ID' => 2,
					'DISPLAY' => 'Manual upload account list for call campaign'
				],
				'PULLBACK' => [
					'ID' => 3,
					'DISPLAY' => 'Pull back account from DCA'
				],
				'IPCC_RTN' => [
					'ID' => 4,
					'DISPLAY' => 'IPCC return call result not connected to agent'
				],
				'CALLBACK' => [
					'ID' => 5,
					'DISPLAY' => 'Schedule call back'
				],
				'BROKEN_PTP' => [
					'ID' => 6,
					'DISPLAY' => 'Broken PTP'
				],
				'TALKED' => [
					'ID' => 7,
					'DISPLAY' => 'Successfully talked to agent enter disposition code'
				],
				'EXIT' => [
					'ID' => 8,
					'DISPLAY' => 'Record meet exit criteria'
				],
				'NEW_DCA' => [
					'ID' => 9,
					'DISPLAY' => 'New record added for DCA'
				],
				'MANUAL_DCA' => [
					'ID' => 10,
					'DISPLAY' => 'Manual upload list for DCA'
				],
				'PUSHED_DCA' => [
					'ID' => 11,
					'DISPLAY' => 'Record pushed to DCA'
				],
				'AGENT_ACCEPT' => [
					'ID' => 12,
					'DISPLAY' => 'Agency accepted the account for collection'
				],
				'DCA_END' => [
					'ID' => 13,
					'DISPLAY' => 'DCA collection period ended'
				],
				'NEW_NOD' => [
					'ID' => 14,
					'DISPLAY' => 'New record added for NOD'
				]
			]
		],
		'CRITERIA' => [
			'PAYMENT_METHOD' => [
				'ID' => 1,
				'DISPLAY' => 'Payment Method',
				'VARTYPE' => 'SELECTION',
				'SELECTION' => [['ID'=>1],['ID'=>2]]
			],
			'DUNNING_FLAG' => [
				'ID' => 2,
				'DISPLAY' => 'Dunning',
				'VARTYPE' => 'BOOLEAN'
			],
			'ACC_CREATION' => [
				'ID' => 3,
				'DISPLAY' => 'Account Creation Date',
				'VARTYPE' => 'DATE'
			],
			'ACC_STATUS' => [
				'ID' => 4,
				'DISPLAY' => 'Account Status',
				'VARTYPE' => 'NUMERIC'
			],
			'SUBS_STATUS' => [
				'ID' => 5,
				'DISPLAY' => 'Subscriber Status',
				'VARTYPE' => 'NUMERIC'
			],
			'ACC_CAT' => [
				'ID' => 6,
				'DISPLAY' => 'Account Category',
				'VARTYPE' => 'NUMERIC'
			],
			'CTC' => [
				'ID' => 7,
				'DISPLAY' => 'CTC',
				'VARTYPE' => 'NUMERIC'
			],
			'BIG' => [
				'ID' => 8,
				'DISPLAY' => 'BIG Code',
				'VARTYPE' => 'NUMERIC'
			],
			'NPSI' => [
				'ID' => 9,
				'DISPLAY' => 'NPSI',
				'VARTYPE' => 'MULTI_SELECTION',
				'SELECTION' => [['ID'=>1, 'DISPLAY'=>'Y'],['ID'=>2, 'DISPLAY'=>'Y1'],['ID'=>3, 'DISPLAY'=>'N'],['ID'=>4, 'DISPLAY'=>'N1']]
			],
			'BILLABLE' => [
				'ID' => 10,
				'DISPLAY' => 'Billable',
				'VARTYPE' => 'BOOLEAN'
			],
			'DEV_PLAN' => [
				'ID' => 11,
				'DISPLAY' => 'Device Plan',
				'VARTYPE' => 'NUMERIC'
			],
			'ACC_RISK' => [
				'ID' => 12,
				'DISPLAY' => 'Account Risk',
				'VARTYPE' => 'SELECTION',
				'SELECTION' => [['ID'=>1, 'DISPLAY'=>'Low risk'],['ID'=>2, 'DISPLAY'=>'Mid risk'],['ID'=>3, 'DISPLAY'=>'High risk']]
			],
			'BILLCYCLE_TYPE' => [
				'ID' => 13,
				'DISPLAY' => 'Billcycle Type',
				'VARTYPE' => 'NUMERIC'
			],
			'WRITEOFF_STATUS' => [
				'ID' => 14,
				'DISPLAY' => 'Writeoff Status',
				'VARTYPE' => 'NUMERIC'
			],
			'WRITEOFF_TIME' => [
				'ID' => 15,
				'DISPLAY' => 'Writeoff Date',
				'VARTYPE' => 'DATE'
			],
			'CREDITLIMIT' => [
				'ID' => 16,
				'DISPLAY' => 'Creditlimit ID',
				'VARTYPE' => 'NUMERIC'
			],
			'TOTAL_DUE' => [
				'ID' => 17,
				'DISPLAY' => 'Total Due',
				'VARTYPE' => 'NUMERIC'
			],
			'REDLIST' => [
				'ID' => 18,
				'DISPLAY' => 'Redlist Flag',
				'VARTYPE' => 'BOOLEAN'
			],
			'PA' => [
				'ID' => 19,
				'DISPLAY' => 'PA Flag',
				'VARTYPE' => 'BOOLEAN'
			],
			'PTP' => [
				'ID' => 20,
				'DISPLAY' => 'PTP',
				'VARTYPE' => 'BOOLEAN'
			],
			'CBS_DUNNING' => [
				'ID' => 21,
				'DISPLAY' => 'CBS Dunning Type',
				'VARTYPE' => 'SELECTION',
				'SELECTION' => [['ID'=>1, 'DISPLAY'=>'Retail'],['ID'=>2, 'DISPLAY'=>'BB_Home'],['ID'=>3, 'DISPLAY'=>'Device contract'],['ID'=>8, 'DISPLAY'=>'Ent Fiber']]
			],
			'SUB_STATUS_REASON' => [
				'ID' => 22,
				'DISPLAY' => 'Subscriber Status Reason',
				'VARTYPE' => 'SELECTION',
				'SELECTION' => [['ID'=>3, 'DISPLAY'=>'VOLT_Deceased'],['ID'=>10, 'DISPLAY'=>'INVT_FRAUD'],['ID'=>11, 'DISPLAY'=>'INVT_XX']]
			]
		]
	];
	public const Contact = [
		'Type' => [
			'MOBILE_PHONE' => [
				'ID' => 1,
				'DISPLAY' => 'Mobile Phone'
			],
			'OFFICE_PHONE' => [
				'ID' => 2,
				'DISPLAY' => 'Office Phone'
			],
			'HOME_PHONE' => [
				'ID' => 3,
				'DISPLAY' => 'Home Phone'
			],
			'FAX' => [
				'ID' => 8,
				'DISPLAY' => 'Fax'
			],
			'EMAIL' => [
				'ID' => 9,
				'DISPLAY' => 'E-mail'
			]
		],
		'Status' => [
			'CURRENT' => [
				'ID' => 1,
				'DISPLAY' => 'Current'
			],
			'NA' => [
				'ID' => 0,
				'DISPLAY' => 'Not Applicable'
			]
		]
	];
	public const CreditScore = [
		'Settings' => [
			'LOS1' => [
				'ID' => 1,
				'DISPLAY' => '<= 180 days'
			],
			'LOS2' => [
				'ID' => 2,
				'DISPLAY' => '> 180 <= 360 days'
			],
			'LOS3' => [
				'ID' => 3,
				'DISPLAY' => '> 360 <= 720 days'
			],
			'LOS4' => [
				'ID' => 4,
				'DISPLAY' => '> 720 <= 1080 days'
			],
			'LOS5' => [
				'ID' => 5,
				'DISPLAY' => '> 1080 days'
			],
			'IOS1' => [
				'ID' => 6,
				'DISPLAY' => 'Current'
			],
			'IOS2' => [
				'ID' => 7,
				'DISPLAY' => 'Aging 30'
			],
			'IOS3' => [
				'ID' => 8,
				'DISPLAY' => 'Aging 60'
			],
			'IOS4' => [
				'ID' => 9,
				'DISPLAY' => 'Aging 90'
			],
			'IOS5' => [
				'ID' => 10,
				'DISPLAY' => 'Aging 120'
			],
			'IOS6' => [
				'ID' => 11,
				'DISPLAY' => 'Over 120'
			],
			'PT1' => [
				'ID' => 11,
				'DISPLAY' => '1 payments before due'
			],
			'PT2' => [
				'ID' => 12,
				'DISPLAY' => '2 payments before due'
			],
			'PT3' => [
				'ID' => 13,
				'DISPLAY' => '3 payments before due'
			],
			'PT4' => [
				'ID' => 14,
				'DISPLAY' => '4 payments before due'
			],
			'PT5' => [
				'ID' => 15,
				'DISPLAY' => '5 payments before due'
			],
			'PT6' => [
				'ID' => 16,
				'DISPLAY' => '6 payments before due'
			],
			'ARPU1' => [
				'ID' => 17,
				'DISPLAY' => '> 300'
			],
			'ARPU2' => [
				'ID' => 18,
				'DISPLAY' => '> 150 <= 300'
			],
			'ARPU3' => [
				'ID' => 19,
				'DISPLAY' => '<= 150'
			]
		]
	];
	public const Account = [
		'DispositionCode' => [
			'LM' => [
				'ID' => 1,
				'CODE' => 'LM',
				'DISPLAY' => 'Left message'
			],
			'PTP' => [
				'ID' => 2,
				'CODE' => 'PTP',
				'DISPLAY' => 'Promise to pay'
			],
			'PTP3' => [
				'ID' => 3,
				'CODE' => 'PTP3',
				'DISPLAY' => 'Promise to pay in 3 days'
			],
			'PTP5' => [
				'ID' => 4,
				'CODE' => 'PTP5',
				'DISPLAY' => 'Promise to pay in 5 days'
			],
			'PTP7' => [
				'ID' => 5,
				'CODE' => 'PTP7',
				'DISPLAY' => 'Promise to pay in 7 days'
			],
			'DC' => [
				'ID' => 6,
				'CODE' => 'DC',
				'DISPLAY' => 'Deceased (confirmed)'
			],
			'DNC' => [
				'ID' => 7,
				'CODE' => 'DNC',
				'DISPLAY' => 'Deceased (not confirmed)'
			],
			'CFP' => [
				'ID' => 8,
				'CODE' => 'CFP',
				'DISPLAY' => 'Collected full payment'
			],
			'CPP' => [
				'ID' => 9,
				'CODE' => 'CPP',
				'DISPLAY' => 'Collected partial payment'
			],
			'PF' => [
				'ID' => 10,
				'CODE' => 'PF',
				'DISPLAY' => 'Paid full'
			],
			'PAP' => [
				'ID' => 11,
				'CODE' => 'PAP',
				'DISPLAY' => 'Payment agreement plan'
			],
			'SC' => [
				'ID' => 12,
				'CODE' => 'SC',
				'DISPLAY' => 'Schedule call back'
			],
			'SFR' => [
				'ID' => 13,
				'CODE' => 'SFR',
				'DISPLAY' => 'Suspected fraud registration'
			],
			'BD' => [
				'ID' => 14,
				'CODE' => 'BD',
				'DISPLAY' => 'Bill dispute'
			],
			'RD' => [
				'ID' => 15,
				'CODE' => 'RD',
				'DISPLAY' => 'Red list tagging'
			],
			'WA' => [
				'ID' => 16,
				'CODE' => 'WA',
				'DISPLAY' => 'Wrong assignment'
			],
			'KAM' => [
				'ID' => 17,
				'CODE' => 'KAM',
				'DISPLAY' => 'Key account management'
			],
			'FAIL' => [
				'ID' => 18,
				'CODE' => 'FAIL',
				'DISPLAY' => 'Fail update disposition'
			],
			'SFO' => [
				'ID' => 19,
				'CODE' => 'SFO',
				'DISPLAY' => 'Suspected fraud others'
			],
			'ULN' => [
				'ID' => 20,
				'CODE' => 'ULN',
				'DISPLAY' => 'Landline unattended'
			],
			'V' => [
				'ID' => 21,
				'CODE' => 'V',
				'DISPLAY' => 'User answering machine'
			],
			'B' => [
				'ID' => 22,
				'CODE' => 'B',
				'DISPLAY' => 'Landline busy'
			],
			'F' => [
				'ID' => 23,
				'CODE' => 'F',
				'DISPLAY' => 'Fax number'
			],
			'W' => [
				'ID' => 24,
				'CODE' => 'W',
				'DISPLAY' => 'Wrong party contact'
			],
			'NOD' => [
				'ID' => 25,
				'CODE' => 'NOD',
				'DISPLAY' => 'notice of demand'
			],
			'UN' => [
				'ID' => 26,
				'CODE' => 'UN',
				'DISPLAY' => 'Unattended unanswered'
			],
			'UNT' => [
				'ID' => 27,
				'CODE' => 'UNT',
				'DISPLAY' => 'Uncontactable'
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
	public const User = [
		'Group' => [
			'SYSTEM1' => [
				'ID' => 1,
				'NAME' => 'System1',
				'DESCRIPTION' => 'System'
			],
			'SYSADMIN1' => [
				'ID' => 2,
				'NAME' => 'SystemAdmin1',
				'DESCRIPTION' => 'System Administrator 1'
			],
			'SYSADMIN2' => [
				'ID' => 3,
				'NAME' => 'SystemAdmin2',
				'DESCRIPTION' => 'System Administrator 2'
			],
			'COLLADMIN1' => [
				'ID' => 4,
				'NAME' => 'CollectionAdmin1',
				'DESCRIPTION' => 'Collection Administrator 1'
			],
			'COLLADMIN2' => [
				'ID' => 5,
				'NAME' => 'CollectionAdmin2',
				'DESCRIPTION' => 'Collection Administrator 2'
			],
			'COLL' => [
				'ID' => 6,
				'NAME' => 'Collection',
				'DESCRIPTION' => 'Collection Agents'
			],
			'ENT1' => [
				'ID' => 7,
				'NAME' => 'Enterprise1',
				'DESCRIPTION' => 'Enterprise Account 1'
			],
			'ENT2' => [
				'ID' => 8,
				'NAME' => 'Enterprise2',
				'DESCRIPTION' => 'Enterprise Account 2'
			],
			'FIN' => [
				'ID' => 9,
				'NAME' => 'FinanceAdmin',
				'DESCRIPTION' => 'Finance Administrator'
			],
			'DCAADMIN' => [
				'ID' => 10,
				'NAME' => 'DCAAdmin',
				'DESCRIPTION' => 'DCA Administrator'
			],
			'FRAUD' => [
				'ID' => 11,
				'NAME' => 'FraudTeam',
				'DESCRIPTION' => 'Fraud Team'
			],
			'STAFF' => [
				'ID' => 12,
				'NAME' => 'Staff',
				'DESCRIPTION' => 'Staff'
			],
			'DCA' => [
				'ID' => 13,
				'NAME' => 'DCA',
				'DESCRIPTION' => 'DCA'
			],
			'USERTERM' => [
				'ID' => 14,
				'NAME' => 'UserTerminated',
				'DESCRIPTION' => 'User Terminiated'
			],
			'WEBSERV' => [
				'ID' => 90,
				'NAME' => 'WebService',
				'DESCRIPTION' => 'For Web Service use do not change'
			]
		]
	];
}
?>
