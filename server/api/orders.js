const router = require('express').Router()
const Order = require('../db/models/order')
const Book = require('../db/models/book')
const {BookOrder} = require('../db/models/index')

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isCheckedout: false
      }
    })
    const currentOrder = await BookOrder.findAll({
      where: {orderId: order.id},
      include: Book
    })
    res.json(currentOrder)
  } catch (error) {
    next(error)
  }
})

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
    const orderChange = {
      savedPrice: book.price,
      bookQuantity: req.body.quantity
    }
    if (await order.hasBook(book)) {
      const bookOrder = await BookOrder.findOne({
        where: {
          orderId: order.id,
          bookId: book.id
        }
      })
      await bookOrder.update(orderChange)
    } else {
      await order.addBook(book, {through: orderChange})
    }

    const currentOrder = await BookOrder.findAll({
      where: {orderId: order.id},
      include: Book
    })

    res.json(currentOrder)
  } catch (err) {
    console.log('Error in Orders put')
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const checkoutOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        isCheckedout: false
      }
    })
    await checkoutOrder.update(req.body)
    const newOrder = await Order.create({})
    await req.user.addOrder(newOrder)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const checkoutOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        isCheckedout: false
      }
    })

    const deletedBook = await BookOrder.findOne({
      where: {
        orderId: checkoutOrder.id,
        bookId: req.params.id
      }
    })
    await deletedBook.destroy()
    res.send(req.params.id)
    // res.status(204).json('Deleted')
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
