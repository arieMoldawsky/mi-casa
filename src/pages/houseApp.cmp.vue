<template>
  <main class="house-app">
    <section>
      <houseFilter />
      <div class="head-title flex">
        <small class="head-title-visits">300+ stays</small>
        <h1 class="head-title-txt">Entire homes</h1>
      </div>
      <div class="sk-chase" v-if="isLoading">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
      <houseList v-if="!isLoading" :houses="houses" />
    </section>
  </main>
</template>

<script>
import houseList from '@/cmps/houseList.cmp.vue'
import appHeader from '@/cmps/appHeader.cmp.vue'
import houseFilter from '@/cmps/houseFilter.cmp.vue'

export default {
  name: 'houseApp',
  computed: {
    houses() {
      return this.$store.getters.getHouses
    },
    housesLength() {
      return this.$store.getters.getHousesLength
    },
    isLoading() {
      return this.$store.getters.getIsLoading
    },
  },
  methods: {
    updateFilter(filter) {
      this.$store.dispatch({ type: 'updateFilter', filterBy })
    },
  },
  components: {
    houseList,
    houseFilter,
    appHeader,
  },
  created() {
    this.$store.dispatch({ type: 'loadHouses' })
  },
}
</script>
