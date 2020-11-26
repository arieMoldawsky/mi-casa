<template>
  <section :class="{ hidden: !modalMode }" class="modal-container">
    <component
      :is="modalMode"
      :class="{ hidden: !modalMode }"
      @closeModal="closeModal"
    >
      <slot>
        <el-button @click="closeModal">Cancel</el-button>
      </slot>
    </component>
  </section>
</template>

<script>
import addReview from '@/cmps/addReview.cmp'

export default {
  components: {
    addReview,
  },
  computed: {
    modalMode() {
      return this.$store.getters.getModalMode
    },
    scrollFreeze() {},
  },
  methods: {
    closeModal() {
      this.$store.dispatch({ type: 'modalMode', modalMode: null })
    },
  },
}
</script>
