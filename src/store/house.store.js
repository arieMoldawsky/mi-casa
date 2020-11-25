import { houseService } from '@/services/house.service.js'
import { imgUploadService } from '@/services/img.upload.service.js'
import { eventBus, SHOW_MSG } from '@/services/eventBus.service.js'

export default {
  state: {
    filterBy: {
      page: 1,
      limit: 10,
      txt: '',
      sortBy: 'name',
      tags: 'all',
    },
    houses: [],
    housesCount: null,
    isLoading: false,
  },
  getters: {
    getFilterBy({ filterBy }) {
      return filterBy
    },
    getHouses({ houses }) {
      return houses
    },
    getHousesCount({ housesCount }) {
      return housesCount
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
    async loadHouse(context, { type, houseId }) {
      try {
        const house = await houseService.getById(houseId)
        return house
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
    // async updateHouse({ dispatch }, payload) {
    //   houseService
    //     .update(payload.house)
    //     .then(() => dispatch({ type: 'loadHouses' }))
    //     .then(() =>
    //       eventBus.$emit(SHOW_MSG, {
    //         txt: `${payload.house._id} Updated Succefully`,
    //         type: 'success',
    //       })
    //     )
    // },
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
      state.housesTotalCount = res.housesLength
    },
    // loadHouse(state, { house }) {
    //   state.house = house
    // },
    updateFilter(state, { filterBy }) {
      state.filterBy = { ...filterBy }
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },
  },
}
