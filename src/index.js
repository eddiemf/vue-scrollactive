import Scrollactive from './scrollactive.vue';

const install = (Vue) => {
	if (install.installed) return;

	Vue.component("scrollactive", Scrollactive);
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default install;
