const router = require('express').Router()
const Book = require('../db/models/book')
const Author = require('../db/models/author')
const {isAdmin} = require('./permission')

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({include: Author, order: [['id', 'ASC']]})
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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    req.body.price = req.body.price * 100
    const bookTemplate = req.body
    for (let key in bookTemplate) {
      if (bookTemplate[key] === 0 || bookTemplate[key] === '')
        delete bookTemplate[key]
    }
    const newBook = await Book.create(bookTemplate)
    res.json(newBook)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    req.body.price = req.body.price * 100
    const bookTemplate = req.body
    for (let key in bookTemplate) {
      if (bookTemplate[key] === 0 || bookTemplate[key] === '')
        delete bookTemplate[key]
    }
    const bookToEdit = await Book.findByPk(req.params.id, {include: Author})
    const changedBook = await bookToEdit.update(bookTemplate)
    if (bookTemplate.author) {
      const authorChange = await Author.findOrCreate({
        where: {
          name: bookTemplate.author
        }
      })
      await changedBook.setAuthor(authorChange[0])
      const changedBookAuthor = await Book.findByPk(req.params.id, {
        include: Author
      })
      res.json(changedBookAuthor)
    } else {
      res.json(changedBook)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const bookToRemove = await Book.findByPk(req.params.id)
    await bookToRemove.destroy()
    res.send(req.params.id)
  } catch (error) {
    next(error)
  }
})
module.exports = router
