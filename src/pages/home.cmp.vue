<template>
  <section class="homepage-section">
    <appHeader />
    <button @click="p">p</button>
    <button @click="houseList">houseList</button>
    <div class="hero-img">
      <h1 class="hero-title">Me Casa Su Casa</h1>
    </div>
      <div class="trending-h2 block">
      <h2>Live anywhere</h2>
      </div>
    <div class="trending-house-container flex">
      <div class="trending-house-1 flex" @click="houseList">
        <img src="../assets/trending1.jpg" />
        <h4>Entire homes</h4>
      </div>
      <div class="trending-house-2 flex" @click="houseList">
        <img src="../assets/trending2.jpg" />
        <h4>Cabins and cottages</h4>
      </div>
       <div class="trending-house-3 flex" @click="houseList">
        <img src="../assets/trending3.jpg" />
        <h4>Unique stays</h4>
      </div>
       <div class="trending-house-4 flex" @click="houseList">
        <img src="../assets/trending4.jpg" />
        <h4>Pets welcome</h4>
      </div>
    </div>
  </section>
</template>

<script>
import appHeader from "@/cmps/appHeader.cmp.vue";

export default {
  components: {
    appHeader,
  },
  methods: {
    p() {
      this.$router.push(`/house/5fbe242e3a0f7d27b2f9e20c`);
    },
    houseList() {
      this.$router.push(`/house`);
    },
  },
  created() {
    console.log("hii");
  },
};
</script>

<style>
.trending-h2 {
 margin-left: 0;
}
img {
  height: 200px;
  width: 200px;
}
</style>

