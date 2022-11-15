import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import PagInicio from '@/components/PagInicio.vue'
import GestPedido from '@/components/GestPedido.vue'
import MenuPlato from '@/components/MenuPlato.vue'
import MiPedido from '@/components/MiPedido.vue'
import BienvenidoUsuario from '@/components/BienvenidoUsuario.vue'
import GestUsuario from '@/components/GestUsuario.vue'

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
   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/registrocompleto',
    name: 'registrocompleto',
    component: () => import ('../views/RegistroCompleto.vue')
  },
  {
    path: '/usr',
    name: 'bienvenidoUsr',
    component: BienvenidoUsuario
  },
  {
    path: '/usr/gestion',
    name: 'gestusuario',
    component: GestUsuario
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
