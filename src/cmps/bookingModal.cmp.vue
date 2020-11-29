<template>
    <section class="booking-modal-section flex">
        <div class="booking-modal-header flex">
            <div>
                <span class="pricePN">${{ pricePN }}</span> / night
            </div>
            <div>
                <i class="fas fa-star"></i>{{ houseRating }}
                <span>({{ reviewsLength }})</span>
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
                    @change="checkAvailability"
                />
            </div>
            <!-- <div class="form-item field flex-start">
                <label> Guests </label>
                <el-input-number
                    v-model="booking.guestsNum"
                    :min="1"
                    :max="capacity"
                />
            </div> -->
            <div>Guests</div>
            <div class="form-item field flex a-start fill-parent pointer">
                <el-popover
                    class="fill-parent"
                    placement="bottom"
                    width="300"
                    v-model="isPopVisible"
                >
                    <div
                        class="fill-parent flex a-start column"
                        slot="reference"
                    >
                        <!-- <label> Guests </label> -->
                        <div class="guest-count flex fill-parent">
                            <span class="flex a-center">
                                {{ toAdults }}
                            </span>
                            <span class="flex a-center" v-show="booking.kids">
                                {{ toKids }}
                            </span>
                            <span
                                class="flex a-center"
                                v-show="booking.infants"
                            >
                                {{ toInfants }}
                            </span>
                        </div>
                    </div>
                    <label class="flex a-center j-space-b">
                        Adults
                        <el-input-number
                            v-model="booking.adults"
                            :min="1"
                            :max="16"
                        />
                    </label>
                    <br />
                    <label class="flex a-center j-space-b">
                        Kids
                        <el-input-number
                            v-model="booking.kids"
                            :min="0"
                            :max="16"
                        />
                    </label>
                    <br />
                    <label class="flex a-center j-space-b">
                        Infants
                        <el-input-number
                            v-model="booking.infants"
                            :min="0"
                            :max="16"
                        />
                    </label>
                </el-popover>
            </div>
            <el-button
                plain
                v-if="!openTotal"
                native-type="submit"
                @click.prevent="open2"
            >
                Check availability
            </el-button>
            <button v-else native-type="submit" @click.prevent="addBooking">
                Reserve
            </button>
            <div class="dates-taken-msg" v-if="!isAvailable" style="color: red">
                Dates are unavailable for check-in.
            </div>
        </el-form>
        <div class="total-section" v-if="openTotal">
            You won't be charged yet
            <ul class="flex">
                <li>
                    <div class="total-first-col">
                        ${{ pricePN }} X {{ numOfNights }} nights
                    </div>
                    <div class="total-second-col">${{ totalPrice() }}</div>
                </li>
                <li>
                    <div class="total-first-col">Service fee</div>
                    <div class="total-second-col">$0</div>
                </li>
                <li>
                    <div class="total-first-col">Occupancy taxes and fees</div>
                    <div class="total-second-col">$10</div>
                </li>
            </ul>
            <section class="total-last-row flex">
                <div class="total-second-col">Total</div>
                <div class="total-second-col">${{ booking.totalPrice }}</div>
            </section>
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
                checkIn: "Check In",
                checkOut: "Check Out",
                adults: 0,
                kids: 0,
                infants: 0,
                totalPrice: 0,
            },
            numOfNights: 0,
            deBounce: {
                txt: "",
                timer: null,
            },
            datePickerOptions: {
                disabledDate(date) {
                    // this.bookings.forEach((booking) => {
                    //     return (
                    //         (booking.checkIn < date &&
                    //             booking.checkOut > date) ||
                    //         date < new Date()
                    //     );
                    // });
                    return date < new Date();
                },
            },
            openTotal: false,
            isAvailable: true,
            isPopVisible: false,
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
        bookings() {
            return this.$store.getters.getBookings;
        },
        toAdults() {
            var str = this.booking.adults > 1 ? "Adults" : "Adult ";
            str += this.booking.kids || this.booking.infants ? "," : "";
            return `${this.booking.adults} ${str}`;
        },
        toKids() {
            var str = this.booking.kids > 1 ? "Kids" : "Kid ";
            str += this.booking.infants ? "," : "";
            return `${this.booking.kids} ${str}`;
        },
        toInfants() {
            var str = this.booking.infants > 1 ? "Infants" : "Infant";
            return `${this.booking.infants} ${str}`;
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
        async checkAvailability() {
            const house = this.$store.getters.getHouse;
            var booking = JSON.parse(JSON.stringify(this.booking));
            booking.house = { _id: house._id };
            const isAvailable = await this.$store.dispatch({
                type: "checkAvailability",
                booking,
            });
            if (Number.isInteger(this.booking.checkOut) && isAvailable) {
                this.openTotal = true;
                this.isAvailable = true;
            } else {
                this.openTotal = false;
                this.isAvailable = false;
            }
        },
        addBooking() {
            this.$emit("addBooking", this.booking);
        },
        open2() {
            if (this.isAvailable) {
                this.$notify({
                    title: "Empty Dates",
                    message: "You have to insert dates to proceed",
                    type: "warning",
                    position: "bottom-right",
                });
            }
        },
        togglePop() {
            this.isPopVisible = !this.isPopVisible;
        },
    },
};
</script>
