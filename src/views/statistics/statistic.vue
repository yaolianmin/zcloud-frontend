<template>
    <div>
        <Row style="background: #eee;padding:20px">
            <Col span="11">
                <Card :bordered="false">
                    <p slot="title">System Information</p>
                    <p>固件更新次数:</p>
                    <p>模板下载次数:</p>
                    <p>UI警告次数:</p>
                    <p>电子邮件通知次数:</p>
                </Card>
            </Col>
            <Col span="11" offset="2">
                <Card shadow>
                    <p slot="title">Device Information</p>
                    <p>在线:</p>
                    <p>离线:</p>
                    <p>客户端:</p>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    
</script>