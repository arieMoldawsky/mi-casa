import { houseService } from '@/services/house.service.js'
// import { imgUploadService } from '@/services/img.upload.service.js'
// import { eventBus, SHOW_MSG } from '@/services/eventBus.service.js'

export default {
  state: {
    filterBy: {
      page: 1,
      limit: 30,
      txt: '',
      sortBy: 'name',
      checkIn: null,
      checkOut: null,
      adults: null,
      kids: null,
      infants: null,
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
        // eventBus.$emit(SHOW_MSG, {
        //   txt: `${payload._id} Removed Succefully`,
        //   type: 'success',
        // })
      } catch (error) {
        console.log('ERROR: could not remove house: ', houseId)
      }
    },
    async addHouse(context, { house, img }) {
      try {
        const { url } = await imgUploadService.uploadImg(img)
        house.img = url
        const houseRes = await houseService.add(house)
        // eventBus.$emit(SHOW_MSG, {
        //   txt: `${houseRes._id} Added Succefully`,
        //   type: 'success',
        // })
      } catch (error) {
        console.log(error)
      }
    },
    async updateHouse({ commit }, { house }) {
      try {
        const houseRes = await houseService.save(house)
        commit({ type: 'loadHouse', house: houseRes })
        // eventBus.$emit(SHOW_MSG, {
        //   txt: `${houseRes._id} Added Succefully`,
        //   type: 'success',
        // })
      } catch (error) {
        console.log(error)
      }
    },

    addReview(context, payload) {
      context.commit(payload)
      context.dispatch({ type: 'updateHouse', house: context.state.house })
    },
    updateFilter({ commit }, payload) {
      commit(payload)
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
  },
}
