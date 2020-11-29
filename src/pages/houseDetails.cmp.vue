<template>
  <section>
    <appHeader />
    <div class="sk-chase" v-if="isLoading">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
    <section v-if="!isLoading" class="house-details-section">
      <h3 class="house-name">{{ house.name }}</h3>
      <div class="details-title">
        <i class="fas fa-star"></i>{{ houseRating }} ·
        <span class="house-location"
          >{{ house.location.city }}, {{ house.location.country }}</span
        >
      </div>
      <div class="imgs-container">
        <div class="main-img">
          <img :src="house.imgs[0]" alt="" />
        </div>
        <div class="secondary-imgs">
          <img
            v-for="(img, idx) in secondryImgs"
            :key="img"
            :src="secondryImgs[idx]"
            :class="`secondary-img${idx}`"
            class="ratio-square"
          />
        </div>
      </div>
      <booking-modal
        v-if="house.capacity"
        @addBooking="addBooking"
        :reviews="house.reviews"
        :capacity="house.capacity"
        :pricePN="house.price"
      ></booking-modal>
      <section class="house-desc-section">
        <div class="house-main-desc">
          <h3>{{ house.type }} hosted by {{ house.host.fullName }}</h3>
          <div class="house-capacity">Up to {{ house.capacity }} guests</div>
        </div>
        <img :src="house.host.imgUrl" />
        <p>{{ house.description }}</p>
      </section>
      <section class="amenities-section">
        <h3>Amenities</h3>
        <ul>
          <li v-for="amenity in house.amenities" :key="amenity">
            {{ amenity }}
          </li>
        </ul>
      </section>
      <el-button class="add-review-btn" @click="addReview">
        Add Review
      </el-button>
      <el-button @click="toggleChat">Chat With the Owner</el-button>
      <house-chat v-if="isChatShown" :house="house" @toggleChat="toggleChat" />
      <house-reviews :reviews="house.reviews"></house-reviews>
      <googleMap
        v-if="house.location.city"
        :location="house.location"
      ></googleMap>
    </section>
  </section>
</template>

<script>
import houseChat from '@/cmps/houseChat.cmp.vue'
import houseReviews from '../cmps/houseReviews.cmp.vue'
import appHeader from '../cmps/appHeader.cmp.vue'
import bookingModal from '../cmps/bookingModal.cmp.vue'
import googleMap from '../cmps/googleMap.cmp.vue'
import socketService from '@/services/socket.service.js'

export default {
  data() {
    return {
      isChatShown: false,
    }
  },
  methods: {
    toggleChat() {
      this.isChatShown = !this.isChatShown
    },
    backToList() {
      this.$router.push(`/`)
    },
    async onUploadImg(ev) {
      const res = await uploadImg(ev)
      console.log(res.url)
      this.house.imgUrl = res.url
      this.$store.dispatch({
        type: 'saveHouse',
        house: this.house,
      })
    },
    async addBooking(booking) {
      booking.house = { _id: this.house._id, name: this.house.name }
      const addedBooking = await this.$store.dispatch({
        type: 'addBooking',
        booking,
      })
      socketService.emit('onBookingAdded', {
        hostId: this.house.host._id,
        booking: addedBooking,
      })
      this.$notify({
        title: 'Order completed',
        message: 'Your booking had been reserved successfully',
        type: 'success',
        position: 'bottom-right',
      })
      // if (addedBooking) this.$router.push(`/`)
    },
    addReview() {
      this.$store.dispatch({ type: 'modalMode', modalMode: 'addReview' })
    },
  },
  computed: {
    house() {
      return this.$store.getters.getHouse
    },
    isLoading() {
      return this.$store.getters.getIsLoading
    },
    convertBoolean() {
      if (this.location === {}) return false
      return true
    },
    reviewsLength() {
      if (this.house.reviews) {
        return this.house.reviews.length
      }
      return 0
    },
    houseRating() {
      const format = (num, decimals) =>
        num.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      const reviews = this.house.reviews
      var ratingSum = 0
      if (reviews) {
        reviews.forEach(review => {
          ratingSum += +review.rating
        })
        return format(ratingSum / reviews.length)
      }
      return 0
    },
    secondryImgs() {
      var imgs = JSON.parse(JSON.stringify(this.house.imgs))
      if (imgs) {
        imgs.splice(0, 1)
        return imgs
      }
    },
  },
  created() {
    this.$store.dispatch({
      type: 'loadHouse',
      houseId: this.$route.params.id,
    })
    this.$store.dispatch({
      type: 'loadBookings',
      houseId: { houseId: this.$route.params.id },
    })
  },
  components: {
    houseChat,
    houseReviews,
    appHeader,
    googleMap,
    bookingModal,
  },
}
</script>
