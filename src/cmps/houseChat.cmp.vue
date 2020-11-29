<template>
  <section class="house-chat flex column">
    <div class="chat-header pointer full-width flex a-center j-space-b" @click="hideChat">
      <h3>{{house.name}}</h3>
      <el-button>X</el-button>
    </div>
    <div class="chat-window fill-parent">
      <div v-for="(msg, idx) in msgs" :key="idx">
        <h3 v-if="groupMsgsByName({ msgs, msg, idx })" v-text="msg.name" />
        <span v-text="msg.txt" />
      </div>
      <span v-if="remoteTyper">{{ remoteTyper }} is Typing...</span>
    </div>
    <el-form
      class="full-width flex a-end"
      @submit.native.prevent="sendMsg"
    >
      <el-input
        class="full-width"
        v-model="newMsg.txt"
        placeholder="Aa"
        @input="meIsTyping"
      />
      <el-button native-type="submit">Send</el-button>
    </el-form>
  </section>
</template>

<script>
import socketService from '@/services/socket.service.js'

export default {
  props: {
    house: Object,
  },
  data() {
    return {
      newMsg: {
        name: `User ${Math.random()}`,
        txt: null,
      },
      meDeBounce: null,
      heDeBounce: null,
      remoteTyper: null,
      msgs: [],
    }
  },
  methods: {
    hideChat() {
      this.$emit('toggleChat')
    },
    addMsg(msg) {
      clearTimeout(this.heDeBounce)
      this.remoteTyper = null
      this.msgs.push(msg)
    },
    loadHistory(msgs) {
      this.msgs = msgs
    },
    sendMsg(ev) {
      if (!this.newMsg.txt) return
      socketService.emit('onChatMsg', this.newMsg)
      this.newMsg.txt = null
      ev.target[0].focus()
    },
    meIsTyping() {
      if (this.meDeBounce) return
      else {
        socketService.emit('onIsTyping', this.newMsg.name)
        this.meDeBounce = setTimeout(() => {
          this.meDeBounce = null
        }, 500)
      }
    },
    heIsTyping(name) {
      if (name === this.newMsg.name) return
      if (this.heDeBounce) clearTimeout(this.heDeBounce)
      this.remoteTyper = name
      this.heDeBounce = setTimeout(() => {
        this.remoteTyper = null
      }, 1500)
    },
    groupMsgsByName({ msgs, msg, idx }) {
      return !idx || msgs[idx - 1].name !== msg.name ? msg.name : null
    },
  },
  created() {
    socketService.emit('onJoinHouseChat', this.house.id)
    socketService.on('chatMsg', msg => this.addMsg(msg))
    socketService.on('chatLoadHistory', msgs => this.loadHistory(msgs))
    socketService.on('isTyping', name => this.heIsTyping(name))
  },
  destroyed() {
    socketService.emit('onLeaveHouseChat')
    socketService.off('chatMsg')
    socketService.off('chatLoadHistory')
    socketService.off('isTyping')
  },
}
</script>
