<template>
  <!-- <section class="house-filter-container flex"> -->
  <el-form
    @submit.native.prevent="updateFilter"
    class="house-filter-container flex-centered"
    ref="form"
    :model="clonedFilterBy"
    size="medium"
  >
    <div class="form-item flex-start">
      <label>
        Location
      </label>
      <el-input
        placeholder="Where are you going?"
        v-model="deBounce.txt"
        @input="updateTxt"
      />
    </div>
    <div class="form-item date-picker flex-start">
      <label>
        Dates
      </label>
        <el-date-picker
          class="date-picker"
          popper-class="date-picker-popper"
          :value="datesToPicker"
          @input="datesFromPicker"
          format="MMM d"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator=""
          start-placeholder="Check In"
          end-placeholder="Check Out"
          :clearable="false"
          :picker-options="datePickerOptions"
        />
    </div>
    <div class="form-item flex-start">
      <label>
        Guests
      </label>
        <el-input-number v-model="clonedFilterBy.capacity" :min="1" :max="16" />
    </div>
    <div class="form-item flex-start">
      <el-button type="success" native-type="submit">Search</el-button>
    </div>

    <!-- <pre>{{ clonedFilterBy }}</pre> -->
    <!-- <label>
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
    </label> -->

    <!-- <el-button @click="updatePage(clonedFilterBy.page - 1)">previous Page</el-button>
    <el-button @click="updatePage(clonedFilterBy.page + 1)">Next Page</el-button> -->

    <!-- <el-select size="small" v-model="clonedFilterBy.category">
      <el-option
        v-for="item in filterOptions.category"
        :key="item"
        :value="item"
      />
    </el-select> -->

    <!-- <label>
      Sort By
      <el-select size="small" v-model="clonedFilterBy.sortBy">
        <el-option
          v-for="item in filterOptions.sortBy"
          :key="item"
          :value="item"
        />
      </el-select>
    </label> -->

    <!-- <el-checkbox
      size="small"
      :value="clonedFilterBy.inStock"
      @change="clonedFilterBy.inStock = !clonedFilterBy.inStock"
      label="In Stock"
      border
    /> -->
  </el-form>

  <!-- </section> -->
</template>

<script>
export default {
  props: {
    filterBy: Object,
    housesLength: Number,
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
        sortBy: ['name', 'price'],
      },
      datePickerOptions: {
        disabledDate(date) {
          return date < new Date()
        },
      },
    }
  },
  computed: {
    datesToPicker() {
      return [this.clonedFilterBy.checkIn, this.clonedFilterBy.checkOut]
    },
  },
  methods: {
    datesFromPicker(ev) {
      this.clonedFilterBy.checkIn = ev[0]
      this.clonedFilterBy.checkOut = ev[1]
    },
    updatePage(newPage) {
      const isLastPage =
        newPage * this.clonedFilterBy.limit >=
        this.housesLength + this.clonedFilterBy.limit
      if (newPage === 0 || isLastPage) return
      this.clonedFilterBy.page = newPage
    },
    updateLimit(newLimit) {
      const isBeyondLastPage =
        newLimit * this.clonedFilterBy.page >= this.housesLength + newLimit
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
    updateFilter() {
      this.$store.dispatch({
        type: 'updateFilter',
        clonedFilterBy: this.clonedFilterBy,
      })
      this.$store.dispatch({ type: 'loadHouses' })
    },
  },
  created() {
    this.clonedFilterBy = JSON.parse(JSON.stringify(this.filterBy))
  },
}
</script>
