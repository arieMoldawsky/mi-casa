<template>
  <section class="house-chat">
    <div class="chat-window">
      <div v-for="(msg, idx) in msgs" :key="idx">
        <h3 v-if="groupMsgsByName({ msgs, msg, idx })" v-text="msg.name" />
        <span v-text="msg.text" />
      </div>
      <span v-if="remoteTyper">{{ remoteTyper }} is Typing...</span>
    </div>
    <el-form @submit.native.prevent="sendMsg">
      <el-form-item>
        <el-input v-model="newMsg.text" required @input="meIsTyping" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" native-type="submit">Send</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import socketService from '@/services/socket.service.js'

export default {
  props: {
    id: String,
  },
  data() {
    return {
      newMsg: {
        name: `User ${Math.random()}`,
        text: null,
      },
      meDeBounce: null,
      heDeBounce: null,
      remoteTyper: null,
      msgs: [],
    }
  },
  methods: {
    addMsg(msg) {
      clearTimeout(this.heDeBounce)
      this.remoteTyper = null
      this.msgs.push(msg)
    },
    loadHistory(msgs) {
      this.msgs = msgs
    },
    sendMsg(ev) {
      socketService.emit('chatAddMsg', this.newMsg)
      this.newMsg.text = null
      ev.target[0].focus()
    },
    meIsTyping() {
      if (this.meDeBounce) return
      else {
        socketService.emit('isTyping', this.newMsg.name)
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
    socketService.emit('chatTopic', this.id)
    socketService.on('chatAddMsg', msg => this.addMsg(msg))
    socketService.on('chatLoadHistory', msgs => this.loadHistory(msgs))
    socketService.on('isTyping', name => this.heIsTyping(name))
  },
  destroyed() {
    socketService.emit('chatTopic', null)
    socketService.off('chatAddMsg')
    socketService.off('chatLoadHistory')
    socketService.off('isTyping')
  }
}
</script>
