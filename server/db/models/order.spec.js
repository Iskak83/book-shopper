const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  let order
  before(() => db.sync({force: true}))
  beforeEach(() => {
    order = {
      totalPrice: 1299,
      isCheckedout: false,
      quantity: 1
    }
  })
  afterEach(() => db.sync({force: true}))
  it('has totalPrice, isCheckedout, and quantity fields', async () => {
    order.shouldNotExist = 'this attribute should not be allowed'
    const newOrder = await Order.create(order)

    expect(newOrder.totalPrice).to.equal(1299)
    expect(newOrder.isCheckedout).to.equal(false)
    expect(newOrder.quantity).to.equal(1)
  })

  it(`isCheckedout field doesn't accept non-boolean values`, async () => {
    order.isCheckedout = 'neutral'
    try {
      const orderIsCheckedOutNonBoolean = await Book.create(order)
      if (orderIsCheckedOutNonBoolean) {
        throw Error('Validation should have failed with non-boolean value')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })
})
