const router = require('express').Router()
const Book = require('../db/models/book')

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    res.json(books)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const selectedBook = await Book.findByPk(req.params.id)
    res.json(selectedBook)
  } catch (error) {
    next(error)
  }
})

module.exports = router
