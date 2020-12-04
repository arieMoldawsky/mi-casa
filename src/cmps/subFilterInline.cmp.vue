<template>
  <el-form
    @submit.native.prevent="updateFilter"
    class="sub-filter-inline f-as-jfs"
    :model="filterBy"
    size="medium"
  >
    <el-popover
      placement="bottom"
      width="300"
      popper-class="filter-popper"
      class="pointer"
      trigger="click"
      :class="{'filter-active': filterBy.minPrice || filterBy.maxPrice}"
    >
      <span class="item" slot="reference">Price</span>
      <el-slider
        :value="pricesToPicker"
        @input="pricesFromPicker"
        :step="5"
        range
        :min="0"
        :max="750"
      >
      </el-slider>
      <el-input
        class="filter-input"
        type="number"
        :max="filterBy.maxPrice"
        v-model="filterBy.minPrice"
      />
      <el-input
        class="filter-input"
        type="number"
        :debounce="300"
        :min="filterBy.minPrice"
        v-model="filterBy.maxPrice"
      />
      <el-button @click="updateFilter" native-type="submit">Update</el-button>
    </el-popover>
    <el-dropdown :hide-on-click="false">
      <span class="item">
        Type
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-checkbox-group class="f-as-jsb column" v-model="filterBy.type">
            <el-checkbox label="Villa" />
            <el-checkbox label="House" />
            <el-checkbox label="Cabin" />
            <el-checkbox label="Hut" />
            <el-checkbox label="Appartment" />
          </el-checkbox-group>
        </el-dropdown-item>
        <el-button @click="updateFilter" native-type="submit">Update</el-button>
      </el-dropdown-menu>
    </el-dropdown>
    <el-popover placement="bottom" width="300" popper-class="filter-popper">
      <span class="item" slot="reference">Bedrooms</span>
    </el-popover>
    <el-dropdown :hide-on-click="false">
      <span class="item">
        Amenities
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-checkbox-group class="f-as-jsb" v-model="filterBy.amenities">
            <div class="f-as-jsb column">
              <el-checkbox label="Wifi" />
              <el-checkbox label="Kitchen" />
              <el-checkbox label="Elevator" />
              <el-checkbox label="Hair dryer" />
              <el-checkbox label="Iron" />
            </div>
            <div class="f-as-jsb column">
              <el-checkbox label="Self check-in" />
              <el-checkbox label="Air conditioning" />
              <el-checkbox label="TV" />
              <el-checkbox label="Hangers" />
              <el-checkbox label="Essentials" />
            </div>
          </el-checkbox-group>
        </el-dropdown-item>
        <el-button @click="updateFilter" native-type="submit">Update</el-button>
      </el-dropdown-menu>
    </el-dropdown>
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
    updateFilter() {
      this.$store.dispatch({ type: 'updateFilter', filterBy: this.filterBy })
    },
    pricesFromPicker(ev) {
      ev
        ? ([this.filterBy.minPrice, this.filterBy.maxPrice] = ev)
        : (this.filterBy.minPrice = this.filterBy.maxPrice = null)
    },
  },
  computed: {
    pricesToPicker() {
      return [this.filterBy.minPrice, this.filterBy.maxPrice]
    },
    getFilterBy() {
      return this.$store.getters.getFilterBy
    },
  },
  watch: {
    getFilterBy: {
      immediate: true,
      handler() {
        this.filterBy = JSON.parse(JSON.stringify(this.getFilterBy))
      },
    },
  },
}
</script>
