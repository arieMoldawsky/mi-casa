import { houseService } from '@/services/house.service.js'
// import { imgUploadService } from '@/services/img.upload.service.js'

export default {
  state: {
    filterBy: {
      page: 1,
      limit: 30,
      txt: '',
      sortBy: 'rating',
      checkIn: null,
      checkOut: null,
      adults: null,
      kids: null,
      infants: null,
      minPrice: null,
      maxPrice: 0,
      maxPrice: 750,
      type: [],
      amenities: [],
    },
    houses: [],
    house: null,
    housesLength: null,
    isLoading: false,
  },
  getters: {
    getFilterBy({ filterBy }) {
      return filterBy
    },
    getHouses({ houses }) {
      return houses
    },
    getHouse({ house }) {
      return house
    },
    getHousesLength({ housesLength }) {
      return housesLength
    },
    getIsLoading({ isLoading }) {
      return isLoading
    },
  },
  actions: {
    async loadHouses(context, { type }) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      try {
        const res = await houseService.query(context.state.filterBy)
        context.commit({ type, res })
        context.commit({ type: 'setIsLoading', isLoading: false })
      } catch (error) {
        console.log('ERROR: could not load houses')
      }
    },
    async loadHouse({ commit }, { type, houseId }) {
      commit({ type: 'setIsLoading', isLoading: true })
      try {
        const house = await houseService.findById(houseId)
        commit({ type, house })
        commit({ type: 'setIsLoading', isLoading: false })
      } catch (error) {
        console.log('ERROR: could not load house: ', houseId)
      }
    },
    async removeHouse({ dispatch }, payload) {
      try {
        await houseService.remove(payload._id)
      } catch (error) {
        console.log('ERROR: could not remove house: ', houseId)
      }
    },
    async addHouse(context, { house }) {
      try {
        // const { url } = await imgUploadService.uploadImg(img)
        // house.img = url
        const houseRes = await houseService.add(house)
      } catch (error) {
        console.log(error)
      }
    },
    async updateHouse({ commit }, { house }) {
      try {
        const houseRes = await houseService.save(house)
        commit({ type: 'loadHouse', house: houseRes })
      } catch (error) {
        console.log(error)
      }
    },

    addReview(context, payload) {
      context.commit(payload)
      console.log(payload.review)
      context.dispatch({ type: 'updateHouse', house: context.state.house })
    },
    updateFilter(context, payload) {
      context.commit(payload)
      context.dispatch({ type: 'loadHouses' })
    },
    setIsLoading({ commit }, payload) {
      commit(payload)
    },
  },
  mutations: {
    loadHouses(state, { res }) {
      state.houses = res.houses
      state.housesLength = res.housesLength
    },
    loadHouse(state, { house }) {
      state.house = house
    },
    updateFilter(state, { filterBy }) {
      state.filterBy = { ...filterBy }
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },
    addReview(state, { review }) {
      state.house.reviews.push(review)
    },
    addHouse(state, { house }) {
      state.houses.push(house)
    },
  },
}