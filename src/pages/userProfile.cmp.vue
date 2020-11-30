<template>
  <div v-if="!userHouses" class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>
  <main v-else class="user-profile-section">
    <div class="user-card">
      <img :src="user.imgUrl" alt="" />
      <div class="update-img">Update Photo</div>
      <div class="main-card-container">
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          style="display:block;height:24px;width:24px;fill:currentColor"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path
            d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm0 2.394l-.337.213C12.245 5.52 8.805 6.706 5.352 6.952L5 6.972V17.5c0 6.831 4.716 11.357 10.713 11.497L16 29c6.133 0 11-4.56 11-11.5V6.972l-.352-.02c-3.453-.246-6.893-1.432-10.311-3.547L16 3.192zm7 7.394L24.414 12 13.5 22.914 7.586 17 9 15.586l4.5 4.499 9.5-9.5z"
          ></path>
        </svg>
        <h3>Identity verification</h3>
        <p>
          Show others you’re really you with the identity verification badge.
        </p>
        <button>Get the badage</button>
      </div>
    </div>
    <div class="user-main-container">
      <h1>Hi, I'm {{ user.fullName }}</h1>
      <div>Joined in ____</div>
      <h2>Houses I offer: (numOfHouses)</h2>
      <div>{{userHouses}}</div>
      <ul>
        <li v-for="house in userHouses" :key="house._id">.</li>
      </ul>
      <house-add></house-add>
    </div>
  </main>
</template>

<script>
import { log } from 'util'
import houseAdd from '../cmps/houseAdd.cmp.vue'
export default {
  data() {
    return {
      userHouses: null,
      }
  },
  methods: {},
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading
    },
    user() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.userHouses = this.$store.dispatch({
      type: 'loadUserHouses',
      hostId: this.user._id,
    })
    console.log(this.userHouses);
  },
  components: {
    houseAdd
  },
}
</script>
