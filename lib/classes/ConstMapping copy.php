<?php
abstract class CONSTMAPPING {
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
	public const IDBlacklist = [
		'Reason' => [
			'FRAUD' => [
				'ID' => 2
			],
			'DECEASED' => [
				'ID' => 3
			]
		],
		'Source' => [
			'UPLOAD' => [
				'ID' => 1
			],
			'GUI' => [
				'ID' => 2
			],
			'KAFKA' => [
				'ID' => 9
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
		'Disposition' => [
			'Source' => [
				'AGENT' => [
					'ID' => 1,
					'DISPLAY' => 'Agent'
				],
				'CALLRESULT' => [
					'ID' => 2,
					'DISPLAY' => 'Call Center'
				],
				'DCA' => [
					'ID' => 3,
					'DISPLAY' => 'DCA'
				],
				'OTHER' => [
					'ID' => 4,
					'DISPLAY' => 'Other'
				]
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
		'Campaign' => [
			'Status' => [
				'ACTIVE' => [
					'ID' => 1,
					'DISPLAY' => 'Active, daily add new record'
				],
				'INACTIVE' => [
					'ID' => 2,
					'DISPLAY' => 'Inactive, no daily new record'
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
			],
			'Collection' => [
				'Status' => [
					'NEW_RECORD_CAMPAIGN' => [
						'ID' => 1,
						'DISPLAY' => 'New call acct'
					],
					'MANUAL_UPLOAD_CAMPAIGN' => [
						'ID' => 2,
						'DISPLAY' => 'Upload call acct'
					],
					'PULLBACK' => [
						'ID' => 3,
						'DISPLAY' => 'Pull back'
					],
					'IPCC' => [
						'ID' => 4,
						'DISPLAY' => 'Call acct'
					],
					'SCHEDULE_CALLBACK' => [
						'ID' => 5,
						'DISPLAY' => 'Schd call back'
					],
					'BROKEN_PTP' => [
						'ID' => 6,
						'DISPLAY' => 'Broken PTP'
					],
					'TALKED_TO_AGENT' => [
						'ID' => 7,
						'DISPLAY' => 'Agent called'
					],
					'EXIT_CRITERIA' => [
						'ID' => 8,
						'DISPLAY' => 'Completed call'
					],
					'NEW_RECORD_DCA' => [
						'ID' => 9,
						'DISPLAY' => 'New DCA acct'
					],
					'MANUAL_UPLOAD_DCA' => [
						'ID' => 10,
						'DISPLAY' => 'Upload DCA acct'
					],
					'PUSHED_TO_DCA' => [
						'ID' => 11,
						'DISPLAY' => 'From internal'
					],
					'AGENT_ACCEPT_ACC' => [
						'ID' => 12,
						'DISPLAY' => 'DCA acct'
					],
					'DCA_END' => [
						'ID' => 13,
						'DISPLAY' => 'Completed DCA'
					]
				]
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
				],
				'INACTIVE' => [
					'ID' => 3,
					'DISPLAY' => 'Inactive'
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
			'OVERDUE_DAYS' => [
				'ID' => 11,
				'DISPLAY' => 'Overdue days',
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
	public const DCA = [
		'GROUP' => [
			'STANDARD' => [
				'ID' => 1,
				'DISPLAY' => 'DCA Group Standard',
				'COL' => 'DCA_GROUP_STANDARD'
			],
			'SPDCA' => [
				'ID' => 2,
				'DISPLAY' => 'DCA Group SPDCA',
				'COL' => 'DCA_GROUP_SPDCA'
			],
			'ADHOC' => [
				'ID' => 3,
				'DISPLAY' => 'DCA Group Ad Hoc',
				'COL' => 'DCA_GROUP_ADHOC'
			]
		],
		'STATUS' => [
			'ACTIVE' => [
				'ID' => 1,
				'DISPLAY' => 'Active'
			],
			'INACTIVE' => [
				'ID' => 2,
				'DISPLAY' => 'Inactive'
			]
		]
	];
	public const Enterprise = [
		'ExtendedData' => [
			'BAP' => [
				'ID' => 1,
				'DISPLAY' => 'BAP'
			],
			'BKK' => [
				'ID' => 2,
				'DISPLAY' => 'BKK'
			],
			'BKN' => [
				'ID' => 3,
				'DISPLAY' => 'BKN'
			],
			'BLACKBERRY' => [
				'ID' => 4,
				'DISPLAY' => 'BLACKBERRY'
			],
			'BPN' => [
				'ID' => 5,
				'DISPLAY' => 'BPN'
			],
			'BPP' => [
				'ID' => 6,
				'DISPLAY' => 'BPP'
			],
			'BRANCH' => [
				'ID' => 7,
				'DISPLAY' => 'BRANCH'
			],
			'BROADBAND' => [
				'ID' => 8,
				'DISPLAY' => 'BROADBAND'
			],
			'BROADBANDJALAN_MELAKA' => [
				'ID' => 9,
				'DISPLAY' => 'BROADBANDJALAN MELAKA'
			],
			'CARELINE' => [
				'ID' => 10,
				'DISPLAY' => 'CARELINE'
			],
			'CREDIT_CARD' => [
				'ID' => 11,
				'DISPLAY' => 'CREDIT CARD'
			],
			'CUSTOMER_SUCCESS' => [
				'ID' => 12,
				'DISPLAY' => 'CUSTOMER SUCCESS'
			],
			'CX' => [
				'ID' => 13,
				'DISPLAY' => 'CX'
			],
			'DBKL_PENGANGKUTAN' => [
				'ID' => 14,
				'DISPLAY' => 'DBKL PENGANGKUTAN'
			],
			'DEVICE_MARKETING' => [
				'ID' => 15,
				'DISPLAY' => 'DEVICE MARKETING'
			],
			'DHL_APIS' => [
				'ID' => 16,
				'DISPLAY' => 'DHL APIS'
			],
			'DHL_EXP' => [
				'ID' => 17,
				'DISPLAY' => 'DHL EXP'
			],
			'DHL_GF' => [
				'ID' => 18,
				'DISPLAY' => 'DHL GF'
			],
			'DHL_SC' => [
				'ID' => 19,
				'DISPLAY' => 'DHL SC'
			],
			'DHL_SS' => [
				'ID' => 20,
				'DISPLAY' => 'DHL SS'
			],
			'DISTRIBUTION' => [
				'ID' => 21,
				'DISPLAY' => 'DISTRIBUTION'
			],
			'EEM' => [
				'ID' => 22,
				'DISPLAY' => 'EEM'
			],
			'EMS_100' => [
				'ID' => 23,
				'DISPLAY' => 'EMS 100'
			],
			'EMS_200' => [
				'ID' => 24,
				'DISPLAY' => 'EMS 200'
			],
			'EMS_50' => [
				'ID' => 25,
				'DISPLAY' => 'EMS 50'
			],
			'ENTERPRISE_BUSINESS_AND_SOLUTIONS' => [
				'ID' => 26,
				'DISPLAY' => 'Enterprise Business & Solutions'
			],
			'ENTERPRISE_SALES' => [
				'ID' => 27,
				'DISPLAY' => 'Enterprise Sales'
			],
			'FINANCE' => [
				'ID' => 28,
				'DISPLAY' => 'FINANCE'
			],
			'GAD_TEST_SIM' => [
				'ID' => 29,
				'DISPLAY' => 'GAD test Sim'
			],
			'GATEWAY' => [
				'ID' => 30,
				'DISPLAY' => 'GATEWAY'
			],
			'HOME_2' => [
				'ID' => 31,
				'DISPLAY' => 'Home 2'
			],
			'HOME_FIBRE' => [
				'ID' => 32,
				'DISPLAY' => 'Home Fibre'
			],
			'HQ' => [
				'ID' => 33,
				'DISPLAY' => 'HQ'
			],
			'IMIGRESEN_MYIMM_NET' => [
				'ID' => 34,
				'DISPLAY' => 'IMIGRESEN MYIMM*NET'
			],
			'INFORMATION_TECHNOLOGY' => [
				'ID' => 35,
				'DISPLAY' => 'Information Technology'
			],
			'IPAD' => [
				'ID' => 36,
				'DISPLAY' => 'IPAD'
			],
			'IR_TEST_SIM' => [
				'ID' => 37,
				'DISPLAY' => 'IR Test Sim'
			],
			'IT' => [
				'ID' => 38,
				'DISPLAY' => 'IT'
			],
			'JKR_CERUN' => [
				'ID' => 39,
				'DISPLAY' => 'JKR CERUN'
			],
			'JOHOR' => [
				'ID' => 40,
				'DISPLAY' => 'JOHOR'
			],
			'JPA_INTAN' => [
				'ID' => 41,
				'DISPLAY' => 'JPA INTAN'
			],
			'JPA_PEMANDU' => [
				'ID' => 42,
				'DISPLAY' => 'JPA_PEMANDU'
			],
			'JPM_BEHUU' => [
				'ID' => 43,
				'DISPLAY' => 'JPM_BEHUU'
			],
			'JPM_BHEPMM' => [
				'ID' => 44,
				'DISPLAY' => 'JPM_BHEPMM'
			],
			'JPM_BIUPA' => [
				'ID' => 45,
				'DISPLAY' => 'JPM_BIUPA'
			],
			'JPM_BKPP' => [
				'ID' => 46,
				'DISPLAY' => 'JPM_BKPP'
			],
			'JPM_BPA' => [
				'ID' => 47,
				'DISPLAY' => 'JPM_BPA'
			],
			'JPM_BPH' => [
				'ID' => 48,
				'DISPLAY' => 'JPM_BPH'
			],
			'JPM_BTN' => [
				'ID' => 49,
				'DISPLAY' => 'JPM_BTN'
			],
			'JPM_PEJ_PM' => [
				'ID' => 50,
				'DISPLAY' => 'JPM_PEJ PM'
			],
			'JPM_PEJ_SERANTA_FELDA' => [
				'ID' => 51,
				'DISPLAY' => 'JPM_PEJ SERANTA FELDA'
			],
			'JPM_PEJKPKK' => [
				'ID' => 52,
				'DISPLAY' => 'JPM_PEJKPKK'
			],
			'JPM_PEJPENASIHAT_SAINS' => [
				'ID' => 53,
				'DISPLAY' => 'JPM_PEJPENASIHAT SAINS'
			],
			'JPM_PEMANDU' => [
				'ID' => 54,
				'DISPLAY' => 'JPM_PEMANDU'
			],
			'JPM_PERMATA' => [
				'ID' => 55,
				'DISPLAY' => 'JPM_PERMATA'
			],
			'JPM_UKSF' => [
				'ID' => 56,
				'DISPLAY' => 'JPM_UKSF'
			],
			'JPM_UNITINOVASI_KHAS' => [
				'ID' => 57,
				'DISPLAY' => 'JPM_UNITINOVASI KHAS'
			],
			'JUPEM_GEODASI' => [
				'ID' => 58,
				'DISPLAY' => 'JUPEM GEODASI'
			],
			'JUPEM_KADUSTER' => [
				'ID' => 59,
				'DISPLAY' => 'JUPEM KADUSTER'
			],
			'KASTAM_IPVPN' => [
				'ID' => 60,
				'DISPLAY' => 'KASTAM IPVPN'
			],
			'KASTAM_PRISKA' => [
				'ID' => 61,
				'DISPLAY' => 'KASTAM PRISKA'
			],
			'KEDAH' => [
				'ID' => 62,
				'DISPLAY' => 'KEDAH'
			],
			'KELANTAN' => [
				'ID' => 63,
				'DISPLAY' => 'KELANTAN'
			],
			'KEMENTAH' => [
				'ID' => 64,
				'DISPLAY' => 'KEMENTAH'
			],
			'KKR_HIGHWAY_PLANNING' => [
				'ID' => 65,
				'DISPLAY' => 'KKR HIGHWAY PLANNING'
			],
			'KPDNKK_TM' => [
				'ID' => 66,
				'DISPLAY' => 'KPDNKK TM'
			],
			'KUALA_LUMPUR' => [
				'ID' => 67,
				'DISPLAY' => 'KUALA LUMPUR'
			],
			'LOGISTIC' => [
				'ID' => 68,
				'DISPLAY' => 'LOGISTIC'
			],
			'M2M' => [
				'ID' => 69,
				'DISPLAY' => 'M2M'
			],
			'MARKAS_MEDAN' => [
				'ID' => 70,
				'DISPLAY' => 'MARKAS MEDAN'
			],
			'MARKETING' => [
				'ID' => 71,
				'DISPLAY' => 'MARKETING'
			],
			'MAYBANK_ETIQA' => [
				'ID' => 72,
				'DISPLAY' => 'MAYBANK ETIQA'
			],
			'MELAKA' => [
				'ID' => 73,
				'DISPLAY' => 'MELAKA'
			],
			'MINDEF_CIVILLIAN' => [
				'ID' => 74,
				'DISPLAY' => 'MINDEF CIVILLIAN'
			],
			'MINDEF_KOMLEK' => [
				'ID' => 75,
				'DISPLAY' => 'MINDEF KOMLEK'
			],
			'MINDEF_PSTD' => [
				'ID' => 76,
				'DISPLAY' => 'MINDEF PSTD'
			],
			'MINDEF_RISIK' => [
				'ID' => 77,
				'DISPLAY' => 'MINDEF RISIK'
			],
			'MINDEF_SATELLITE' => [
				'ID' => 78,
				'DISPLAY' => 'MINDEF SATELLITE'
			],
			'MINDEF_SEMBOYAN' => [
				'ID' => 79,
				'DISPLAY' => 'MINDEF SEMBOYAN'
			],
			'MOA_PADI_BERAS' => [
				'ID' => 80,
				'DISPLAY' => 'MOA PADI BERAS'
			],
			'NEGERI_SEMBILAN' => [
				'ID' => 81,
				'DISPLAY' => 'NEGERI SEMBILAN'
			],
			'NETWORK_1' => [
				'ID' => 82,
				'DISPLAY' => 'Network 1'
			],
			'NETWORK_2' => [
				'ID' => 83,
				'DISPLAY' => 'Network 2'
			],
			'NETWORK_3' => [
				'ID' => 84,
				'DISPLAY' => 'Network 3'
			],
			'NETWORK_CENTRAL_TEST_SIM' => [
				'ID' => 85,
				'DISPLAY' => 'Network Central Test Sim'
			],
			'NETWORK_NEW_TECH' => [
				'ID' => 86,
				'DISPLAY' => 'NETWORK NEW TECH'
			],
			'NEWORK_QUALITY_ASSURANCE' => [
				'ID' => 87,
				'DISPLAY' => 'NEWORK QUALITY ASSURANCE'
			],
			'NMS_TEST_SIM' => [
				'ID' => 88,
				'DISPLAY' => 'NMS Test Sim'
			],
			'NOT_DEFINED' => [
				'ID' => 89,
				'DISPLAY' => 'Not defined'
			],
			'OTHERS' => [
				'ID' => 90,
				'DISPLAY' => 'OTHERS'
			],
			'PAHANG' => [
				'ID' => 91,
				'DISPLAY' => 'PAHANG'
			],
			'PAYPHONE' => [
				'ID' => 92,
				'DISPLAY' => 'PAYPHONE'
			],
			'PENYELIDIKAN' => [
				'ID' => 93,
				'DISPLAY' => 'PENYELIDIKAN'
			],
			'PERAK' => [
				'ID' => 94,
				'DISPLAY' => 'PERAK'
			],
			'PERLESENAN_AND_KUATKUASA' => [
				'ID' => 95,
				'DISPLAY' => 'PERLESENAN & KUATKUASA'
			],
			'PERLIS' => [
				'ID' => 96,
				'DISPLAY' => 'PERLIS'
			],
			'POS_MALAYSIA' => [
				'ID' => 97,
				'DISPLAY' => 'POS MALAYSIA'
			],
			'POSLAJU' => [
				'ID' => 98,
				'DISPLAY' => 'POSLAJU'
			],
			'PPUKM' => [
				'ID' => 99,
				'DISPLAY' => 'PPUKM'
			],
			'PPUM' => [
				'ID' => 100,
				'DISPLAY' => 'PPUM'
			],
			'PULAU_PINANG' => [
				'ID' => 101,
				'DISPLAY' => 'PULAU PINANG'
			],
			'PUTRAJAYA' => [
				'ID' => 102,
				'DISPLAY' => 'PUTRAJAYA'
			],
			'RECOVERY' => [
				'ID' => 103,
				'DISPLAY' => 'RECOVERY'
			],
			'RHB_EASY' => [
				'ID' => 104,
				'DISPLAY' => 'RHB_EASY'
			],
			'RHB_KIOSK' => [
				'ID' => 105,
				'DISPLAY' => 'RHB_KIOSK'
			],
			'RHB_LRT' => [
				'ID' => 106,
				'DISPLAY' => 'RHB_LRT'
			],
			'RHB_TESCO' => [
				'ID' => 107,
				'DISPLAY' => 'RHB_TESCO'
			],
			'ROAMING_SIGOS' => [
				'ID' => 108,
				'DISPLAY' => 'Roaming SIGOS'
			],
			'SABAH' => [
				'ID' => 109,
				'DISPLAY' => 'SABAH'
			],
			'SAJ_LOGGER' => [
				'ID' => 110,
				'DISPLAY' => 'SAJ LOGGER'
			],
			'SARAWAK' => [
				'ID' => 111,
				'DISPLAY' => 'SARAWAK'
			],
			'SECURIFORCE' => [
				'ID' => 112,
				'DISPLAY' => 'SECURIFORCE'
			],
			'SELANGOR' => [
				'ID' => 113,
				'DISPLAY' => 'SELANGOR'
			],
			'SHIPPING_OFFSHORE' => [
				'ID' => 114,
				'DISPLAY' => 'SHIPPING OFFSHORE'
			],
			'SHIPPING_SHORE' => [
				'ID' => 115,
				'DISPLAY' => 'SHIPPING SHORE'
			],
			'SU_MAJLIS' => [
				'ID' => 116,
				'DISPLAY' => 'SU MAJLIS'
			],
			'SYABAS_DAMINI' => [
				'ID' => 117,
				'DISPLAY' => 'SYABAS DAMINI'
			],
			'TERENGGANU' => [
				'ID' => 118,
				'DISPLAY' => 'TERENGGANU'
			],
			'TNB_ALOR_SETAR' => [
				'ID' => 119,
				'DISPLAY' => 'TNB-ALOR SETAR'
			],
			'TNB_CARELINE' => [
				'ID' => 121,
				'DISPLAY' => 'TNB-CARELINE'
			],
			'TNB_DISTRIBUTION_KEPONG' => [
				'ID' => 122,
				'DISPLAY' => 'TNB-DISTRIBUTION KEPONG'
			],
			'TNB_EDAS' => [
				'ID' => 123,
				'DISPLAY' => 'TNB-EDAS'
			],
			'TNB_EEM_SMS_REMINDER' => [
				'ID' => 124,
				'DISPLAY' => 'TNB-EEM SMS REMINDER'
			],
			'TNB_ICT' => [
				'ID' => 125,
				'DISPLAY' => 'TNB-ICT'
			],
			'TNB_JALAN_BANGSAR' => [
				'ID' => 126,
				'DISPLAY' => 'TNB-JALAN BANGSAR'
			],
			'TNB_KELANG' => [
				'ID' => 127,
				'DISPLAY' => 'TNB-KELANG'
			],
			'TNB_MFFA' => [
				'ID' => 128,
				'DISPLAY' => 'TNB MFFA'
			],
			'TNB_NS' => [
				'ID' => 129,
				'DISPLAY' => 'TNB-NS'
			],
			'TNB_PAKA' => [
				'ID' => 130,
				'DISPLAY' => 'TNB-PAKA'
			],
			'TNB_PASIR_GUDANG' => [
				'ID' => 131,
				'DISPLAY' => 'TNB-PASIR GUDANG'
			],
			'TNB_PD' => [
				'ID' => 132,
				'DISPLAY' => 'TNB-PD'
			],
			'TNB_PQMS' => [
				'ID' => 133,
				'DISPLAY' => 'TNB PQMS'
			],
			'TNB_REMACO' => [
				'ID' => 134,
				'DISPLAY' => 'TNB-REMACO'
			],
			'TNB_RMR' => [
				'ID' => 135,
				'DISPLAY' => 'TNB RMR'
			],
			'TNB_SCADA' => [
				'ID' => 136,
				'DISPLAY' => 'TNB SCADA'
			],
			'TNB_SMART_METER' => [
				'ID' => 137,
				'DISPLAY' => 'TNB-SMART METER'
			],
			'TNB_TAPAH' => [
				'ID' => 138,
				'DISPLAY' => 'TNB-TAPAH'
			],
			'TNB_YAYASAN' => [
				'ID' => 139,
				'DISPLAY' => 'TNB-YAYASAN'
			],
			'TOP_MGMT' => [
				'ID' => 140,
				'DISPLAY' => 'TOP MGMT'
			],
			'TRUCKING' => [
				'ID' => 141,
				'DISPLAY' => 'TRUCKING'
			],
			'TSS_TEST_SIM' => [
				'ID' => 142,
				'DISPLAY' => 'TSS Test Sim'
			],
			'UMCCED' => [
				'ID' => 143,
				'DISPLAY' => 'UMCCED'
			],
			'UPL' => [
				'ID' => 144,
				'DISPLAY' => 'UPL'
			],
			'UTM_CICT' => [
				'ID' => 145,
				'DISPLAY' => 'UTM CICT'
			],
			'UTM_FCHE' => [
				'ID' => 146,
				'DISPLAY' => 'UTM FCHE'
			],
			'UTM_HEPA' => [
				'ID' => 147,
				'DISPLAY' => 'UTM HEPA'
			],
			'UTM_PEJ_HARTA_BINA' => [
				'ID' => 148,
				'DISPLAY' => 'UTM PEJ HARTA BINA'
			],
			'UTM_REGISTER_OFF' => [
				'ID' => 149,
				'DISPLAY' => 'UTM REGISTER OFF'
			],
			'UTM_SPACE' => [
				'ID' => 150,
				'DISPLAY' => 'UTM SPACE'
			],
			'VOICE' => [
				'ID' => 151,
				'DISPLAY' => 'VOICE'
			],
			'YAYASAN' => [
				'ID' => 152,
				'DISPLAY' => 'YAYASAN'
			]
		],
		'Region' => [
			'HQ' => [
				'ID' => 0,
				'DISPLAY' => 'HQ'
			],
			'NORTHERN' => [
				'ID' => 3,
				'DISPLAY' => 'NORTHERN'
			],
			'SOUTHERN' => [
				'ID' => 4,
				'DISPLAY' => 'SOUTHERN'
			],
			'EASTERN' => [
				'ID' => 5,
				'DISPLAY' => 'EASTERN'
			],
			'SABAH' => [
				'ID' => 6,
				'DISPLAY' => 'SABAH'
			],
			'SARAWAK' => [
				'ID' => 7,
				'DISPLAY' => 'SARAWAK'
			],
			'CENTRAL' => [
				'ID' => 8,
				'DISPLAY' => 'CENTRAL'
			]
		],
		'PaymentType' => [
			'CENTRAL' => [
				'ID' => 1,
				'DISPLAY' => 'Central'
			],
			'REGIONAL' => [
				'ID' => 2,
				'DISPLAY' => 'Regional'
			]
		],
		'Language' => [
			'ENGLISH' => [
				'ID' => 1,
				'DISPLAY' => 'English'
			],
			'MALAY' => [
				'ID' => 2,
				'DISPLAY' => 'Bahasa Malaysia'
			]
		],
		'Frequency' => [
			'MONTH_END' => [
				'ID' => 1,
				'DISPLAY' => 'Month End'
			],
			'FORTNIGHT' => [
				'ID' => 2,
				'DISPLAY' => 'Fortnightly'
			],
			'BOTH' => [
				'ID' => 3,
				'DISPLAY' => 'Both'
			]
		]
	];
	public const NOD = [
		'STATUS' => [
			'ACTIVE' => [
				'ID' => 1,
				'DISPLAY' => 'Active'
			],
			'INACTIVE' => [
				'ID' => 2,
				'DISPLAY' => 'Inactive'
			]
		]
	];
	public const Subscriber = [
		'Status' => [
			'IDLE' => [
				'ID' => 1,
				'DISPLAY' => 'Idle'
			],
			'ACTIVE' => [
				'ID' => 2,
				'DISPLAY' => 'Active'
			],
			'CALLBARRING' => [
				'ID' => 3,
				'DISPLAY' => 'Call Barring'
			],
			'SUSPEND' => [
				'ID' => 4,
				'DISPLAY' => 'Suspend'
			],
			'TEST' => [
				'ID' => 6,
				'DISPLAY' => 'Test'
			],
			'STORAGE' => [
				'ID' => 7,
				'DISPLAY' => 'Storage'
			],
			'PREDEACTIVATION' => [
				'ID' => 8,
				'DISPLAY' => 'Pre-deactivation'
			],
			'DEACTIVATION' => [
				'ID' => 9,
				'DISPLAY' => 'Deactivation'
			]
		]
	];
	public const Customer = [
		'IDType' => [
			'NEW_NRIC' => [
				'ID' => 1,
				'DISPLAY' => 'New NRIC'
			],
			'PASSPORT' => [
				'ID' => 2,
				'DISPLAY' => 'Passport'
			],
			'BRN' => [
				'ID' => 4,
				'DISPLAY' => 'BRN'
			],
			'OLD_NRIC' => [
				'ID' => 5,
				'DISPLAY' => 'Old NRIC'
			],
			'POLICE' => [
				'ID' => 6,
				'DISPLAY' => 'Police'
			],
			'MILITARY' => [
				'ID' => 7,
				'DISPLAY' => 'Military'
			],
			'MYPR' => [
				'ID' => 15,
				'DISPLAY' => 'MyPR'
			],
			'MYKAS' => [
				'ID' => 16,
				'DISPLAY' => 'MyKAS'
			],
			'IKAD' => [
				'ID' => 17,
				'DISPLAY' => 'IKAD'
			],
			'IMM13_P' => [
				'ID' => 18,
				'DISPLAY' => 'IMM13/IMM13P'
			],
			'WORK_PERMIT' => [
				'ID' => 19,
				'DISPLAY' => 'Work Permit'
			],
			'UNKNOWN' => [
				'ID' => 99,
				'DISPLAY' => 'Unknown type'
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
			'ALTERNATIVE_CONTACT' => [
				'ID' => 4,
				'DISPLAY' => 'Alternative Contact'
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
	public const Commission = [
		'Version' => [
			'Status' => [
				'ACTIVE' => [
					'ID' => 1,
					'DISPLAY' => 'Active'
				],
				'INACTIVE' => [
					'ID' => 2,
					'DISPLAY' => 'Inactive'
				],
				'NOT_USED' => [
					'ID' => 3,
					'DISPLAY' => 'Not used'
				]
			]
		],
		'Internal' => [
			'Bucket' => [
				'AGING30' => [
					'ID' => 1,
					'DISPLAY' => 'Aging 30'
				],
				'AGING60' => [
					'ID' => 2,
					'DISPLAY' => 'Aging 60'
				]
			],
			'Bracket' => [
				'UNDER30K' => [
					'ID' => 1,
					'DISPLAY' => 'Under 30,000'
				],
				'UNDER40K' => [
					'ID' => 2,
					'DISPLAY' => '30,000 - below 40,000'
				],
				'UNDER50K' => [
					'ID' => 3,
					'DISPLAY' => '40,000 - below 50,000'
				],
				'UNDER60K' => [
					'ID' => 4,
					'DISPLAY' => '50,000 - below 60,000'
				],
				'UNDER70K' => [
					'ID' => 5,
					'DISPLAY' => '60,000 - below 70,000'
				],
				'UNDER80K' => [
					'ID' => 6,
					'DISPLAY' => '70,000 - below 80,000'
				],
				'OVER80K' => [
					'ID' => 7,
					'DISPLAY' => '80,000 or above'
				]
			]
		],
		'DCA' => [
			'Bucket' => [
				'AGING60' => [
					'ID' => 1,
					'DISPLAY' => 'Aging 61 - 120'
				],
				'AGING120' => [
					'ID' => 2,
					'DISPLAY' => 'Aging 121 - 180'
				],
				'AGING180' => [
					'ID' => 3,
					'DISPLAY' => 'Aging > 180'
				],
				'WRITEOFF' => [
					'ID' => 4,
					'DISPLAY' => 'Write-off'
				]
			],
			'Bracket' => [
				'UNDER200K' => [
					'ID' => 1,
					'DISPLAY' => 'Under 200,000'
				],
				'UNDER250K' => [
					'ID' => 2,
					'DISPLAY' => 'Under 250,000'
				],
				'UNDER300K' => [
					'ID' => 3,
					'DISPLAY' => 'Under 300,000'
				],
				'UNDER350K' => [
					'ID' => 4,
					'DISPLAY' => 'Under 350,000'
				],
				'UNDER400K' => [
					'ID' => 5,
					'DISPLAY' => 'Under 400,000'
				],
				'OVER400K' => [
					'ID' => 6,
					'DISPLAY' => '400,000 or more'
				]
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
	public const CallCenter = [
		'CallResult' => [
			'ABANDONED' => [
				'ID' => 21,
				'NAME' => 'Abandoned',
				'DESCRIPTION' => 'Call dropped by the customer while waiting in queue or on routing point.'
			],
			'AGENT_CB_ERR' => [
				'ID' => 47,
				'NAME' => 'Agent callback error',
				'DESCRIPTION' => 'OCS generates this call result when a call record is rescheduled according to a “personal callback” request from the desktop application. When the scheduled time arrives OCS either cannot find the designated agent to receive the callback or the connection to Stat Server has been lost.'
			],
			'ALL_TRUNK_BUSY' => [
				'ID' => 10,
				'NAME' => 'All Trunks Busy',
				'DESCRIPTION' => 'No trunk is currently available to place the call.'
			],
			'ANSWER' => [
				'ID' => 33,
				'NAME' => 'Answer',
				'DESCRIPTION' => 'Customer was reached at the dialed phone number.'
			],
			'ANSWER_MACHINE' => [
				'ID' => 9,
				'NAME' => 'Answering Machine Detected',
				'DESCRIPTION' => 'Answering machine was detected at the dialed phone number.'
			],
			'BUSY' => [
				'ID' => 6,
				'NAME' => 'Busy',
				'DESCRIPTION' => 'Dialed phone number was busy.'
			],
			'CALL_DROP' => [
				'ID' => 42,
				'NAME' => 'Call Drop Error',
				'DESCRIPTION' => 'Error occurred while dropping the call.'
			],
			'CANCEL_RECORD' => [
				'ID' => 52,
				'NAME' => 'Cancel Record',
				'DESCRIPTION' => 'Record has been canceled.'
			],
			'DIAL_ERR' => [
				'ID' => 41,
				'NAME' => 'Dial Error',
				'DESCRIPTION' => 'Hardware error from a Dialogic board or from a call progress detection (CPD) board on the switch.'
			],
			'DO_NOT_CALL' => [
				'ID' => 51,
				'NAME' => 'Do Not Call',
				'DESCRIPTION' => 'Record has been marked as Do Not Call.'
			],
			'DROPPED' => [
				'ID' => 26,
				'NAME' => 'Dropped',
				'DESCRIPTION' => 'Call was dropped by the dialer after being dialed. Call is dropped if the following timers expire #call_wait_in_queue_timeout #call_wait_original_establish_timeout'
			],
			'DROPPED_NO_ANS' => [
				'ID' => 27,
				'NAME' => 'Dropped on No Answer',
				'DESCRIPTION' => 'Call has been dropped or released from an established three-way call before being answered.'
			],
			'FAX' => [
				'ID' => 17,
				'NAME' => 'Fax Detected',
				'DESCRIPTION' => 'Fax machine was detected at the dialed phone number.'
			],
			'FORWARDED' => [
				'ID' => 23,
				'NAME' => 'Forwarded',
				'DESCRIPTION' => 'Reserved for future use.'
			],
			'GENERAL_ERR' => [
				'ID' => 3,
				'NAME' => 'General Error',
				'DESCRIPTION' => 'General error occurs when a call is not completed possibly caused by an invalid phone number in the record or a wrong number according to the switch'
			],
			'GROUP_CB_ERR' => [
				'ID' => 48,
				'NAME' => 'Group CallBack Error',
				'DESCRIPTION' => 'Generated by OCS internally when a call record is rescheduled according to a ‘Campaign Callback’ request from the desktop application however OCS cannot find an available agent to receive the callback record.'
			],
			'NO_ANS' => [
				'ID' => 7,
				'NAME' => 'No Answer',
				'DESCRIPTION' => 'Ring without answer at destination.'
			],
			'NO_DIAL_TONE' => [
				'ID' => 35,
				'NAME' => 'No Dial Tone',
				'DESCRIPTION' => 'Absence of dial tone based on an error returned by the Dialogic board or the call progress detection board on the switch.'
			],
			'NO_PORT_AVAIL' => [
				'ID' => 44,
				'NAME' => 'No Port Available',
				'DESCRIPTION' => 'No port is available to place the call.'
			],
			'NO_PROGRESS' => [
				'ID' => 36,
				'NAME' => 'No Progress',
				'DESCRIPTION' => 'Reserved for instances in which the call progress detection either did not start or has been terminated due to a Dialogic hardware or CPD Server configuration error.'
			],
			'NO_RINGBACK_TONE' => [
				'ID' => 37,
				'NAME' => 'No RingBack Tone',
				'DESCRIPTION' => 'There is no ringback tone on the called line.'
			],
			'NU_TONE' => [
				'ID' => 34,
				'NAME' => 'NU Tone',
				'DESCRIPTION' => 'A special Public Switched Telephone Network (PSTN) code valid only in Europe.'
			],
			'OK' => [
				'ID' => 0,
				'NAME' => 'OK',
				'DESCRIPTION' => 'Call result is unset. That is the call record has not been dialed.'
			],
			'PAGER' => [
				'ID' => 39,
				'NAME' => 'Pager Detected',
				'DESCRIPTION' => 'Pager was reached at the dialed phone number.'
			],
			'PICKEDUP' => [
				'ID' => 25,
				'NAME' => 'Pickedup',
				'DESCRIPTION' => 'Reserved for future use.'
			],
			'REMOTE_RELEASE' => [
				'ID' => 5,
				'NAME' => 'RemoteRelease',
				'DESCRIPTION' => 'Call was released in response to an error on the switch or no contact with called party.'
			],
			'SILENCE' => [
				'ID' => 32,
				'NAME' => 'Silence',
				'DESCRIPTION' => 'Call was dialed. However there is no call progress indication.'
			],
			'SIT' => [
				'ID' => 8,
				'NAME' => 'SIT Detected',
				'DESCRIPTION' => 'Any type of network tone.'
			],
			'SIT_IC' => [
				'ID' => 13,
				'NAME' => 'SIT IC (Intercept)',
				'DESCRIPTION' => 'Applies only if the network supports this specific SIT tone.'
			],
			'SIT_INVALID_NUM' => [
				'ID' => 11,
				'NAME' => 'SIT Invalid Num',
				'DESCRIPTION' => 'Applies only if the network supports this specific SIT tone.'
			],
			'SIT_NIC' => [
				'ID' => 15,
				'NAME' => 'SIT NC (No Circuit)',
				'DESCRIPTION' => 'Applies only if the network supports this specific SIT tone.'
			],
			'SIT_RO' => [
				'ID' => 16,
				'NAME' => 'SIT RO (Reorder)',
				'DESCRIPTION' => 'Applies only if the network supports this specific SIT tone.'
			],
			'SIT_UNK_STATE' => [
				'ID' => 14,
				'NAME' => 'SIT Unknown Call State',
				'DESCRIPTION' => 'Applies only if the network supports this specific SIT tone.'
			],
			'SIT_VC' => [
				'ID' => 12,
				'NAME' => 'SIT VC (Vacant Code)',
				'DESCRIPTION' => 'Applies only if the network supports this specific SIT tone.'
			],
			'STALE' => [
				'ID' => 46,
				'NAME' => 'Stale',
				'DESCRIPTION' => 'Call result is marked as Stale in the following scenario #The following timer has expired #stale_clean_timeout #OCS marks the call result as Stale if an outbound call was transferred from >> a queue to a DN which is either not registered for OCS or does not have a logged in agent.'
			],
			'SWITCH_ERR' => [
				'ID' => 43,
				'NAME' => 'Switch Error',
				'DESCRIPTION' => 'No dial tone received.'
			],
			'SYSTEM_ERR' => [
				'ID' => 4,
				'NAME' => 'System Error',
				'DESCRIPTION' => 'Dialing software error from the Dialogic driver or call progress detection (CPD) from the switch.'
			],
			'TRANSFER_ERR' => [
				'ID' => 45,
				'NAME' => 'Transfer Error',
				'DESCRIPTION' => 'Dialer has a problem transferring calls based on call action.'
			],
			'UNK_CALL_RES' => [
				'ID' => 28,
				'NAME' => 'Unknown Call Result',
				'DESCRIPTION' => 'Default. All records should be set to this call result before starting a campaign/campaign group.'
			],
			'WRONG_NUM' => [
				'ID' => 53,
				'NAME' => 'Wrong Number',
				'DESCRIPTION' => 'Intended person cannot be reached at this number. This call result is sent by the desktop application and is not detected by the dialer.'
			],
			'WRONG_PARTY' => [
				'ID' => 40,
				'NAME' => 'Wrong Party',
				'DESCRIPTION' => 'Call is answered but by a wrong party. This call result is sent by the desktop application and not detected by the dialer.'
			]
		]
	];
	public const User = [
		'Group' => [
			'SYSTEM1' => [
				'ID' => 1,
				'IGA' => 0,
				'NAME' => 'System1',
				'DESCRIPTION' => 'System'
			],
			'SYSADMIN1' => [
				'ID' => 2,
				'IGA' => 1,
				'NAME' => 'SystemAdmin1',
				'DESCRIPTION' => 'System Administrator 1'
			],
			'SYSADMIN2' => [
				'ID' => 3,
				'IGA' => 1,
				'NAME' => 'SystemAdmin2',
				'DESCRIPTION' => 'System Administrator 2'
			],
			'COLLADMIN1' => [
				'ID' => 4,
				'IGA' => 1,
				'NAME' => 'CollectionAdmin1',
				'DESCRIPTION' => 'Collection Administrator 1'
			],
			'COLLADMIN2' => [
				'ID' => 5,
				'IGA' => 1,
				'NAME' => 'CollectionAdmin2',
				'DESCRIPTION' => 'Collection Administrator 2'
			],
			'COLL' => [
				'ID' => 6,
				'IGA' => 1,
				'NAME' => 'Collection',
				'DESCRIPTION' => 'Collection Agents'
			],
			'ENT1' => [
				'ID' => 7,
				'IGA' => 1,
				'NAME' => 'Enterprise1',
				'DESCRIPTION' => 'Enterprise Account 1'
			],
			'ENT2' => [
				'ID' => 8,
				'IGA' => 1,
				'NAME' => 'Enterprise2',
				'DESCRIPTION' => 'Enterprise Account 2'
			],
			'FIN' => [
				'ID' => 9,
				'IGA' => 1,
				'NAME' => 'FinanceAdmin',
				'DESCRIPTION' => 'Finance Administrator'
			],
			'DCAADMIN' => [
				'ID' => 10,
				'IGA' => 1,
				'NAME' => 'DCAAdmin',
				'DESCRIPTION' => 'DCA Administrator'
			],
			'FRAUD' => [
				'ID' => 11,
				'IGA' => 1,
				'NAME' => 'FraudTeam',
				'DESCRIPTION' => 'Fraud Team'
			],
			'STAFF' => [
				'ID' => 12,
				'IGA' => 1,
				'NAME' => 'Staff',
				'DESCRIPTION' => 'Staff'
			],
			'DCA' => [
				'ID' => 13,
				'IGA' => 1,
				'NAME' => 'DCA',
				'DESCRIPTION' => 'DCA'
			],
			'SYSINTERNAL' => [
				'ID' => 14,
				'IGA' => 0,
				'NAME' => 'SystemInternal',
				'DESCRIPTION' => 'System for internal'
			],
			'USERTERM' => [
				'ID' => 14,
				'IGA' => 0,
				'NAME' => 'UserTerminated',
				'DESCRIPTION' => 'User Terminiated'
			],
			'WEBSERV' => [
				'ID' => 90,
				'IGA' => 0,
				'NAME' => 'WebService',
				'DESCRIPTION' => 'For Web Service use do not change'
			],
			'IGA' => [
				'ID' => 91,
				'IGA' => 1,
				'NAME' => 'IGA',
				'DESCRIPTION' => 'For IGA user account integration do not change'
			]
		]
	];
}
?>
