import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./registerServiceWorker";
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
