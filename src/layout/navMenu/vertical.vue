<template>
  <el-menu 
    router
    :default-active="state.defaultActive"
    background-color="transparent"  
    text-color="#fff" 
  >
    <template v-for="val in menuLists" :key="val.path">
      <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0">
        <template #title>
          <el-icon><HomeFilled /></el-icon>
          <span>{{ val.meta.title }}</span>
        </template>
        <SubItem :chil="val.children" />
      </el-sub-menu>
      <template v-else>
        <el-menu-item :index="val.path" :key="val.path">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>{{ val.meta.title }}</span>
          </template>
          <SubItem :chil="val.children" />
        </el-menu-item>
      </template>
    </template>
  </el-menu>

    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->

</template>

<script setup>
import { defineAsyncComponent, reactive, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
// 引入组件
const SubItem = defineAsyncComponent(() => import('@/layout/navMenu/subItem.vue'));

const router = useRouter()
const route = useRoute()
const state = reactive({
	// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
	defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path,
	isCollapse: false,
});

// 定义父组件传过来的值
const props = defineProps({
	// 菜单列表
	menuList: {
		type: Array,
		default: () => [],
	},
});


// 获取菜单
const menuLists = computed(() => {
	return props.menuList;
});

// 菜单高亮

const setParentHighlight = (currentRoute) => {
  return currentRoute.value.path
}


watch (
  () => router.currentRoute,
  (to) => {
    state.defaultActive = setParentHighlight(to)
  },
  {deep:true}
)


</script>
