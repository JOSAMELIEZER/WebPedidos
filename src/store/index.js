import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const storage = new Vuex.Store({
  state: {
    usuario:'',
    id:0,
    nombre:'',
    rol_usuario:''
  },
  getters: {
  },
  mutations: {
    setusuario(state,value){
      state.usuario=value
    },
    setid(state,value){
      state.id=value
    },
    setnombre(state,value){
      state.usuario=value
    },
    setrol_usuario(state,value){
      state.rol_usuario=value
    }

  },
  plugins:[
    new VuexPersistence({
      storage:window.localStorage
    }).plugin
  ],

  actions: {
  },
  modules: {
  }
})
export default storage
