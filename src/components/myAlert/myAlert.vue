<template>

    <!-- 设置固定定位 -->
    <div class="con">
        <!-- 设置相对定位 -->
        <div class="relative">
            <!-- 设置头部 -->
            <header class="header">
                <p>我是弹窗</p>
            </header>
            <!-- 设置主体内容 -->
            <article class="article">
                <!-- 根据父组件传入的数据来渲染 -->
                <p v-for="fatherData in fatherDatas" :key="fatherData.id">这是来自父组件的 {{ fatherData }}</p>
            </article>
            <!-- 设置底部 -->
            <footer class="footer">
                <!-- 子组件触发事件，通过自定义函数传出数据给父组件 -->
                <!-- <button @click="$emit('sonClose', close)">关闭(子)</button> -->
                <button @click="sonClose(close)">关闭(子)</button>
                <!-- 插入父组件的DOM -->
                <slot name="fatherClose"></slot>
            </footer>
        </div>
    </div>


</template>
<script>
export default {
    name: 'myAlert',
}
</script>
<script setup>
import { ref } from 'vue'

// 定义传入数据的接收
defineProps(['fatherDatas'])
// 定义传出数据
const close = ref(false)
//定义传出事件
const emit = defineEmits(['sonClose'])

function sonClose(close) {
    emit('sonClose')
}

</script>

<style scoped>
.con {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 45%;
    width: 200px;
    height: 500px;
    border: 1px solid black;
    background-color: rgba(210, 206, 209, 0.886);
}

.relative {
    position: relative;
    width: 200px;
    height: 500px;
}

.header {
    margin-top: 5px;
    margin-left: 10px;
    width: 180px;
    height: 50px;
    border: 1px solid black;
}

.article {
    margin-top: 5px;
    margin-left: 10px;
    width: 180px;
    height: 300px;
    border: 1px solid black;
}

.footer {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    left: 10px;
    bottom: 20px;
    width: 180px;
}
</style>