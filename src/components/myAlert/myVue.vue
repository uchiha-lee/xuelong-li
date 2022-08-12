
<template>
    <!-- 设置开启按钮事件：点击按钮修改open值为true -->
    <button @click="open = true">显示</button>

    <!-- 设置出入过渡 -->
    <transition>
        <!-- 导入组件并根据open来显示或隐藏 -->
        <!-- 传递给子组件items数据 -->
        <!-- 使用事件获取子组件传递的数据 -->
        <MyAlert v-if="open" :fatherDatas="items" @son-close="sonClose">
            <!-- 具名插槽指定插入位置 -->
            <template #fatherClose>
                <!-- 关闭按钮，修改open为false -->
                <button @click="open = false">关闭(父)</button>
            </template>

        </MyAlert>
    </transition>


</template>

<script setup>
import { ref } from 'vue'
import MyAlert from './myAlert.vue';

// 传递给子组件的数据
const items = ref([0, 1, 2, 3])
// 控制开关
const open = ref(false)
// 子组件自定义事件触发的函数，处理子组件传出的数据
function sonClose(close) {
    open.value = close
}
</script>

<style scoped>
/* 出入动画 */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>