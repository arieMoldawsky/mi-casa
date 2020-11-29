<template>
  <!-- <section class="modal-content"> -->
    <el-form class="modal-content"
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
  <!-- </section> -->
</template>

<script>
import {utilService} from '@/services/util.service.js'

export default {
  data() {
    return {
      review: {
        id: utilService.makeId(),
        txt: null,
        rating: null,
        createdAt: Date.now(),
      },
    }
  },
  methods: {
    addReview() {
      console.log(this.user);
      this.$store.dispatch({ type: 'addReview', review: {...this.review, user: this.user} })
      this.$emit('closeModal')
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser

    }
  },
}
</script>
