import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import Tables from '../views/Tables.vue'
import Billing from '../views/Billing.vue'
import VirtualReality from '../views/VirtualReality.vue'
import RTL from '../views/Rtl.vue'
import Profile from '../views/Profile.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'

import themeMiddleware from '../middleware/themeMiddleware.js';


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      middleware: [themeMiddleware]
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active"
})


// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context : any, middleware: any, index: any) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters : any) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});


export default router
