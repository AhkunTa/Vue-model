import Home from '../views/Home.vue'
import routerConfig from '@configs/service-config.js'

  export default {
    mode: 'history',
    base: routerConfig.appContext,
    routes : [
        {
            path: '/index.html',
            name: 'index',
            component: Home
        },
        {
          path: '/home/:userId.html',
          name: 'home',
          component: Home
        },
        {
          path: '/about.html',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
          beforeEnter(to, from, next) {
            next()
          }
        }
    ],
    beforeEach: (()=> {
        return (to, from, next) =>{
            console.log('to1',to);
            console.log('from1',from);

            return next()
        }
    })()
  }