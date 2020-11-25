<template>
<header class="main-header flex f-col f-center full">
  <nav class="header-nav flex">
  <div class="navbar-container flex">
    <div class="logo-navbar flex">
      <router-link to="/" exact >
      <img class="logo-img" src="../assets/logo micasa.jpg">MiCasa</router-link>
    </div>
    <div class="nav-routes flex">
      <router-link to="/house" exact class="houses-navbar">Places to stay</router-link>
      <router-link to="/login" exact class="host-navbar">Become a host</router-link>
    </div>
  </div>
  </nav>
</header>
</template>
<script>
export default {

}
</script>

