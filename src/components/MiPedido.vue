<template>
    <div class="container">
        <h1>Mi Pedido Client</h1>
        <template>
            <div>
                <b-table striped hover :items="pedido"></b-table>
            </div>
        </template>
    </div>

</template>
<script>
export default {
    name: 'MiPedido',
    data() {
      return {
        pedido: [
          ]
      }
    },
    mounted () {
        this.axios.get('/pedido/listar')
        .then( r=>{
            console.log(r.data.data);
            this.pedido = r.data.data
        })
    }
}
</script>
<style>

</style>