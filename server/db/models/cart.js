const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Cart = db.define('cart', {
    booksInCart: {
        type: Sequelize.ARRAY
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = Cart