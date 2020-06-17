/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Book = db.model('book')

describe('Book model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('attributes', () => {
    it('returns object', async () => {
      let book = await Book.create({
        name: 'Garry',
        price: 3.99,
        authorName: 'Poter'
      })
      expect(book.name).to.be.equal('Garry')
      expect(book.price).to.be.equal(3.99)
      expect(book.authorName).to.be.equal('Poter')
    })
    it('returns undefined', async () => {
      expect(
        await Book.create({
          name: 'Garry',
          authorName: 'Poter'
        })
      ).to.throw('notNull Violation: book.price cannot be null')
    })

    // it('returns false if the password is incorrect', () => {
    //   expect(cody.correctPassword('bonez')).to.be.equal(false)
    // })
    // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
