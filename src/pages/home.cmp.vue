<template>
  <main class="homepage-section">
    <div class="header-scroll-pixel" />

    <!-- <div class="health-link-container flex-centered">
      <a
        class="health-link"
        href="https://www.gov.il/he/departments/topics/corona-main-sub?gclid=CjwKCAiAnvj9BRA4EiwAuUMDfwqvMW-aXce0UhFerpxXrTDXyF83RoPmpQ9wdyf64GjhtbFrLMShKhoCjW8QAvD_BwE"
        target="_blank"
        >Get the latest on our COVID-19 response</a
      >
    </div> -->

    <div class="hero-container flex a-center">
      <house-filter />
      <h1 class="hero-title flex">
        Mi Casa
        <br />
        Su Casa
      </h1>
    </div>
    <div>
      <div class="trending-head flex">
        <h2>Live anywhere</h2>
      </div>
      <div class="trending-house-container flex">
        <div class="trending-house-1 trending flex" @click="houseList">
          <img class="trending-house-img" src="../assets/trending1.jpg" />
          <h4 class="flex">Entire homes</h4>
        </div>
        <div class="trending-house-2 trending flex" @click="houseList">
          <img class="trending-house-img" src="../assets/trending2.jpg" />
          <h4>Cabins and cottages</h4>
        </div>
        <div class="trending-house-3 trending flex" @click="houseList">
          <img class="trending-house-img" src="../assets/trending3.jpg" />
          <h4>Unique stays</h4>
        </div>
        <div class="trending-house-4 trending flex" @click="houseList">
          <img class="trending-house-img" src="../assets/trending4.jpg" />
          <h4>Pets welcome</h4>
        </div>
      </div>
      <div class="trending-middle flex">
        <div
          class="trending-info-1 trending flex">
          <h2 class="flex"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display:block;fill:none;height: 25px; width: 32px;stroke:currentColor;stroke-width:4;overflow:visible" aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
            Filter down to your perfect fit</h2>
            <p>Personalize your search with filters—like price range or a pool—to get exactly what you want.</p>
        </div>
        <div class="trending-info-2 trending flex">
            <h2 class="flex"><svg aria-hidden="true" role="presentation" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; height: 32px; width: 32px; fill: currentcolor;"><path d="M17.954 2.781l.175.164 13.072 12.842-1.402 1.426-1.8-1.768L28 29a2 2 0 0 1-1.85 1.994L26 31H6a2 2 0 0 1-1.995-1.85L4 29V15.446l-1.8 1.767-1.4-1.426L13.856 2.958a3 3 0 0 1 4.097-.177zm-2.586 1.503l-.096.088L6 13.48 6 29l5-.001V19a2 2 0 0 1 1.85-1.995L13 17h6a2 2 0 0 1 1.995 1.85L21 19v9.999h5V13.48l-9.3-9.135a1.001 1.001 0 0 0-1.332-.06zM19 19h-6v9.999h6z"></path></svg>
            Dig into the details
            </h2>
            <p>Check out the photos. Then, read guest reviews from past reservations to learn what it’s like in person.</p>
        </div>
        <div class="trending-info-3 trending flex">
            <h2 class="flex"><svg aria-hidden="true" role="presentation" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; height: 32px; width: 32px; fill: currentcolor;"><path d="M14.998 1.032a2 2 0 0 0-.815.89l-3.606 7.766L1.951 10.8a2 2 0 0 0-1.728 2.24l.031.175A2 2 0 0 0 .87 14.27l6.36 5.726-1.716 8.608a2 2 0 0 0 1.57 2.352l.18.028a2 2 0 0 0 1.215-.259l7.519-4.358 7.52 4.358a2 2 0 0 0 2.734-.727l.084-.162a2 2 0 0 0 .147-1.232l-1.717-8.608 6.361-5.726a2 2 0 0 0 .148-2.825l-.125-.127a2 2 0 0 0-1.105-.518l-8.627-1.113-3.606-7.765a2 2 0 0 0-2.656-.971zm-3.07 10.499l4.07-8.766 4.07 8.766 9.72 1.252-7.206 6.489 1.938 9.723-8.523-4.94-8.522 4.94 1.939-9.723-7.207-6.489z"></path></svg>
            Book with peace of mind
            </h2>
            <p>We keep your info safe and follow global security standards to process your payments.</p>
        </div>
        <div class="trending-info-4 trending flex">
            <h2 class="flex"><svg aria-hidden="true" role="presentation" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; height: 25px; width: 32px; fill: currentcolor;"><path d="M14.998 1.032a2 2 0 0 0-.815.89l-3.606 7.766L1.951 10.8a2 2 0 0 0-1.728 2.24l.031.175A2 2 0 0 0 .87 14.27l6.36 5.726-1.716 8.608a2 2 0 0 0 1.57 2.352l.18.028a2 2 0 0 0 1.215-.259l7.519-4.358 7.52 4.358a2 2 0 0 0 2.734-.727l.084-.162a2 2 0 0 0 .147-1.232l-1.717-8.608 6.361-5.726a2 2 0 0 0 .148-2.825l-.125-.127a2 2 0 0 0-1.105-.518l-8.627-1.113-3.606-7.765a2 2 0 0 0-2.656-.971zm-3.07 10.499l4.07-8.766 4.07 8.766 9.72 1.252-7.206 6.489 1.938 9.723-8.523-4.94-8.522 4.94 1.939-9.723-7.207-6.489z"></path></svg>
            Arrive and enjoy!
            </h2>
            <p>Your host is only a message away if you have any questions. They can also offer local tips and advice.</p>
        </div>
      </div>
      <div class="trending-bottom flex">
        <h2>Destinations</h2>
      </div>
      <div class="trending-cities-container flex">
        <div
          class="trending-city-1 trending flex"
          @click="houseList('new-york')"
        >
          <img class="trending-city-img" src="../assets/newYork.jpg" />
          <h4>New York</h4>
        </div>
        <div class="trending-city-2 trending flex" @click="houseList('tokyo')">
          <img class="trending-city-img" src="../assets/tokyo.jpg" />
          <h4>Tokyo</h4>
        </div>
        <div
          class="trending-city-3 trending flex"
          @click="houseList('tel-aviv')"
        >
          <img class="trending-city-img" src="../assets/telAviv.jpg" />
          <h4>Tel Aviv</h4>
        </div>
        <div class="trending-city-4 trending flex" @click="houseList('paris')">
          <img class="trending-city-img" src="../assets/paris.jpg" />
          <h4>Paris</h4>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import appHeader from '@/cmps/appHeader.cmp.vue'
import houseFilter from '@/cmps/houseFilter.cmp.vue'

export default {
  components: {
    appHeader,
    houseFilter,
  },
  methods: {
    houseList(val) {
      const filterBy = JSON.parse(JSON.stringify(this.getFilterBy))
      filterBy.txt = val
      // this.$store.dispatch({ type: 'updateFilter', filterBy })
      this.$router.push({ path: `/house`, query: { txt: val } })
    },
  },
  computed: {
    getFilterBy() {
      return this.$store.getters.getFilterBy
    },
  },
}
</script>
