<template>
  <template v-for="val in chils">
    <el-menu-item-group #title>
      <el-menu-item :index="val.path" :key="val.path">
        {{ val.meta.title }}
      </el-menu-item>
    </el-menu-item-group>
  </template>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
// 定义父组件传过来的值
const props = defineProps({
	// 菜单列表
	chil: {
		type: Array,
		default: () => [],
	},
});

// 获取父级菜单数据
const chils = computed(() => {
	return props.chil;
});
</script>