<template>
    <nav>
        <!-- 访问状态 -->
        <p>{{store.nav}}</p>
        <!-- 列表渲染 -->
        <ul class="nav">
            <!-- 使用路由，导向组件 -->
            <!-- 绑定点击事件mainCheck(index)，触发路由和改变颜色样式 -->
            <!-- 绑定鼠标经过事件styleChange(index)，改变颜色 -->
            <!-- 绑定样式，通过事件改变状态 store.isvisited和store.isvisited-->
            <li v-for="(nav,index) in store.navs" :key="index" @click="mainCheck(index)" @mouseover="styleChange(index)"
                class="navs" :class="{'visited': store.isvisited === index,
                'colors': store.nav > index, 'sChange': store.navOverStyle === index}"> {{ nav }}
            </li>
        </ul>
    </nav>
    <!-- 路由插入位置 -->
    <router-view></router-view>
</template>


<script setup lang="ts">
import router from "../router"
import { useStore } from "../store/index"

// 创建store实例
const store = useStore()

// 定义点击事件
const mainCheck = (index:number) => {
    // 设置当前导航位置等于下标
    store.isvisited = index
    // 当前进度之后的页面不能跳转
     if (store.isvisited <= store.nav){
        //编程式导航，通过点击反馈回来的下标渲染不同组件
        const path: string = '/main/' + store.isvisited
        router.push(path)
 }
}

// 定义鼠标经过事件
const styleChange = (index:number) => {
    // 当前经过位置等于下标
    store.navOverStyle = index
}
</script>

<style scoped>

.navs {
    display: inline-block;
    margin: 5px;
    color: rgb(164, 161, 163);
 }

.colors {
    color: #000;
    
}
.visited {
    color: rgb(78, 7, 244);
    font-weight: bold;
}

.sChange {
    color: rgb(131, 94, 215);
    font-weight: bold;
}
</style>