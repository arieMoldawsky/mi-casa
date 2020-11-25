<template>
  <main class="house-app main-layout">
    <appHeader />
    <houseFilter
      :filterBy="filterBy"
      :housesLength="housesLength"
      @updateFilter="updateFilter"
    />
    <div class="head-title flex">
    <small class="head-title-visits">300+ stays</small>
    <h1 class="head-title-txt">Entire homes</h1>
    </div>
    <houseList :houses="houses" />
  </main>
</template>

<script>
import houseList from '@/cmps/houseList.cmp.vue'
import appHeader from '@/cmps/appHeader.cmp.vue'
import houseFilter from '@/cmps/houseFilter.cmp.vue'

export default {
  computed: {
    houses() {
      return this.$store.getters.getHouses
    },
    housesLength() {
      return this.$store.getters.getHousesLength
    },
    filterBy() {
      return this.$store.getters.getFilterBy
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
    appHeader
  },
  created() {
    this.$store.dispatch({ type: 'loadHouses' })
  },
}
</script>
