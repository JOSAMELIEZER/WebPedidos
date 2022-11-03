import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import PagInicio from '@/components/PagInicio.vue'
import GestPedido from '@/components/GestPedido.vue'
import MenuPlato from '@/components/MenuPlato.vue'
import MiPedido from '@/components/MiPedido.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/gestpedido',
    name: 'gestpedido',
    component: GestPedido
  },
  {
    path: '/menuplato',
    name: 'menuplato',
    component: MenuPlato
  },
  {
    path: '/mipedido',
    name: 'mipedido',
    component: MiPedido
  },
  {
    path: '/',
    name: 'pagini',
    component: PagInicio
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/registrocompleto',
    name: 'registrocompleto',
    component: () => import ('../views/RegistroCompleto.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
