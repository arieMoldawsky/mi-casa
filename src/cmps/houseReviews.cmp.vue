<template>
    <section class="house-reviews-section">
        <div>{{ houseRating }} ({{ reviewsLength }} reviews)</div>
        <div>
            <p>Cleanliness -------------- 4.9</p>
            <p>Communication -------------- 4.9</p>
            <p>Check-in -------------- 4.9</p>
            <p>Accuracy -------------- 4.9</p>
            <p>Location -------------- 4.9</p>
            <p>Value -------------- 4.8</p>
        </div>
        <ul>
            <li v-for="review in reviews" :key="review.id">
                <img :src="review.user.imgUrl">
                <div>{{review.user.fullName}}</div>
                <div>{{review.createdAt}}</div>
                <p>{{review.text}}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        reviews: Array,
    },
    methods: {},
    computed: {
        reviewsLength() {
            if (this.reviews) {
                return this.reviews.length;
            }
            return 0;
        },
        houseRating() {
            const format = (num, decimals) =>
                num.toLocaleString("en-US", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                });
            var ratingSum = 0;
            if (this.reviews) {
                this.reviews.forEach((review) => {
                    ratingSum += +review.rating;
                });
                return format(ratingSum / this.reviews.length);
            }
            return 0;
        },
    },
};
</script>