import routerConfig from "@configs/service-config.js";

import Home from "../views/Home.vue";
import ProvideInject from "@components/ProvideInject.vue";
import AttrsListeners from "@components/AttrsListeners.vue";
import Bus from "@components/Bus.vue";
import Slot from "@components/Slot.vue";

// vue-orm
import OrmInsert from "@components/vuexOrm/OrmInsert.vue";
// computed
import Computed from "@components/vueBasis/Computed.vue";
import Component from "@components/vueBasis/Component.vue";

export default {
  mode: "history",
  base: routerConfig.appContext,
  routes: [
    {
      path: "/index.html",
      name: "index",
      component: () =>
        import(/* webpackChunkName: "Index" */ "../views/Index.vue")
    },
    {
      path: "/home/:userId.html",
      name: "home",
      component: Home
    },
    {
      path: "/about.html",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
      beforeEnter(to, from, next) {
        next();
      }
    },
    {
      path: "/component-communicate",
      name: "componentCommunicate",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "componentCommunicate" */ "../views/componentCommunicate/RouterEntry.vue"
        ),
      children: [
        {
          path: "provide-inject.html",
          name: "provideInject",
          component: ProvideInject
        },
        {
          path: "attrs-listeners.html",
          name: "attrsListeners",
          component: AttrsListeners
        },
        {
          path: "bus.html",
          name: "bus",
          component: Bus
        },
        {
          path: "slot.html",
          name: "slot",
          component: Slot
        }
      ]
    },
    {
      path: "/vuex-orm",
      name: "vuex-orm",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "vuexOrm" */ "../views/vuexOrm/RouterEntry.vue"
        ),
      children: [
        {
          path: "insert.html",
          name: "insert",
          component: OrmInsert
        }
      ]
    },
    {
      path: "/vue-basis",
      name: "vue-basis",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "vueBasis" */ "../views/vueBasis/RouterEntry.vue"
        ),
      children: [
        {
          path: "computed.html",
          name: "computed",
          component: Computed
        },
        {
          path: "component.html",
          name: "component",
          component: Component
        }
      ]
    },
    {
      path: "*",
      name: "error",
      component: () =>
        import(/* webpackChunkName: "Index" */ "../views/Index.vue")
    }
  ],
  beforeEach: (() => {
    return (to, from, next) => {
      console.log("to1", to);
      console.log("from1", from);

      return next();
    };
  })()
};
