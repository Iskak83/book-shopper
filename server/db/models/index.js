const User = require('./user')
const Book = require('./book')
const Author = require('./author')
const Order = require('./order')
const Sequelize = require('sequelize')
const db = require('../db')

Author.hasMany(Book)
Book.belongsTo(Author)

User.hasMany(Order)
Order.belongsTo(User)

const BookOrder = db.define('BookOrder', {
  savedPrice: {
    type: Sequelize.INTEGER
  }
})

BookOrder.afterCreate(async bookOrder => {
  console.log(bookOrder)
  bookOrder.savedPrice = 1039459
})

Order.belongsToMany(Book, {through: 'BookOrder'})
Book.belongsToMany(Order, {through: 'BookOrder'})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Book,
  Author,
  Order,
  BookOrder
}
