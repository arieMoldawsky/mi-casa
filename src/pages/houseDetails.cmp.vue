<template>
    <section class="house-details-section">
        <h3>{{ house.name }}</h3>
        <div>
            {{ houseRating }}⭐ ·
            <span class="house-location"
                >{{ location.city }}, {{ location.country }}</span
            >
        </div>
        <div class="imgs-container">
            <div class="main-img">
                <img :src="mainImg" alt="" />
            </div>
            <div class="secondary-imgs">
                <img
                    v-for="(img, idx) in secondryImgs"
                    :key="img"
                    :src="secondryImgs[idx]"
                    :class="`secondary-img${idx}`"
                />
            </div>
        </div>
        <booking-modal v-if="house.capacity" :reviews="reviews" :capacity="house.capacity" :pricePN="house.price"></booking-modal>
        <section class="house-desc-section">
            <div class="house-main-desc">
                <h3>{{ house.type }} hosted by {{ host.fullName }}</h3>
                <div class="house-capacity">
                    Up to {{ house.capacity }} guests
                </div>
            </div>
            <img :src="host.imgUrl" />
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
        <house-chat></house-chat>
        <house-reviews :reviews="reviews"></house-reviews>
        <googleMap v-if="location.city" :location="location"></googleMap>
    </section>
</template>



<script>
import houseChat from "@/cmps/houseChat.cmp.vue"
import houseReviews from "../cmps/houseReviews.cmp.vue";
import bookingModal from "../cmps/bookingModal.cmp.vue";
import googleMap from "../cmps/googleMap.cmp.vue";

export default {
    data() {
        return {
            house: {},
            mainImg: "",
            host: {},
            location: {
                lat: 0,
                lng: 0,
                city: '',
                country: ''
            },
        };
    },
    methods: {
        backToList() {
            this.$router.push(`/`);
        },
        async onUploadImg(ev) {
            const res = await uploadImg(ev);
            console.log(res.url);
            this.house.imgUrl = res.url;
            this.$store.dispatch({
                type: "saveHouse",
                house: this.house,
            });
        },
        async loadHouse(houseId) {
            const house = await this.$store.dispatch({
                type: "loadHouse",
                houseId,
            });
            this.house = house;
            this.mainImg = house.imgs[0];
            this.location = house.location;
            this.host = house.host;
        },
    },
    computed: {
        // convertTime() {
        //     return new Date(this.house.createdAt).toLocaleDateString("he");
        // },
        convertBoolean() {
            if (this.location === {}) return false;
            return true;
        },
        reviews() {
            return this.house.reviews;
        },
        theLocation() {
            return this.house.location;
        },
        reviewsLength() {
            if (this.house.reviews) {
                return this.house.reviews.length;
            }
            return 0;
        },
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
        secondryImgs() {
            var imgs = this.house.imgs;
            if (imgs) {
                imgs.splice(0, 1);
                return imgs;
            }
        },
    },
    created() {
        const houseId = this.$route.params.id;
        this.loadHouse(houseId);
    },
    components: {
        houseChat,
        houseReviews,
        googleMap,
        bookingModal
    },
};
</script>
