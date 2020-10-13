import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import api from './api/index';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false
Vue.use(Antd);
Vue.prototype.$api = api;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')