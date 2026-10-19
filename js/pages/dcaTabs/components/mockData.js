export const mockData = {
    dcaLoginUserData: [
        {
            action: '<button class="btn btn-primary btn-edit-dca-login-user">Edit</button>',
            user_id: 'v07662x',
            name: 'v07662x',
            dca_code: 'DCA/CHRS',
            create_date: '20/2',
        },
        {
            action: '<button class="btn btn-primary btn-edit-dca-login-user">Edit</button>',
            user_id: 'v12234',
            name: 'v12234',
            dca_code: 'DCA/CHRS',
            create_date: '20/2',
        },
        {
            action: '<button class="btn btn-primary btn-edit-dca-login-user">Edit</button>',
            user_id: 'v2330',
            name: 'v2330',
            dca_code: 'DCA/ADUN',
            create_date: '20/2',
        },
        {
            action: '<button class="btn btn-primary btn-edit-dca-login-user">Edit</button>',
            user_id: 'v20202',
            name: 'v20202',
            dca_code: 'DCA/CCRN',
            create_date: '20/2',
        },
        {
            action: '<button class="btn btn-primary btn-edit-dca-login-user">Edit</button>',
            user_id: 'v0902',
            name: 'v0902',
            dca_code: 'DCA/DHIR',
            create_date: '20/2',
        },
    ],
    weightGroupData: [
        {
            dca_code: 'DCA/A1',
            dca_name: 'A1 DUNNING Sdn',
            ranking: '1',
            weight: '<input type="text" class="input-weight" value="1"></input>',
            estimate: '16.6',
        },
        {
            dca_code: 'DCA/KUBL',
            dca_name: 'Kubr Sdn',
            ranking: '1',
            weight: '<input type="text" class="input-weight" value="1"></input>',
            estimate: '16.6',
        },
        {
            dca_code: 'DCA/MIDA',
            dca_name: 'MIDA company',
            ranking: '2',
            weight: '<input type="text" class="input-weight" value="1"></input>',
            estimate: '16.6',
        },
        {
            dca_code: 'DCA/MISU',
            dca_name: 'MISU company',
            ranking: '2',
            weight: '<input type="text" class="input-weight" value="1"></input>',
            estimate: '16.6',
        },
        {
            dca_code: 'DCA/ETR',
            dca_name: 'Kubr Sdn',
            ranking: '1',
            weight: '<input type="text" class="input-weight" value="1"></input>',
            estimate: '16.6',
        },
        {
            dca_code: 'DCA/QUBL',
            dca_name: 'QUBL limited',
            ranking: '1',
            weight: '<input type="text" class="input-weight" value="1"></input>',
            estimate: '16.6',
        },
    ],
    weightData: [
        {
            action: '<button class="btn btn-primary btn-weight">Weight</button>',
            group: 'DCA Group Standard',
            active_dca_count: '12'
        },
        {
            action: '<button class="btn btn-primary btn-weight">Weight</button>',
            group: 'DCA Group SPDCA',
            active_dca_count: '12'
        },
        {
            action: '<button class="btn btn-primary btn-weight">Weight</button>',
            group: 'DCA Group Ad Hoc',
            active_dca_count: '2'
        },
    ],
    dcaCampaignData: [
        {
            id: '300101',
            campaign_name: 'MASS_RE_VOICE_1_DD_17',
            dunning_group: '101123:MASS_RE_VOICE',
            type: '1',
            overdue_days: '17',
            validity: '14',

        },
    ],
    dcaManageData: [
        {
            action: '<button class="btn btn-primary btn-dca-dispatch">Dispatch</button>',
            id: '400101',
            campaign_name: 'MASS 61 - 120',
            dunning_group: 'MASS DCA',
            type: '2',
            overdue_days: '61',
            validity: '60',
            status: '2',

        },
    ],


    dcaDispatchData: [
        {
            dca_code: 'DCA/A1',
            dca_name: 'A1 DUNNING Sdn',
            ranking: '1',
            weight: '<input type="text" class="dca-dispatch-weight" value="1"/>',
            estimate_count: '10%',
        },
        {
            dca_code: 'DCA/KUBL',
            dca_name: 'Kubr Sdn',
            ranking: '1',
            weight: '<input type="text" class="dca-dispatch-weight" value="1"/>',
            estimate_count: '10%',
        },
        {
            dca_code: 'DCA/MIDA',
            dca_name: 'MIDA company',
            ranking: '1',
            weight: '<input type="text" class="dca-dispatch-weight" value="1"/>',
            estimate_count: '30%',
        },
        {
            dca_code: 'DCA/MISU',
            dca_name: 'MISU company',
            ranking: '2',
            weight: '<input type="text" class="dca-dispatch-weight" value="1"/>',
            estimate_count: '30%',
        },
        {
            dca_code: 'DCA/ETR',
            dca_name: 'ETR company',
            ranking: '2',
            weight: '<input type="text" class="dca-dispatch-weight" value="1"/>',
            estimate_count: '10%',
        },
        {
            dca_code: 'DCA/QUBL',
            dca_name: 'QUBL limited',
            ranking: '2',
            weight: '<input type="text" class="dca-dispatch-weight" value="1"/>',
            estimate_count: '10%',
        },
    ],
    campaignSetupData: [
        {
            action: '<button class="btn btn-primary btn-edit-campaign-setting">Edit</button>',
            id: '300101',
            campaign_name: 'MASS_RE_VOICE_1_DD_17',
            dunning_group: '101123:MASS_RE_VOICE',
            type: '1',
            overdue_days: '17',
            validity: '14',
            status: '1',
            display_name: 'MASSVOICE',
            call_group: '1',
            remark: '1',
        },
    ],

};