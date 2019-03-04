const viewData = {
    productInfo: {
        model_name: 'AN-1022',
        card_num: 2,
        vap_num: [8, 8],
        dev_type: 'AC',
    },
    viewDesc: [
        {
            L: {
                T1: 'Wireless Setting',
                span: [
                    {
                        label: 'Template Name',
                        key: 'template_name',
                        V: 'Input',
                        value: ['default','default'],
                        prop: 1
                    },
                    {
                        label: 'Channel/Frequency',
                        key: 'channel_frequency',
                        V: 'Select',
                        value: [1,8],
                        options: [
                            [
                                {
                                    label: '1/2.412GHz',
                                    value: 1
                                },
                                {
                                    label: '2/2.412GHz',
                                    value: 2
                                },
                                {
                                    label: '3/2.412GHz',
                                    value: 3
                                },
                                {
                                    label: '4/2.412GHz',
                                    value: 4
                                }
                            ],
                            [
                                {
                                    label: '5/2.412GHz',
                                    value: 5
                                },
                                {
                                    label: '6/2.412GHz',
                                    value: 6
                                },
                                {
                                    label: '7/2.412GHz',
                                    value: 7
                                },
                                {
                                    label: '8/2.412GHz',
                                    value: 8
                                }
                            ]
                        ],
                        prop: 1
                    },
                    {
                        label: 'Operating Mode',
                        key: 'wireless_mode',
                        V: 'Select',
                        value: [1, 6],
                        options: [
                            [
                                {
                                    label: '802.11b/g/n',
                                    value: 1
                                },
                                {
                                    label: '802.11b',
                                    value: 2
                                },
                                {
                                    label: '802.11a/n',
                                    value: 3
                                }
                            ],
                            [
                                {
                                    label: '802.11b/g',
                                    value: 4
                                },
                                {
                                    label: '802.11n',
                                    value: 5
                                },
                                {
                                    label: '802.11g',
                                    value: 6
                                }
                            ]
                        ],
                        prop: 1
                    },
                    {
                        label: 'DTIM Interval',
                        key: 'dtim_interval',
                        V: 'Input',
                        value: [1,1],
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
                            key: 'profiles_name',
                            V: 'Input',
                            value: ['vap0', 'vap1', 'vap2', 'vap3', 'vap4', 'vap5', 'vap6', 'vap7', 'vap8', 'vap9', 'vap10', 'vap11', 'vap12', 'vap13', 'vap14', 'vap15'],
                            prop: 2
                        },
                        {
                            label: 'Wireless Network Name(SSID)',
                            key: 'ssid',
                            V: 'Input',
                            value: ['vap0', 'vap1', 'vap2', 'vap3', 'vap4', 'vap5', 'vap6', 'vap7', 'vap8', 'vap9', 'vap10', 'vap11', 'vap12', 'vap13', 'vap14', 'vap15'],
                            prop: 2
                        },
                        {
                            label: 'Security',
                            key: 'security',
                            V: 'Input',
                            value: ['vap0', 'vap1', 'vap2', 'vap3', 'vap4', 'vap5', 'vap6', 'vap7', 'vap8', 'vap9', 'vap10', 'vap11', 'vap12', 'vap13', 'vap14', 'vap15'],
                            prop: 2
                        }
                    ]
                }
            }
        },
    ]
};

export default viewData;