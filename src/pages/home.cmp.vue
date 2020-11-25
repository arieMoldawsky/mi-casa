<template>
  <section class="homepage-section">
    <button @click="p">p</button>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  components: {
  },
  methods: {
    p() {
      this.$router.push(`/house/5c09`);
    }
  },
  created() {
    console.log('hii');
  }
}
</script>
