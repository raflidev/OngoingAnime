import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// app.use("*", (req, res) => {
//   res.json({
//     status: "not found path",
//     message:
//       "read the docs here https://github.com/Kaede-No-Ki/otakudesu-rest-api",
//   });
// });
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
