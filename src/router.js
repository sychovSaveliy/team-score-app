import Vue from "vue";
import Router from "vue-router";
import log from "./middleware/log";
import auth from "./middleware/auth";
import Home from "./views/Home.vue";
import Events from "./components/Events.vue";
import EventProfile from "./views/EventProfile.vue";

export const PATH_HOME = "/events/:type";
export const PATH_SIGN_IN = "/sign-in";
export const PATH_SIGN_UP = "/sign-up";


Vue.use(Router);

let router = new Router({
  routes: [
  { path: '/', redirect: '/events/my' },
  {
      path: PATH_HOME,
      component: Home,
      children: [
        {
          path: PATH_HOME,
          name: "events",
          component: () => import("./components/Events.vue"),
          meta: {
            middleware: [log, auth]
          }
        }
      ],
    },
    {
      path: "/event/:id",
      name: "event",
      component: () => import("./views/EventProfile.vue")
    },
    {
      path: PATH_SIGN_IN,
      name: "sign-in",
      component: () => import("./views/SignIn.vue"),
      meta: {
        middleware: [log]
      }
    },
    {
      path: PATH_SIGN_UP,
      name: "sign-up",
      component: () => import("./views/SignUp.vue"),
      meta: {
        middleware: [log]
      }
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

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({
      ...context,
      next: nextMiddleware
    });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ?
      to.meta.middleware : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({
      ...context,
      next: nextMiddleware
    });
  }

  return next();
});

export default router;