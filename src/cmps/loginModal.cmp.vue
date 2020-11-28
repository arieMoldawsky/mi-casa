<template>
  <section class="login-btn modal-content">
    <button @click="onLogin">Login</button>
    <button @click="onSignup">Sign up</button>
    <button @click="onLogout">Logout</button>
  </section>
</template>

<script>
import { type } from 'os'
export default {
  methods: {
    onLogin() {
      this.$emit('closeModal')
    },
    onSignup() {
      this.$emit('closeModal')
    },
    onLogout() {
      this.$emit('closeModal')
    }
  }
  
}
</script>