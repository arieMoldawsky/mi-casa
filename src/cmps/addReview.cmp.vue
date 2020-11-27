<template>
  <section class="add-review modal-content">
    <el-form
      @submit.native.prevent="updateFilter"
      :model="review"
      size="medium"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 10 }"
        resize="none"
        placeholder="How was your stay?"
        v-model="review.txt"
      />
      <el-rate v-model="review.rating"></el-rate>
      <div>
        <el-button native-type="submit" @click="addReview">
          Add Review
        </el-button>
        <slot />
      </div>
    </el-form>
  </section>
</template>

<script>
import { type } from 'os'
export default {
  data() {
    return {
      review: {
        id: null,
        txt: null,
        rating: null,
        createdAt: Date.now(),
        user: {
          _id: null,
          fullName: null,
          imgUrl: null,
        },
      },
    }
  },
  methods: {
    addReview() {
      this.$store.dispatch({ type: 'addReview', review: this.review })
      this.$emit('closeModal')
    },
  },
  computed: {},
}
</script>
