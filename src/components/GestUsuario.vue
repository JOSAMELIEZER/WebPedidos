<template>
    <div class="container">
        <h1>Gestionar Uusuarios</h1>
        <b-button variant="primary" @click="nuevo()">
            <b-icon-plus-circle></b-icon-plus-circle>
        </b-button>
        <b-modal id="modal-1" title="Usuarios" no-close-on-esc no-close-on-backdrop>
            <b-container fluid>
                <b-form @submit="guardar()" @reset="cerrar()">
                    <b-form-group id="input-group-0" label="Nombre" label-for="input-0">
                        <b-form-input 
                        id="input-0"
                        v-model="form.nombre"
                        type="text"
                        placeholder="Nombre de Usuario"
                        required
                        ></b-form-input>
                    </b-form-group>
                    
                    <b-form-group id="input-group-1" label="Usuario" label-for="input-1">
                        <b-form-input 
                        id="input-1"
                        v-model="form.usuario"
                        type="text"
                        placeholder="Ingrese Usuario"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
                        <b-form-input 
                        id="input-2"
                        v-model="form.clave"
                        type="text"
                        placeholder="Ingrese Contraseña"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-3" label="Correo Electronico" label-for="input-3">
                        <b-form-input 
                        id="input-3"
                        v-model="form.email"
                        type="text"
                        placeholder="Ingrese Correo"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="Rol de Usuario:" label-for="input-4">
                        <b-form-select 
                        id="input-4"
                        v-model="form.rol_usuario"
                        :options="tipos"
                        required
                        ></b-form-select>
                    </b-form-group>

                </b-form>
            </b-container>
            <template #modal-footer="{}">
                <b-button size="sm" variant="danger" @click="cerrar()">Cancelar</b-button>
                <b-button size="sm" variant="success" @click="guardar()">Guardar</b-button>
            </template>
        </b-modal>

        <b-table striped hover :items="usuarios" :fields="campos" stacked="md" show-empty small>

            <template #cell(actions)="row">
                <b-button variant="primary" size="sm" @click="modificar(row.item)" class="mr-1">Modificar</b-button>
                <b-button variant="danger" size="sm" @click="borrar(row.item)" class="mr-1">Borrar</b-button>

            </template>
        </b-table>
    </div>

</template>
<script>
export default {
    name: 'GestUsuarios',
    data() {
        return {
            usuarios: [],
            campos: [
                { key: "nombre", lavel: "nombre" },
                { key: "usuario", lavel: "Usuario" },
                { key: "clave", lavel: "Contraseña" },
                { key: "email", lavel: "email" },
                { key: "rol_usuario", lavel: "rol_usuario" },
                { key: "actions", lavel: "Opciones" }
            ],
            tipos: [{text: "Administrador", value:"admin"},
                    {text: "Cliente", value:"client"}
            ],
            form:{
                id:0,
                nombre:"",
                usuario:"",
                clave:"",
                email:"",
                rol_usuario:""
            },
            accion:0
        }
    },
    methods: {
        modificar(item) {
            this.form=item;
            this.accion=1;
            this.$root.$emit('bv::show::modal', 'modal-1')
        },
        async borrar(item) {
            await this.axios.post('/usr/borrar',item);
            this.cargar();

        },
        nuevo() {
            this.accion==0;
            this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow');
        },
        cerrar(){
            this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },
        async guardar(){
            if(this.accion==0)
                await this.axios.post('/usr/agregar',this.form)
            else
                await this.axios.post('/usr/modificar',this.form)
            this.$root.$emit('bv::hide::modal', 'modal-1')
            this.cargar();

        },
        async cargar(){
            await this.axios.get('/usr/listar')
            .then(r=>{this.usuarios = r.data.data;})

        }
    },
    mounted() {
        this.cargar();

        this.axios.get('/usr/listar')
            .then(r => {
                console.log(r.data.data);
                this.usuarios = r.data.data
            })
    },
    beforeMount(){
        if(this.$store.state.rol_usuario=='client') this.$router.push('/');
    }
}
</script>
<style>

</style>