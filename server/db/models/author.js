const Sequelize = require('sequelize')
const db = require('../db')

const Author = db.define('author', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
  },

  bio: {
    type: Sequelize.TEXT,
    defaultValue:
      'This is a new author for our company. More on this author coming soon'
  }
})

module.exports = Author
