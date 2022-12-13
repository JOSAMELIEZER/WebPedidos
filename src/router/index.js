import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import PagInicio from '@/components/PagInicio.vue'
import GestPedido from '@/components/GestPedido.vue'
import MenuPlato from '@/components/MenuPlato.vue'
import MiPedido from '@/components/MiPedido.vue'
import BienvenidoUsuario from '@/components/BienvenidoUsuario.vue'
import CrearPlato from '@/components/CrearPlato.vue'
import CatalogoPlato from '@/components/CatalogoPlato.vue'
import EditPlato from '@/components/EditPlato.vue'
import GestUsuario from '@/components/GestUsuario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/gestpedido',
    name: 'gestpedido',
    component: GestPedido
  },
  {
    path: '/crear',
    name: 'crearplato',
    component: CrearPlato
  },
  {
    path: '/editar',
    name: 'editarplato',
    component: EditPlato
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
    path: '/catalogo',
    name: 'catalogo',
    component: CatalogoPlato
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
    path: '/registroedit',
    name: 'registroedit',
    component: () => import ('../views/RegEdit.vue')
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
