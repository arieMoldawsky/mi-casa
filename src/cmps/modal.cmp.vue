<template>
  <section
    @click="closeModal"
    :class="{ hidden: !modalMode }"
    class="modal-container"
  >
    <component
      :is="modalMode"
      :class="{ hidden: !modalMode }"
      @click.native.stop
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
import appHeader from '@/cmps/appHeader.cmp'

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
