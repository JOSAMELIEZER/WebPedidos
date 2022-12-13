<template>
    <div class="container">
        <h1>Menu platos Admin</h1>
        <div class="py-5 text-center container">
            <a @click="nuevo()" class="btn btn-primary my-2">NUEVO PRODUCTO</a>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div v-for="product in platos" :key="product.id" class="">
                <b-card img-src="" img-alt="Vue logo" img-top style="max-width: 20rem;" class="col">

                    <img alt="" src="">

                    <b-card-title>{{ product.nom_plato }}</b-card-title>
                    <b-card-sub-title class="mb-2">{{ product.precio }} BS</b-card-sub-title>
                    <b-card-text>
                        {{ product.desc_plato }}
                    </b-card-text>
                    <b-button variant="primary" size="sm" @click="modificar(product)" class="mr-1">Modificar</b-button>
                    <b-button variant="danger" size="sm" @click="borrar(product)" class="mr-1">Borrar</b-button>
                </b-card>

            </div>
        </div>
        <b-modal id="modal-1" title="Nuevo Plato" no-close-on-esc no-close-on-backdrop>
            <b-container fluid>
                <b-form  @submit="guardar()" @reset="cerrar()">
                    <b-form-group id="input-group-0" label="Nombre" label-for="input-0">
                        <b-form-input id="input-0" v-model="form.nom_plato" type="text" placeholder="Ingrese Nombre"
                            required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="Precio" label-for="input-1">
                        <b-form-input id="input-1" v-model="form.precio" type="number" placeholder="Ingrese Precio"
                            required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Descripcion" label-for="input-2">
                        <b-form-input id="input-2" v-model="form.desc_plato" type="text"
                            placeholder="Ingrese Descripcion" required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-5" label="Foto:" label-for="input-5">
                        <div>
                            <b-form-file id="input-5" accept="image/*" v-model="form.file" :state="Boolean(form.file)"
                                @change="onFileChange" placeholder="Elija un archivo o arrastre aqui"
                                drop-placeholder="Arrastrar el archivo aqui ..."
                                data-browse-on-zone-click="true" ></b-form-file>
                        </div>
                    </b-form-group>


                </b-form>
            </b-container>
            <template #modal-footer="{}">
                <b-button size="sm" variant="danger" @click="cerrar()">Cancelar</b-button>
                <b-button size="sm" variant="success" @click="guardar()">Guardar</b-button>
            </template>
        </b-modal>
        

    </div>
</template>
<script>


export default {
    name: 'MenuPlato',
    data() {
        return {
            platos: [],
            form: {
                nom_plato: "",
                precio: "",
                desc_plato: "",
                file: null
            },
            file: null,
            tipo: [{ text: "refresco", value: null }, "comida"],
            tipo2: [{ text: "refresco", value: null }, "comida"],
            accion:0
        }
        
    },
    mounted() {

        this.cargar();

        this.axios.get('/plato/mostrar')
            .then(r => {
                console.log(r.data.data);
                this.platos = r.data.data
            })
    },
    methods: {
        crear() {
            this.$router.push('/crear')
        },
        modificar(item) {
            this.form=item;
            this.accion=1;
            this.$root.$emit('bv::show::modal', 'modal-1')
        },
         async borrar(item) {
            console.log(item);
            await this.axios.post('/plato/borrar', item);
            this.cargar();

        }
        , async cargar() {
            await this.axios.get('/plato/mostrar')
                .then(r => { this.platos = r.data.data; })
            console.log();
        }, nuevo() {
            this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow');
        },
        cerrar() {
            this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
        },
        async guardar(){
            if(this.accion==0)
                 {   
                    const datosform = new FormData();
                    datosform.append("nom_plato", this.form.nom_plato);
                    datosform.append("precio", this.form.precio);
                    datosform.append("desc_plato", this.form.desc_plato);
                    datosform.append("file", this.file);
                    let config = { headers: { 'Content-Type': 'multipart/form-data' } };

                    this.axios.post('/plato/agregar', datosform, config)
                        .then(r => {
                            console.log(r);
                            this.$router.push('/registrocompleto')
                        })}
            else
                    {const datosform = new FormData();
                    datosform.append("id", this.form.id);
                    datosform.append("nom_plato", this.form.nom_plato);
                    datosform.append("precio", this.form.precio);
                    datosform.append("desc_plato", this.form.desc_plato);
                    datosform.append("file", this.file);
                    let config = { headers: { 'Content-Type': 'multipart/form-data' } };
                    console.log(datosform);
                    this.axios.post('/plato/modificar', datosform, config)
                        .then(r => {
                            console.log(r);
                            this.$router.push('/registroedit')
                        })}
                // await this.axios.post('/plato/modificar',this.form)
            this.$root.$emit('bv::hide::modal', 'modal-1')
            this.cargar();

        },
        onFileChange(e) {
            const selectedFile = e.target.files[0];
            this.file = selectedFile;
        },
        onSubmit() {
            const datosform = new FormData();
            datosform.append("nom_plato", this.form.nom_plato);
            datosform.append("precio", this.form.precio);
            datosform.append("desc_plato", this.form.desc_plato);
            datosform.append("file", this.file);
            let config = { headers: { 'Content-Type': 'multipart/form-data' } };
            console.log(datosform);
            this.axios.post('/plato/agregar', datosform, config)
                .then(r => {
                    console.log(r);
                    this.$router.push('/registrocompleto')
                });
        },
        onReset() {
            this.form.nom_plato = "";
            this.form.precio = "";
            this.form.desc_plato = "";
            this.form.foto = "";

        }

    }
}
</script>
<style>

</style>