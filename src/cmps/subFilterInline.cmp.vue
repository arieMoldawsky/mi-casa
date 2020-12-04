<template>
  <el-form
    @submit.native.prevent="updateFilter"
    class="sub-filter-inline f-as-jfs"
    :model="filterBy"
    size="medium"
  >
    <div class="item">Price</div>
    <div class="item">Type</div>
    <div class="item">Bedrooms</div>
    <div class="item">Amenities</div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      filterBy: null,
    }
  },
  methods: {
    updateFilter() {},
  },
  computed: {
    getFilterBy() {
      return this.$store.getters.getFilterBy
    },
  },
  created() {
    this.filterBy = JSON.parse(JSON.stringify(this.getFilterBy))
  },
}
</script>
