const {expect} = require('chai')
const request = require('supertest')
const agent = require('supertest')(app)
const db = require('../db')
const app = require('../index')
const Author = require('../db/models/author')

describe('Authors routes', () => {
  let storedAuthors

  const authorData = [
    {
      name: 'Grace Hopper'
    },
    {
      name: 'Rob'
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
      expect(response.body).to.have.length(2)
      expect(response.body[0].name).to.equal(storedAuthors[0].name)
    })
  })

  // Route for fetching a single author
  describe('GET `/api/authors/:id`', () => {
    it('serves up a single Author by its `id`', async () => {
      const response = await agent.get('/api/authors/2').expect(200)
      expect(response.body.name).to.equal('Fullstack Academy')
    })
  })
})
