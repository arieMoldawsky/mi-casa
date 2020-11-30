import userService from '../services/user.service.js'
import { houseService } from '@/services/house.service.js'
import { bookingService } from '@/services/booking.service.js'
import socketService from '../services/socket.service.js'

var localLoggedinUser = null
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user)

export default {
  state: {
    loggedinUser: localLoggedinUser,
    // userHouses: null
    // users: [],
  },
  getters: {
    users(state) {
      return state.users
    },
    loggedinUser(state) {
      return state.loggedinUser
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user
    },
    setUsers(state, { users }) {
      state.users = users
    },
    removeUser(state, { userId }) {
      state.users = state.users.filter(user => user._id !== userId)
    },
    login(state, { user }) {
      state.users.push(user)
    },
  },
  actions: {
    async login(context, { userCred }) {
      try {
        const user = await userService.login(userCred)
        context.commit({ type: 'setUser', user })
        context.dispatch({ type: 'loadUserHouses', hostId: user._id })
        socketService.emit('onUserLogin', user._id)
        return user
      } catch (err) {
        console.error('Could not log In user: ', userCred.email, err)
      }
    },
    async signup(context, { userCred }) {
      try {
        const user = await userService.signup(userCred)
        context.commit({ type: 'setUser', user })
        return user
      } catch (err) {
        console.error('Could not sign Up: ', err)
      }
    },
    async logout(context) {
      try {
        await userService.logout()
        context.commit({ type: 'setUsers', users: [] })
        context.commit({ type: 'setUser', user: null })
      } catch (err) {
        console.error('Could not log Out: ', err)
      }
    },
    async loadUsers(context) {
      try {
        const users = await userService.getUsers()
        context.commit({ type: 'setUsers', users })
      } catch (err) {
        console.error('Could not load users: ', err)
      }
    },
    async removeUser(context, { userId }) {
      try {
        await userService.remove(userId)
        context.commit({ type: 'removeUser', userId })
      } catch (err) {
        console.error('Could not remove user: ', err)
      }
    },
    async updateUser(context, { user }) {
      try {
        const resUser = await userService.update(user)
        context.commit({ type: 'setUser', user: resUser })
      } catch (err) {
        console.error('Could not update user: ', err)
      }
    },
    async loadUserData(context, { hostId }) {
      try {
        const { houses } = await houseService.query({ hostId })
        const userBookings = await Promise.all(
          houses.map(house => bookingService.query({ houseId: house._id }))
        )
        return { userHouses: houses, userBookings }
      } catch (err) {
        console.error('Could not load user data: ', err)
      }
    },
  },
}
