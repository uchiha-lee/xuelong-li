<template>
    <div>
        <label for="">问题编号</label>
        <input type="text" placeholder="系统生成" class="noCheck">
    </div>
    <div>
        <label for="">问题主体</label>
        <input type="text" placeholder="系统生成" class="noCheck">
    </div>
    <div>
        <label for="">提出单位</label>
        <input type="text" placeholder="系统自动带出" class="noCheck">
    </div>
    <div>
        <label for="">提出部门</label>
        <input type="text" placeholder="系统自动带出" class="noCheck">
    </div>
    <div>
        <label for="">提出科室</label>
        <input type="text" placeholder="系统自动带出" class="noCheck">
    </div>
    <div>
        <label for="">提出人</label>
        <input type="text" placeholder="系统自动带出" class="noCheck">
    </div>
    <div>
        <label for="">追溯类型</label>
        <input type="text">
    </div>
    <div>
        <label for="">品牌</label>
        <input type="text">
    </div>
    <div>
        <label for="">车型</label>
        <input type="text">
    </div>
    <div>
        <label for="">发生时间</label>
        <input type="text">
    </div>
    <div>
        <label for="">零部件名称</label>
        <input type="text">
    </div>
    <div>
        <label for="">部位类别</label>
        <input type="text">
    </div>
    <div>
        <label for="">部位名称</label>
        <input type="text">
    </div>
    <div>
        <label for="">问题级别</label>
        <input type="text">
    </div>
    <div>
        <label for="">底盘号</label>
        <input type="text">
    </div>
    <div>
        <label for="">失效类型</label>
        <input type="text">
    </div>
    <div>
        <label for="">失效模式</label>
        <input type="text">
    </div>
    <div>
        <label for="">失效频次</label>
        <input type="text">
    </div>
    <div>
        <label for="">车身号</label>
        <input type="text">
    </div>
    <div>
        <label for="">上传图片</label>
        <input type="text">
    </div>
    <div>
        <label for="">上传文件</label>
        <input type="text">
    </div>
    <div>
        <label for="">问题描述</label>
        <input type="text">
    </div>
    <div>
        <label for="">回复部门</label>
        <input type="text">
    </div>
    <div>
        <label for="">回复科室</label>
        <input type="text">
    </div>
    <div>
        <label for="">回复车间</label>
        <input type="text">
    </div>
    <div>
        <label for="">回复时间</label>
        <input type="text">
    </div>
    <div>
        <label for="">提交时间</label>
        <input type="text" placeholder="-- -- --" class="noCheck">
    </div>
    <footer>
        <button @click="buttonCtrlS">保存</button>
        <button @click="buttonRemove" open = true>删除</button>
        <button @click="buttonSubmit">提交</button>

        <!-- 设置出入过渡 -->
        <transition>
            <!-- 导入组件并根据open来显示或隐藏 -->
            <!-- 使用事件获取子组件传递的数据 -->
            <MyAlert v-if="open" @son-close="sonClose">
                <!-- 具名插槽指定插入位置 -->
                <template #fatherClose>
                    <!-- 关闭按钮，修改open为false -->
                    <button @click="open = false">取消</button>
                </template>

            </MyAlert>
        </transition>
    </footer>
</template>

<script setup lang="ts">
import router from "../router"
import { useStore } from "../store/index"
import { ref } from "vue";
import MyAlert from './myAlert.vue';

// 创建store实例
const store = useStore()
// 控制开关
const open = ref(false)
// 子组件自定义事件触发的函数，处理子组件传出的数据
function sonClose(close:boolean) {
    // 关闭组件
    // 调用路由
    open.value = close
    router.push('/main/0')
}

// 点击事件保存
function buttonCtrlS() :void {
    // 跳转到主页面
    const path: string = '/main/' + store.nav
    router.push(path)
}
// 点击事件提交
function buttonSubmit(): void{
    // 如果进度没达到最后一页
    if (store.nav < 6) {
        // 进度+1，当前导航位置+1
        store.nav += 1
        store.isvisited == store.nav
        }
    // 跳转到下一页
    const path: string = '/main/' + store.nav
    router.push(path)
}

//点击事件删除 
function buttonRemove() :void {
    open.value = true 
}


</script>

<style scoped>

</style>