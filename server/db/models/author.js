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
    defaultValueL:
      'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'
  }
})

module.exports = Author
