/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Author = db.model('author')

describe('Author model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('attributes', () => {
    it('returns object', async () => {
      let author = await Author.build({
        name: 'Poter'
      })
      expect(author.name).to.be.equal('Poter')
    })
  })

  it('name cannot be empty', async () => {
    const author = Author.build({name: ''})
    try {
      await author.validate()
      throw Error('validation should have failed with empty name')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on name')
    }
  })
})
