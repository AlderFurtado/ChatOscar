import VueRouter from "vue-router";
import Login from "../components/login/index";
import Chat from "../components/chat/index";
import Vue from "vue";
import store from "../store";

const routes = [
  
  { path: "/login", component: Login, meta: { requiresVisitor: true } },
  { path: "/chat", component: Chat, meta: { requiresAuth: true } },
  { path: "/", component: Login, meta: { requiresVisitor: true } }

];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.getUid) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires visitor, check if logged in
    // if not, redirect to login page.
    if (store.getters.getUid) {
      next({
        path: "/chat"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

Vue.use(VueRouter);

export default router;
