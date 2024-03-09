<template>
  <div class="layout-navbars-breadcrumb-index">
		<!-- <Logo v-if="setIsShowLogo" /> -->
		<Breadcrumb />
		<!-- <Horizontal :menuList="state.menuList" v-if="isLayoutTransverse" /> -->
		<User/>
	</div>
</template>
<script setup>
import { defineAsyncComponent, computed, reactive, onMounted, onUnmounted } from 'vue';
// 引入组件
const Breadcrumb = defineAsyncComponent(() => import('@/layout/navBars/topBar/breadcrumb.vue'));
const User = defineAsyncComponent(() => import('@/layout/navBars/topBar/user.vue'));
const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'));
const Horizontal = defineAsyncComponent(() => import('@/layout/navMenu/horizontal.vue'));


</script>


<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 50px;
	display: flex;
	align-items: center;
	background-color: #ffffff;
	border-bottom: 1px solid #f1f2f3;
}
</style>