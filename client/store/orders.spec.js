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
  orders: []
}

import mockAxios from '../mock-axios'
import orderReducer, {
  BookInCart,
  retrieveCart,
  putBookInCart,
  getCart,
  placedOrder
} from './order'

import {createStore} from 'redux'
// import store from '../index'

import appReducer from './index'

const app = require('../../server')
const agent = require('supertest')(app)

const {db} = require('../../server/db')
const {Order} = require('../../server/db')
const seed = require('../../script/seed')

describe('Redux for Orders', () => {
  const orderCollection = [
    {
      savedPrice: 50,
      bookQuantity: 5
    },
    {
      savedPrice: 20,
      bookQuantity: 2
    },
    {
      savedPrice: 100,
      bookQuantity: 10
    }
  ]

  beforeEach(() => {
    mockAxios.onGet('/api/orders').replyOnce(200, orderCollection)
  })

  let fakeStore
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('BookInCart functionality', () => {
    it('BookInCart action creator', () => {
      expect(BookInCart(orderCollection)).to.deep.equal({
        type: 'GET_ORDER',
        collection: orderCollection
      })
    })

    const newOrder = {
      savedPrice: 50,
      bookQuantity: 100
    }

    it('putBookInCart successfully PUTS books in cart', async () => {
      await fakeStore.dispatch(putBookInCart(newOrder))
      const [postRequest] = mockAxios.history.put
      expect(postRequest).to.not.equal(undefined)
      expect(postRequest.url).to.equal('/api/orders')
      const actions = fakeStore.getActions()
      console.log('fakeStore:', fakeStore)
      expect(actions.type).to.equal('GET_ORDER')
      expect(actions.collection).to.deep.equal(newOrder)
    })
  })
})
