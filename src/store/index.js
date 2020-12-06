import Vue from 'vue'
import Vuex from 'vuex'
import houseStore from './house.store.js'
import bookingStore from './booking.store.js'
import userStore from './user.store.js'
import socketService from '@/services/socket.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalMode: null,
  },
  getters: {
    getModalMode({ modalMode }) {
      return modalMode
    },
  },
  mutations: {
    modalMode(state, { modalMode }) {
      state.modalMode = modalMode
    },
  },
  actions: {
    modalMode({ commit }, payload) {
      commit(payload)
    },
  },
  modules: {
    houseStore,
    bookingStore,
    userStore,
  },
})