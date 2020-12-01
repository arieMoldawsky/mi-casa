<template>
  <div id="app">
    <div class="content-wrap">
    <appHeader />
    <router-view class="main-layout" />
    <modal />
  </div>
    <appFooter />
  </div>
</template>

<script>
import appHeader from '../src/cmps/appHeader.cmp'
import appFooter from '../src/cmps/appFooter.cmp'
import modal from '@/cmps/modal.cmp'
import socketService from '@/services/socket.service.js'

export default {
  components: {
    appHeader,
    appFooter,
    modal,
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
        onClick: this.$notify.closeAll,
      })
    })
    window.onbeforeunload = () => {
      this.$store.dispatch({ type: 'onAppDestroyed' })
    }
  },
}
</script>

<style lang="scss">

html {
  min-height: 100vh;
  overflow: auto;
}

#app {
  // text-align: center;
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 2.5rem;
}
</style>
