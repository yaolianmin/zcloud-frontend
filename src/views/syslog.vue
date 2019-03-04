<template>
    <div class="layout-content-main">
        <Table :data="sysloglist" :columns="syslogth" stripe size="small"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                sysloglist: this.mockTableData1(),
                syslogth: [
                    {
                        title: '#',
                        key: 'id'
                    },
                    {
                        title: 'Log Type',
                        key: 'logtype',
                        filters: [
                            {
                                label: 'User Management',
                                value: '1'
                            },
                            {
                                label: 'User Login/Logout',
                                value: '2'
                            },
                            {
                                label: 'Template Operation',
                                value: '3'
                            },
                            {
                                label: 'Download File',
                                value: '4'
                            },
                            {
                                label: 'Task Management',
                                value: '5'
                            },
                            {
                                label: 'Device Management',
                                value: '6'
                            }
                        ],
                        filterMultiple: true,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.time > 25;
                            } else if (value === 2) {
                                return row.time < 25;
                            }
                        }
                    },
                    {
                        title: 'Log Description',
                        key: 'syslogdesc'
                    },
                    {
                        title: 'Log Time',
                        key: 'syslogtm',
                        sortable: true
                    },
                    {
                        title: 'Log Source',
                        key: 'syslogsrc'
                    }
                ]
            }
        },
        methods: {
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        name: 'Business' + Math.floor(Math.random () * 100 + 1),
                        status: Math.floor(Math.random () * 3 + 1),
                        portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
                        people: [
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            }
                        ],
                        time: Math.floor(Math.random () * 7 + 1),
                        update: new Date()
                    })
                }
                return data;
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            }
        }
    }
</script>