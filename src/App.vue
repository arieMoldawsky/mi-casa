<template>
  <div id="app">
    <modal />
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
      this.$notify({
        showClose: true,
        title: msg.title,
        message: msg.txt,
        type: msg.type,
        duration: 5000,
        dangerouslyUseHTMLString: true,
        position: 'bottom-right',
        onClick: this.$notify.closeAll
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
