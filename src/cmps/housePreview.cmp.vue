<template>
  <section class="house-card flex f-col">
    <div class="house-card-container">
      <div>{{ house.imgs }}</div>
      <h3>{{ house.reviews.rating }}</h3>
      <h3>{{ house.location.city }} - {{ house.type }}</h3>
      <h4>{{ house.description }}</h4>
      <h4>${{ house.price }}</h4>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    house: Object,
  },
  methods: {},
}
</script>
