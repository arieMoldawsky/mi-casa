<template>
  <section class="add-review">
    <el-form
      @submit.native.prevent="updateFilter"
      class="house-filter-container flex-centered"
      ref="form"
      :model="review"
      size="medium"
    >
      <div class="form-item field flex-start">
        <label>
          Location
        </label>
        <el-input
          placeholder="Where are you going?"
          v-model="deBounce.txt"
          @input="updateTxt"
        />
      </div>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      review: {
        id: null,
        txt: null,
        rating: null,
        createdAt: new Date(Date.now()).toISOString().slice(0, 10),
        user: {
          _id: null,
          fullName: null,
          imgUrl: null,
        },
      },
    }
  },
}
</script>
