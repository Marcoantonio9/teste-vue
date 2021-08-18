<template>
  <div id="app">
    <Header />
    <Form />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Form from './components/Form.vue'
export default {
  components: {Header, Form}

}
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
</style>