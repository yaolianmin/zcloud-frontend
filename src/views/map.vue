<template>
    <div class="layout-content-main">
        <Row>
            <Col span="22" offset="1">
                <div id="BaiduMap" class="BaiduMap"></div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        mounted() {
            var map = new BMap.Map('BaiduMap');
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]}));
            map.setCurrentCity("BeiJing");
            map.enableScrollWheelZoom(true);
        }
    }
</script>
<style scoped>
    .BaiduMap{
        height: 500px;
        overflow: hidden;
        margin: 0;
        font-family: "微软雅黑";
    }
</style>