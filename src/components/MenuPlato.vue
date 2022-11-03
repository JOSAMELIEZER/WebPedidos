<template>
    <div class="container">
        <h1>Menu platos Admin</h1>
        <b-form>
            <b-form-group id="input-group-1" label="Nombre del Plato" label-for="input-1"
                description="Nombre del plato.">
                <b-form-input id="input-1" v-model="form.nom_plato"  placeholder="Ingrese nombre" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Precio" label-for="input-2">
                <b-form-input id="input-2" v-model="form.precio" type="number" placeholder="Ingrese precio" required>
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Descripcion del plato" label-for="input-3">
                <b-form-input id="input-3" v-model="form.desc_plato" placeholder="Ingrese descripcion" required>
                </b-form-input>
            </b-form-group>

            <!-- <b-form-group id="input-group-4" label="Foto" label-for="input-4">
                <b-form-select id="input-4" v-model="form.foto" placeholder="Ingrese foto" required></b-form-select>
            </b-form-group> -->

            <b-form-group id="input-group-5" label="Foto:" label-for="input-5">
                <div>
                    <b-form-file 
                        id="input-5"
                        accept="image/*"
                        v-model="form.file"
                        :state="Boolean(form.file)"
                        @change="onFileChange"
                        placeholder="Elija un archivo o arrastre aqui"
                        drop-placeholder="Arrastrar el archivo aqui ..."
                        data-browse-on-zone-click="true"
                    ></b-form-file>
                </div>
            </b-form-group>


            <div class="conatiner m-5">
                <b-button type="submit" v-on:click="onSubmit()" variant="primary">Registrar</b-button>
                <b-button type="reset" v-on:click="onReset()" variant="danger">Limpiar datos</b-button>
            </div>
        </b-form>
    </div>
</template>
<script>
export default {
    name: 'MenuPlato',
    data() {
        return {
            form: {
                nom_plato: "",
                precio: "",
                desc_plato: "",
                file: null
            },
            file : null,
            tipo: [{ text: "refresco", value: null }, "comida"],
            tipo2: [{ text: "refresco", value: null }, "comida"]
        }
    },
    methods: {
        onFileChange(e){
            const selectedFile = e.target.files[0];
            this.file =selectedFile;
        },
        onSubmit() {
            const datosform = new FormData();
            datosform.append("nom_plato",this.form.nom_plato);
            datosform.append("precio",this.form.precio);
            datosform.append("desc_plato",this.form.desc_plato);
            datosform.append("file",this.file);
            let config = {headers: {'Content-Type' : 'multipart/form-data'}};

            this.axios.post('/plato/agregar',datosform,config)
            .then( r =>{
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