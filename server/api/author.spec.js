const {expect} = require('chai')
//test
const app = require('../index')
const agent = require('supertest')(app)
const request = require('supertest')
const db = require('../db')
const Author = require('../db/models/author')

describe('Authors routes', () => {
  let storedAuthors

  const authorData = [
    {
      name: 'Mary Shelley',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/RothwellMaryShelley.jpg/440px-RothwellMaryShelley.jpg',
      bio:
        'Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus.'
    },
    {
      name: 'Miguel de Cervantes',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cervantes_J%C3%A1uregui.jpg/440px-Cervantes_J%C3%A1uregui.jpg',
      bio: `Miguel de Cervantes, also Cervantes, was a Spanish writer widely regarded as the greatest writer in the Spanish language, and one of the world's pre-eminent novelists.`
    }
  ]

  beforeEach(async () => {
    const createdAuthor = await Author.bulkCreate(authorData)
    storedAuthors = createdAuthor.map(author => author.dataValues)
  })

  // Route for fetching all authors
  describe('GET `/api/authors`', () => {
    it('serves up all Authors', async () => {
      const response = await agent.get('/api/authors')

      expect(response.body).to.be.an('array')
      expect(response.body).to.have.length(2)
      expect(response.body[0].name).to.equal(storedAuthors[0].name)
      expect(response.body[0].image).to.equal(storedAuthors[0].image)
      expect(response.body[0].bio).to.equal(storedAuthors[0].bio)
    })
  })

  // Route for fetching a single author
  describe('GET `/api/authors/:id`', () => {
    it('serves up a single Author by its `id`', async () => {
      const response = await agent.get('/api/authors/2').expect(200)

      expect(response.body).to.be.an('object')
      expect(response.body.name).to.equal(storedAuthors[1].name)
      expect(response.body.image).to.equal(storedAuthors[1].image)
      expect(response.body.bio).to.equal(storedAuthors[1].bio)
    })
  })
})
