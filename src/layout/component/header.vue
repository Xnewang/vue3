<template>
  <el-header class="layout-header">
    <NavBarsIndex />
  </el-header>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
// 引入组件
const NavBarsIndex = defineAsyncComponent(() => import('@/layout/navBars/index.vue'));


</script>