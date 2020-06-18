const Sequelize = require('sequelize')
const db = require('../db')
// const User = require('./user')
const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalPrice: {
    type: Sequelize.INTEGER
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Order
