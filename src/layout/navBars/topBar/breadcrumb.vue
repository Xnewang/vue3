<template>
  <div class="layout-navbars-breadcrumb" >
    <div class="layout-navbars-breadcrumb-icon" @click="isShow">
      <el-icon :size="16" v-if="isCode"><Expand /></el-icon>
      <el-icon :size="16" v-else><Fold /></el-icon>
    </div>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item , index) in state.breadcrumbList" :key="index">
					<span v-if="index === state.breadcrumbList.length - 1">
						{{ item.meta.title }}
					</span>
          <a v-else @click.prevent="onBreadcrumbClick(item)" >{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '@/stores/routesList';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
// 定义变量内容
const stores = useRoutesList();
const { routesList } = storeToRefs(stores);
const route = useRoute();
const router = useRouter();
const state = reactive({
  breadcrumbList:[],

	routeSplitFirst: '',
	routeSplitIndex: 1
})


// 页面加载时
onMounted(() => {
	initRouteSplit(route.path);
});
// 路由更新时
onBeforeRouteUpdate((to) => {
	// 暂时解决不了
})

watch(() => route.path, (n)=> {
	initRouteSplit(n);
})

// 处理面包屑数据
const getBreadcrumbList = (arr) => {
	arr.forEach((item) => {
		state.routeSplit.forEach((v, k ,arrs) => {
			// system当前路由
			if (state.routeSplitFirst === item.path) {
				// /system  拼接第二级 /user
				state.routeSplitFirst += `/${arrs[state.routeSplitIndex]}`;
				state.breadcrumbList.push(item);
				state.routeSplitIndex++;
				if (item.children) getBreadcrumbList(item.children);
			}
		})
	})
}

// 当前路由字符串切割成数组，并删除第一项空内容
const initRouteSplit = (path) => {

	// 路由信息
	state.breadcrumbList = [routesList.value[0]]
	state.routeSplit = path.split('/');
	state.routeSplit.shift();
	// 第一层路由 /system/role  ->/system
	state.routeSplitFirst = `/${state.routeSplit[0]}`;
	state.routeSplitIndex = 1;
	// 所有路由
	getBreadcrumbList(routesList.value);
	// 当等于home的时候删除第一个路由数组 递归会生成两个数组
	if (route.name === 'home' ) state.breadcrumbList.shift();
	if (state.breadcrumbList.length > 0) state.breadcrumbList[state.breadcrumbList.length - 1].meta.title = route.meta.title;
}

const onBreadcrumbClick = (e) => {
	let { redirect, path } = e
	if(redirect) {
		router.push(redirect);
	} else {
		router.push(path);
	}
}
function isShow () {
  isCode.value = true
}

</script>
<style scoped lang="scss">
.layout-navbars-breadcrumb {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
	.layout-navbars-breadcrumb-icon {
    line-height: 1em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
		cursor: pointer;
		font-size: 18px;
		// color: var(--next-bg-topBarColor);
		height: 100%;
		width: 40px;
		opacity: 0.8;
		&:hover {
			opacity: 1;
		}
	}
	// .layout-navbars-breadcrumb-span {
	// 	display: flex;
	// 	opacity: 0.7;
	// 	color: var(--next-bg-topBarColor);
	// }
	// .layout-navbars-breadcrumb-iconfont {
	// 	font-size: 14px;
	// 	margin-right: 5px;
	// }
	// :deep(.el-breadcrumb__separator) {
	// 	opacity: 0.7;
	// 	color: var(--next-bg-topBarColor);
	// }
	// :deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
	// 	font-weight: unset !important;
	// 	color: var(--next-bg-topBarColor);
	// 	&:hover {
	// 		color: var(--el-color-primary) !important;
	// 	}
	// }
}

</style>