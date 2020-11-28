<template>
  <el-form
    @submit.native.prevent="isSignup ? onSignup() : onLogin()"
    class="user-form"
    ref="form"
    :model="userCred"
    size="medium"
  >
    <el-form-item v-if="isSignup">
      <el-input placeholder="User Name" v-model="userCred.username" />
    </el-form-item>
    <el-form-item>
      <el-input placeholder="Email" v-model="userCred.email" />
    </el-form-item>
    <el-form-item>
      <el-input
        placeholder="Password"
        v-model="userCred.password"
        show-password
      />
    </el-form-item>
    <el-form-item v-if="isSignup">
      <el-checkbox
        size="small"
        v-model="userCred.isAdmin"
        label="Admin?"
        border
      />
    </el-form-item>
    <el-form-item>
      <el-button v-if="isSignup" type="success" native-type="submit"
        >Sign Up</el-button
      >
      <el-button v-else type="success" native-type="submit">Log In</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      userCred: {
        fullName: null,
        email: null,
        password: null,
      },
    }
  },
  methods: {
    async onLogin() {
      try {
        const res = await this.$store.dispatch({
          type: 'login',
          userCred: this.userCred,
        })
        this.$router.push('/house')
      } catch (error) {
        console.log('Cannot Login', error)
      }
    },
    async onSignup() {
      try {
        const res = await this.$store.dispatch({
          type: 'signup',
          userCred: this.userCred,
        })
        this.$router.push('/house')
      } catch (error) {
        console.log('Cannot Sign Up', error)
      }
    },
  },
  computed: {
    isSignup() {
      return this.$route.path === '/signup'
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    isLoading() {
      return this.$store.state.isLoading
    },
  },
}
</script>
