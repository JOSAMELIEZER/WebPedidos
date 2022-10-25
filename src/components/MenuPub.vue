<template>
    <b-nav card-header tabs>
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
        <b-nav-item to="/" exact exact-active-class="active">Inicio</b-nav-item>
        <b-nav-item to="/menuplato" exact exact-active-class="active">Menu Plato</b-nav-item>
        <b-nav-item to="/mipedido" exact exact-active-class="active">Mi Pedido</b-nav-item>
        <b-nav-item to="/gestpedido" exact exact-active-class="active">Gestionar Pedido</b-nav-item>
        <b-nav-item to="/about" exact exact-active-class="active">Acerca de</b-nav-item>
</b-nav>
</template>

<script>
    export default {
        name:'MenuPub'
    }

</script>
<style>

</style>