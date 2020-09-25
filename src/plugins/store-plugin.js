import Vuex from "vuex";

class storePlugin {
  store;
  // database = new this.database();
  install = function(Vue, storeConfig) {
    let storeOptions = storeConfig;
    Vue.use(Vuex);

    this.store = new Vuex.Store(storeOptions);

    Vue.stores = Vue.prototype.$stores = this.store;
  };
}

export default new storePlugin();
