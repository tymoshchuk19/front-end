import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import GroupPage from "../views/GroupPage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
// import axios from "axios";
// import { API } from "../../config/config";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  {
    path: "/groups/:group_id",
    name: "groups",
    component: GroupPage
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/*eslint-disable no-console*/
// var isAuthenticated = false;

router.beforeEach((to, from, next) => {
  console.log(isAuthenticated());
  if (isAuthenticated() || to.path === "/login") {
    next();
  } else {
    next("/login");
  }
  // if (!isAuthenticated) {
  //   next({ path: "/login" });
  // } else {
  //   next();
  // }
});

function isAuthenticated() {
  if (store.state.user.nome) {
    return true;
  }
  return false;
}

export default router;
