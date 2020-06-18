const Sequelize = require('sequelize')
const db = require('../db')
const Author = require('./author')

const Book = db.define('book', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.TEXT
  },

  authorName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images-na.ssl-images-amazon.com/images/I/61CxJAPauWL._AC_SL1010_.jpg'
  },

  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

Book.afterCreate(async (bookInstance, optionsObject) => {
  bookInstance.setAuthor(
    await Author.findOne({
      where: {name: bookInstance.authorName}
    })
  )
  // console.log('booInstance.__proto__:', bookInstance.__proto__)
  await bookInstance.save()
})

module.exports = Book
