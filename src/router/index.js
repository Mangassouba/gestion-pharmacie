import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth/auth.vue";
import Index from "../views/Dashboard/index.vue";
import AddProduit from "../views/stock/ListProduct.vue";
import MainContent from "../components/MainContent.vue";
import AddProduct from "../views/stock/addProduct.vue";
import EditProduct from "../views/stock/editProduct.vue";
import ListCustomer from "../views/customers/listCustomer.vue";
import AddCustomer from "../views/customers/addCustomer.vue";
import EditCustomer from "../views/customers/editCustomer.vue";
import ListOrder from "../views/orders/listOrder.vue";
import AddOrder from "../views/orders/AddOrder.vue";
import ListReception from "../views/receptions/listReception.vue";
import AddReception from "../views/receptions/addReception.vue";
import ListSupplier from "../views/suppliers/listSupplier.vue";
import AddSupplier from "../views/suppliers/addSupplier.vue";

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
      },
      {
        path: "/customer/add",
        name: "addCustomer",
        component: AddCustomer
      },
      {
        path: "/customer/edit/:id",
        name: "editCustomer",
        component: EditCustomer
      },
      {
        path: "/orders/list",
        name: "listOrder",
        component: ListOrder
      },
      {
        path: "/order/add",
        name: "addOrder",
        component: AddOrder
      },
      {
        path: "/reception/list",
        nama: "listReception",
        component: ListReception
      },
      {
        path: "/reception/add",
        name: "addReception",
        component: AddReception
      },
      {
        path: "/supplier/list",
        name: "listSupplier",
        component: ListSupplier
      },
      {
        path: "/supplier/add",
        name: "addSupplier",
        component: AddSupplier
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
