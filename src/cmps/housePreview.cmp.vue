<template>
  <section class="house-card flex f-col pointer">
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
      <div class="card-preview-container">
          <div class="list-rating"><i class="fas fa-star"></i>{{ houseRating }} <span>({{ ratingCount }})</span></div>
          <div>{{ house.location.city }} - {{ house.type }}</div>
          <div>{{ houseDescription }}</div>
          <div><span class="house-price">${{ house.price }}</span> / night</div>
      </div>
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
          minimumFractionDigits: 1,
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
      if (this.house.description.length > 34) {
        return this.house.description.substr(0, 34) + "...";
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
