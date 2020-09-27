import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import { deepClone } from "@utils/common.js";
class storePlugin {
  store;
  database = new VuexORM.Database();
  install = function(Vue, storeConfig) {
    let models = {};
    let storeOptions = deepClone(storeConfig.options);

    storeConfig.entities.forEach(orm => {
      this.database.register(orm.model, orm.module);
      models[orm.name] = orm.model;
    });
    let ormPlugin = VuexORM.install(this.database);

    storeOptions = {
      ...storeOptions,
      plugins: [ormPlugin]
    };

    Vue.use(Vuex);
    this.store = new Vuex.Store(storeOptions);

    Vue.models = Vue.prototype.$models = models;
    Vue.stores = Vue.prototype.$stores = this.store;
  };
}

export default new storePlugin();
