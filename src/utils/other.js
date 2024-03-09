import { nextTick, defineAsyncComponent } from 'vue';
import * as svg from '@element-plus/icons-vue';


// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// element官方引入的样式  ElementPlusIconsVue 图标的名字
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

// 引入组件
const SvgIcon = defineAsyncComponent(() => import('@/components/svgIcon/index.vue'));
/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elSvg(app) {
	const icons = svg;
	for (const i in icons) {
		app.component(`ele-${icons[i].name}`, icons[i]);
	}
	app.component('SvgIcon', SvgIcon);
}




/**
 * 统一批量导出
 * @method elSvg 导出全局注册 element plus svg 图标
 * @method useTitle 设置浏览器标题国际化
 * @method setTagsViewNameI18n 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @method lazyImg 图片懒加载
 * @method globalComponentSize() element plus 全局组件大小
 * @method deepClone 对象深克隆
 * @method isMobile 判断是否是移动端
 * @method handleEmpty 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @method handleOpenLink 打开外部链接
 */
const other = {
	elSvg: (app) => {
		elSvg(app);
	}
	// useTitle: () => {
	// 	useTitle();
	// },
	// setTagsViewNameI18n(route) {
	// 	return setTagsViewNameI18n(route);
	// },
	// lazyImg: (el, arr) => {
	// 	lazyImg(el, arr);
	// },
	// globalComponentSize: () => {
	// 	return globalComponentSize();
	// },
	// deepClone: (obj) => {
	// 	return deepClone(obj);
	// },
	// isMobile: () => {
	// 	return isMobile();
	// },
	// handleEmpty: (list) => {
	// 	return handleEmpty(list);
	// },
	// handleOpenLink: (val) => {
	// 	handleOpenLink(val);
	// },
};


// 统一批量导出
export default other;