/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Author = db.model('author')

describe('Author model', () => {
  let author
  before(() => db.sync({force: true}))
  beforeEach(() => {
    author = {
      name: 'Mary Shelley',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/RothwellMaryShelley.jpg/440px-RothwellMaryShelley.jpg',
      bio:
        'Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus.'
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has name, image, and bio fields', async () => {
    const newAuthor = await Author.create(author)
    expect(newAuthor.name).to.equal('Mary Shelley')
    expect(newAuthor.image).to.equal(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/RothwellMaryShelley.jpg/440px-RothwellMaryShelley.jpg'
    )
    expect(newAuthor.bio).to.equal(
      'Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus.'
    )
  })

  it('name cannot be empty', async () => {
    author.name = ''
    try {
      const authorNameEmptyString = await Author.create(author)
      if (authorNameEmptyString) {
        throw Error('Validation should have failed with empty name field')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })

  it('image url is limited to 255 characters', async () => {
    author.image =
      'https://i.guim.co.uk/img/media/3de53a6d9c3b5547bc38884993e8fe763cba5f64/0_217_1994_1195/master/1994.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3eaddaab6ac75be7f556efb84a5c859434534534545435345394583945834958989080980980983453453049582304598345345098345039485340958'
    try {
      const extraLongImageUrl = await Author.create(author)
      if (extraLongImageUrl) {
        throw Error(
          'Validation should have failed with image url greater than 255 characters'
        )
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })

  it('bio accepts an input of unlimited length', async () => {
    author.bio = `Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus.`
    try {
      const extraLongAuthorBio = await Author.create(author)
      if (!extraLongAuthorBio) {
        throw Error('Input should accept bio of any length')
      }
    } catch (err) {
      expect(err.message).to.not.have.string(
        'Input should accept bio of any length'
      )
    }
  })
})
