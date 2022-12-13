<template>
    <div class="conatiner">
        <div class="row">
            <div class="col-9">
                <h1> HOla</h1>
            </div>
            <div class="col-3">
                <b-card header="Ingreso all Sistema">
                    <b-alert variant="danger" dismissible fade :show="error">
                        Datos Erroneos!
                    </b-alert>
                    <b-form-group id="input-group-1" label="Usuario:" label-for="input-1" class="m-3">
                        <b-form-input id="input-1" type="text" v-model="form.usuario"
                            placeholder="Ingrese nombre de Usuario" required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2" class="m-3">
                        <b-form-input id="input-2" type="password" v-model="form.clave"
                            placeholder="Ingrese contraseña" required>
                        </b-form-input>
                    </b-form-group>
                    <b-button class="m-3" href="#" v-on:click="verificar()" variant="primary">Ingresar</b-button>
                </b-card>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'PagInicio',
    data() {
        return {
            form: {
                usuario: '',
                clave: ''
            },
            error: false
        }
    },
    methods: {
        verificar() {
            this.axios.post('/usr/login', this.form)
                .then(r => {
                    this.axios.defaults.headers.common.authorization = "Bearer."+r.data.token;
                    localStorage.setItem('token',"Bearer."+r.data.token);
                    this.$store.commit('setid',r.data.userdata.id)
                    this.$store.commit('setusuario',r.data.userdata.usuario)
                    this.$store.commit('setnombre',r.data.userdata.nombre)
                    this.$store.commit('setrol_usuario',r.data.userdata.rol_usuario)
                    
                    this.$router.push('/usr')
                    console.log(r);
                })
                .catch(e => {
                    this.error=true
                    console.log(e);
                })
        }
    }
}
</script>
<style>

</style>