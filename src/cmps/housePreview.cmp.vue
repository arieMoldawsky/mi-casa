<template>
  <section class="house-card flex-start column">
    <!-- <div class="house-card-container"> -->
    <img :src="house.imgs[0]" alt="" />
    <!-- <div>{{ house.imgs }}</div> -->
    <span>{{ house.reviews.rating }}</span>
    <span>{{ house.type }} · {{ house.location.city }}</span>
    <!-- <h4>{{ house.description }}</h4> -->
    <h4>${{ house.price }}</h4>
    <!-- </div> -->
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
