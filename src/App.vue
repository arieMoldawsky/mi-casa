<template>
  <div id="app">
    <modal />
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/house">House</router-link> -->
    <!-- </div> -->
    <router-view />
    <appFooter />
  </div>
</template>

<script>
import modal from '@/cmps/modal.cmp'
import appFooter from '../src/cmps/appFooter.cmp'
import socketService from '@/services/socket.service.js'

export default {
  components: {
    modal,
    appFooter,
  },
  created() {
    socketService.setup()
      socketService.on('userMsg', msg => {
        this.$message({
          showClose: true,
          message: msg.txt,
          type: msg.type,
        })
      })
    window.onbeforeunload = () => {
      this.$store.dispatch({ type: 'onAppDestroyed' })
    }
  },
}
</script>

<style lang="scss">
#app {
  text-align: center;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
