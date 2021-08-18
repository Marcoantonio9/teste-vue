<template>
  <div>
    <b-table :items="listaUsuarios" :fields="fields" striped responsive="sm" v-if="show">
      <template #cell(editar)="row">
        <b-button 
          size="md" 
          @click="info(row.item, row.index, $event.target)" 
          v-b-modal.modal-1 
          class="mr-2" 
          variant="outline-primary"
          >
          Editar
        </b-button>
      </template>

      <template #cell(exluir)="row">
        <b-button size="md" @click="excluir(row.item, row.index, $event.target)" class="mr-2" variant="outline-danger">
          Exluir
        </b-button>

      </template>      
    </b-table>

    <b-modal id="modal-1" title="Editar Usuário" size="lg" ref="modal-editar" no-close-on-backdrop hide-footer>
      <b-form>
        <b-form-group
          label="Nome:"
        >
          <b-form-input
            type="text"
            placeholder="Digite seu nome"
            required     
            ref="userNome"   
            v-model="userEdit.nome"
          ></b-form-input>
          <small class="text-danger">Preencha o Nome corretamente</small>
        </b-form-group>    

          <b-form-group
            class="mt-2"
            label="CPF:"
          >
            <b-form-input
              type="text"              
              v-mask="'###-###-###-##'"
              placeholder="Digite seu CPF"
              required
              ref="userCpf" 
              v-model="userEdit.cpf"             
            ></b-form-input>
            <small class="text-danger">Preencha o CPF corretamente</small>
          </b-form-group>

          <b-form-group
            class="mt-2"
            label="Telefone:"
          >      
            <b-form-input 
              class="form-control" 
              v-mask="'(##) ####-####'"
              type="text"              
              placeholder="Digite seu Telefone"
              required
              ref="userTelefone"     
              v-model="userEdit.telefone"                                 
            ></b-form-input>
            <small class="text-danger">Preencha o Telefone corretamente</small>
          </b-form-group>

          <b-form-group
            class="mt-2"
            label="Email:"
          >
            <b-form-input
              type="email"              
              placeholder="Digite seu Email"
              required
              ref="userEmail"    
              v-model="userEdit.email"          
            ></b-form-input> 
            <small class="text-danger">Preencha o Email corretamente</small>               
          </b-form-group>        
          
          <div class="d-flex justify-content-center mt-4 mb-4">
            <b-button variant="outline-primary" @click="salvarEdicao">Salvar</b-button>
          </div>
      </b-form>
    </b-modal>    
  </div>
</template>

<script>
import Vue from 'vue'
  export default {
    data() {
      return {
        listaUsuarios: [],
        fields: ['nome', 'cpf','telefone', 'email', 'editar', 'exluir'],
        userEdit: {
          nome: '',
          cpf: '',
          telefone: '',
          email: ''
        },
        dadosUsuario: '',
        item: '',
        index: '',
        show: true
      }
    },
    created(){
      if(localStorage.getItem('formularioUser') !== null){
        this.listaUsuarios = JSON.parse(localStorage.getItem('formularioUser'))
      }     
    },
    methods: {
      info(item, index) {        
        this.item = item
        this.index = index
        this.dadosUsuario = JSON.parse(localStorage.getItem('formularioUser'))[index]
        this.userEdit = this.dadosUsuario

      },    
      salvarEdicao(){
        this.listaUsuarios[this.index] = this.userEdit
        console.log(this.listaUsuarios[this.index])
        localStorage.setItem('formularioUser', JSON.stringify(this.listaUsuarios))                
        
        let self = this
        self.show = false
        

        Vue.nextTick(function (){
          self.show = true;
        })  
        
        this.$refs['modal-editar'].hide()
      },
      excluir(item, index){
        let confirmar = confirm(`Excluir ${item.nome}?`)
        if(confirmar === true){
          this.listaUsuarios.splice(index, 1)

          localStorage.setItem('formularioUser', JSON.stringify(this.listaUsuarios))
        }
      } 
    },
  }
</script>