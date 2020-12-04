<template>
  <el-form
    v-if="filterBy"
    @submit.native.prevent="updateFilterAndRoute"
    class="house-filter-container f-as-jsb pointer"
    size="medium"
    :model="filterBy"
  >
    <section
      class="filter-screen f-as-jc column fill-parent"
      @click.stop="focusFilter"
    >
      <span>
        Start Your Search
      </span>
    </section>
    <div
      class="form-item field fill-parent j-space-e flex a-start"
      @click="$refs.location.focus()"
    >
      <label>
        Location
      </label>
      <el-input
        ref="location"
        placeholder="Where are you going?"
        :clearable="true"
        v-model="filterBy.txt"
      />
    </div>
    <div
      class="form-item field fill-parent j-space-e date-picker flex a-start"
      @click="$refs.datePicker.focus()"
    >
      <label>
        Dates
      </label>
      <el-date-picker
        ref="datePicker"
        class="date-picker"
        popper-class="date-picker-popper"
        :value="datesToPicker"
        @input="datesFromPicker"
        format="MMM d"
        value-format="timestamp"
        type="daterange"
        align="center"
        :range-separator="null"
        start-placeholder="Check In"
        end-placeholder="Check Out"
        :picker-options="datePickerOptions"
      />
    </div>
    <div class="form-item field flex a-start fill-parent j-space-e">
      <label class="guests-label">
        Guests
      </label>
      <el-popover
        class="fill-parent"
        placement="bottom"
        width="300"
        v-model="isPopVisible"
      >
        <div class="fill-parent flex a-start column" slot="reference">
          <span class="flex a-center fill-parent">
            {{ filterBy.adults + filterBy.kids + filterBy.infants }} Guests
          </span>
        </div>
        <label class="f-ac-jsb">
          Adults
          <el-input-number v-model="filterBy.adults" :min="1" :max="16" />
        </label>
        <br />
        <label class="f-ac-jsb">
          Kids
          <el-input-number v-model="filterBy.kids" :min="0" :max="16" />
        </label>
        <br />
        <label class="f-ac-jsb">
          Infants
          <el-input-number v-model="filterBy.infants" :min="0" :max="16" />
        </label>
      </el-popover>
    </div>
    <div class="form-item submit flex-centered">
      <button native-type="submit" class="flex-centered">
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
  </el-form>
</template>

<script>
import { utilService } from '@/services/util.service.js'

export default {
  data() {
    return {
      isPopVisible: false,
      filterBy: null,
      datePickerOptions: {
        disabledDate(date) {
          return date < new Date()
        },
      },
    }
  },
  computed: {
    housesLength() {
      return this.$store.getters.getHousesLength
    },
    datesToPicker() {
      return this.filterBy.checkIn || this.filterBy.checkOut
        ? [this.filterBy.checkIn, this.filterBy.checkOut]
        : []
    },
    getFilterBy() {
      return this.$store.getters.getFilterBy
    },
  },
  methods: {
    datesFromPicker(ev) {
      ev
        ? ([this.filterBy.checkIn, this.filterBy.checkOut] = ev)
        : (this.filterBy.checkIn = this.filterBy.checkOut = null)
    },
    focusFilter() {
      this.$parent.$el.classList.add('filter-out')
    },
    updateFilterAndRoute() {
      this.updateFilter()
      if (this.$route.path !== '/house')
        this.$router.push({ path: `/house`, query: { txt: '' } })
    },
    updateFilter() {
      this.$route.query.txt = this.filterBy.txt = utilService.capitalize(this.filterBy.txt)
      this.$store.dispatch({
        type: 'updateFilter',
        filterBy: this.filterBy,
      })
      this.$store.dispatch({ type: 'loadHouses' })
      this.$parent.$el.classList.remove('filter-out')
    },
    onUpdate() {
      this.filterBy = JSON.parse(JSON.stringify(this.getFilterBy))
      this.filterBy.txt = this.$route.query.txt
      this.$parent.$el.classList.remove('filter-out')
      this.$route.path === '/'
        ? this.$parent.$el.classList.remove('anchor-in')
        : this.$parent.$el.classList.add('anchor-in')
      this.updateFilter()
    },
  },
  watch: {
    $route: {
      handler() {
        this.onUpdate()
      },
    },
  },
  mounted() {
    if (document.querySelector('.header-scroll-pixel')) {
      let observer = new IntersectionObserver(entries => {
        entries[0].intersectionRatio && this.$route.path === '/'
          ? this.$parent.$el.classList.remove('anchor-in')
          : this.$parent.$el.classList.add('anchor-in')
      })
      observer.observe(document.querySelector('.header-scroll-pixel'))
    }
    document.addEventListener('scroll', ev => {
      this.$parent.$el.classList.remove('filter-out')
    })
    this.onUpdate()
  },
}
</script>
