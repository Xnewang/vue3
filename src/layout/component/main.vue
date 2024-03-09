<template>
  <el-main>
    <el-scrollbar>
      <LayoutParentView />
    </el-scrollbar>
  </el-main>
</template>

<script setup>
import { defineAsyncComponent, onMounted, computed, ref } from 'vue';
// 引入组件
const LayoutParentView = defineAsyncComponent(() => import('@/layout/routerView/parent.vue'));

</script>