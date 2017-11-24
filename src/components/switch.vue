<template>
    <Switch @on-change="change"></Switch>
</template>
<script>
    export default {
        methods: {
            change (status) {
                this.$Message.info('开关状态：' + status);
            }
        }
    }
</script>
