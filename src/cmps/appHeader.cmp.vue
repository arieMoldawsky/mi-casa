<template>
  <header class="main-header flex j-space-b" :class="homeHeader">
    <!-- <nav class="header-nav flex"> -->
    <!-- <div class="logo-navbar flex"> -->
    <router-link to="/" exact class="logo flex">
      <!-- <svg width="30" height="32" fill="currentcolor" style="display: block;">
        <path
          d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z"
        ></path>
      </svg> -->
      <svg class="head-logo-svg" xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512"><g><path d="m35.164 383.5c23.128 40.061 89.532 32.99 134.607 21.706 12.647 44.659 39.788 106.794 86.229 106.794s73.582-62.134 86.229-106.794c44.976 11.259 111.534 18.26 134.607-21.706 23.147-40.091-16.387-94.248-48.577-127.5 32.242-33.307 71.71-87.434 48.577-127.5-23.127-40.061-89.714-32.944-134.607-21.706-12.646-44.658-39.788-106.794-86.229-106.794s-73.582 62.134-86.229 106.794c-44.878-11.234-111.477-18.36-134.607 21.706-23.147 40.091 16.386 94.246 48.577 127.5-32.242 33.306-71.71 87.433-48.577 127.5zm25.981-15c-14.121-24.459 24.434-71.274 44.233-91.733 14.6 13.078 30.814 25.941 48.291 38.303 1.959 21.309 4.978 41.791 8.985 61.002-27.534 6.892-87.384 16.896-101.509-7.572zm157.355-177.452c12.484-7.208 25.025-13.884 37.5-19.997 12.475 6.112 25.016 12.789 37.5 19.997 12.486 7.208 24.54 14.732 36.072 22.48.941 13.866 1.428 28.065 1.428 42.472s-.487 28.606-1.428 42.472c-11.532 7.748-23.586 15.272-36.072 22.48-12.484 7.208-25.025 13.884-37.5 19.997-12.475-6.112-25.016-12.789-37.5-19.997-12.486-7.208-24.54-14.732-36.072-22.48-.941-13.866-1.428-28.065-1.428-42.472s.487-28.606 1.428-42.472c11.532-7.748 23.586-15.271 36.072-22.48zm-32.205-15.693c1.454-10.652 3.2-20.998 5.225-30.97 9.655 3.219 19.499 6.873 29.468 10.939-5.839 3.14-11.672 6.385-17.488 9.743-5.824 3.363-11.559 6.797-17.205 10.288zm104.717-20.031c9.969-4.065 19.813-7.72 29.468-10.939 2.026 9.971 3.771 20.317 5.225 30.97-5.646-3.491-11.381-6.925-17.205-10.287-5.816-3.359-11.65-6.604-17.488-9.744zm69.683 80.659c8.491 6.59 16.565 13.276 24.169 20.017-7.604 6.74-15.678 13.427-24.169 20.017.199-6.628.305-13.302.305-20.017s-.106-13.389-.305-20.017zm-34.99 100.662c-1.455 10.652-3.2 20.998-5.225 30.97-9.655-3.219-19.499-6.873-29.468-10.939 5.839-3.14 11.672-6.385 17.488-9.743 5.824-3.363 11.559-6.797 17.205-10.288zm-104.717 20.031c-9.969 4.065-19.813 7.72-29.468 10.939-2.026-9.971-3.771-20.317-5.225-30.97 5.646 3.491 11.381 6.925 17.205 10.287 5.816 3.359 11.65 6.604 17.488 9.744zm-69.683-80.659c-8.491-6.59-16.565-13.276-24.169-20.017 7.604-6.74 15.678-13.427 24.169-20.017-.199 6.628-.305 13.302-.305 20.017s.106 13.389.305 20.017zm104.695 205.983c-28.341 0-49.687-57.82-57.423-85.142 18.659-6.111 37.942-13.734 57.423-22.706 19.481 8.972 38.764 16.595 57.423 22.706-7.711 27.234-29.058 85.142-57.423 85.142zm194.856-113.5c-14.126 24.467-73.979 14.463-101.509 7.572 4.007-19.211 7.026-39.693 8.985-61.002 17.477-12.362 33.691-25.226 48.291-38.303 19.774 20.434 58.358 67.266 44.233 91.733zm0-225c14.121 24.459-24.434 71.274-44.233 91.733-14.6-13.078-30.814-25.941-48.291-38.303-1.959-21.309-4.978-41.791-8.985-61.002 28.661-7.174 87.524-16.649 101.509 7.572zm-194.856-113.5c28.341 0 49.687 57.82 57.423 85.142-18.659 6.111-37.942 13.734-57.423 22.706-19.481-8.972-38.764-16.595-57.423-22.706 7.711-27.235 29.058-85.142 57.423-85.142zm-194.855 113.5c14.064-24.361 73.255-14.644 101.509-7.572-4.007 19.211-7.026 39.693-8.985 61.002-17.477 12.362-33.691 25.226-48.291 38.303-19.776-20.435-58.359-67.266-44.233-91.733z"/><path d="m256 301c24.813 0 45-20.187 45-45s-20.187-45-45-45-45 20.187-45 45 20.187 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"/></g>
      </svg>
      <span class="head-logo-txt">MiCasa</span>
    </router-link>
    <!-- <i class="fas fa-house-user"></i> -->
    <!-- </div> -->
    <nav class="navbar-container flex">
      <div class="nav-routes flex">
        <router-link to="/house" exact class="houses-navbar"
          >Places to stay
        </router-link>
        <router-link to="/login" exact class="host-navbar"
          >Become a host
        </router-link>
        <el-row class="block-col-2">
          <el-col :span="12">
            <el-dropdown trigger="click" @command="handleCommand">
              <div class="el-dropdown-link-container flex">
                <div class="el-dropdown-link flex">
                  <div class="hamburgar flex">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;"
                    >
                      <g fill="none" fill-rule="nonzero">
                        <path d="m2 16h28"></path>
                        <path d="m2 24h28"></path>
                        <path d="m2 8h28"></path>
                      </g></svg
                    ><i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <div v-if="!isLogedIn" class="profile-pic flex">
                    <svg class="profile-pic" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: currentcolor;"><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
                  </div>
                    <img class="profile-img" v-else :src="isLogedIn.imgUrl" >
                </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="!isLogedIn"
                  icon="el-icon-circle-plus"
                  command="loginModal"
                  >Login</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="!isLogedIn"
                  icon="el-icon-circle-plus"
                  command="signUpModal"
                  >Sign up</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="isLogedIn"
                  icon="el-icon-circle-plus"
                  command="logoutModal"
                  >Logout</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-circle-plus" command="helpModal"
                  >Help</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </nav>
  </header>
</template>
<script>
import houseFilter from '@/cmps/houseFilter.cmp.vue'

export default {
  components: {
    houseFilter,
  },
  methods: {
    handleCommand(command) {
      console.log('command', command)
      if (command === 'loginModal') this.loginModal()
      else if (command === 'signUpModal') this.signUpModal()
      else this.logoutModal()
    },
    loginModal() {
      console.log('login')
      this.$router.push({ query: { q: 'login' } })
      this.$store.dispatch({ type: 'modalMode', modalMode: 'userForm' })
    },
    signUpModal() {
      console.log('signUp')
      this.$router.push({ query: { q: 'signup' } })
      this.$store.dispatch({ type: 'modalMode', modalMode: 'userForm' })
    },
    logoutModal() {
      console.log('logout')
      this.$store.dispatch({ type: 'modalMode', modalMode: 'userForm' })
    },
    helpModal() {
      console.log('helpModal')
      this.$store.dispatch({ type: 'modalMode', modalMode: 'helpForm' })
    },
  },
  computed: {
    homeHeader() {
      // return { 'home-header': this.$route.path === '/' }
    },
    isLogedIn() {
      return this.$store.getters.loggedinUser
    },
  },
}
</script>
