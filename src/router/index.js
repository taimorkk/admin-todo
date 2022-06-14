import { createWebHistory, createRouter } from "vue-router";
import store from "../store/index";
import UserPage from "../pages/Home";
import LoginPage from "../pages/login";
import Users from "../pages/Users";
import UserData from "../pages/userData";
import Table from "@/components/table";
import userLocation from "../pages/location";
import taskForm from "../components/modal";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/users");
};

const ifAuthenticatedUser = (to, from, next) => {
  console.log(store.getters.isAuthenticate);
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/home",
    name: "HomePage",
    component: UserPage,
    beforeEnter: ifAuthenticatedUser,
    children: [
      {
        path: "/users/",
        name: "Users",
        component: Users,
        props: true,
        children: [
          {
            name: "UserData",
            path: "userdata/",
            component: UserData,
            props: true,
            children: [
              { name: "tasks", path: "tasks", component: Table, props: true },
              {
                name: "checkins",
                path: "locations",
                component: Table,
                props: true,
              },
            ],
          },
          {
            name: "addTask",
            path: "add",
            component: taskForm,
            props: true,
          },
          {
            name: "updateTask",
            path: "update/:id",
            component: taskForm,
            props: true,
          },
        ],
      },
      {
        path: "/location",
        name: "userLocation",
        component: userLocation,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
