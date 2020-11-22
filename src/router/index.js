import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Episode from "../views/Episode.vue";
import Nonton from "../views/Nonton.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/episode/:base",
    name: "Episode",
    component: Episode,
  },
  {
    path: "/nonton/:base",
    name: "Nonton",
    component: Nonton,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
