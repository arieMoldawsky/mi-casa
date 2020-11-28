<template>
<header class="main-header flex">
  <!-- <nav class="header-nav flex"> -->
    <!-- <div class="logo-navbar flex"> -->
      <router-link to="/" exact class="logo flex"><i class="fas fa-house-user"></i>MiCasa</router-link>
    <!-- </div> -->
  <nav class="navbar-container flex">
    <div class="nav-routes flex">
      <router-link to="/house" exact class="houses-navbar">Places to stay</router-link>
      <router-link to="/login" exact class="host-navbar">Become a host</router-link>
      <span @click="toggleLogin" class="login-btn">Login/Signup</span>

    </div>
  </nav>
  <!-- </nav> -->
</header>
</template>
<script>
export default {
  methods: {
 toggleLogin() {
console.log('login');
 }
  }


}
</script>

