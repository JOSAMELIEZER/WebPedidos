<template>
    <div>
        <b-nav v-if="$store.state.rol_usuario==''" card-header tabs>
            <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
            <b-nav-item to="/" exact exact-active-class="active">Iniciar Sesion</b-nav-item>
            <b-nav-item to="/register" exact exact-active-class="active">Registrarse</b-nav-item>
            <b-nav-item to="/catalogo" exact exact-active-class="active">Menu</b-nav-item>
            <!-- <b-nav-item to="/menuplato" exact exact-active-class="active">Menu Plato</b-nav-item>
            <b-nav-item to="/mipedido" exact exact-active-class="active">Mi Pedido</b-nav-item>
            <b-nav-item >Salir</b-nav-item> -->
        </b-nav>
        <b-nav v-if="$store.state.rol_usuario=='admin'" card-header tabs>
            <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
            <!-- <b-nav-item to="/" exact exact-active-class="active">Inicio Admin</b-nav-item> -->
            <b-nav-item to="/usr/gestion" exact exact-active-class="active">Usuarios</b-nav-item>
            <b-nav-item to="/menuplato" exact exact-active-class="active">Menu Plato Admin</b-nav-item>
            <b-nav-item to="/gestpedido" exact exact-active-class="active">Gestionar Pedido</b-nav-item>
            <b-nav-item v-on:click="salir()">Salir</b-nav-item>
        </b-nav>
        <b-nav v-if="$store.state.rol_usuario=='client'" card-header tabs>
            <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
            <!-- <b-nav-item to="" exact exact-active-class="active">Inicio cliente</b-nav-item> -->
            <b-nav-item to="/catalogo" exact exact-active-class="active">Menu Plato</b-nav-item>
            <b-nav-item to="/mipedido" exact exact-active-class="active">Mi Pedido</b-nav-item>
            <b-nav-item v-on:click="salir()">Salir</b-nav-item>
        </b-nav>
        
    </div>
</template>

<script>
export default {
    name: 'MenuPub',
    
        methods :{
            salir(){
                localStorage.setItem('token','');
                this.axios.defaults.headers.common.authorization = '';
                this.$store.commit('setid',0)
                    this.$store.commit('setusuario','')
                    this.$store.commit('setnombre','')
                    this.$store.commit('setrol_usuario','')
                    this.$router.push('/')
            }
        }
}

</script>
<style>

</style>