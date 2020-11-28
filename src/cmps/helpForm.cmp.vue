<template>
  <section class="login-btn modal-content">
    <p>Contact us at 1-800-800-micasa</p>
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