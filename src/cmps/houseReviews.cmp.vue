<template>
    <section class="house-reviews-section">
        <h3><i class="fas fa-star"></i>{{ houseRating }} ({{ reviewsLength }} reviews)</h3>
        <div class="reviews-rate-list">
            <p>Cleanliness</p>
            <el-progress class="progress-bar" :percentage="98" :format="format"></el-progress>
            <p>Communication</p>
            <el-progress class="progress-bar" :percentage="98" :format="format"></el-progress>
            <p>Check-in</p>
            <el-progress class="progress-bar" :percentage="100" :format="format"></el-progress>
            <p>Accuracy</p>
            <el-progress class="progress-bar" :percentage="90" :format="format"></el-progress>
            <p>Location</p>
            <el-progress class="progress-bar" :percentage="90" :format="format"></el-progress>
            <p>Value</p>
            <el-progress class="progress-bar" :percentage="50" :format="format"></el-progress>
        </div>
        <ul>
            <li v-for="review in reviews" :key="review.id">
                <div class="reviewer-container">
                    <img :src="review.user.imgUrl" />
                    <div>
                        <div class="reviewer-name">{{ review.user.fullName }}</div>
                        <div class="review-time">{{ convertTimeStamp(review.createdAt) }}</div>
                    </div>
                </div>
                <p>{{ review.txt }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        reviews: Array,
    },
    methods: {
        format(percentage) {
            if(percentage === 98) return '4.9';
            else if (percentage === 100) return '5.0';
            else if (percentage === 90) return '4.7'
            else if (percentage === 50) return '2.5'
      },
        convertTimeStamp(time) {
            return moment(time).fromNow()
            // return new Date(time).toLocaleDateString("he");
        },
    },
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
                    maximumFractionDigits: 2,
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