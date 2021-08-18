<template>
  <div id="conteudo">
  <b-container class="mt-2 pt-4 pb-4" id="area-table">
      <h2 class="border-bottom">Formulário</h2>      
      <div>
        <b-form>
          <b-form-group
            label="Nome:"
          >
            <b-form-input
              type="text"
              v-model="user.nome"
              placeholder="Digite seu nome"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mt-2"
            label="CPF:"
          >
            <b-form-input
              type="text"
              v-model="user.cpf"
              placeholder="Digite seu CPF"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mt-2"
            label="Telefone:"
          >
            <b-form-input
              type="text"
              v-model="user.telefone"
              placeholder="Digite seu Telefone"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mt-2"
            label="Email:"
          >
            <b-form-input
              type="text"
              v-model="user.email"
              placeholder="Digite seu Email"
              required
            ></b-form-input>
          </b-form-group>               
          
          <b-row class="mt-5 justify-content-center text-center">
            <b-col lg="1" class="pb-2"><b-button variant="primary" @click="enviarDados">Enviar</b-button></b-col>          
            <b-col lg="1" class="pb-2"><b-button variant="danger">Limpar</b-button></b-col>          
          </b-row>
                         
        </b-form>
      </div>
  </b-container>    
  </div>
</template>

<script>
export default {
  data(){
    return{
      listaUsuarios: [],
      user: {
        nome: '',
        cpf: '',
        telefone: '',
        email: ''
      }
    }
  },
  methods: {
    enviarDados(event){
      event.preventDefault()
      console.log(this.user)
    }
  }

}
</script>

<style>
#conteudo{
  height: calc(100vh - 75px);
  width: 100%;
  /* display: flex;
  align-items: center; */
}
#area-table{
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
#area-table h2{
  width: 170px;
  /* border-bottom: 2px solid #111; */
}
</style>