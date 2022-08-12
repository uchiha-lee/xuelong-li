<template>
    <div>
        <!-- 左侧 -->
        <div class="left-div">
            <p>某某某后台管理系统</p>
        </div>
        <!-- 右侧 -->
        <div class="right-div">
            <button @click="outLogin">退出登录</button>
        </div>
    </div>
</template>
<script lang="ts">
import router from '../../router'
export default {
    name: 'myHeader'
}
</script>

<script setup lang="ts">

// 退出事件
const outLogin = () =>{
    // 回到登录界面
    router.push('/login')
    // 清除登录状态
    localStorage.removeItem('token')
}
</script>

<style scoped>

.left-div{
    display: inline-block;
    width: 200px;
    height: 50px;
}
.right-div {
    display: inline-block;
    margin-left: 20px;
}
</style>