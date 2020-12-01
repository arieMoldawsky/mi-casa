<template>
  <div v-if="isLoading" class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>
  <main v-else class="user-profile-section">
    <houseFilter />
    <div class="user-card">
      <img :src="user.imgUrl" alt="" />
      <div class="update-img">Update Photo</div>
      <div class="main-card-container">
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          style="display: block; height: 24px; width: 24px; fill: currentColor"
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
      <h2>Houses I offer: ({{ userHouses.length }})</h2>
      <ul>
        <li v-for="(house, idx) in userHouses" :key="house._id">
          <div class="user-houses-container">
            <div>Name: {{ house.name }}</div>
            <div>Type: {{ house.type }}</div>
            <img :src="house.imgs[0]" alt="" />
          </div>
          <div>{{userBookings[idx]}}</div>
        </li>
      </ul>
      <house-add></house-add>
    </div>
  </main>
</template>

<script>
import houseAdd from "../cmps/houseAdd.cmp.vue";
import houseFilter from "../cmps/houseFilter.cmp.vue";

export default {
  data() {
    return {
      isLoading: true,
      userHouses: null,
      userBookings: null,
      house: {
        name: "",
        price: 0,
        type: "",
        capacity: 0,
        badRooms: 0,
        tags: [],
        amenities: [
          "Wifi",
          "Self check-in",
          "Kitchen",
          "Air conditioning",
          "Elevator",
          "TV",
          "Hair dryer",
          "Hangers",
          "Iron",
          "Essentials",
        ],
        location: {
          lat: 48.8665169951605,
          lng: 2.31821807029879,
          country: "",
          city: "",
        },
        description: "",
        reviews: [],
        chat: [],
        imgs: [],
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    onSubmit() {
      console.log("submit!");
    },
  },
  methods: {
    async loadUserData() {
      this.isLoading = true;
      try {
        const res = await this.$store.dispatch({
          type: "loadUserData",
          hostId: this.user._id,
        });
        this.userHouses = res.userHouses;
        this.userBookings = res.userBookings;
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadUserData();
  },
  components: {
    houseAdd,
    houseFilter,
  },
};
</script>
