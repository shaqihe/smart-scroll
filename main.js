import smartScroll from './src/vue-smart-scroll';


const install = function (Vue) {
    if (install.installed) return;
    Vue.directive('smart-scroll',smartScroll)
}


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};


export default {
    install
}
