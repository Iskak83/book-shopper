/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import enzyme, {mount, shllow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import waitForExpect from 'wait-for-expect'
import {Provider} from 'react-redux'
import * as rrd from 'react-router-dom'

import 'jsdom-global/register'

// const adapter = new Adapter()
// enzyme.configure({adapter})

const {MemoryRouter} = rrd

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  books: []
}

import mockAxios from '../mock-axios'
import {getAllBooks, addBook} from '../store/books'

// import appReducer from '../index'
import {createStore} from 'redux'
import {store} from '../store/index'

const app = require('../../server')
const agent = require('supertest')(app)

const {db} = require('../../server/db')
const {Book} = require('../../server/db')
const seed = require('../../script/seed')

import AllBooks, {
  AllBooks as UnconnectedAllBooks
} from '../../client/components/AllBooks'
import AllAuthors from '../../client/components/AllAuthors'
import Routes from '../routes'

describe('AllBooks Component', () => {
  const books = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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

  const getBooksSpy = sinon.spy()
  afterEach(() => {
    getBooksSpy.resetHistory()
  })

  it('renders books passed in as props', () => {
    const wrapper = mount(
      <UnconnectedAllBooks books={books} getBooks={getBooksSpy} />
    )
    console.log('wrapper:', wrapper)
    expect(wrapper.text()).to.include('Frankenstein')
    expect(wrapper.text()).to.include('Don Quixote')
  })
})
