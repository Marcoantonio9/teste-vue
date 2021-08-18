<template>
  <b-navbar toggleable type="dark" variant="dark" class="px-5 pt-3 pb-3">
    <b-navbar-brand href="#">Teste Front-End</b-navbar-brand>
    <b-button 
      v-if="this.$route.name === 'ListaUsuarios'" 
      @click="voltar"
      variant="outline-light"
      >
      <i class="fas fa-arrow-left"></i> 
      Voltar
    </b-button>
  </b-navbar>
</template>

<script>
export default {
  data(){
    return{
      nomeRotas: ''
    }
  },
  methods: {
    voltar(){

      this.$router.push({path: '/'})
    }
  },
  created(){

    console.log(this.nomeRotas)
  }
}
</script>

<style>

</style>