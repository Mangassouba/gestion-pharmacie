import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth/auth.vue";
import Index from "../views/Dashboard/index.vue";
import AddProduit from "../views/stock/ListProduct.vue";
import MainContent from "../components/MainContent.vue";
// import Dashbord from "../components/Dashbord.vue";

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Index,
    children: [
      {
        path: "/main",
        nama: "",
        component: MainContent,
      },
      {
        path: "/stock/addProduit",
        name: "addProduit",
        component: AddProduit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
