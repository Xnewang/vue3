<template>
  <div class="layout-navbars-tagsview">
    <el-scrollbar>
      <ul class="layout-navbars-tagsview-ul">
        <li
          class="layout-navbars-tagsview-ul-li"
          v-for="(v, k) in state.tagsViewList"
          :key="k"
          :class="{ 'is-active': isActive(v.url) }"
          @click="onTagsClick(v, k)"
        >
          <span>
            {{ v.meta.title }}
          </span>
          <el-icon 
            v-if="!v.meta.isAffix"
            class="layout-icon-three"
            @click.stop="closeCurrentTagsView(v.url)"
          >
          <!-- 加上stop阻止冒泡 -->
            <Close />
          </el-icon>
        </li>
      </ul>
    </el-scrollbar>

  </div>
</template>

<script setup>
import { onMounted, watch, reactive, nextTick } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes';
import { isObjectValueEqual } from '@/utils/arrayOperation';
import { time } from 'echarts';

const storesTagsViewRoutes = useTagsViewRoutes()
const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes)

const  route = useRoute()
const  router = useRouter()

const state = reactive({
  routePath: route.path,
  tagsViewRoutesList:[], // pinia 里面的路由
  tagsViewList: [] //路由
})

onBeforeRouteUpdate( (to) => {
	// state.routeActive =to
});

// 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
const addBrowserSetSession = (tagsViewList) => {
	window.sessionStorage.setItem('tagsViewList', JSON.stringify(tagsViewList));
};

// 获取 pinia 中的 tagsViewRoutes 列表
const getTagsViewRoutes = () => {
  state.tagsViewRoutesList = tagsViewRoutes.value;
  // state.tagsViewList = [];
  initTagsView()
}

// pinia 中获取路由信息：如果是设置了固定的（isAffix），进行初始化显示
const initTagsView = async () => { 
  if (JSON.parse(window.sessionStorage.getItem('tagsViewList'))) {
		state.tagsViewList = await JSON.parse(window.sessionStorage.getItem('tagsViewList'));
	} else {
    // await state.tagsViewRoutesList.map(item => {
    //   if (item.meta.isAffix && !item.meta.isHide) {
    //     item.url = item.path
    //     // state.tagsViewList.push({ ...item });
    //   }
    // })
    await addTagsView(route.path, route)
  }
}

// 1、添加 tagsView：未设置隐藏（isHide）也添加到在 tagsView 中（可开启多标签详情，单标签详情）
const addTagsView = (path, to) => {
  nextTick (async () => {
    let item
    // push进数组 会有重复tagaview的问题 使用 some找到有返回false 解决tagsView重复问题
    if (state.tagsViewList.some((v) => v.path === path)) {
      return false;
    }
    item = state.tagsViewRoutesList.find((v) => v.path === path);
    item.url = item.path
    // singleAddTagsView()
    await state.tagsViewList.push({...item})
    addBrowserSetSession(state.tagsViewList);
  })
}

// 设置tageView高亮
const isActive = (v) => {
  return v === state.routePath ? true : false
}

// 处理单标签时，第二次的值未覆盖第一次的 tagsViewList 值（Session Storage）
const singleAddTagsView = (path, to) => {
  const uniqueArr = Array.from(new Set(state.tagsViewList.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
  return uniqueArr
}


// 点击标签跳转
const onTagsClick = (path, to) => {
  router.push(path);
}
// 关闭标签
const closeCurrentTagsView = (path) => { 
  state.tagsViewList.map(( item, index, arr ) => {
    if(!item.meta?.isAffix) {
      if (path === item.url) {
        state.tagsViewList.splice(index, 1);
        setTimeout(()=> {
          // 想等的时候就是关闭最后一个
          if (state.tagsViewList.length === index) {
            router.push({path: arr[arr.length -1].path})
          } else {
            router.push({path: arr[index].path})
          }
        },0)
      }
    }
  })
  addBrowserSetSession(state.tagsViewList)
}


// 路由更新时（组件内生命钩子）
onBeforeRouteUpdate(async (to) => {
});

onMounted(()=>{
  getTagsViewRoutes()
})


watch (
  () => tagsViewRoutes.value,
  (val) => {
  },
  {
    deep: true
  }
)
watch (
  () => router.currentRoute,
  (to, oldTo) => {
    state.routePath = to.value.path
    addTagsView(to.value.path, to.value)
    getTagsViewRoutes()
  },
  {deep:true}
)



</script>

<style lang="scss" scoped>
.layout-navbars-tagsview {
  background-color: #ffffff;
  border-bottom: 1px solid #f1f2f3;
  position: relative;
  // 高亮两边图片
  .tags-style-five-svg {
    -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+CgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxwYXRoIHRyYW5zZm9ybT0icm90YXRlKC0wLjEzMzUwNiA1MC4xMTkyIDUwKSIgaWQ9InN2Z18xIiBkPSJtMTAwLjExOTE5LDEwMGMtNTUuMjI4LDAgLTEwMCwtNDQuNzcyIC0xMDAsLTEwMGwwLDEwMGwxMDAsMHoiIG9wYWNpdHk9InVuZGVmaW5lZCIgc3Ryb2tlPSJudWxsIiBmaWxsPSIjRjhFQUU3Ii8+CiAgPHBhdGggZD0ibS0wLjYzNzY2LDcuMzEyMjhjMC4xMTkxOSwwIDAuMjE3MzcsMC4wNTc5NiAwLjQ3Njc2LDAuMTE5MTljMC4yMzIsMC4wNTQ3NyAwLjI3MzI5LDAuMDM0OTEgMC4zNTc1NywwLjExOTE5YzAuMDg0MjgsMC4wODQyOCAwLjM1NzU3LDAgMC40NzY3NiwwbDAuMTE5MTksMGwwLjIzODM4LDAiIGlkPSJzdmdfMiIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0ibTI4LjkyMTM0LDY5LjA1MjQ0YzAsMC4xMTkxOSAwLDAuMjM4MzggMCwwLjM1NzU3bDAsMC4xMTkxOWwwLDAuMTE5MTkiIGlkPSJzdmdfMyIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHJlY3QgaWQ9InN2Z180IiBoZWlnaHQ9IjAiIHdpZHRoPSIxLjMxMTA4IiB5PSI2LjgzNTUyIiB4PSItMC4wNDE3MSIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHJlY3QgaWQ9InN2Z181IiBoZWlnaHQ9IjEuNzg3ODQiIHdpZHRoPSIwLjExOTE5IiB5PSI2OC40NTY1IiB4PSIyOC45MjEzNCIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHJlY3QgaWQ9InN2Z182IiBoZWlnaHQ9IjQuODg2NzciIHdpZHRoPSIxOS4wNzAzMiIgeT0iNTEuMjkzMjEiIHg9IjM2LjY2ODY2IiBzdHJva2U9Im51bGwiIGZpbGw9Im5vbmUiLz4KIDwvZz4KPC9zdmc+'),
      url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoLTg5Ljc2MjQgNy4zMzAxNCA1NS4xMjUyKSIgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiIGZpbGw9IiNGOEVBRTciIGQ9Im02Mi41NzQ0OSwxMTcuNTIwODZjLTU1LjIyOCwwIC0xMDAsLTQ0Ljc3MiAtMTAwLC0xMDBsMCwxMDBsMTAwLDB6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgogIDxwYXRoIGQ9Im0tMC42Mzc2Niw3LjMxMjI4YzAuMTE5MTksMCAwLjIxNzM3LDAuMDU3OTYgMC40NzY3NiwwLjExOTE5YzAuMjMyLDAuMDU0NzcgMC4yNzMyOSwwLjAzNDkxIDAuMzU3NTcsMC4xMTkxOWMwLjA4NDI4LDAuMDg0MjggMC4zNTc1NywwIDAuNDc2NzYsMGwwLjExOTE5LDBsMC4yMzgzOCwwIiBpZD0ic3ZnXzIiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Im0yOC45MjEzNCw2OS4wNTI0NGMwLDAuMTE5MTkgMCwwLjIzODM4IDAsMC4zNTc1N2wwLDAuMTE5MTlsMCwwLjExOTE5IiBpZD0ic3ZnXzMiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxyZWN0IGlkPSJzdmdfNCIgaGVpZ2h0PSIwIiB3aWR0aD0iMS4zMTEwOCIgeT0iNi44MzU1MiIgeD0iLTAuMDQxNzEiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxyZWN0IGlkPSJzdmdfNSIgaGVpZ2h0PSIxLjc4Nzg0IiB3aWR0aD0iMC4xMTkxOSIgeT0iNjguNDU2NSIgeD0iMjguOTIxMzQiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxyZWN0IGlkPSJzdmdfNiIgaGVpZ2h0PSI0Ljg4Njc3IiB3aWR0aD0iMTkuMDcwMzIiIHk9IjUxLjI5MzIxIiB4PSIzNi42Njg2NiIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiA8L2c+Cjwvc3ZnPg=='),
      url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect rx='8' width='100%' height='100%' fill='%23F8EAE7'/></svg>");
      -webkit-mask-size: 18px 30px, 20px 30px, calc(100% - 30px) calc(100% + 17px);
      -webkit-mask-position: right bottom, left bottom, center top;
      -webkit-mask-repeat: no-repeat;
		}
  &-ul {
    display: flex;
    list-style-type: none;
    align-items: flex-end;
    height: 34px;
    font-size: 12px;
    color: #606266;
    white-space: nowrap;
    padding: 0 15px;
    &-li {
      height: 26px;
      line-height: 26px;
      padding: 0px 5px;
      margin: 0px -15px;
      display: flex;
			align-items: center;
      border: 1px solid #ccc;
      border-color: transparent;
      position: relative;
      border-width: 15px 27px 15px;
      &:hover {
        @extend .tags-style-five-svg;
        background-color: #ebf5ff;
        color: rgba(96, 98, 102);
        cursor: pointer;
      }
    }
    .layout-icon-three {
      font-size: 14px;
      display: block;
      z-index: -1;
      height: 14px;
      width: 14px;
      text-align: center;
      line-height: 14px;
      right: -5px;
      border-radius: 100%;
      &:hover {
				// @extend .tags-style-five-svg;
				background-color:#79bbff ;
				color: #ffffff;
			}
    }
  }
  .is-active {
    @extend .tags-style-five-svg;
    background: #ebf5ff;
    color: #409eff;
    z-index: 1;
  }
}



// 高亮两边
// .tags-style-five {
// 		align-items: flex-end;
// 		.tags-style-five-svg {
// 			-webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+CgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxwYXRoIHRyYW5zZm9ybT0icm90YXRlKC0wLjEzMzUwNiA1MC4xMTkyIDUwKSIgaWQ9InN2Z18xIiBkPSJtMTAwLjExOTE5LDEwMGMtNTUuMjI4LDAgLTEwMCwtNDQuNzcyIC0xMDAsLTEwMGwwLDEwMGwxMDAsMHoiIG9wYWNpdHk9InVuZGVmaW5lZCIgc3Ryb2tlPSJudWxsIiBmaWxsPSIjRjhFQUU3Ii8+CiAgPHBhdGggZD0ibS0wLjYzNzY2LDcuMzEyMjhjMC4xMTkxOSwwIDAuMjE3MzcsMC4wNTc5NiAwLjQ3Njc2LDAuMTE5MTljMC4yMzIsMC4wNTQ3NyAwLjI3MzI5LDAuMDM0OTEgMC4zNTc1NywwLjExOTE5YzAuMDg0MjgsMC4wODQyOCAwLjM1NzU3LDAgMC40NzY3NiwwbDAuMTE5MTksMGwwLjIzODM4LDAiIGlkPSJzdmdfMiIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0ibTI4LjkyMTM0LDY5LjA1MjQ0YzAsMC4xMTkxOSAwLDAuMjM4MzggMCwwLjM1NzU3bDAsMC4xMTkxOWwwLDAuMTE5MTkiIGlkPSJzdmdfMyIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHJlY3QgaWQ9InN2Z180IiBoZWlnaHQ9IjAiIHdpZHRoPSIxLjMxMTA4IiB5PSI2LjgzNTUyIiB4PSItMC4wNDE3MSIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHJlY3QgaWQ9InN2Z181IiBoZWlnaHQ9IjEuNzg3ODQiIHdpZHRoPSIwLjExOTE5IiB5PSI2OC40NTY1IiB4PSIyOC45MjEzNCIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiAgPHJlY3QgaWQ9InN2Z182IiBoZWlnaHQ9IjQuODg2NzciIHdpZHRoPSIxOS4wNzAzMiIgeT0iNTEuMjkzMjEiIHg9IjM2LjY2ODY2IiBzdHJva2U9Im51bGwiIGZpbGw9Im5vbmUiLz4KIDwvZz4KPC9zdmc+'),
// 				url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoLTg5Ljc2MjQgNy4zMzAxNCA1NS4xMjUyKSIgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiIGZpbGw9IiNGOEVBRTciIGQ9Im02Mi41NzQ0OSwxMTcuNTIwODZjLTU1LjIyOCwwIC0xMDAsLTQ0Ljc3MiAtMTAwLC0xMDBsMCwxMDBsMTAwLDB6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgogIDxwYXRoIGQ9Im0tMC42Mzc2Niw3LjMxMjI4YzAuMTE5MTksMCAwLjIxNzM3LDAuMDU3OTYgMC40NzY3NiwwLjExOTE5YzAuMjMyLDAuMDU0NzcgMC4yNzMyOSwwLjAzNDkxIDAuMzU3NTcsMC4xMTkxOWMwLjA4NDI4LDAuMDg0MjggMC4zNTc1NywwIDAuNDc2NzYsMGwwLjExOTE5LDBsMC4yMzgzOCwwIiBpZD0ic3ZnXzIiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Im0yOC45MjEzNCw2OS4wNTI0NGMwLDAuMTE5MTkgMCwwLjIzODM4IDAsMC4zNTc1N2wwLDAuMTE5MTlsMCwwLjExOTE5IiBpZD0ic3ZnXzMiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxyZWN0IGlkPSJzdmdfNCIgaGVpZ2h0PSIwIiB3aWR0aD0iMS4zMTEwOCIgeT0iNi44MzU1MiIgeD0iLTAuMDQxNzEiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxyZWN0IGlkPSJzdmdfNSIgaGVpZ2h0PSIxLjc4Nzg0IiB3aWR0aD0iMC4xMTkxOSIgeT0iNjguNDU2NSIgeD0iMjguOTIxMzQiIHN0cm9rZT0ibnVsbCIgZmlsbD0ibm9uZSIvPgogIDxyZWN0IGlkPSJzdmdfNiIgaGVpZ2h0PSI0Ljg4Njc3IiB3aWR0aD0iMTkuMDcwMzIiIHk9IjUxLjI5MzIxIiB4PSIzNi42Njg2NiIgc3Ryb2tlPSJudWxsIiBmaWxsPSJub25lIi8+CiA8L2c+Cjwvc3ZnPg=='),
// 				url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect rx='8' width='100%' height='100%' fill='%23F8EAE7'/></svg>");
// 			-webkit-mask-size: 18px 30px, 20px 30px, calc(100% - 30px) calc(100% + 17px);
// 			-webkit-mask-position: right bottom, left bottom, center top;
// 			-webkit-mask-repeat: no-repeat;
// 		}
// 		.layout-navbars-tagsview-ul-li {
// 			padding: 0 5px;
// 			border-width: 15px 27px 15px;
// 			border-style: solid;
// 			border-color: transparent;
// 			margin: 0 -15px;
// 			.layout-icon-active,
// 			.layout-navbars-tagsview-ul-li-iconfont,
// 			.layout-navbars-tagsview-ul-li-refresh {
// 				display: none;
// 			}
// 			.layout-icon-three {
// 				display: block;
// 			}
// 			&:hover {
// 				@extend .tags-style-five-svg;
// 				background: var(--el-color-primary-light-9);
// 				color: unset;
// 			}
// 		}
// 		.is-active {
// 			@extend .tags-style-five-svg;
// 			background: var(--el-color-primary-light-9) !important;
// 			color: var(--el-color-primary) !important;
// 			z-index: 1;
// 		}
// 	}
</style>