import Vue from 'vue'
import Router from 'vue-router'
import Form from './components/Form'
import ListaUsuarios from './pages/ListarUsuarios.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Form, name: 'formulario'},
    {path: '/lista-usuarios', component: ListaUsuarios, name: 'ListaUsuarios'}
  ]
})

export default router