<template>
    <div class="container">
        <h1>NUESTRO MENU DEL DIA</h1>
        <b-alert v-if="$store.state.rol_usuario == ''" show>INICIA SESION PARA PODER REAIZAR TU PEDIDO</b-alert>

        <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
            Se añadio a Mi PEDIDO!
        </b-alert>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div v-for="product in platos" :key="product.id" class="">
                <b-card title="" :img-src="getimg(product)" img-alt="Image" img-top tag="article"
                    style="max-width: 20rem;" class="mb-2">
                    <!-- <b-card title="" :img-src="getimg(product)" img-alt="Image" img-top tag="article"
                        style="height: 50px;" class="mb-2"> -->
                    <b-card-title>{{ product.nom_plato }}</b-card-title>
                    <b-card-sub-title class="mb-2">{{ product.precio }} BS</b-card-sub-title>
                    <b-card-text>
                        {{ product.desc_plato }}
                    </b-card-text>
                    <b-button v-if="$store.state.rol_usuario == 'client'" variant="primary" size="sm"
                        @click="nuevo(product),showDismissibleAlert = true" class="mr-1">Añadir</b-button>
                </b-card>
            </div>
        </div>
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
            showDismissibleAlert: false
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
        getimg(item) {
            return require('@/assets/' + item.foto)
        },

        async nuevo(item) {
            item.total = item.precio
            item.user_id = this.$store.state.id;
            console.log(item);
            await this.axios.post('/pedido/agregar', item);
            this.cargar();

        },
        modificar(item) {
            this.form = item;
            this.$router.push('/editar', item)
            // this.form=item;
        }, async borrar(item) {
            console.log(item);
            await this.axios.post('/plato/borrar', item);
            this.cargar();

        }, async cargar() {
            await this.axios.get('/plato/mostrar')
                .then(r => { this.platos = r.data.data; })
            console.log();
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