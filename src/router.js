import Vue from "vue";
import Router from "vue-router";
import log from "./middleware/log";
import auth from "./middleware/auth";
import Home from "./views/Home.vue";
import Events from "./components/Events.vue";

export const PATH_HOME = "/events/my";
export const PATH_SIGN_IN = "/sign-in";
export const PATH_SIGN_UP = "/sign-up";
export const PATH_PROFILE_ME = "/profile/me";


Vue.use(Router);

let router = new Router({
    routes: [
        { path: '/', redirect: '/events/my' },
        {
            path: "/events/:type",
            component: Home,
            children: [{
                path: "/events/:type",
                name: "events",
                component: () =>
                    import ("./components/Events.vue"),
                meta: {
                    middleware: [log, auth]
                }
            }],
        },
        {
          path: "/event/new/:type?",
          name: "new-event",
          component: () => import("./views/NewEventPage.vue"),
          meta: {
                middleware: [log, auth]
          }
        },
        {
          path: "/event/:id",
          name: "event",
          component: () => import("./views/EventProfilePage.vue"),
          meta: {
                middleware: [log, auth]
          }
        },
        {
          path: "/team/:id",
          name: "team",
          component: () => import("./views/TeamProfilePage.vue"),
          meta: {
                middleware: [log, auth]
          }
        },
        {
          path: "/user/:id",
          name: "user",
          component: () => import("./views/UserProfilePage.vue"),
          meta: {
                middleware: [log, auth]
          }
        },
        {
            path: PATH_SIGN_IN,
            name: "sign-in",
            component: () => import ("./views/SignIn.vue"),
            meta: {
                middleware: [log]
            }
        },
        {
            path: PATH_SIGN_UP,
            name: "sign-up",
            component: () =>
                import ("./views/SignUp.vue"),
            meta: {
                middleware: [log]
            }
        },
        {
          path: "/auth/activate/:key",
          name: "authorization",
          component: () => import("./views/Authorization.vue"),
          meta: {
                middleware: [log]
          }
        },
        {
            path: PATH_PROFILE_ME,
            name: "profile-me",
            component: () => import ("./views/ProfileMe.vue"),
            meta: {
                middleware: [log, auth]
            }
        },
        {
            path: "/example",
            name: "example",
            component: () =>
                import ("./views/ExamplePage.vue")
        },
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