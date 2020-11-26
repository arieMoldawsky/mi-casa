<template>
    <section class="booking-modal-section flex">
        <div class="booking-modal-header flex">
            <div>
                <span class="pricePN">${{ pricePN }}</span
                >/night
            </div>
            <div>{{ houseRating }}⭐ <span>({{ reviewsLength }})</span></div>
        </div>
        <el-form
            @submit.native.prevent="updateFilter"
            class="booking-modal-container flex"
            ref="form"
            size="medium"
        >
            <div class="form-item field date-picker flex-start">
                <label> Dates </label>
                <el-date-picker
                    class="date-picker"
                    popper-class="date-picker-popper"
                    :value="datesToPicker"
                    @input="datesFromPicker"
                    format="MMM d"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator=""
                    start-placeholder="Check In"
                    end-placeholder="Check Out"
                    :clearable="false"
                    :picker-options="datePickerOptions"
                />
            </div>
            <div class="form-item field flex-start">
                <label> Guests </label>
                <el-input-number
                    v-model="booking.guestsNum"
                    :min="1"
                    :max="capacity"
                />
            </div>
            <!-- <div class="form-item submit flex-start"> -->
                <button native-type="submit">Check availability</button>
            <!-- </div> -->
        </el-form>
    </section>
</template>


<script>
import { log } from "util";
export default {
    props: {
        capacity: Number,
        pricePN: Number,
        reviews: Array,
    },
    data() {
        return {
            booking: {
                checkIn: "",
                checkOut: "",
                guestsNum: 0,
                totalPrice: 0,
            },
            numOfNights: 0,
            deBounce: {
                txt: "",
                timer: null,
            },
            datePickerOptions: {
                disabledDate(date) {
                    return date < new Date();
                },
            },
        };
    },
    computed: {
        datesToPicker() {
            return [this.booking.checkIn, this.booking.checkOut];
        },
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
    methods: {
        datesFromPicker(ev) {
            this.booking.checkIn = ev[0];
            this.booking.checkOut = ev[1];
            this.nightsCount();
            this.totalPrice();
        },
        nightsCount() {
            const oneDay = 24 * 60 * 60 * 1000;
            const firstDate = new Date(this.booking.checkIn);
            const secondDate = new Date(this.booking.checkOut);
            const diffDays = Math.round(
                Math.abs((firstDate - secondDate) / oneDay)
            );
            this.numOfNights = diffDays;
        },
        totalPrice() {
            this.booking.totalPrice = this.pricePN * this.numOfNights;
        },
    },
    created() {},
};
</script>
