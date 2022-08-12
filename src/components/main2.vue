<template>
    <p>解决接收</p>
    <div>
        <label for="" class="checkLabel">是否接受问题：</label>
        <div class="checkFather">
            <input type="radio" name="check" checked class="check">是
            <input type="radio" name="check" class="check">否
        </div>
        <label for="" class="checkLabel">操作人：李四</label>
    </div>
    <div>
        <label for="">责任部门：</label>
        <input type="text">
    </div>
    <div>
        <label for="">责任科室：</label>
        <input type="text">
    </div>
    <div>
        <label for="">责任人：</label>
        <input type="text">
    </div>
    <p>解决问题</p>
    <div>
        <label for="">岗位：</label>
        <input type="text">
    </div>
    <div>
        <label for="">员工：</label>
        <input type="text">
    </div>
    <div>
        <label for="">岗龄：</label>
        <input type="text">
    </div>
    <div>
        <label for="">原因解析：</label>
        <input type="text">
    </div>
    <div>
        <label for="">临时对策：</label>
        <input type="text">
    </div>
    <div>
        <label for="">上传文件：</label>
        <input type="text">
    </div>
    <div>
        <label for="">完成时间：</label>
        <input type="text">
    </div>
    <div>
        <label for="">问题类型：</label>
        <input type="text">
    </div>
    <div>
        <label for="">审核人：</label>
        <input type="text">
    </div>
    <div>
        <label for="">批准人：</label>
        <input type="text">
    </div>
    <p>解决审核</p>
    <div>
        <label for="">审核人：</label>
        <input type="text">
    </div>
    <div>
        <label for="">审核时间：</label>
        <input type="text">
    </div>
    <div>
        <label for="">审核结果：</label>
        <input type="text">
    </div>
    <div>
        <label for="">审核意见：</label>
        <input type="text">
    </div>
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

.checkLabel{
    white-space: nowrap;
    font-size: 15px;
}

</style>