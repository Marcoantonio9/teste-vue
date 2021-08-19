<template>
  <div id="conteudo">
  <b-container class="mt-2 pt-4 pb-4" id="area-table">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="border-bottom">Formulário</h2>  
        <a @click="$router.push({path: '/lista-usuarios'})" class="link">Visualizar Usuários <i class="fas fa-arrow-right mr-4"></i></a>           
      </div>
      <div>
        <b-form>
          <b-form-group label="Nome:">
            <b-form-input
              type="text"
              v-model="user.nome"
              placeholder="Digite seu nome"
              required
              ref="userNome"
              @keyup="verificacao"
            ></b-form-input>
            <small class="text-danger" v-show="validacao.nome">Preencha o Nome corretamente</small>
          </b-form-group>

          <b-form-group class="mt-2" label="CPF:">
            <b-form-input
              type="text"
              v-model="user.cpf"
              v-mask="'###-###-###-##'"
              placeholder="Digite seu CPF"
              required
              ref="userCpf"
              @input="verificacao"
            ></b-form-input>
            <small class="text-danger" v-show="validacao.cpf">Preencha o CPF corretamente</small>
          </b-form-group>

          <b-form-group class="mt-2" label="Telefone:">      
            <b-form-input 
              class="form-control" 
              v-mask="'(##) #####-####'"
              type="text"
              v-model="user.telefone"
              placeholder="Digite seu Telefone"
              required
              ref="userTelefone"
              @input="verificacao"                        
            ></b-form-input>
            <small class="text-danger" v-show="validacao.telefone">Preencha o Telefone corretamente</small>
          </b-form-group>

          <b-form-group class="mt-2" label="Email:">
            <b-form-input
              type="email"
              v-model="user.email"
              placeholder="Digite seu Email"
              required
              ref="userEmail"
              @input="verificacao"
            ></b-form-input>
            <small class="text-danger" v-show="validacao.email">Preencha o Email corretamente</small>
          </b-form-group>               
          
          <b-row class="mt-5 justify-content-center text-center">
            <b-col lg="1" class="pb-2"><b-button variant="outline-primary" @click="enviarDados">Enviar</b-button></b-col>          
            <b-col lg="1" class="pb-2"><b-button variant="outline-danger" @click="limparDados">Limpar</b-button></b-col>          
          </b-row>
          <b-alert v-model="alerta" variant="success">
            Formulário enviado com sucesso
          </b-alert>          
                         
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
      },
      validacao: {
        nome: false,
        cpf: false,
        telefone: false,
        email: false
      },
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      alerta: false
    }
  },
  created(){
    if(localStorage.getItem('formularioUser') !== null){
      this.listaUsuarios = JSON.parse(localStorage.getItem('formularioUser'))      
    }
    
  },
  methods: {
    enviarDados(event){
      event.preventDefault()
      if(this.user.nome === ''){        
        this.validacao.nome = true
        this.$refs.userNome.focus()

      }else if(this.user.cpf === '' || this.user.cpf.length < 14){        
        this.validacao.cpf = true
        this.$refs.userCpf.focus()

      }else if(this.user.telefone === '' || this.user.telefone.length < 15){
        this.validacao.telefone = true
        this.$refs.userTelefone.focus()

      }else if(this.user.email === ''){
        this.validacao.email = true
        this.$refs.userEmail.focus()

      }else if(this.regex.test(this.user.email) === false){
        this.validacao.email = true
        this.$refs.userEmail.focus()

      }else{        
        this.listaUsuarios.push({
          nome: this.user.nome,
          cpf: this.user.cpf,
          telefone: this.user.telefone,
          email: this.user.email
        })

        localStorage.setItem('formularioUser', JSON.stringify(this.listaUsuarios))
        this.alerta = true
        setTimeout(() => {
          this.alerta = false
        }, 3500)

        this.user.nome = ''
        this.user.cpf = ''
        this.user.telefone = ''
        this.user.email = ''        
      }      
    },
    verificacao(){
      if(this.user.nome !== ''){        
        this.validacao.nome = false
      }
      if(this.user.cpf !== ''){        
        this.validacao.cpf = false
        
      }
      if(this.user.telefone !== ''){        
        this.validacao.telefone = false
        
      }
      if(this.user.email !== ''){
        this.validacao.email = false
      }
    },
    limparDados(){
      this.user.nome = '',
      this.user.cpf = '',
      this.user.telefone = '',
      this.user.email = ''
    }
  }

}
</script>

<style>
#conteudo{
  height: calc(100vh - 75px);
  width: 100%;
}
#area-table{
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
#area-table h2{
  width: 170px;
}
.link{
  text-decoration: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 10px;
}
</style>