import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/css/tailwind.css";
import "vue-global-api";
import PrimeVue from "primevue/config";
import Theme from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Theme,
    options: {
      prefix: "p",
      darkModeSelector: ".my-app-dark",
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  },
  unstyled: false, // if true kita bisa gunakan tailwind
  ripple: true,
  zIndex: {
    modal: 1100, //dialog, drawer
    overlay: 1000, //select, popover
    menu: 1000, //overlay menus
    tooltip: 1100, //tooltip
  },
});
app.use(ToastService);

app.mount("#app");
