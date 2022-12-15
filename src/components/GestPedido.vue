<template>
    <div class="container">
        <h1>Gestionar Pedido ADMIN</h1>
        <b-modal id="modal-1" title="Pedidos" no-close-on-esc no-close-on-backdrop>
            <b-container fluid>
                <b-form @submit="guardar()" @reset="cerrar()">
                    <b-form-group id="input-group-0" label="cantidad" label-for="input-0">
                        <b-form-input
                            id="input-0"
                            v-model="form.cantidad"
                            type="number"
                            placeholder="Nombre de Usuario"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-1" label="Usuario" label-for="input-1">
                        <b-form-input 
                        id="input-1"
                        v-model="form.fecha_envio"
                        type="date"
                        placeholder="Ingrese Usuario"
                        required
                        ></b-form-input>
                    </b-form-group>
                </b-form>
            </b-container>
            <template #modal-footer="{}">
                <b-button size="sm" variant="danger" @click="cerrar()">Cancelar</b-button>
                <b-button size="sm" variant="success" @click="guardar()">Guardar</b-button>
            </template>
        </b-modal>

        <div>
            <b-table striped hover :items="pedido" :fields="campos" stacked="md" show-empty small>
                <template #cell(actions)="row">
                    <b-button v-if="row.item.estado =='pendiente'" variant="primary" size="sm" @click="aceptar(row.item)" class="mr-1">Aceptar</b-button>
                    <b-button v-if="row.item.estado =='pendiente'" variant="danger" size="sm" @click="rechazar(row.item)" class="mr-1">Rechazar</b-button>
                    <b-button v-if="row.item.estado =='rechazado'" variant="danger" size="sm" @click="borrar(row.item)" class="mr-1">Limpiar</b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MiPedido',
    data() {
      return {
        pedido: [
          ],
          campos: [
                { key: "id", lavel: "id" },
                { key: "user_id", lavel: "user_id" },
                { key: "nom_plato", lavel: "Plato" },
                { key: "cantidad", lavel: "Cantidad" },
                { key: "fecha_pedido", lavel: "pedido" },
                { key: "fecha_envio", lavel: "enviado" },
                { key: "estado", lavel: "estado" },
                { key: "actions", lavel: "Opciones" }
            ],
            form:{
                cantidad:0,
                fecha_envio:"",
            },
      }
    },
    methods: {
        async aceptar(item){
            await this.axios.post('/pedido/aceptar',item)
            this.cargar();

        },
        async rechazar(item){
            await this.axios.post('/pedido/rechazar',item)
            this.cargar();

        },
        async borrar(item) {     
           await this.axios.post('/pedido/borrar',item);
           this.cargar();

       },
        cerrar(){
             this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },
        async cargar(){
            await this.axios.get('/pedido/listarp')
            .then(r=>{this.pedido = r.data.data;})

        }
    },
    mounted () {
        this.cargar();

        this.axios.get('/pedido/listarp')
        .then( r=>{
            console.log(r.data.data);
            this.pedido = r.data.data
        })
    },
    
}
</script>
<style>

</style>