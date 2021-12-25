import Vue from "vue";
import VueRouter from "vue-router";
import Nuevo from "../views/Nuevo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Nuevo,
  },
  {
    path: "/view",
    name: "View",
    
    component: () =>
      import("../views/Lista.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
