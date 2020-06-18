const router = require('express').Router()
const Author = require('../db/models/author')
const Book = require('../db/models/book')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.findAll()
    res.json(authors)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleAuthor = await Author.findByPk(req.params.id, {include: Book})
    res.json(singleAuthor)
  } catch (error) {
    next(error)
  }
})

module.exports = router
