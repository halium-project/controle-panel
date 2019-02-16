<template>
  <div>
    <h1>Login Page</h1>
    <button v-on:click="login">Login</button>
  </div>
</template>

<script>

import { client, storage } from '@/utils/oauth2'
export default {
  name: 'Login',
  created: function () {
    if (storage.getSession()) {
      this.$router.push('/users')
    }
  },
  methods: {
    login: function () {
      client.startImplicitFlow()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
