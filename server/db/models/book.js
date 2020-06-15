const Sequelize = require('sequelize')
const db = require('../db')

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
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images-na.ssl-images-amazon.com/images/I/61CxJAPauWL._AC_SL1010_.jpg'
  },
  genre: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
})

module.exports = Book
