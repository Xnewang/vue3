<template>
	<el-container class="layout-container">
		<LayoutAside />
		<el-container class="layout-container-view h100">
			<el-scrollbar ref="layoutScrollbarRef" class="layout-backtop">
				<LayoutHeader/>
				<LayoutMain/>
			</el-scrollbar>
		</el-container>
	</el-container>
</template>


<script setup name="defaults">
import { defineAsyncComponent, watch, onMounted, nextTick, ref } from 'vue';



// 引入组件
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'));
const LayoutHeader = defineAsyncComponent(() => import('@/layout/component/header.vue'));
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'));
</script>

<style lang="scss" scoped>

</style>