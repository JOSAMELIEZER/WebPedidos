<template>
    <div id="notatiket">
      <div ref="content">
        <h1>Este es tu tiket </h1>
        <button @click="download">Descargar pdf</button>
        {{nota.total}}

      </div>

      <div>
            <b-table striped hover :items="nota" :fields="campos" stacked="md" show-empty small>
                <template #cell(actions)="row">
                    <b-button v-if="row.item.estado =='pendiente'" variant="primary" size="sm"  class="mr-1">Aceptar</b-button>
                    <b-button v-if="row.item.estado =='pendiente'" variant="danger" size="sm"  class="mr-1">Rechazar</b-button>
                    <b-button v-if="row.item.estado =='rechazado'" variant="danger" size="sm" class="mr-1">Limpiar</b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import jspdf from 'jspdf'
export default{
  name:"NotaTiket",
    data() {
      return {
        nota: [
          ],
          campos: [
                { key: "id", label: "id" },
                { key: "nombre", label: "Nombre" },
                { key: "nom_plato", label: "Plato" },
                { key: "cantidad", label: "Cantidad" },
                { key: "total", label: "Total" },
                { key: "fecha_pedido", label: "pedido" },
                { key: "fecha_envio", label: "enviado" },
                { key: "estado", label: "estado" },
                { key: "actions", label: "Opciones" }
            ],
            form:{
                cantidad:0,
                fecha_envio:"",
            },
      }
    },

  methods:{
    download(){
      const doc = new jspdf()
      const html = this.$refs.content.innerHTML
      doc.fromHTML(html,15,15,{width:150})
      doc.save("output.pdf")
    },
    async cargar(){
            await this.axios.post('/nota/mostrar')
            .then(r=>{this.nota = r.data.data;})

    }
  },
  mounted () {
        this.cargar();

        this.axios.post('/nota/mostrar')
        .then( r=>{
            console.log(r.data.data);
            this.nota = r.data.data
        })
    },
}


</script>