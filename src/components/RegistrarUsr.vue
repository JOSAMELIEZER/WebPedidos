<template>
        
    <div class="conatiner">
        
        <div class="row">
            <div class="md-4 fondo2">
                <div class="row">
                    <div class="col-md-4">
                        <b-card header="REGISTRATE">
                    <b-alert variant="danger" dismissible fade :show="error">
                        Datos Erroneos!
                    </b-alert>
                    <b-form-group id="input-group-1" label="Nombre:" label-for="input-1" class="m-3">
                        <b-form-input id="input-1" type="text" v-model="form.nombre"
                            placeholder="Ingresa tu nombre" required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Nombre de Usuario:" label-for="input-2" class="m-3">
                        <b-form-input id="input-2" type="text" v-model="form.usuario"
                            placeholder="Ingrese un nombre de Usuario" required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-3" label="Contraseña:" label-for="input-3" class="m-3">
                        <b-form-input id="input-3" type="password" v-model="form.clave"
                            placeholder="Ingrese contraseña" required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-4" label="Correo electronico:" label-for="input-4" class="m-3">
                        <b-form-input id="input-4" type="email" v-model="form.email"
                            placeholder="Ingrese tu correo" required>
                        </b-form-input>
                    </b-form-group>
                    <b-button class="m-3" href="#" v-on:click="guardar()" variant="primary">Registrar</b-button>
                </b-card>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'RegistrarUsr',
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
        async guardar(){
            //no se debe guardar el rol usuario en frontend debe guardarse en backend en SQL no es segura
            this.form.rol_usuario = "client";
            await this.axios.post('/usr/agregar',this.form)
            this.$router.push('/registrocompleto')
            //console.log(this.form);

        },
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
.fondo2 {
padding: 010%;
background-image: url("https://cdn.pedidosdeuna.com/business/581903/581903_main.jpg");
}

</style>