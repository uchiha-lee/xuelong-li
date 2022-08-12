<template>
    <!-- 主页 -->
    <div class="home-container">
        <!-- 头部导航 -->
        <my-header></my-header>
        <!-- 主体内容 -->
        <div class="home-main-box">
            <!-- 左侧 -->
            <my-aside></my-aside>
            <!-- 右侧主要内容 -->
            <div class="home-main-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import myAside from './myAside.vue';
import myHeader from './myHeader.vue';

</script>

<style scoped>



.home-container {
    display: flex;
    height: 100%;
    flex-direction: column;
}

.home-main-box {
    display: flex;
    height: 100%;
    border: 1px solid black;
}
.home-main-body {
    padding: 15px;
    flex: 1;
    border: 1px solid black;
}
</style>