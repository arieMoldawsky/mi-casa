<template>
  <el-form
    @submit.native.prevent="updateFilter"
    class="house-filter-container flex-centered"
    ref="form"
    :model="filterBy"
    size="medium"
  >
    <div class="form-item field flex a-start">
      <label>
        Location
      </label>
      <el-input
        placeholder="Where are you going?"
        v-model="deBounce.txt"
        @input="updateTxt"
      />
    </div>
    <div class="form-item field date-picker flex a-start">
      <label>
        Dates
      </label>
      <el-date-picker
        class="date-picker"
        popper-class="date-picker-popper"
        :value="datesToPicker"
        @input="datesFromPicker"
        format="MMM d"
        value-format="timestamp"
        type="daterange"
        range-separator=""
        start-placeholder="Check In"
        end-placeholder="Check Out"
        :clearable="false"
        :picker-options="datePickerOptions"
      />
    </div>
    <div class="form-item field flex a-start fill-parent">
      <el-popover
        class="fill-parent"
        placement="bottom"
        width="300"
        v-model="isPopVisible"
      >
        <div class="fill-parent flex a-start column" slot="reference">
          <label>
            Guests
          </label>
          <div class="flex j-space-b full-height flex j-center">
            <span class="flex a-center" v-if="filterBy.adults"> {{ filterBy.adults }} Adults </span>
            <span v-if="filterBy.kids"> {{ filterBy.kids }} Kids </span>
            <span v-if="filterBy.infants">
              {{ filterBy.infants }} Infants
            </span>
          </div>
        </div>
        <label class="flex a-center j-space-b">
          Adults
          <el-input-number
            v-model="filterBy.adults" 
            :min="0" 
            :max="16"
          />
        </label>
        <br />
        <label class="flex a-center j-space-b">
          Kids
          <el-input-number
            @change="checkAdults"
            v-model="filterBy.kids"
            :min="0"
            :max="16"
          />
        </label>
        <br />
        <label class="flex a-center j-space-b">
          Infants
          <el-input-number
            @change="checkAdults"
            v-model="filterBy.infants"
            :min="0"
            :max="16"
          />
        </label>
        <!-- <p>Are you sure to delete this?</p> -->
        <!-- <div style="text-align: right; margin: 0"> -->
        <!-- <el-button size="mini" type="text" @click="isPopVisible = false"> -->
        <!-- cancel -->
        <!-- </el-button> -->
        <!-- <el-button type="primary" size="mini" @click="isPopVisible = false"> -->
        <!-- confirm -->
        <!-- </el-button> -->
        <!-- </div> -->
      </el-popover>
    </div>
    <div class="form-item submit flex a-start">
      <button native-type="submit">
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 4; overflow: visible;"
        >
          <g fill="none">
            <path
              d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
            ></path>
          </g>
        </svg>
      </button>
    </div>

    <!-- <pre>{{ filterBy }}</pre> -->
    <!-- <label>
      Houses Per Page
      <el-select
        size="small"
        :value="filterBy.limit"
        @input="updateLimit"
      >
        <el-option
          v-for="item in filterOptions.page"
          :key="item"
          :value="item"
        />
      </el-select>
    </label> -->

    <!-- <el-button @click="updatePage(filterBy.page - 1)">previous Page</el-button>
    <el-button @click="updatePage(filterBy.page + 1)">Next Page</el-button> -->

    <!-- <el-select size="small" v-model="filterBy.category">
      <el-option
        v-for="item in filterOptions.category"
        :key="item"
        :value="item"
      />
    </el-select> -->

    <!-- <label>
      Sort By
      <el-select size="small" v-model="filterBy.sortBy">
        <el-option
          v-for="item in filterOptions.sortBy"
          :key="item"
          :value="item"
        />
      </el-select>
    </label> -->

    <!-- <el-checkbox
      size="small"
      :value="filterBy.inStock"
      @change="filterBy.inStock = !filterBy.inStock"
      label="In Stock"
      border
    /> -->
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      isPopVisible: false,
      filterBy: null,
      deBounce: {
        txt: '',
        // timer: null,
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
    getFilterBy() {
      return this.$store.getters.getFilterBy
    },
    housesLength() {
      return this.$store.getters.getHousesLength
    },
    datesToPicker() {
      return [this.filterBy.checkIn, this.filterBy.checkOut]
    },
  },
  methods: {
    datesFromPicker(ev) {
      this.filterBy.checkIn = ev[0]
      this.filterBy.checkOut = ev[1]
    },
    updatePage(newPage) {
      const isLastPage =
        newPage * this.filterBy.limit >= this.housesLength + this.filterBy.limit
      if (newPage === 0 || isLastPage) return
      this.filterBy.page = newPage
    },
    updateLimit(newLimit) {
      const isBeyondLastPage =
        newLimit * this.filterBy.page >= this.housesLength + newLimit
      if (isBeyondLastPage) this.data.filterBy.page = 1
      this.filterBy.limit = newLimit
    },
    updateTxt() {
      // clearTimeout(this.deBounce.timer)
      // this.deBounce.timer = setTimeout(() => {
      // this.filterBy.page = 1
      this.filterBy.txt = this.deBounce.txt
      // }, 300)
    },
    updateFilter() {
      this.$store.dispatch({
        type: 'updateFilter',
        filterBy: this.filterBy,
      })
      this.$store.dispatch({ type: 'loadHouses' })
      if (this.$route.path !== '/house') this.$router.push('/house')
    },
    togglePop() {
      this.isPopVisible = !this.isPopVisible
    },
    checkAdults() {
      if (!this.filterBy.adults) this.filterBy.adults = 1
    }
  },
  created() {
    this.filterBy = JSON.parse(JSON.stringify(this.getFilterBy))
  },
}
</script>
