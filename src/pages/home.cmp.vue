<template>
  <section class="homepage-section">
    <div class="health-link-container">
     <a class="health-link" href="https://www.gov.il/he/departments/topics/corona-main-sub?gclid=CjwKCAiAnvj9BRA4EiwAuUMDfwqvMW-aXce0UhFerpxXrTDXyF83RoPmpQ9wdyf64GjhtbFrLMShKhoCjW8QAvD_BwE"  target="_blank">Get the latest on our COVID-19 response</a>
    </div>
    <!-- <button @click="p">p</button>
    <button @click="houseList">houseList</button> -->
    <div class="hero-container">
    <appHeader />
    <houseFilter />
      
      <pre class="hero-title flex">
Mi Casa
Su Casa
</pre>
    </div>
      <div class="trending-head block">
      <h2>Live anywhere</h2>
      </div>
    <div class="trending-house-container flex">
      <div class="trending-house-1 trending flex" @click="houseList">
        <img class="trending-house-img" src="../assets/trending1.jpg" />
        <h4>Entire homes</h4>
      </div>
      <div class="trending-house-2 trending flex" @click="houseList">
        <img class="trending-house-img" src="../assets/trending2.jpg" />
        <h4>Cabins and cottages</h4>
      </div>
       <div class="trending-house-3 trending flex" @click="houseList">
        <img class="trending-house-img" src="../assets/trending3.jpg" />
        <h4>Unique stays</h4>
      </div>
       <div class="trending-house-4 trending flex" @click="houseList">
        <img class="trending-house-img" src="../assets/trending4.jpg" />
        <h4>Pets welcome</h4>
      </div>
    </div>
  </section>
</template>

<script>
import appHeader from "@/cmps/appHeader.cmp.vue";
import houseFilter from "@/cmps/houseFilter.cmp.vue";

export default {
  components: {
    appHeader,
    houseFilter
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


.hero-img {
  /* background-image: url('@/assets/homePageBg.jpg'); */
}
</style>

