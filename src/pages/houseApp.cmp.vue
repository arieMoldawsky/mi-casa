<template>
  <section class="house-app main-layout">
    <h1>houses</h1>
    <houseFilter
      :filterBy="filterBy"
      :housesLength="housesLength"
      @updateFilter="updateFilter"
    />
    <houseList :houses="houses" />
  </section>
</template>

<script>
import houseList from '@/cmps/houseList.cmp.vue'
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
  },
  created() {
    this.$store.dispatch({ type: 'loadHouses' })
  },
}
</script>
