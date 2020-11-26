<template>
  <div id="app">
    
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/house">House</router-link> -->
    <!-- </div> -->
    <router-view />
    <appFooter />
  </div>
</template>

<script>
  import appFooter from '../src/cmps/appFooter.cmp'
export default {
  components: {
    appFooter
  },
}
</script>

<style lang="scss">
#app {
  text-align: center;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
