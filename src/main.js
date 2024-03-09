import { createApp } from 'vue'
import pinia from "@/stores/index";
import router from "@/router";
import other from '@/utils/other';
import App from './App.vue'

import ElementPlus from 'element-plus';
import '@/theme/index.scss';
import '@/assets/fonts/font.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// directive(app);
other.elSvg(app);// 全局挂在icon图标

app.use(pinia).use(router).use(ElementPlus).mount('#app');
// app.use(pinia).use(ElementPlus).mount('#app');