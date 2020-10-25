import Vue from "vue";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import AxiosPlugin from "vue-axios-cors";

Vue.use(AxiosPlugin);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
