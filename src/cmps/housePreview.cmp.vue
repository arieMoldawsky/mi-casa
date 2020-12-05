<template>
  <section class="house-card flex f-col pointer">
    <div class="house-card-container">
      <el-carousel
        :autoplay="false"
        trigger="click"
        @click.native="showDetails(false)"
      >
        <el-carousel-item
          v-for="(img, idx) in slideImgs"
          :key="img"
          autoplay="false"
        >
          <img
            :src="slideImgs[idx]"
            :class="`slide-imgs${idx}`"
            style="width: 100%; height: 100%"
          />
        </el-carousel-item>
      </el-carousel>
      <div class="card-preview-container" @click="showDetails(true)">
        <div class="list-rating">
          <i class="fas fa-star"></i>{{ houseRating }}
          <span>({{ ratingCount }})</span>
        </div>
        <div>{{ house.location.city }} - {{ house.type }}</div>
        <div>{{ houseDescription }}</div>
        <div>
          <span class="house-price">${{ house.price }}</span> / night
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    house: Object,
  },
  data() {
    return {
      isWideWindow: true,
    };
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
      if (this.house.description.length > 28) {
        return this.house.description.substr(0, 28) + "...";
      } else return this.house.description;
    },
    slideImgs() {
      var imgs = this.house.imgs;
      if (imgs) {
        return imgs;
      }
    },
  },
  methods: {
    showDetails(isDetails) {
      if (isDetails) this.$router.push(`/house/${this.house._id}`);
      else {
        if (this.isWideWindow) this.$router.push(`/house/${this.house._id}`);
        else return;
      }
    },
    windowSize() {
      this.isWideWindow = window.innerWidth > 700 ? true : false;
    },
  },
  created() {
    this.windowSize();
    window.addEventListener("resize", () => {
      this.windowSize();
    });
  },
};
</script>