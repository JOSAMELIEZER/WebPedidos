<template>
    <div id="notatiket">
      <div ref="content">
        <h1>Este es tu tiket </h1>
        <button @click="download">Descargar pdf</button>
        {{nota.total}}

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
                { key: "id", lavel: "id" },
                { key: "user_id", lavel: "user_id" },
                { key: "nom_plato", lavel: "Plato" },
                { key: "cantidad", lavel: "Cantidad" },
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