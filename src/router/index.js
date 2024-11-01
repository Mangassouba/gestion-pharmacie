import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth/auth.vue";
import Index from "../views/Dashboard/index.vue";
import AddProduit from "../views/stock/ListProduct.vue";
import MainContent from "../components/MainContent.vue";
import AddProduct from "../views/stock/addProduct.vue";
import EditProduct from "../views/stock/editProduct.vue";
import ListCustomer from "../views/customers/listCustomer.vue";
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
        nama: "main",
        component: MainContent,
      },
      {
        path: "/stock/addProduit",
        name: "addProduit",
        component: AddProduit,
      },
      {
        path: "/stock/add",
        name: "add",
        component: AddProduct
      },
      {
        path: "/stock/edit/:id",
        name: "editProduct",
        component: EditProduct,
      },
      {
        path:"/customer/list",
        name: "listCustomer",
        component: ListCustomer
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
