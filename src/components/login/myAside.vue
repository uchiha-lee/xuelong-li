<template>
    <div>
        <ul>
            <li class="aside-li">
                <router-link to="/home/users">用户管理</router-link>
            </li>
            <li class="aside-li">
                <router-link to="/home/rights">权限管理</router-link>
            </li>
            <li class="aside-li">
                <router-link to="/home/goods">商品管理</router-link>
            </li>
            <li class="aside-li">
                <router-link to="/home/orders">订单管理</router-link>
            </li>
            <li class="aside-li">
                <router-link to="/home/settings">系统设置</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.aside-li{
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 1px solid black;
}
</style>