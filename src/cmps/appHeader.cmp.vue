<template>
  <header class="main-header main-layout" :class="homeHeader" ref="mainHeader">
    <div class="inner-container f-ac-jsb center-grid">
      <router-link to="/" exact class="logo f-ac-jsb">
        <svg
          class="head-logo-svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          style="enable-background:new 0 0 60 60;"
          xml:space="preserve"
        >
          <path
            d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M45.706,14.444L28.415,49.326  c-0.17,0.345-0.521,0.556-0.896,0.556c-0.056,0-0.112-0.005-0.169-0.015c-0.436-0.074-0.771-0.427-0.824-0.865l-1.809-14.95  L8.885,31.398c-0.434-0.072-0.769-0.419-0.826-0.854s0.175-0.857,0.574-1.041l35.761-16.412c0.383-0.177,0.84-0.091,1.135,0.213  S45.895,14.064,45.706,14.444z"
          />
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
        <span class="head-logo-txt">MiCasa</span>
      </router-link>
      <house-filter
        @addAnchor="addAnchor"
        @removeAnchor="removeAnchor"
        @expandFilter="expandFilter"
        @collapseFilter="collapseFilter"
      />

      <nav class="navbar-container flex">
        <div class="nav-routes flex">
          <router-link
            :to="{ path: `/house`, query: { txt: '' } }"
            exact
            class="houses-navbar"
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
                      <div class="notifications" v-if="unreadBookings">
                        {{ unreadBookings }}
                      </div>
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
        user: this.isLogedIn,
      })
      this.$router.push('/profile')
    },
    onDropdown() {
      this.isDropdown = !this.isDropdown
    },
    addAnchor() {
      this.$el.classList.add('anchor-in')
    },
    removeAnchor() {
      this.$el.classList.remove('anchor-in')
    },
    expandFilter() {
      this.$el.classList.add('filter-out')
    },
    collapseFilter() {
      this.$el.classList.remove('filter-out')
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
      if (this.isLogedIn) return this.isLogedIn.unreadBookings
      else return 0
    },
  },
}
</script>
