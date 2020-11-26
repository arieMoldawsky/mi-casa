<template>
    <section class="booking-modal-section flex">
        <div class="booking-modal-header flex">
            <div>
                <span class="pricePN">${{ pricePN }}</span
                >/night
            </div>
            <div>
                {{ houseRating }}⭐ <span>({{ reviewsLength }})</span>
            </div>
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
                    value-format="timestamp"
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
            <button v-if="!available" native-type="submit" @click.prevent="checkAvailability">Check availability</button>
            <button v-else native-type="submit" @click.prevent="addBooking">Reserve</button>
        </el-form>
        <div class="total-section" v-if="available">
            You won't be charged yet
            <ul class="flex">
                <li><div class="total-first-col">${{pricePN}} X {{numOfNights}} nights</div><div class="total-second-col">${{totalPrice()}}</div></li>
                <li><div class="total-first-col">Service fee</div><div class="total-second-col">$0</div></li>
                <li><div class="total-first-col">Occupancy taxes and fees</div><div class="total-second-col">$10</div></li>
            </ul>
            <section class="total-last-row flex"><div class="total-second-col">Total</div><div class="total-second-col">${{booking.totalPrice}}</div></section>
        </div>
    </section>
</template>


<script>
export default {
    props: {
        capacity: Number,
        pricePN: Number,
        reviews: Array,
    },
    data() {
        return {
            booking: {
                checkIn: "check in",
                checkOut: "check out",
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
            available: false,
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
            const total = this.pricePN * this.numOfNights;
            this.booking.totalPrice = total + 10;
            return total;
        },
        checkAvailability() {
            if(Number.isInteger(this.booking.checkOut)) this.available = true;
        },
        addBooking() {
            this.$emit("addBooking", this.booking);
        },
    },
    created() {},
};
</script>
