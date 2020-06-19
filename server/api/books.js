const router = require('express').Router()
const Book = require('../db/models/book')
const Author = require('../db/models/author')

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({include: Author})
    res.json(books)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const selectedBook = await Book.findOne({
      where: {
        id: req.params.id
      },
      include: Author
    })
    res.json(selectedBook)
  } catch (error) {
    next(error)
  }
})

module.exports = router
