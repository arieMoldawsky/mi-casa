<template>
    <section class="house-details-section">
        <h2>House Details:</h2>
        <div>{{ house.name }}</div>
        <div>{{ houseRating }} - {{ house.location }}</div>
        <div class="imgs-container">
            <div class="main-img">
                <img :src="mainImg" alt="" />
            </div>
            <img
                v-for="(img, idx) in house.imgs"
                :key="img"
                :src="house.imgs[idx + 1]"
                alt=""
            />
        </div>
        <div>{{ house.type }} hosted by {{ host.fullName }}</div>
        <div>Up to {{ house.capacity }} guests</div>
        <p>{{ house.description }}</p>
        <div>----------------------</div>
        Amenities
        <ul>
            <li v-for="amenity in house.amenities" :key="amenity">
                {{ amenity }}
            </li>
        </ul>
        <div>-----------------</div>
        <house-reviews :reviews="reviews"></house-reviews>
        <!-- <div>{{ houseRating }}({{ reviewsLength }} reviews)</div> -->
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
            return 0
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
