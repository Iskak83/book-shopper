const {expect} = require('chai')

const app = require('../index')
const agent = require('supertest')(app)
const request = require('supertest')
const db = require('../db')
const Book = require('../db/models/book')

describe('Book routes', () => {
  let storedBooks

  const bookData = [
    {
      name: 'Frankenstein; or, The Modern Prometheus',
      description:
        'Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a hideous sapient creature in an unorthodox scientific experiment.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg',
      tag: 'Gothic/Horror',
      price: 1299,
      inStock: 100
    },
    {
      name: 'Don Quixote',
      description:
        'Don Quixote is a Spanish novel by Miguel de Cervantes. Published in two parts, in 1605 and 1615, Don Quixote is the most influential work of literature from the Spanish Golden Age and the entire Spanish literary canon.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png/500px-Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png',
      tag: 'Romance',
      price: 1099,
      inStock: 88
    },
    {
      name: 'Moby-Dick; or, The Whale',
      description: `Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge on Moby Dick, the giant white sperm whale that on the ship's previous voyage bit off Ahab's leg at the knee.`,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Moby-Dick_FE_title_page.jpg/440px-Moby-Dick_FE_title_page.jpg',
      tag: 'Adventure',
      price: 999,
      inStock: 95
    }
  ]

  beforeEach(async () => {
    const createdBook = await Book.bulkCreate(bookData)
    storedBooks = createdBook.map(book => book.dataValues)
  })

  // Route for fetching all authors
  describe('GET `/api/books`', () => {
    it('serves up all Books', async () => {
      const response = await agent.get('/api/books')

      expect(response.body).to.be.an('array')
      expect(response.body).to.have.length(3)
      expect(response.body[0].name).to.equal(storedBooks[0].name)
      expect(response.body[0].description).to.equal(storedBooks[0].description)
      expect(response.body[0].image).to.equal(storedBooks[0].image)
      expect(response.body[0].tag).to.equal(storedBooks[0].tag)
      expect(response.body[0].price).to.equal(storedBooks[0].price)
      expect(response.body[0].inStock).to.equal(storedBooks[0].inStock)
    })
  })

  // Route for fetching a single book
  describe('GET `/api/books/:id`', () => {
    it('serves up a single Author by its `id`', async () => {
      const response = await agent.get('/api/books/3').expect(200)

      expect(response.body).to.be.an('object')
      expect(response.body.name).to.equal(storedBooks[2].name)
      expect(response.body.description).to.equal(storedBooks[2].description)
      expect(response.body.image).to.equal(storedBooks[2].image)
      expect(response.body.tag).to.equal(storedBooks[2].tag)
      expect(response.body.price).to.equal(storedBooks[2].price)
      expect(response.body.inStock).to.equal(storedBooks[2].inStock)
    })
  })

  describe('POST `/api/books/`', () => {
    it('adds a new book via POST request', async () => {
      const bookToPost = {
        name: 'War and Peace',
        description: `War and Peace is a novel by the Russian author Leo Tolstoy, first published serially, then published in its entirety in 1869. It is regarded as one of Tolstoy's finest literary achievements and remains a classic of world literature.`,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg',
        tag: 'Historical Fiction',
        price: 1088,
        inStock: 100
      }
      const response = await agent
        .post('/api/books')
        .send(bookToPost)
        .expect(200)

      expect(response.body).to.be.an('object')
      expect(response.body.name).to.equal(bookToPost.name)
      expect(response.body.description).to.equal(bookToPost.description)
      expect(response.body.image).to.equal(bookToPost.image)
      expect(response.body.tag).to.equal(bookToPost.tag)
      expect(response.body.price).to.equal(bookToPost.price * 100)
      expect(response.body.inStock).to.equal(bookToPost.inStock)
    })

    it('adds a new book with only the required inputs', async () => {
      const bookToPost = {
        name: 'Anna Karenina',
        price: 888
      }
      const response = await agent
        .post('/api/books')
        .send(bookToPost)
        .expect(200)

      expect(response.body).to.be.an('object')
      expect(response.body.name).to.equal(bookToPost.name)
      expect(response.body.description).to.equal(null)
      expect(response.body.image).to.equal(
        'https://images-na.ssl-images-amazon.com/images/I/61CxJAPauWL._AC_SL1010_.jpg'
      )
      expect(response.body.tag).to.equal(null)
      expect(response.body.price).to.equal(bookToPost.price * 100)
      expect(response.body.inStock).to.equal(100)
    })
  })
})
