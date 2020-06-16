/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Author = db.model('author')

describe('Author model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('attributes', () => {
    it('returns true if the password is correct', () => {
      expect(cody.correctPassword('bones')).to.be.equal(true)
    })

    it('returns false if the password is incorrect', () => {
      expect(cody.correctPassword('bonez')).to.be.equal(false)
    })
    // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
