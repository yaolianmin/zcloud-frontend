<template>
    <div class="layout-content-main">
        <Table :data="alertlist" :columns="alerthead" stripe size="small"></Table>
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
                alertlist: this.mockTableData1(),
                alerthead: [
                    {
                        title: '#',
                        key: 'id'
                    },
                    {
                        title: 'Model Name',
                        key: 'modelname'
                    },
                    {
                        title: 'Description',
                        key: 'desc'
                    },
                    {
                        title: 'Time',
                        key: 'time',
                        sortable: 'true'
                    },
                    {
                        title: 'Mac Addr',
                        key: 'macaddr',
                        filters: [
                            {
                                label: 'New York',
                                value: 'New York'
                            },
                            {
                                label: 'London',
                                value: 'London'
                            },
                            {
                                label: 'Sydney',
                                value: 'Sydney'
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
                        title: 'Status',
                        key: 'status',
                        filters: [
                            {
                                label: 'Done',
                                value: '1'
                            },
                            {
                                label: 'Pending',
                                value: '0'
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.status > 25;
                            } else if (value === 2) {
                                return row.status < 25;
                            }
                        }
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