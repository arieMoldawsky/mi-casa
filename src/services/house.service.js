import { utilService } from './util.service.js'
import httpService from './http.service'
import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV !== 'development'
    ? '/api/house'
    : '//localhost:3000/api/house'

export const houseService = {
  query,
  getEmptyHouse,
  findById,
  save,
  remove,
}

function query(query) {
//   var queryURL = `?`
//   for (const key in query) {
//     if (query[key]) queryURL += `${key}=${query[key]}&`
//   }
  return houses
//   return httpService.get(`house/${queryURL}`)
}

function query(q = {}) {
  return httpService.get(`house?name=${q.txt}&inStock=${q.inStock}`)
}

function getEmptyHouse() {
  return {
    _id: '',
    title: '',
    isDone: false,
  }
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
  return axios.post(`${baseUrl}`, house).then(res => res.data)
}

const houses = [
  {
    _id: '5c09',
    name: 'Funky Monks',
    price: 50,
    imgs: [
      'http://someimg1.jpeg',
      'http://someimg2.jpeg',
      'http://someimg3.jpeg',
    ],
    'maxGuests/ capacity': 4,
    bedRooms: 3,
    tags: ['Funk', 'Happy'],
    amenities: ['Wifi', 'Washer'],
    description: 'lorem',
    location: {
      lat: 32.21,
      lng: 22.11,
      country: 'Israel',
      city: 'Tel-Aviv',
    },
    host: {
      _id: 'u105',
      fullName: 'Puki Ben David',
      imgUrl: 'http://some-photo/',
    },
    reviews: [
      {
        id: 'u101',
        text: 'asdasd',
        rating: 4,
        user: {
          _id: 'u101',
          fullName: 'Orly Amdadi',
          imgUrl: 'http://some-img',
        },
      },
    ],
    chat: [
      {
        id: 'asd23',
        fromId: 'asd',
        txt: 'lorem',
        sentAt: 16769958698756,
      },
    ],
  },
]
