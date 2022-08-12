import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入路由和pinia
import {createPinia } from 'pinia'
import router from './router/index'

// 使用路由和状态管理
createApp(App).use(createPinia()).use(router).mount('#app')
