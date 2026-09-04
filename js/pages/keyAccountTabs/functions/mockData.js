export const mockData = {
    accountListingData: [
        {
            account_number: '1',
            region: 'Central',
            subscriber_status: 'active',
            extended_date: `
                <select>
                    <option value="0">Not Defined</option>
                    <option value="1">BAP</option>
                    <option value="2">BKK</option>
                </select>
            `,
        }
    ],
    accountHierarchygData: [
        {
            account_number: '1',
            subscriber_status: 'Active',
            msisdn: '1234567',
            account_type: 'PARENT',
            ctc: '',
            credit_limit: '299.00',
            
        }
    ],
    distirubtionProfileData: [
        {
            action: '<button class="btn-edit-distribution-profile">Edit</button>',
            company_name: "Sumur Cahya Son BHD",
            payment_type: "Centralised",
            payment_center: "Central",
            language: "English",
            extended_data: "Not Defined",
            frequency: "Both"
        }
    ],
    picData: [
        {
            action: '<button class="btn btn-primary btn-edit-pic">Edit</button>',
            name: 'K O Leung',
            full_name: 'Ka On Leung',
            email: 'kleu060@gmail.com',
            phone: '022123123',
        },
        {
            action: '<button class="btn btn-primary btn-edit-pic">Edit</button>',
            name: 'K O Leung',
            full_name: 'Ka On Leung',
            email: 'kleu060@gmail.com',
            phone: '022123123',
        },
    ]
};