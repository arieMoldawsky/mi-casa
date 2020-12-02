<template>
  <main class="house-app">
    <section>
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
        <!-- <div class="block" v-if="!isLoading">
          <el-pagination
              layout="prev, pager, next"
              :total="150">
            </el-pagination>
        <div class="under-paging-txt-head flex">
          1 – 20 of 300+ places to stay
        </div>
        <div class="under-paging-txt-bottom flex">
Enter dates to see full pricing. Additional fees apply. Taxes may be added.
        </div>
        </div> -->
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
}
</script>
