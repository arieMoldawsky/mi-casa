import { bookingService } from '@/services/booking.service.js'

// import { imgUploadService } from '@/services/img.upload.service.js'
// import { eventBus, SHOW_MSG } from '@/services/eventBus.service.js'

export default {
  state: {
    bookings: [],
  },
  getters: {
    getBookings({ bookings }) {
      return bookings
    },
  },
  actions: {
    async loadBookings(context, { type }) {
      try {
        const res = await bookingService.query()
        context.commit({ type, res })
      } catch (error) {
        console.log('ERROR: could not load bookings')
      }
    },
    async loadBooking(context, { bookingId }) {
      try {
        const booking = await bookingService.findById(bookingId)
        return booking
      } catch (error) {
        console.log('ERROR: could not load booking: ', bookingId)
      }
    },
    async addBooking(context, { booking }) {
      try {
        const bookingRes = await bookingService.add(booking)
        return bookingRes
        // eventBus.$emit(SHOW_MSG, {
        //   txt: `${bookingRes._id} Added Succefully`,
        //   type: 'success',
        // })
      } catch (error) {
        console.log(error)
      }
    },
    async checkAvailability(context, { booking }) {
      try {
        const bookingRes = await bookingService.check(booking)
        return bookingRes
        // eventBus.$emit(SHOW_MSG, {
        //   txt: `${bookingRes._id} Added Succefully`,
        //   type: 'success',
        // })
      } catch (error) {
        console.log(error)
      }
    },
  },
  mutations: {
    loadBookings(state, { res }) {
      state.bookings = res.bookings
    },
    // loadBooking(state, { booking }) {
    //   state.booking = booking
    // },
  },
}
