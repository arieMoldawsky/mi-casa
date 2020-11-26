<template>
  <section class="house-card flex f-col">
    <!-- <div class="house-card-container"> -->
      <!-- Slideshow container -->

  <div class="block">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item>
          <img
            v-for="(img, idx) in slideImgs"
            :key="img"
            :src="slideImgs[idx]"
            :class="`slide-imgs${idx}`"
            style="width: 100%"
          />
      </el-carousel-item>
    </el-carousel>
  </div>
      <!-- <div>{{house.imgs[0]}}</div> -->
      <h3>⭐{{ houseRating }} ({{ ratingCount }})</h3>
      <h3>{{ house.location.city }} - {{ house.type }}</h3>
      <h4>{{ houseDescription }}</h4>
      <h4>${{ house.price }} / night</h4>
  </section>
</template>

<script>
  

export default {
  props: {
    house: Object
  },
 
  computed: {
    houseRating() {
      const format = (num, decimals) =>
        num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      const reviews = this.house.reviews;
      var ratingSum = 0;
      if (reviews) {
        reviews.forEach((review) => {
          ratingSum += +review.rating;
        });
        return format(ratingSum / reviews.length);
      }
      return 0;
    },
    ratingCount() {
      return Math.floor(Math.random() * 100) + 1;
    },
    houseDescription() {
      if (this.house.description.length > 40) {
        return this.house.description.substr(0, 40) + "...";
      } else return this.house.description;
    },
    slideImgs() {
      var imgs = this.house.imgs;
      if (imgs) {
        imgs.splice(0, 1);
        return imgs;
      }
    },
   
  },
};

</script>
