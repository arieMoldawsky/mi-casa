<template>
  <header class="main-header flex">
    <!-- <nav class="header-nav flex"> -->
    <!-- <div class="logo-navbar flex"> -->
    <router-link to="/" exact class="logo flex"
      ><i class="fas fa-house-user"></i>MiCasa</router-link
    >
    <!-- </div> -->
    <nav class="navbar-container flex">
      <div class="nav-routes flex">
        <router-link to="/house" exact class="houses-navbar"
          >Places to stay</router-link
        >
        <router-link to="/login" exact class="host-navbar"
          >Become a host</router-link
        >
        <el-row class="block-col-2">
          <el-col :span="12">
            <el-dropdown trigger="click" @command="handleCommand">
              <div class="el-dropdown-link-container">
              <div class="el-dropdown-link">
                <div class="hamburgar">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;"><g fill="none" fill-rule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg><i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <div class="profile-pic">
              <!-- <svg class="profile-pic" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: currentcolor;"><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg> -->
              </div>
              </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" command="loginModal"
                  >Login</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-plus" command="signUpModal"
                  >Sign up</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-plus" command="logoutModal"
                  >Logout</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-plus" command="helpModal"
                  >Help</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </nav>
    <!-- </nav> -->
  </header>
</template>
<script>
export default {
 
  methods: {
    handleCommand(command){
      console.log('command', command);
      if(command === 'loginModal') this.loginModal()
      else if(command === 'signUpModal') this.signUpModal()
      else this.logoutModal()
    },
    loginModal() {
      console.log('login');
      this.$router.push({query: {q: 'login'}})
      this.$store.dispatch({ type: 'modalMode', modalMode: "userForm" });
    },
    signUpModal() {
      console.log("signUp");
      this.$router.push({query: {q: 'signup'}})
      this.$store.dispatch({ type: 'modalMode', modalMode: "userForm" });
    },
    logoutModal() {
      console.log("logout");
      this.$store.dispatch({ type: 'modalMode', modalMode: "userForm" });
    },
    helpModal() {
      console.log("helpModal");
      this.$store.dispatch({ type: 'modalMode', modalMode: "helpForm" });
    }
  },
  created() {
    // console.log('created', this.loginModal());
  }
};
</script>



