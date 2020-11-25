// import { utilService } from './util.service.js'
import httpService from './http.service'

const baseUrl =
  process.env.NODE_ENV !== 'development'
    ? '/api/house'
    : '//localhost:3000/api/house'

export const houseService = {
  query,
  findById,
  save,
  remove,
}

function query(query) {
  var queryURL = `?`
  for (const key in query) {
    if (query[key]) queryURL += `${key}=${query[key]}&`
  }
  return httpService.get(`house/${queryURL}`)
}

function findById(houseId) {
  return httpService.get(`house/${houseId}`)
}

function remove(house) {
  return httpService.delete(`house/${house._id}`)
}

function save(house) {
  if (house._id) {
    return httpService.put(`house/${house._id}`, house)
  } else {
    return _add(house).then(house => house)
  }
}

function _add(house) {
  // house._id = utilService.makeId();
  // house.type = 'Funny';
  // house.createdAt = Date.now();
  // return axios.post(`${baseUrl}`, house).then(res => res.data)
}
