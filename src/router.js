import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/example",
      name: "example",
      component: () => import("./views/ExamplePage.vue")
    },
    {
      path: "/prototype-1",
      name: "prototype-1",
      component: () => import("./views/prototype/Prototype-1.vue")
    },
    {
      path: "/prototype-2",
      name: "prototype-2",
      component: () => import("./views/prototype/Prototype-2.vue")
    },
    {
      path: "/prototype-3",
      name: "prototype-3",
      component: () => import("./views/prototype/Prototype-3.vue")
    },
    {
      path: "/prototype-4",
      name: "prototype-4",
      component: () => import("./views/prototype/Prototype-4.vue")
    },
    {
      path: "/prototype-5",
      name: "prototype-5",
      component: () => import("./views/prototype/Prototype-5.vue")
    }
  ]
});
