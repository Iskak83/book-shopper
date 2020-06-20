/* global describe beforeEach it */

// const {expect} = require('chai')
import {expect} from 'chai'
import {mount} from 'enzyme'
import sinon from 'sinon'
const db = require('../db')
const Book = require('./book')

describe('Book Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields name, description, image, tag, price, inStock', async () => {
    const book = await Book.create({
      name: 'Jupiter Jumpstart',
      description:
        'The best JavaScript Academy for toddlers in the solar system!',
      image: '/images/jupiter.png',
      tag: 'HHHH',
      price: 400,
      inStock: 100
    })
    expect(book.name).to.equal('Jupiter Jumpstart')
    expect(book.price).to.equal(400)
    expect(book.image).to.equal('/images/jupiter.png')
    expect(book.description).to.equal(
      'The best JavaScript Academy for toddlers in the solar system!'
    )
    expect(book.tag).to.equal('HHHH')
    expect(book.inStock).to.equal(100)
  })

  it('name and price cannot be empty', async () => {
    const book = Book.build({name: '', price: ''})
    try {
      await book.validate()
      throw Error('validation should have failed with empty name and price')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on name')
      expect(err.message).to.contain('Validation notEmpty on price')
    }
  })
})
