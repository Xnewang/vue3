
<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import setIntroduction from '@/utils/setIconfont';

const route = useRoute();


onBeforeMount (() => {
  setIntroduction.cssCdn();
})

</script>




<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#app {
  height: 100%;
}
</style>
