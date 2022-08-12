import { createRouter, createWebHistory } from 'vue-router'
import main1 from '../components/main1.vue'
import main2 from '../components/main2.vue'
import main3 from '../components/main3.vue'
import main4 from '../components/main4.vue'
import main5 from '../components/main5.vue'
import main6 from '../components/main6.vue'
import main7 from '../components/main7.vue'
import login from '../components/login/myLogin.vue'
import home from '../components/login/home.vue'
import Users from '../components/login/menus/myUsers.vue'
import Rights from '../components/login/menus/myRights.vue'
import Goods from '../components/login/menus/myGoods.vue'
import Orders from '../components/login/menus/myOrders.vue'
import Settings from '../components/login/menus/mySettings.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path: '/main/0',component: main1},
        {path: '/main/1',component: main2},
        {path: '/main/2',component: main3},
        {path: '/main/3',component: main4},
        {path: '/main/4',component: main5},
        {path: '/main/5',component: main6},
        {path: '/main/6',component: main7},
        {path: '/',redirect:'/login'},
        {path: '/login',component: login,name :'login'},
        {
            path: '/home',
            component: home,
            name :'home',
            children: [
                {path: 'users',component: Users},
                {path: 'rights',component: Rights},
                {path: 'goods',component: Goods},
                {path: 'orders',component: Orders},
                {path: 'settings',component: Settings},
            ]
        },
    ]
})

// 定义导航守卫，验证是否可访问
router.beforeEach((to,from,next) => {
    // 登录界面可访问
    if(to.path === '/login')
        return next()
    //获取登录状态 
    const token = localStorage.getItem('token')
    // 未登录则跳转到登录页面
    if(!token) {
        return next('/login')
    }
    // 已登录则可访问
    next()
})

export default router