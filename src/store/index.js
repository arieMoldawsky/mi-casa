import Vue from 'vue'
import Vuex from 'vuex'
import houseStore from './house.store.js'
import bookingStore from './booking.store.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    houseStore,
    bookingStore
  }
})
