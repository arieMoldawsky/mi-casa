<template>
  <section class="house-card flex f-col">
    <div class="house-card-container">
      <div class="el-carousel-img block">
        <el-carousel :autoplay="false" trigger="click" height="200px">
          <el-carousel-item v-for="(img, idx) in slideImgs" :key="img" autoplay="false">
                <img :src="slideImgs[idx]"
                :class="`slide-imgs${idx}`"
                style="width: 100%" />
              
          </el-carousel-item>
        </el-carousel>
      </div>
      <h3><i class="fas fa-star"></i>{{ houseRating }} ({{ ratingCount }})</h3>
      <h3>{{ house.location.city }} - {{ house.type }}</h3>
      <h4>{{ houseDescription }}</h4>
      <h4><span class="house-price">${{ house.price }}</span> / night</h4>
  </div>
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
      if (this.house.description.length > 26) {
        return this.house.description.substr(0, 26) + "...";
      } else return this.house.description;
    },
    slideImgs() {
      var imgs = this.house.imgs;
      if (imgs) {
        return imgs;
      }
    },
   
  },
};

</script>
