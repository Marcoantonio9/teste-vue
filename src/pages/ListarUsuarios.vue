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

    <b-modal id="modal-1" title="Editar Usuário" hide-header size="lg" ref="modal-editar" no-close-on-backdrop hide-footer>
      <div class="d-flex justify-content-between align-items-center">
        <h4>Editar Usuário</h4>
        <span @click="fecharModal">
          <i class="fas fa-times icon-fechar"></i>
        </span>
      </div>

      <b-form>
        <b-form-group label="Nome:">      
          <b-form-input
            type="text"
            placeholder="Digite seu nome"
            required     
            ref="editNome"   
            v-model="userEdit.nome"
            @input="verificacao"
          ></b-form-input>
          <small class="text-danger" v-show="validacao.nome">Preencha o Nome corretamente</small>
        </b-form-group>    

          <b-form-group class="mt-2" label="CPF:">
            <b-form-input
              type="text"              
              v-mask="'###-###-###-##'"
              maxlength="14"
              placeholder="Digite seu CPF"
              required
              ref="editCpf" 
              v-model="userEdit.cpf"  
              @input="verificacao"         
            ></b-form-input>
            <small class="text-danger" v-show="validacao.cpf">Preencha o CPF corretamente</small>
          </b-form-group>

          <b-form-group class="mt-2" label="Telefone:">      
            <b-form-input 
              class="form-control" 
              v-mask="'(##) #####-####'"
              maxlength="15"
              type="text"              
              placeholder="Digite seu Telefone"
              required
              ref="editTelefone"     
              v-model="userEdit.telefone"      
              @input="verificacao"                           
            ></b-form-input>
            <small class="text-danger" v-show="validacao.telefone">Preencha o Telefone corretamente</small>
          </b-form-group>

          <b-form-group class="mt-2" label="Email:">
            <b-form-input
              type="email"              
              placeholder="Digite seu Email"
              required
              ref="editEmail"    
              v-model="userEdit.email"     
              @input="verificacao"     
            ></b-form-input> 
            <small class="text-danger" v-show="validacao.email">Preencha o Email corretamente</small>               
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
        usuariosLocais: [
          {
          "nome": "José Andrade",
          "cpf": "040-807-572-47",
          "email": "jose@test.com.br",
          "telefone": "(11) 98765-4321"
          },
          {
          "nome": "Manoel Silva",
          "cpf": "777-975-841-92",
          "email": "manoel@test.com.br",
          "telefone": "(11) 98765-4321"
          },
          {
          "nome": "Augusto Maier",
          "cpf": "454-867-376-88",
          "email": "augusto@test.com.br",
          "telefone": "(11) 98765-4321"
          }          
        ],
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
        validacao: {
          nome: false,
          cpf: false,
          telefone: false,
          email: false
        },
        show: true,
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        saveEdit: null
      }
    },
    created(){
      if(localStorage.getItem('formularioUser') === null){
        localStorage.setItem('formularioUser', JSON.stringify(this.usuariosLocais))
        this.listaUsuarios = JSON.parse(localStorage.getItem('formularioUser'))
      }
      else if(localStorage.getItem('formularioUser') !== null){
        this.listaUsuarios = JSON.parse(localStorage.getItem('formularioUser'))
      }     
    },
    methods: {
      info(item, index) {        
        this.item = item
        this.index = index
        this.dadosUsuario = JSON.parse(localStorage.getItem('formularioUser'))[index]
        this.userEdit = this.dadosUsuario
        this.saveEdit = true

      },    
      salvarEdicao(){
        if(this.userEdit.nome === ''){
          this.validacao.nome = true
          this.$refs.editNome.focus()

        }else if(this.userEdit.cpf === '' || this.userEdit.cpf.length < 14){
          this.validacao.cpf = true
          this.$refs.editCpf.focus()

        }else if(this.userEdit.telefone === '' || this.userEdit.telefone.length < 15){
          this.validacao.telefone = true
          this.$refs.editTelefone.focus()

        }else if(this.userEdit.email === ''){
          this.validacao.email = true
          this.$refs.editEmail.focus()

        }else if(this.regex.test(this.userEdit.email) === false){
          this.validacao.email = true
          this.$refs.editEmail.focus()   

        }else{
          this.listaUsuarios[this.index] = this.userEdit        
          localStorage.setItem('formularioUser', JSON.stringify(this.listaUsuarios))                
          
          let self = this
          self.show = false          
          Vue.nextTick(function (){
            self.show = true;
          })  
          
          this.saveEdit = true
          this.$refs['modal-editar'].hide()
        }


      },
      excluir(item, index){
        let confirmar = confirm(`Excluir ${item.nome}?`)
        if(confirmar === true){
          this.listaUsuarios.splice(index, 1)
          localStorage.setItem('formularioUser', JSON.stringify(this.listaUsuarios))
        }
      },
      verificacao(){
        if(this.userEdit.nome !== ''){        
          this.validacao.nome = false
          this.saveEdit = false
        }
        if(this.userEdit.cpf !== ''){        
          this.validacao.cpf = false
          this.saveEdit = false
          
        }
        if(this.userEdit.telefone !== ''){        
          this.validacao.telefone = false
          this.saveEdit = false
          
        }
        if(this.userEdit.email !== ''){
          this.validacao.email = false
          this.saveEdit = false
        }        
      },
      fecharModal(){        
        if(this.item.nome !== this.userEdit.nome && this.saveEdit === false || this.item.cpf !== this.userEdit.cpf && this.saveEdit === false ||
          this.item.telefone !== this.userEdit.telefone && this.saveEdit === false || this.item.email !== this.userEdit.email && this.saveEdit === false
        ){          
          let confirmar = confirm('Sair sem salvar?')
          if(confirmar === true){
            this.$refs['modal-editar'].hide()
          }
        }else{
          this.$refs['modal-editar'].hide()
        }
      }
    },
  }
</script>

<style>
.icon-fechar{
  font-size: 24px;
  cursor: pointer;
}
</style>