<template>
    <div>
        <!-- 登录内容 -->
        <div>
            <label for="username">登录名称</label>
            <!-- 双向绑定 store.uesrname-->
            <input type="text" placeholder="请输入登录名称" v-model="store.uesrname">
        </div>
        <div><label for="username">登录密码</label>
            <input type="password" placeholder="请输入登录密码" v-model="store.password">
        </div>
        <!-- 设置事件 -->
        <div>
            <button @click="clear">重置</button>
            <button @click="login">登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store';
import router from '../../router';

const store = useStore()

// 重置事件
const clear = () => {
    // 清空数据
    store.uesrname = ''
    store.password = ''
}

// 提交事件
const login = () => {
    // 验证账号密码
    if (store.uesrname === 'admin' && store.password === '123456'){
        // 成功后跳转
        router.push('/home')
        // 储存登录状态
        return localStorage.setItem('token','xxx')
    } else {
        // 失败清空
        alert("请输入正确密码")
        store.uesrname = ''
        store.password = ''
    }
    // 删除登录状态
    localStorage.removeItem('token')
}
</script>

<style scoped>

</style>