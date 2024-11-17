import { createApp } from "vue";
// import './style.css'
// import { createApp } from 'vue'
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const app = createApp(App);
// app.component("font-awesome-icon", FontAwesomeIcon);
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
});
app.use(pinia);
app.use(router);
createApp(App);
app.mount("#app");
