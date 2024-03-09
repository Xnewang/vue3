<template>
  <component :is="layouts['defaults']" />
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';

// 引入组件
const layouts = {
  defaults: defineAsyncComponent(() => import('@/layout/main/defaults.vue')),
};


</script>


<style lang="scss" scoped>

</style>