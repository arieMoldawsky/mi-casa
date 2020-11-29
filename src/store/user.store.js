import userService from '../services/user.service.js'
import socketService from '../services/socket.service.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        loggedinUser : localLoggedinUser,
        // loggedinUser: {
        //     fullName: "Orly Amdadi",
        //     email: "orly@amdadi.com",
        //     password: "123",
        //     imgUrl: "https://randomuser.me/api/portraits/women/90.jpg",
        //     langs: "Hebrew, English",
        //     description: "lorem"
        // },
        users: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
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
            const user = await userService.login(userCred);
            context.commit({ type: 'setUser', user })
            socketService.emit('onUserLogin', user._id)
            return user;
        },
        async signup(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: null })
        },
        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({ type: 'setUsers', users })
        },
        async removeUser(context, { userId }) {
            await userService.remove(userId);
            context.commit({ type: 'removeUser', userId })
        },
        async updateUser(context, { user }) {
            user = await userService.update(user);
            context.commit({ type: 'setUser', user })
        }
    }
}