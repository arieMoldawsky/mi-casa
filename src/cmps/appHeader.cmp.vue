<template>
<header class="main-header flex">
  <!-- <nav class="header-nav flex"> -->
    <!-- <div class="logo-navbar flex"> -->
      <router-link to="/" exact class="logo flex">MiCasa</router-link>
    <!-- </div> -->
  <nav class="navbar-container flex">
    <div class="nav-routes flex">
      <router-link to="/house" exact class="houses-navbar">Places to stay</router-link>
      <router-link to="/login" exact class="host-navbar">Become a host</router-link>
    </div>
  </nav>
  <!-- </nav> -->
</header>
</template>
<script>
export default {

}
</script>

