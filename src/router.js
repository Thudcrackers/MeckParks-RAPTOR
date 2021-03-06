import Vue from 'vue'
import Router from 'vue-router'
import Centers from './views/Centers.vue'
import Login from './views/Login.vue'
import Greenways from './views/Greenways.vue'
import ShowCenter from './views/ShowCenter.vue'
import ShowAmenity from './views/ShowAmenity.vue'
// import store from './store/store';

Vue.use(Router)
// Router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if(store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Centers,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/amenity/:AmenityId',
      name: 'amenity',
      component: ShowAmenity
    },
    {
      path: '/centers',
      name: 'centers',
      component: Centers,
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: '/center/:CenterId',
      name: 'center',
      component: ShowCenter,
      props: true
    },
    {
      path: '/greenways',
      name: 'greenways',
      component: Greenways
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
// .beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//       if (localStorage.getItem('token') == null) {
//           next({
//               path: '/login',
//               params: { nextUrl: to.fullPath }
//           })
//       }
//   } else {
//       next() 
//   }
// })
