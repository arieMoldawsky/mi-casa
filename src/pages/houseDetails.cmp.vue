<template>
  <main class="house-details">
    <section class="center-grid">
      <div class="sk-chase" v-if="isLoading">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
      <section v-else class="house-details-section">
        <h3 class="house-name">{{ house.name }}</h3>
        <div class="details-title">
          <i class="fas fa-star"></i>{{ houseRating }} ·
          <span class="house-location"
            >{{ house.location.city }}, {{ house.location.country }}</span
          >
        </div>
        <div v-if="isWideWindow" class="imgs-container">
          <img
            v-for="(img, idx) in house.imgs"
            :key="img"
            :src="img"
            :class="`img${idx}`"
          />
        </div>
        <el-carousel v-else :autoplay="true" :interval="4000" trigger="click">
          <el-carousel-item
            v-for="(img, idx) in house.imgs"
            :key="img"
            autoplay="false"
          >
            <img :src="img" :class="`slide-imgs${idx}`" style="width: 100%" />
          </el-carousel-item>
        </el-carousel>
        <div class="booking-modal-container">
          <div class="main-desc-amenities-container">
            <section class="house-desc-section">
              <div class="house-main-desc">
                <h3>{{ house.type }} hosted by {{ house.host.fullName }}</h3>
                <div class="house-capacity">
                  Up to {{ house.capacity }} guests
                </div>
              </div>
              <img :src="house.host.imgUrl" />
              <p>{{ house.description }}</p>
            </section>
            <section class="amenities-section">
              <h3>Amenities</h3>
              <ul>
                <li v-for="(amenity, idx) in house.amenities" :key="amenity">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style="
                      display: unset;
                      height: 24px;
                      width: 24px;
                      fill: currentcolor;
                      margin-right: 3px;
                    "
                  >
                    <path :d="amenityIcons[idx]"></path>
                  </svg>
                  {{ amenity }}
                </li>
              </ul>
            </section>
          </div>
          <booking-modal
            v-if="house.capacity"
            @addBooking="addBooking"
            :reviews="house.reviews"
            :capacity="house.capacity"
            :pricePN="house.price"
          ></booking-modal>
        </div>
        <el-button class="add-review-btn" @click="addReview">
          Add Review
        </el-button>
        <el-button class="open-chat-btn" @click="toggleChat"
          >Chat With the Host</el-button
        >
        <house-chat
          v-if="isChatShown"
          :house="house"
          @toggleChat="toggleChat"
        />
        <house-reviews :reviews="house.reviews"></house-reviews>
        <googleMap
          v-if="house.location.city"
          :location="house.location"
        ></googleMap>
      </section>
    </section>
  </main>
</template>

<script>
import houseChat from '@/cmps/houseChat.cmp.vue'
import houseFilter from '@/cmps/houseFilter.cmp.vue'
import houseReviews from '../cmps/houseReviews.cmp.vue'
import bookingModal from '../cmps/bookingModal.cmp.vue'
import googleMap from '../cmps/googleMap.cmp.vue'
import socketService from '@/services/socket.service.js'

export default {
  data() {
    return {
      isChatShown: false,
      isWideWindow: false,
      amenityIcons: [
        'M16 20a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-7a9 9 0 0 1 8.043 4.958L22.53 21.47a7.003 7.003 0 0 0-13.058 0l-1.514-1.514A9 9 0 0 1 16 15zm0-5c4.89 0 9.193 2.506 11.697 6.304l-1.45 1.45A11.993 11.993 0 0 0 16 12c-4.339 0-8.14 2.302-10.247 5.752l-1.45-1.449A13.987 13.987 0 0 1 16 10zm0-5c6.267 0 11.826 3.034 15.286 7.714l-1.432 1.432C26.773 9.821 21.716 7 16 7 10.285 7 5.228 9.82 2.146 14.145L.714 12.714C4.174 8.034 9.733 5 16 5z',
        'M 25 1 a 2 2 0 0 1 1.995 1.85 L 27 3 l -0.001 26 H 29 v 2 H 3 v -2 h 1.999 L 5 3 a 2 2 0 0 1 1.85 -1.995 L 7 1 Z m -4 2 H 7 l -0.001 26 H 21 Z m 4 0 h -2 v 26 h 1.999 Z m -7 12 a 1 1 0 1 1 0 2 a 1 1 0 0 1 0 -2 Z',
        'M26 1a5 5 0 0 1 5 5c0 6.389-1.592 13.187-4 14.693V31h-2V20.694c-2.364-1.478-3.942-8.062-3.998-14.349L21 6l.005-.217A5 5 0 0 1 26 1zm-9 0v18.118c2.317.557 4 3.01 4 5.882 0 3.27-2.183 6-5 6s-5-2.73-5-6c0-2.872 1.683-5.326 4-5.882V1zM2 1h1c4.47 0 6.934 6.365 6.999 18.505L10 21H3.999L4 31H2zm14 20c-1.602 0-3 1.748-3 4s1.398 4 3 4 3-1.748 3-4-1.398-4-3-4zM4 3.239V19h3.995l-.017-.964-.027-.949C7.673 9.157 6.235 4.623 4.224 3.364l-.12-.07zm19.005 2.585L23 6l.002.31c.045 4.321 1.031 9.133 1.999 11.39V3.17a3.002 3.002 0 0 0-1.996 2.654zm3.996-2.653v14.526C27.99 15.387 29 10.4 29 6a3.001 3.001 0 0 0-2-2.829z',
        'M 17 1 v 4.03 l 4.026 -2.324 l 1 1.732 L 17 7.339 v 6.928 l 6 -3.464 V 5 h 2 v 4.648 l 3.49 -2.014 l 1 1.732 L 26 11.381 l 4.026 2.325 l -1 1.732 L 24 12.535 l -6 3.464 l 6 3.465 l 5.026 -2.902 l 1 1.732 L 26 20.618 l 3.49 2.016 l -1 1.732 L 25 22.351 V 27 h -2 v -5.804 l -6 -3.465 v 6.929 l 5.026 2.902 l -1 1.732 L 17 26.97 V 31 h -2 v -4.031 l -4.026 2.325 l -1 -1.732 L 15 24.66 v -6.929 l -6 3.464 V 27 H 7 v -4.65 l -3.49 2.016 l -1 -1.732 l 3.489 -2.016 l -4.025 -2.324 l 1 -1.732 l 5.025 2.901 l 6 -3.464 l -6 -3.464 l -5.025 2.903 l -1 -1.732 L 6 11.38 L 2.51 9.366 l 1 -1.732 L 7 9.648 V 5 h 2 v 5.803 l 6 3.464 V 7.339 L 9.974 4.438 l 1 -1.732 L 15 5.03 V 1 Z',
        'M 30 1 a 1 1 0 0 1 0.993 0.883 L 31 2 v 28 a 1 1 0 0 1 -0.883 0.993 L 30 31 H 2 a 1 1 0 0 1 -0.993 -0.883 L 1 30 V 2 a 1 1 0 0 1 0.883 -0.993 L 2 1 Z M 3 3 v 26 h 12 V 3 Z m 7 9 v 6.585 l 1.793 -1.792 l 1.414 1.414 l -3.5 3.5 a 1 1 0 0 1 -1.32 0.083 l -0.094 -0.083 l -3.5 -3.5 l 1.414 -1.414 L 8 18.585 V 12 Z m 12.387 -1.497 a 1 1 0 0 1 1.226 0 l 0.094 0.083 l 3.5 3.5 l -1.414 1.414 L 24 13.707 V 20 h -2 v -6.293 L 20.207 15.5 l -1.414 -1.414 l 3.5 -3.5 Z M 17 29 h 12 V 3 H 17 Z',
        'M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z',
        'M14 27l-.005.2a4 4 0 0 1-3.789 3.795L10 31H4v-2h6l.15-.005a2 2 0 0 0 1.844-1.838L12 27zM10 1c.536 0 1.067.047 1.58.138l.38.077 17.448 3.64a2 2 0 0 1 1.585 1.792l.007.166v6.374a2 2 0 0 1-1.431 1.917l-.16.04-13.554 2.826 1.767 6.506a2 2 0 0 1-1.753 2.516l-.177.008H11.76a2 2 0 0 1-1.879-1.315l-.048-.15-1.88-6.769A9 9 0 0 1 10 1zm5.692 24l-1.799-6.621-1.806.378a8.998 8.998 0 0 1-1.663.233l-.331.008L11.76 25zM10 3a7 7 0 1 0 1.32 13.875l.331-.07L29 13.187V6.813L11.538 3.169A7.027 7.027 0 0 0 10 3zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
        'M16 2a5 5 0 0 1 1.661 9.717 1.002 1.002 0 0 0-.653.816l-.008.126v.813l13.23 9.052a3 3 0 0 1 1.299 2.279l.006.197a3 3 0 0 1-3 3H3.465a3 3 0 0 1-1.694-5.476L15 13.472v-.813c0-1.211.724-2.285 1.816-2.757l.176-.07a3 3 0 1 0-3.987-3.008L13 7h-2a5 5 0 0 1 5-5zm0 13.211L2.9 24.175A1 1 0 0 0 3.465 26h25.07a1 1 0 0 0 .565-1.825z',
        'M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.027 3l.308.004a12.493 12.493 0 0 1 11.817 9.48l.07.3 1.73 7.782.027.144a2 2 0 0 1-1.83 2.285L28 23H2.247l-.15-.005a2 2 0 0 1-1.844-1.838L.247 21v-7l.004-.217a5 5 0 0 1 4.773-4.778L5.247 9h9V5h-14V3zm11.528 16H2.245l.002 2H28zM16.247 5.002V11h-11l-.177.005a3 3 0 0 0-2.818 2.819L2.247 14l-.001 3H27.11l-.84-3.783-.067-.28a10.494 10.494 0 0 0-9.596-7.921l-.292-.012z',
        'M 11 1 v 7 l 1.898 20.819 l 0.007 0.174 c -0.025 1.069 -0.804 1.907 -1.818 1.999 a 2 2 0 0 1 -0.181 0.008 h -7.81 l -0.174 -0.008 C 1.86 30.87 1.096 30.018 1.096 29 l 0.002 -0.09 l 1.907 -21 L 3.001 1 Z m 6 0 l 0.15 0.005 a 2 2 0 0 1 1.844 1.838 L 19 3 v 7.123 l -2 8 V 31 h -2 V 18.123 l 0.007 -0.163 l 0.02 -0.162 l 0.033 -0.16 L 16.719 11 H 13 V 1 Z m 11 0 a 2 2 0 0 1 1.995 1.85 L 30 3 v 26 a 2 2 0 0 1 -1.85 1.995 L 28 31 h -7 v -2 h 7 v -2 h -7 v -2 h 7 v -2 h -7 v -2 h 7 v -2 h -7 v -2 h 7 v -2 h -7 v -2 h 7 v -2 h -7 V 9 h 7 V 7 h -7 V 5 h 7 V 3 h -7 V 1 Z M 9.088 9 h -4.18 L 3.096 29 l 0.058 0.002 L 10.906 29 l -0.004 -0.058 Z M 17 3 h -2 v 6 h 2 Z M 9.002 3 H 5 L 5 7 h 4.004 Z',
      ],
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
      const host = this.house.host;
      booking.house = { _id: this.house._id, name: this.house.name }
      const addedBooking = await this.$store.dispatch({
        type: 'addBooking',
        booking,
        host
      })
      socketService.emit('onBookingAdded', {
        hostId: host._id,
        booking: addedBooking,
      })
      this.$notify({
        title: 'Order completed',
        message: 'Your booking had been reserved successfully',
        type: 'success',
        position: 'bottom-right',
      })
      if (addedBooking) this.$router.push(`/`)
    },
    addReview() {
      if (this.$store.getters.loggedinUser) {
        this.$store.dispatch({ type: 'modalMode', modalMode: 'addReview' })
      } else {
        this.open2()
      }
    },
    open2() {
      this.$notify({
        title: "User isn't logged in!",
        message: 'You have to login to add a review.',
        type: 'warning',
        position: 'bottom-right',
      })
    },
    windowSize() {
      this.isWideWindow = window.innerWidth > 700 ? true : false
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
    this.windowSize()
    window.addEventListener('resize', () => {
      this.windowSize()
    })
  },
  components: {
    houseChat,
    houseReviews,
    googleMap,
    bookingModal,
    houseFilter,
  },
}
</script>
