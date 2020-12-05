<template>
  <header
    class="main-header main-layout"
    :class="homeHeader"
    ref="mainHeader"
  >
    <div class="inner-container f-ac-jsb center-grid">
      <router-link to="/" exact class="logo f-ac-jsb">
      <svg class="head-logo-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
<path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.706,14.444L28.415,49.326  c-0.17,0.345-0.521,0.556-0.896,0.556c-0.056,0-0.112-0.005-0.169-0.015c-0.436-0.074-0.771-0.427-0.824-0.865l-1.809-14.95  L8.885,31.398c-0.434-0.072-0.769-0.419-0.826-0.854s0.175-0.857,0.574-1.041l35.761-16.412c0.383-0.177,0.84-0.091,1.135,0.213  S45.895,14.064,45.706,14.444z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
          <!-- <svg class="head-logo-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 59 59" style="enable-background:new 0 0 59 59;" xml:space="preserve">
<path d="M44.5,15c0-8.271-6.729-15-15-15s-15,6.729-15,15c0,7.934,6.195,14.431,14,14.949V58c0,0.553,0.448,1,1,1s1-0.447,1-1  V29.949C38.305,29.431,44.5,22.934,44.5,15z M24.5,15c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S26.706,15,24.5,15z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg> -->
          <!-- <svg class="head-logo-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.064 512.064" style="enable-background:new 0 0 512.064 512.064;" xml:space="preserve">
<g>
	<g>
		<path d="M482.595,1.647l-469.333,192c-19.739,8.075-16.722,36.919,4.261,40.734l220.136,40.025l40.025,220.136    c3.815,20.983,32.659,24,40.734,4.261l192-469.333C517.58,11.962,500.103-5.516,482.595,1.647z M306.592,415.024l-29.597-162.782    c-1.589-8.742-8.431-15.584-17.173-17.173L97.04,205.472L451.666,60.398L306.592,415.024z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg> -->
        <!-- <svg
          class="head-logo-svg"
          xmlns="http://www.w3.org/2000/svg"
          id="Capa_1"
          enable-background="new 0 0 512 512"
          height="512"
          viewBox="0 0 512 512"
          width="512"
        >
          <g>
            <path
              d="m35.164 383.5c23.128 40.061 89.532 32.99 134.607 21.706 12.647 44.659 39.788 106.794 86.229 106.794s73.582-62.134 86.229-106.794c44.976 11.259 111.534 18.26 134.607-21.706 23.147-40.091-16.387-94.248-48.577-127.5 32.242-33.307 71.71-87.434 48.577-127.5-23.127-40.061-89.714-32.944-134.607-21.706-12.646-44.658-39.788-106.794-86.229-106.794s-73.582 62.134-86.229 106.794c-44.878-11.234-111.477-18.36-134.607 21.706-23.147 40.091 16.386 94.246 48.577 127.5-32.242 33.306-71.71 87.433-48.577 127.5zm25.981-15c-14.121-24.459 24.434-71.274 44.233-91.733 14.6 13.078 30.814 25.941 48.291 38.303 1.959 21.309 4.978 41.791 8.985 61.002-27.534 6.892-87.384 16.896-101.509-7.572zm157.355-177.452c12.484-7.208 25.025-13.884 37.5-19.997 12.475 6.112 25.016 12.789 37.5 19.997 12.486 7.208 24.54 14.732 36.072 22.48.941 13.866 1.428 28.065 1.428 42.472s-.487 28.606-1.428 42.472c-11.532 7.748-23.586 15.272-36.072 22.48-12.484 7.208-25.025 13.884-37.5 19.997-12.475-6.112-25.016-12.789-37.5-19.997-12.486-7.208-24.54-14.732-36.072-22.48-.941-13.866-1.428-28.065-1.428-42.472s.487-28.606 1.428-42.472c11.532-7.748 23.586-15.271 36.072-22.48zm-32.205-15.693c1.454-10.652 3.2-20.998 5.225-30.97 9.655 3.219 19.499 6.873 29.468 10.939-5.839 3.14-11.672 6.385-17.488 9.743-5.824 3.363-11.559 6.797-17.205 10.288zm104.717-20.031c9.969-4.065 19.813-7.72 29.468-10.939 2.026 9.971 3.771 20.317 5.225 30.97-5.646-3.491-11.381-6.925-17.205-10.287-5.816-3.359-11.65-6.604-17.488-9.744zm69.683 80.659c8.491 6.59 16.565 13.276 24.169 20.017-7.604 6.74-15.678 13.427-24.169 20.017.199-6.628.305-13.302.305-20.017s-.106-13.389-.305-20.017zm-34.99 100.662c-1.455 10.652-3.2 20.998-5.225 30.97-9.655-3.219-19.499-6.873-29.468-10.939 5.839-3.14 11.672-6.385 17.488-9.743 5.824-3.363 11.559-6.797 17.205-10.288zm-104.717 20.031c-9.969 4.065-19.813 7.72-29.468 10.939-2.026-9.971-3.771-20.317-5.225-30.97 5.646 3.491 11.381 6.925 17.205 10.287 5.816 3.359 11.65 6.604 17.488 9.744zm-69.683-80.659c-8.491-6.59-16.565-13.276-24.169-20.017 7.604-6.74 15.678-13.427 24.169-20.017-.199 6.628-.305 13.302-.305 20.017s.106 13.389.305 20.017zm104.695 205.983c-28.341 0-49.687-57.82-57.423-85.142 18.659-6.111 37.942-13.734 57.423-22.706 19.481 8.972 38.764 16.595 57.423 22.706-7.711 27.234-29.058 85.142-57.423 85.142zm194.856-113.5c-14.126 24.467-73.979 14.463-101.509 7.572 4.007-19.211 7.026-39.693 8.985-61.002 17.477-12.362 33.691-25.226 48.291-38.303 19.774 20.434 58.358 67.266 44.233 91.733zm0-225c14.121 24.459-24.434 71.274-44.233 91.733-14.6-13.078-30.814-25.941-48.291-38.303-1.959-21.309-4.978-41.791-8.985-61.002 28.661-7.174 87.524-16.649 101.509 7.572zm-194.856-113.5c28.341 0 49.687 57.82 57.423 85.142-18.659 6.111-37.942 13.734-57.423 22.706-19.481-8.972-38.764-16.595-57.423-22.706 7.711-27.235 29.058-85.142 57.423-85.142zm-194.855 113.5c14.064-24.361 73.255-14.644 101.509-7.572-4.007 19.211-7.026 39.693-8.985 61.002-17.477 12.362-33.691 25.226-48.291 38.303-19.776-20.435-58.359-67.266-44.233-91.733z"
            />
            <path
              d="m256 301c24.813 0 45-20.187 45-45s-20.187-45-45-45-45 20.187-45 45 20.187 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"
            />
          </g>
        </svg> -->
        <span class="head-logo-txt">MiCasa</span>
      </router-link>
      <house-filter />

      <nav class="navbar-container flex">
        <div class="nav-routes flex">
          <router-link :to="{ path: `/house`, query: { txt: '' } }" exact class="houses-navbar"
            >Places to stay
          </router-link>
          <a @click="toProfile" class="host-navbar" style="cursor: pointer"
            >Become a host
          </a>
          <section>
            <el-row class="block-col-2">
              <el-col :span="12">
                <el-dropdown
                  @visible-change="onDropdown"
                  trigger="click"
                  @command="handleCommand"
                >
                  <div class="el-dropdown-link-container flex">
                    <div class="el-dropdown-link flex">
                      <div class="notifications" v-if="unreadBookings">{{unreadBookings}}</div>
                      <div :class="rotateBurger" class="hamburger flex">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style="display: block; height: 16px; width: 16px;  stroke-width: 3; overflow: visible;"
                        >
                          <g fill="none" fill-rule="nonzero">
                            <path d="m2 16h28"></path>
                            <path d="m2 24h28"></path>
                            <path d="m2 8h28"></path>
                          </g></svg
                        ><i class="el-icon-arrow-down el-icon--right"></i>
                      </div>
                      <div v-if="!isLogedIn" class="profile-pic flex">
                        <svg
                          class="profile-pic"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style="display: block; fill: currentcolor;"
                        >
                          <path
                            d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
                          ></path>
                        </svg>
                      </div>
                      <img class="profile-img" v-else :src="isLogedIn.imgUrl" />
                    </div>
                  </div>
                  <el-dropdown-menu class="hamburger-dropdown" slot="dropdown">
                    <el-dropdown-item class="houses-nav-mobile">
                      <router-link to="/house" exact>
                        Places to stay
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item class="host-nav-mobile">
                      <router-link to="/profile" exact>
                        Become a host
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="!isLogedIn" command="loginModal"
                      >Login</el-dropdown-item
                    >
                    <el-dropdown-item v-if="!isLogedIn" command="signUpModal"
                      >Sign up</el-dropdown-item
                    >
                    <el-dropdown-item v-if="isLogedIn" command="toProfile"
                      >My Profile</el-dropdown-item
                    >
                    <el-dropdown-item v-if="isLogedIn" command="logout"
                      >Logout</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </section>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import houseFilter from '@/cmps/houseFilter.cmp.vue'

export default {
  components: {
    houseFilter,
  },
  data() {
    return {
      isDropdown: false,
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'loginModal') this.loginModal()
      else if (command === 'signUpModal') this.signUpModal()
      else if (command === 'logout') this.logout()
      else if (command === 'toProfile') this.toProfile()
    },
    loginModal() {
      this.$router.push({ query: { q: 'login' } })
      this.$store.dispatch({ type: 'modalMode', modalMode: 'userForm' })
    },
    signUpModal() {
      this.$router.push({ query: { q: 'signup' } })
      this.$store.dispatch({ type: 'modalMode', modalMode: 'userForm' })
    },
    logout() {
      this.$store.dispatch({ type: 'logout' })
    },
    toProfile() {
      this.$store.dispatch({
        type: 'resetUnreadBookings',
        user: this.isLogedIn
      })
      this.$router.push('/profile')
    },
    onDropdown() {
      this.isDropdown = !this.isDropdown
    },
  },
  computed: {
    homeHeader() {
      // return { 'home-header': this.$route.path === '/' }
    },
    isLogedIn() {
      return this.$store.getters.loggedinUser
    },
    rotateBurger() {
      return { 'hamburger-logo-trans': this.isDropdown }
    },
    unreadBookings() {
      if (this.isLogedIn) return this.isLogedIn.unreadBookings;
      else return 0;
    }
  },
}
</script>
