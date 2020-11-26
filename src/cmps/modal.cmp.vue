<template>
  <section v-if="modalMode" class="modal-container">
    <component :is="modalMode">
      <slot>
        <el-button @click="closeModal"/>
      </slot>
    </component>
  </section>
</template>

<script>
import addReview from '@/cmps/addReview.cmp'

export default {
  data() {
    return {
    //   isModalOpen: false,
    }
  },
  components: {
    addReview,
  },
  computed: {
    modalMode() {
      return this.$store.getters.getModalMode
    },
  },
  methods: {
      closeModal() {
          this.$store.dispatch({type: 'modalMode', modalMode: null})
      }
  }
}
</script>
