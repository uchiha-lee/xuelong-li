<template>
    <p>批准审核</p>
    <div>
        <label for="">批准人：</label>
        <input type="text">
    </div>
    <div>
        <label for="">批准时间：</label>
        <input type="text">
    </div>
    <div>
        <label for="">批准结果：</label>
        <input type="text">
    </div>
    <div>
        <label for="">批准意见：</label>
        <input type="text">
    </div>
    <footer>
        <button @click="buttonCtrlS">保存</button>
        <button @click="buttonSubmit">提交</button>
    </footer>
</template>

<script setup lang="ts">
import router from "../router"
import { useStore } from "../store/index"

// 创建store实例
const store = useStore()

function buttonCtrlS(): void {
    const path: string = '/main/' + store.nav
    router.push(path)
}

function buttonSubmit(): void {
    if (store.nav < 6) {
        store.nav += 1
        store.isvisited == store.nav
    }
    const path: string = '/main/' + store.nav
    router.push(path)
}

</script>

<style scoped>
p {
    margin-left: 120px;
    width: 320px;
    height: 30px;
    background-color: rgba(163, 158, 158, 0.305);
    text-align: left;
    line-height: 30px;
    font-weight: bold;
}
</style>