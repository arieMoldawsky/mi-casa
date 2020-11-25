<template>
  <section class="house-filter-container">
    <button @click="updatePage(clonedFilterBy.page - 1)">previous Page</button>
    <button @click="updatePage(clonedFilterBy.page + 1)">Next Page</button>
    <el-input
      class="house-search"
      size="small"
      placeholder="Search Houses"
      v-model="deBounce.txt"
      @input="updateTxt"
    />
    <label>
      Houses Per Page
      <el-select
        size="small"
        :value="clonedFilterBy.limit"
        @input="updateLimit"
      >
        <el-option
          v-for="item in filterOptions.page"
          :key="item"
          :value="item"
        />
      </el-select>
    </label>

    <!-- <el-select size="small" v-model="clonedFilterBy.category">
      <el-option
        v-for="item in filterOptions.category"
        :key="item"
        :value="item"
      />
    </el-select> -->

    <el-select size="small" v-model="clonedFilterBy.sortBy">
      <el-option
        v-for="item in filterOptions.sortBy"
        :key="item"
        :value="item"
      />
    </el-select>

    <!-- <el-checkbox
      size="small"
      :value="clonedFilterBy.inStock"
      @change="clonedFilterBy.inStock = !clonedFilterBy.inStock"
      label="In Stock"
      border
    /> -->
    <!-- <pre>{{ clonedFilterBy }}</pre>
    <pre>{{ houses }}</pre> -->
  </section>
</template>

<script>
export default {
  props: {
    // filterBy: Array,
    // housesCount: Number,
  },
  data() {
    return {
      clonedFilterBy: null,
      deBounce: {
        txt: '',
        timer: null,
      },
      filterOptions: {
        page: [5, 10, 15, 20],
        category: ['all', 'funny', 'educational', 'adult'],
        sortBy: ['name', 'price'],
      },
    }
  },
  computed: {
    houses() {
      return this.$store.getters.getHouses
    },
    housesCount() {
      return this.$store.getters.gethousesCount
    },
  },
  methods: {
    updatePage(newPage) {
      const isLastPage =
        newPage * this.clonedFilterBy.limit >=
        this.housesCount + this.clonedFilterBy.limit
      if (newPage === 0 || isLastPage) return
      this.clonedFilterBy.page = newPage
    },
    updateLimit(newLimit) {
      const isBeyondLastPage =
        newLimit * this.clonedFilterBy.page >= this.housesCount + newLimit
      if (isBeyondLastPage) this.data.clonedFilterBy.page = 1
      this.clonedFilterBy.limit = newLimit
    },
    updateTxt() {
      clearTimeout(this.deBounce.timer)
      this.deBounce.timer = setTimeout(() => {
        this.clonedFilterBy.page = 1
        this.clonedFilterBy.txt = this.deBounce.txt
      }, 300)
    },
  },
  created() {
    this.clonedFilterBy = this.$store.getters.getFilterBy
  },
  watch: {
    clonedFilterBy: {
      deep: true,
      handler() {
        this.$store.dispatch({
          type: 'updateFilter',
          clonedFilterBy: this.clonedFilterBy,
        })
        this.$store.dispatch({ type: 'loadHouses' })
      },
    },
  },
}
</script>
