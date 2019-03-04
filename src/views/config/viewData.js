const viewData = {
    productInfo: {
        model_name: 'AN-1022',
        card_num: 2,
        vap_num: [8, 8]
    },
    viewDesc: [
        {
            L: {
                T1: 'Wireless Setting',
                span: [
                    {
                        label: 'Enable Raido',
                        key: 'EnableRadio',
                        V: 'Switch',
                        value: [true, false],
                        prop: 1
                    },
                    {
                        label: 'Country/Region',
                        key: 'country',
                        V: 'Select',
                        value: [86, 151],
                        options: [
                            {
                                label: 'China',
                                value: 86
                            },
                            {
                                label: 'France',
                                value: 151
                            }
                        ],
                        prop: 1
                    },
                    {
                        label: 'Operating Mode',
                        key: 'opmode',
                        V: 'Select',
                        value: [3, 5],
                        options: [
                            {
                                label: '802.11b/g/n',
                                value: 3
                            },
                            {
                                label: '802.11b',
                                value: 5
                            }
                        ],
                        prop: 1
                    }
                ]
            }
        },
        {
            L: {
                T1: 'Vap Setting',
                L: {
                    T2: 'Profile Definition',
                    span: [
                        {
                            label: 'Security Profile Name',
                            key: 'ProfileName',
                            V: 'Input',
                            value: ['vap0', 'vap1', 'vap2', 'vap3', 'vap4', 'vap5', 'vap6', 'vap7', 'vap8', 'vap9', 'vap10', 'vap11', 'vap12', 'vap13', 'vap14', 'vap15'],
                            prop: 2
                        },
                        {
                            label: 'Wireless Network Name(SSID)',
                            key: 'ssid',
                            V: 'Input',
                            value: ['Wireless', 'vap1', 'vap2', 'vap3', 'vap4', 'vap5', 'vap6', 'vap7', 'vap8', 'vap9', 'vap10', 'vap11', 'vap12', 'vap13', 'vap14', 'vap15'],
                            prop: 2
                        },
                        {
                            label: 'WMM Support',
                            key: 'wmm',
                            V: 'Select',
                            value: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                            prop: 2,
                            options: [
                                {
                                    label: 'Enable',
                                    value: 1
                                },
                                {
                                    label: 'Disable',
                                    value: 0
                                }
                            ]
                        }
                    ]
                }
            }
        },
    ]
};

export default viewData;