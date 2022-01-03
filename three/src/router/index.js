import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeRouteLeave(to, from, next) {
      console.log(to, from);
      let answer = window.confirm("确认离开？");
      if (answer) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/three",
    name: "ThreeJs",
    component: () =>
      import(/* webpackChunkName: "three" */ "../views/Three.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
