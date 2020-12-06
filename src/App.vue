<template>
  <div id="app">
    <headerScrollPixel />
    <div
      class="content-wrap"
      @click="collapseFilter"
      @keyup.esc="collapseFilter"
      tabindex="0"
    >
      <appHeader ref="header" />
      <router-view class="main-layout" />
      <modal />
    </div>
    <appFooter />
  </div>
</template>

<script>
import headerScrollPixel from '../src/cmps/headerScrollPixel.cmp'
import appHeader from '../src/cmps/appHeader.cmp'
import appFooter from '../src/cmps/appFooter.cmp'
import modal from '@/cmps/modal.cmp'
import socketService from '@/services/socket.service.js'

export default {
  components: {
    headerScrollPixel,
    appHeader,
    appFooter,
    modal,
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    collapseFilter() {
      this.$refs.header.$el.classList.remove('filter-out')
    },
  },
  created() {
    socketService.setup()
    socketService.on('userMsg', msg => {
      this.$store.dispatch({
        type: 'unreadBooking',
        user: this.user,
      })
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
      socketService.terminate()
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
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 2.5rem;
}
</style>
