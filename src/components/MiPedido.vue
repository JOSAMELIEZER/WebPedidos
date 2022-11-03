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
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
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