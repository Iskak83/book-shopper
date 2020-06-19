const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.TEXT
  },

  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images-na.ssl-images-amazon.com/images/I/61CxJAPauWL._AC_SL1010_.jpg'
  },

  tag: {
    type: Sequelize.TEXT
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
    defaultValue: 100
  }
})

module.exports = Book
