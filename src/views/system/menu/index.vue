<template>
  <div class="layout-pd">
    <el-card shadow="hover">
      <div class="mb15">
        <el-input
          v-model="state.input"
          placeholder="请输入内容"
          style="max-width: 180px"
        ></el-input>
        <el-button size="default" type="primary" class="ml10">
          <el-icon>
            <ele-Search />
          </el-icon>
          查询
        </el-button>
        <el-button
          size="default"
          type="success"
          class="ml10"
        >
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增菜单
        </el-button>
      </div>
      <el-table
        :data="state.tableData.data"
        style="width: 100%; margin-bottom: 20px"
				row-key="path"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="date" label="菜单名称" sortable show-overflow-tooltip>
          <template #default="scope">
						<SvgIcon :name="scope.row.meta.icon" />
						<span class="ml10">{{ scope.row.meta.title }}</span>
					</template>
        </el-table-column>
        <el-table-column prop="path" label="路由路径" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column  label="组件路径" show-overflow-tooltip>
          <template #default="scope">
						<span>{{ scope.row.component }}</span>
					</template>
        </el-table-column>
        <el-table-column  label="权限标识" show-overflow-tooltip>
          <template #default="scope">
						<span>{{ scope.row.meta.roles }}</span>
					</template>
        </el-table-column>
        <el-table-column label="排序"  width="80" show-overflow-tooltip>
          <template #default="scope">
						{{ scope.$index }}
					</template>
        </el-table-column>
        <el-table-column label="类型"  width="80" show-overflow-tooltip>
          <template #default="scope">
						<el-tag type="success" size="small">{{ scope.row.xx }}菜单</el-tag>
					</template>
        </el-table-column>
        <el-table-column label="操作"  width="140">
          <template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddMenu('add')">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditMenu('edit', scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
        </el-table-column>
      </el-table>
    </el-card>
    <MenuDialog ref="menuDialogRef"></MenuDialog>
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted, reactive } from "vue";
import { storeToRefs } from 'pinia';
import { useRoutesList } from '@/stores/routesList';

const MenuDialog = defineAsyncComponent(() => import('@/views/system/menu/dialog.vue'));
const menuDialogRef = ref();
const stores = useRoutesList();
const { routesList } = storeToRefs(stores);
const state = reactive({
  input: "",
  tableData: {
    data: []
  }
});
const getTableData = () => {
	// state.tableData.loading = true;
  console.log(routesList)
	state.tableData.data = routesList.value;
	// setTimeout(() => {
	// 	state.tableData.loading = false;
	// }, 500);
};

const onOpenAddMenu = (type) => {
  menuDialogRef.value.openDialog(type);
}

const onOpenEditMenu = (type) => {
  menuDialogRef.value.openDialog(type);
}

onMounted (()=> {
  getTableData()
}) 
</script>