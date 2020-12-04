<template>
  <main class="house-app">
    <section class="center-grid f-as-jsb column">
      <div class="head-title flex">
        <small class="head-title-visits">300+ stays</small>
        <h1 class="head-title-txt">Entire homes</h1>
        <sub-filter-inline />
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
      <!-- <div class="block f-ac-jsb column" v-if="!isLoading">
        <el-pagination layout="prev, pager, next" :total="150"> </el-pagination>
        <div class="under-paging-txt-head">
          1 – 20 of 300+ places to stay
        </div>
        <div class="under-paging-txt-bottom">
          Enter dates to see full pricing. Additional fees apply. Taxes may be
          added.
        </div>
      </div> -->
    </section>
  </main>
</template>

<script>
import houseList from '@/cmps/houseList.cmp.vue'
import appHeader from '@/cmps/appHeader.cmp.vue'
import houseFilter from '@/cmps/houseFilter.cmp.vue'
import subFilterInline from '@/cmps/subFilterInline.cmp.vue'

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
    subFilterInline,
  },
}
</script>
