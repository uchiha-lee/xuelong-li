<template>

    <!-- 设置固定定位 -->
    <div class="con">
        <!-- 设置相对定位 -->
        <div class="relative">
            <!-- 设置底部 -->
            <p>确认删除该条记录</p>
            <footer class="footer">
                <!-- 子组件触发事件，通过自定义函数传出数据给父组件 -->
                <button @click="sonClose(close)">确认</button>
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
    top: 70%;
    right: 40%;
    width: 200px;
    height: 100px;
    border: 1px solid black transparent;
    box-shadow: rgb(199, 196, 196) 0px 0px 10px;
    background-color: #fff;
}

.relative {
    position: relative;
    width: 200px;
    height: 100px;
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