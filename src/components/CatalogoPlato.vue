<template>
    <div class="container">
        <h1>Menu</h1>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div v-for="product in platos" :key="product.id" class="">
                <b-card title="Card Title"
                        :img-src="getimg(product)"
                        img-alt="Image"
                        img-top
                        tag="article"   
                        style="height: 50px;"
                        class="mb-2">
                    <div style="width=100%; height=225">
                        <img class="card-img-top" alt="logo" :src="getimg(product)" >
                    </div>
                    
                    <b-card-title>{{ product.nom_plato }}</b-card-title>
                    <b-card-sub-title class="mb-2">{{ product.precio }} BS</b-card-sub-title>
                    <b-card-text>
                        {{ product.desc_plato }}
                    </b-card-text>
                    <b-button variant="primary" size="sm" @click="nuevo(product)" class="mr-1">Añadir</b-button>
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
            tipo2: [{ text: "refresco", value: null }, "comida"]
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
        getimg(item){
            return require('@/assets/'+item.foto)
        },

        async nuevo(item) {          
            
            console.log(this.$store.state.id);
            item.user_id=this.$store.state.id;
            console.log(item);
            await this.axios.post('/pedido/agregar',item)
        },
        modificar(item) {
                this.form=item;
                this.$router.push('/editar',item)
            // this.form=item;
        },async borrar(item) {
            console.log(item);
            await this.axios.post('/plato/borrar',item);
            this.cargar();

        },async cargar(){
            await this.axios.get('/plato/mostrar')
            .then(r=>{this.platos = r.data.data;})
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