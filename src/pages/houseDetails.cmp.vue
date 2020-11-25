<template>
    <section class="house-details-section">
        <h3>{{ house.name }}</h3>
        <div>
            {{ houseRating }}⭐ - {{ location.city }}, {{ location.country }}
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
                />
            </div>
        </div>
        <section class="house-desc-section">
            <div class="house-main-desc">
                <h3>{{ house.type }} hosted by {{ host.fullName }}</h3>
                <div class="house-capacity">Up to {{ house.capacity }} guests</div>
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
        <house-reviews :reviews="reviews"></house-reviews>
    </section>
</template>



<script>
// import chatApp from "@/cmps/chat-app"
import houseReviews from "../cmps/houseReviews.cmp.vue";

export default {
    data() {
        return {
            house: {},
            mainImg: "",
            host: {},
            location: {},
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
            this.host = house.host;
            this.location = house.location;
        },
    },
    computed: {
        // convertTime() {
        //     return new Date(this.house.createdAt).toLocaleDateString("he");
        // },
        convertBoolean() {
            if (this.house.inStock) return "Yes!";
            return "No..";
        },
        reviews() {
            return this.house.reviews;
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
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
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
        console.log(houseId);
        this.loadHouse(houseId);
    },
    components: {
        // chatApp,
        houseReviews,
    },
};
</script>
