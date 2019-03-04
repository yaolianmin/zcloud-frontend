<style>
    .echarts {
        height: 300px;
    }
</style>
<template>
    <div class="layout-content-main">
        <div id="myChart" :style="{width: '300px', height: '200px'}"></div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'test',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                let myChart = echarts.init(document.getElementById('myChart'));
                myChart.setOption({
                    title: { text: 'Vue echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["A","B","C","D","E","F"]
                    },
                    yAxis: {},
                    series: [{
                        name: 'X',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>