<template>
    <div class="container">
        <h1>Mi Pedido Client</h1>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Se quito un pedido!
        </b-alert>

        <b-alert v-model="showDismissibleAlert2" variant="success" dismissible>
            Se modifico su pedido!
        </b-alert>
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
                    <b-form-group id="input-group-1" label="Fecha de Envio" label-for="input-1">
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
                    
                    <b-button v-if="row.item.estado =='carrito'" variant="primary" size="sm" @click="modificar(row.item)" class="mr-1">Modificar</b-button>
                    <b-button v-if="row.item.estado =='carrito'" variant="danger" size="sm" @click="borrar(row.item),showDismissibleAlert = true" class="mr-1">Quitar</b-button>
                    <b-button v-if="row.item.estado =='carrito'" variant="success" size="sm" @click="enviar(row.item)" class="mr-1">Processar</b-button>
                    <b-button v-if="row.item.estado =='aceptado'" variant="primary" size="sm" @click="tiket(row.item)" class="mr-1">TICKET</b-button>
                </template>
                
            </b-table>
        </div>
    </div>
</template>
<script>
// import jspdf form 'jspdf'

export default {
    name: 'MiPedido',
    data() {
      return {
        
        pedido: [
          ],
          campos: [
                { key: "id", label: "ID" },
                { key: "nom_plato", label: "Plato" },
                { key: "cantidad", label: "Cantidad" },
                { key: "precio", label: "Precio" },
                { key: "total", label: "Total" },
                { key: 'fecha_envio', label: 'Fecha Pedido' },
                { key: "estado", label: "Estado" },
                { key: "actions", label: "Opciones" }
            ],
            form:{
                cantidad:0,
                fecha_envio:"",
            },
            showDismissibleAlert: false,
            showDismissibleAlert2: false
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
        async tiket(item){

            
            item.pedido_id = item.id;
            await this.axios.post('/pedido/tiket',item);
            await this.axios.post('/nota/mostrar',item)
            this.$router.push('/notatiket')
            // console.log(item)
        },
        cerrar(){
             this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },
        async guardar(){
            if(this.accion==0)
                await this.axios.post('/pedido/agregar',this.form)
            else
                this.form.total = this.form.cantidad * this.form.precio;
                await this.axios.post('/pedido/modificar',this.form)
                this.showDismissibleAlert2= true;
            this.$root.$emit('bv::hide::modal', 'modal-1')
            this.cargar();

        },
        async enviar(item){

            
            //console.log(item)
            await this.axios.post('/pedido/procesar',item)
            this.cargar();
            // console.log(this.$store.state)
            // console.log(this.$store.state.id)
            // console.log(this.$store.state.usuario)

        },
        async cargar(){
            console.log(this.r)
            this.item=this.$store.state;
            console.log(this.item);
            await this.axios.post('/pedido/listar',this.item)
            .then(r=>{this.pedido = r.data.data;})
            
        }
    },
    mounted () {
        this.cargar();

        this.axios.post('/pedido/listar',this.item)
        .then( r=>{
            console.log(r.data.data);
            this.pedido = r.data.data
        })
    },
    
}
</script>
<style>

</style>