const router = require('express').Router()
const Order = require('../db/models/order')
const Book = require('../db/models/book')
const {BookOrder} = require('../db/models/index')

router.put('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isCheckedout: false
      }
    })
    const book = await Book.findOne({
      where: {
        id: req.body.bookId
      }
    })

    if (await order.hasBook(book)) {
      book.quantity++
    }
    order.quantity = book.quantity
    order.totalPrice += book.price
    await order.save()
    await order.addBook(book, {
      through: {savedPrice: book.price, quantity: book.quantity}
    })
    res.send(order)
  } catch (err) {
    console.log('Error in Orders put')
    next(err)
  }
})

module.exports = router
