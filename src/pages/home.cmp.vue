<template>
  <section class="homepage-section">
    
    <button @click="p">p</button>
    <button @click="houseList">houseList</button>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
  },
  methods: {
    p() {
      this.$router.push(`/house/5fbe242e3a0f7d27b2f9e20c`);
    },
    houseList() {
      this.$router.push(`/house`);
    }

  },
  created() {
    console.log('hii');
  }
}
</script>
