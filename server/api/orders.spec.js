const {expect} = require('chai')

const app = require('../index')
const agent = require('supertest')(app)
const request = require('supertest')
const db = require('../db')
const Order = require('../db/models/order')

describe('Order routes', () => {
  let storedOrders

  const orderData = [
    {
      totalPrice: 100,
      isCheckedout: false,
      quantity: 1
    },
    {
      totalPrice: 55,
      isCheckedout: true,
      quantity: 2
    },
    {
      totalPrice: 80,
      isCheckedout: false,
      quantity: 1
    }
  ]

  beforeEach(async () => {
    const createdOrder = await Order.bulkCreate(orderData)
    storedOrders = createdOrder.map(order => order.dataValues)
  })

  // Route for updating orders via PUT request
  describe('PUT `/`', () => {
    it('updates order via PUT request', async () => {
      const orderToUpdate = {
        totalPrice: 100,
        isCheckedout: true,
        quantity: 1
      }

      const response = await agent
        .post('/')
        .send(orderToUpdate)
        .expect(200)

      expect(response.body).to.be.an('object')
      //   expect(response.body).to.equal(orderToUpdate.totalPrice)
      //   expect(response.body.isCheckedout).to.equal(orderToUpdate.isCheckedout)
      //   expect(response.body.quantity).to.equal(orderToUpdate.quantity)
    })
  })
})
