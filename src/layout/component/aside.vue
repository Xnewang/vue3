<template>
	<div class="h100">
		<el-aside class="layout-aside">
			<!-- <Logo v-if="setShowLogo" /> -->
			<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef" >
				<Vertical :menuList="state.menuList"/>
			</el-scrollbar>
		</el-aside>
	</div>
</template>

<script setup name="layoutAside">
import { defineAsyncComponent, reactive, computed, watch, onBeforeMount, ref } from 'vue';

const state = reactive({
	menuList: [
    {
        "path": "/home",
        "name": "home",
        "meta": {
            "title": "首页",
            "isLink": "",
            "isHide": false,
            "isKeepAlive": true,
            "isAffix": true,
            "isIframe": false,
            "roles": [
                "admin",
                "common"
            ],
            "icon": "iconfont icon-shouye"
        }
    },
    {
        "path": "/system",
        "name": "system",
        "redirect": "/system/menu",
        "meta": {
            "title": "系统设置",
            "isLink": "",
            "isHide": false,
            "isKeepAlive": true,
            "isAffix": false,
            "isIframe": false,
            "roles": [
                "admin"
            ],
            "icon": "iconfont icon-xitongshezhi"
        },
        "children": [
            {
                "path": "/system/menu",
                "name": "systemMenu",
                "meta": {
                    "title": "菜单管理",
                    "isLink": "",
                    "isHide": false,
                    "isKeepAlive": true,
                    "isAffix": false,
                    "isIframe": false,
                    "roles": [
                        "admin"
                    ],
                    "icon": "iconfont icon-caidan"
                }
            },
            {
                "path": "/system/role",
                "name": "systemRole",
                "meta": {
                    "title": "角色管理",
                    "isLink": "",
                    "isHide": false,
                    "isKeepAlive": true,
                    "isAffix": false,
                    "isIframe": false,
                    "roles": [
                        "admin"
                    ],
                    "icon": "ele-ColdDrink",
                    "tagsViewName": "角色管理"
                }
            },
            {
                "path": "/system/user",
                "name": "systemUser",
                "meta": {
                    "title": "用户管理",
                    "isLink": "",
                    "isHide": false,
                    "isKeepAlive": true,
                    "isAffix": false,
                    "isIframe": false,
                    "roles": [
                        "admin"
                    ],
                    "icon": "iconfont icon-icon-"
                }
            },
            {
                "path": "/system/dept",
                "name": "systemDept",
                "meta": {
                    "title": "部门管理",
                    "isLink": "",
                    "isHide": false,
                    "isKeepAlive": true,
                    "isAffix": false,
                    "isIframe": false,
                    "roles": [
                        "admin"
                    ],
                    "icon": "ele-OfficeBuilding"
                }
            },
            {
                "path": "/system/dic",
                "name": "systemDic",
                "meta": {
                    "title": "字典管理",
                    "isLink": "",
                    "isHide": false,
                    "isKeepAlive": true,
                    "isAffix": false,
                    "isIframe": false,
                    "roles": [
                        "admin"
                    ],
                    "icon": "ele-SetUp"
                }
            }
        ]
    }
	]
})

// 引入组件
// const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'));
const Vertical = defineAsyncComponent(() => import('@/layout/navMenu/vertical.vue'));


</script>
