/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(() => {
      return User.create({
        email: 'cody@email.com',
        password: '98765',
        isAdmin: true
      })
    })

    it('GET /api/users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200)

      expect(response.body).to.be.an('array')
      expect(response.body[0].id).to.be.equal(1)
    })

    it('GET /api/users/:id', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(response.body).to.be.an('object')
      expect(response.body.id).to.be.equal(1)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
