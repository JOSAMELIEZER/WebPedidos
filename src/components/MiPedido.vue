<template>
    <div class="container">
        <h1>Mi Pedido Client</h1>{{$store.state.id}} {{campos.estado}}
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
                
                <template   #cell(actions)="row">
                    
                    <b-button v-if="row.item.estado =='carrito'" variant="primary" size="sm" @click="modificar(row.item)" class="mr-1">Cantidad</b-button>
                    <b-button v-if="row.item.estado =='carrito'" variant="danger" size="sm" @click="borrar(row.item)" class="mr-1">Quitar</b-button>
                    <b-button v-if="row.item.estado =='carrito'" variant="success" size="sm" @click="enviar(row.item)" class="mr-1">Processar</b-button>
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
                { key: "id", lavel: "ID" },
                { key: "nom_plato", lavel: "Plato" },
                { key: "cantidad", lavel: "Cantidad" },
                { key: "precio", lavel: "Precio" },
                { key: "total", lavel: "Total" },
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
        modificar(item) {
            this.form=item;
            this.accion=1;
             this.$root.$emit('bv::show::modal', 'modal-1')
        },
        async borrar(item) {
            await this.axios.post('/pedido/borrar',item);
            this.cargar();

        },
        
        cerrar(){
             this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },
        async guardar(){
            if(this.accion==0)
                await this.axios.post('/pedido/agregar',this.form)
            else
                await this.axios.post('/pedido/modificar',this.form)
            this.$root.$emit('bv::hide::modal', 'modal-1')
            this.cargar();

        },
        async enviar(item){
            await this.axios.post('/pedido/procesar',item)
            this.cargar();
            // console.log(this.$store.state)
            // console.log(this.$store.state.id)
            // console.log(this.$store.state.usuario)

        },
        async cargar(){
            console.log(this.r)
            //await this.axios.get('/pedido/listar')
            //.then(r=>{this.pedido = r.data.data;})
            
        }
    },
    mounted () {
        this.cargar();

        this.axios.get('/pedido/listar')
        .then( r=>{
            console.log(r.data.data);
            this.pedido = r.data.data
        })
    },
    
}
</script>
<style>

</style>