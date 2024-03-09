<template>
	<div class="layout-navbars-container">
		<BreadcrumbIndex />
		<!-- <TagsView v-if="setShowTagsView" /> -->
		<TagsView  />
	</div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
// 引入组件
const BreadcrumbIndex = defineAsyncComponent(() => import('@/layout/navBars/topBar/index.vue'));
const TagsView = defineAsyncComponent(() => import('@/layout/navBars/tagsView/tagsView.vue'));

</script>

<style lang="scss" scoped>
.layout-navbars-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

</style>