import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import photo from "./services/photo";
Vue.directive('photo', photo);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");