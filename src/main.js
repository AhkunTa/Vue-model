import Vue from "vue";
import App from "./App.vue";
// import router from './router'
// import store from './store'

import routerConfig from "./configs/router-config.js";
import routerPlugin from "./plugins/router-plugin.js";

import mixinConfig from "./configs/mixin-config.js";
import mixinPlugin from "./plugins/mixin-plugin.js";

import storeConfig from "./configs/store-config.js";
import storePlugin from "./plugins/store-plugin.js";

import serviceConfig from "./configs/service-config.js";
import servicePlugin from "./plugins/service-plugin.js";

import remPlugin from "./plugins/rem-plugin.js";

Vue.config.productionTip = true;

Vue.use(routerPlugin, routerConfig);

Vue.use(mixinPlugin, mixinConfig);

Vue.use(servicePlugin, serviceConfig);

Vue.use(storePlugin, storeConfig);

Vue.use(remPlugin);

let router = routerPlugin.router;
let store = storePlugin.store;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
