const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('attributes', () => {
    it('returns object', async () => {
      let order = await Order.build({
        totalPrice: 100
      })
      expect(order.totalPrice).to.be.equal(100)
    })
  })
})
