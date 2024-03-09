<template>
  <div>
    <ul v-for="item in state.list">
      <li>
        <span>{{ item.createTime }}</span>
        <span>{{ item.eveType }}</span>
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted, reactive } from "vue";

const state = reactive({
  list : [
    { 
      createTime: "2023-12-26",
      eveType: "待评价",
      text: "[日常监剩]实际值6693.791高于/低于值上/下限100"
    },
    { 
      createTime: "2023-12-26",
      eveType: "待评价",
      text: "[日常监剩]实际值6693.791高于/低于值上/下限100"
    },
    { 
      createTime: "2023-12-26",
      eveType: "待评价",
      text: "[日常监剩]实际值6693.791高于/低于值上/下限100"
    },
    { 
      createTime: "2023-12-26",
      eveType: "待评价",
      text: "[日常监剩]实际值6693.791高于/低于值上/下限100"
    }
  ]
})

</script>
<style lang="scss" scoped>
ul li span {
  font-family: KTXP_ComRound;
}
</style>