/* global describe beforeEach it */

// const {expect} = require('chai')
import {expect} from 'chai'
// import {mount} from 'enzyme'
// import sinon from 'sinon'
const db = require('../db')
const Book = require('./book')

describe('Book Model', () => {
  let book
  before(() => db.sync({force: true}))
  beforeEach(() => {
    book = {
      name: 'Frankenstein; or, The Modern Prometheus',
      description:
        'Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a hideous sapient creature in an unorthodox scientific experiment.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg',
      tag: 'Gothic/Horror',
      price: 1299,
      inStock: 100
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has fields name, description, image, tag, price, inStock', async () => {
    book.shouldNotExist = 'this attribute should not be allowed'
    const newBook = await Book.create(book)

    expect(newBook.name).to.equal('Frankenstein; or, The Modern Prometheus')
    expect(newBook.description).to.equal(
      'Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a hideous sapient creature in an unorthodox scientific experiment.'
    )
    expect(newBook.image).to.equal(
      'https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg'
    )
    expect(newBook.tag).to.equal('Gothic/Horror')
    expect(newBook.price).to.equal(1299)
    expect(newBook.inStock).to.equal(100)
    expect(newBook.shouldNotExist).to.equal(undefined)
  })

  it('name field cannot be empty', async () => {
    book.name = ''
    try {
      const bookNameEmptyString = await Book.create(book)
      if (bookNameEmptyString) {
        throw Error('Validation should have failed with empty name')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })

  it('price field cannot be empty', async () => {
    book.price = ''
    try {
      const bookPriceEmptyString = await Book.create(book)
      if (bookPriceEmptyString) {
        throw Error('Validation should have failed with empty price')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })

  it(`price field doesn't accept negative numbers`, async () => {
    book.price = -1
    try {
      const bookPriceNegativeNumber = await Book.create(book)
      if (bookPriceNegativeNumber) {
        throw Error('Validation should have failed with negative number')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })

  it(`price field doesn't accept non-integer numbers`, async () => {
    book.price = 1.5
    try {
      const bookPriceNonIntegerNumber = await Book.create(book)
      if (bookPriceNonIntegerNumber) {
        throw Error('Validation should have failed with non-integer number')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })
})
