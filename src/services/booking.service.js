// import { utilService } from './util.service.js'
import httpService from './http.service'

const baseUrl =
  process.env.NODE_ENV !== 'development'
    ? '/api/booking'
    : '//localhost:3000/api/booking'

export const bookingService = {
  query,
  findById,
  add,
  remove,
  check
}

function query(query) {
  // var queryURL = `?`;
  // for (const key in query) {
  //   if (query[key])  queryURL += `${key}=${query[key]}&`
  // }
  // return httpService.get(`booking/${queryURL}`)
  return httpService.get(`booking/`)
}

function check(booking) {
  return httpService.post(`booking/check`, booking)
}

function findById(bookingId) {
  return httpService.get(`booking/${bookingId}`)
}

function remove(booking) {
  return httpService.delete(`booking/${booking._id}`)
}

function add(booking) {
  return httpService.post(`booking`, booking)
}


