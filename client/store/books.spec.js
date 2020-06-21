import {expect} from 'chai'
import {mount} from 'enzyme'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import waitForExpect from 'wait-for-expect'
import {Provider} from 'react-redux'
import * as rrd from 'react-router-dom'

const {MemoryRouter} = rrd

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  books: []
}

import mockAxios from '../mock-axios'
import {getAllBooks, addBook} from './books'

import {createStore} from 'redux'
// import store from '../index'

const app = require('../../server')
const agent = require('supertest')(app)

const {db} = require('../../server/db')
const {Book} = require('../../server/db')
const seed = require('../../script/seed')

describe('Redux for Books', () => {
  const books = [
    {
      name: 'Frankenstein; or, The Modern Prometheus',
      description:
        'Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a hideous sapient creature in an unorthodox scientific experiment.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg',
      tag: 'Gothic/Horror',
      price: 1299,
      inStock: 100
    },
    {
      name: 'Don Quixote',
      description:
        'Don Quixote is a Spanish novel by Miguel de Cervantes. Published in two parts, in 1605 and 1615, Don Quixote is the most influential work of literature from the Spanish Golden Age and the entire Spanish literary canon.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png/500px-Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png',
      tag: 'Romance',
      price: 1099,
      inStock: 88
    },
    {
      name: 'Moby-Dick; or, The Whale',
      description: `Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge on Moby Dick, the giant white sperm whale that on the ship's previous voyage bit off Ahab's leg at the knee.`,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Moby-Dick_FE_title_page.jpg/440px-Moby-Dick_FE_title_page.jpg',
      tag: 'Adventure',
      price: 999,
      inStock: 95
    }
  ]

  beforeEach(() => {
    mockAxios.onGet('/api/books').replyOnce(200, books)
  })

  let fakeStore
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('set/fetch books', () => {
    it('getAllBooks action creator', () => {
      expect(
        getAllBooks(books).to.deep.equal({
          type: 'GET_All_BOOKS',
          allBooks
        })
      )
    })
  })
})
