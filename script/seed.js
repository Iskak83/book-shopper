const {green, red} = require('chalk')
const db = require('../server/db')
const {Book, User, Order, Author, BookOrder} = require('../server/db/models')
let seededBooks = [
  {
    name: 'Moby Dick; or, The Whale',
    description: `Moby Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge on Moby Dick, the giant white sperm whale that on the ship's previous voyage bit off Ahab's leg at the knee.`,
    authorName: 'Herman Melville',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Moby-Dick_FE_title_page.jpg/440px-Moby-Dick_FE_title_page.jpg',
    tags: [
      'Fiction',
      'Historical fiction',
      'Sea stories',
      'Whaling',
      'Ship captains'
    ],
    price: 1099,
    quantity: 1
  },
  {
    name: 'War and Peace',
    description: `War and Peace is a novel by the Russian author Leo Tolstoy, first published serially, then published in its entirety in 1869. It is regarded as one of Tolstoy's finest literary achievements and remains a classic of world literature`,
    authorName: 'Leo Tolstoy',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/a/af/Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg',
    tags: ['Fiction', 'Historical fiction', 'Romance', 'Russia'],
    price: 799,
    quantity: 1
  },
  {
    name: 'Anna Karenina',
    description: `Anna Karenina is a novel by the Russian author Leo Tolstoy, first published in book form in 1878. Many writers consider Anna Karenina the greatest work of literature ever and Tolstoy himself called it his first true novel.`,
    authorName: 'Leo Tolstoy',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/AnnaKareninaTitle.jpg/440px-AnnaKareninaTitle.jpg',
    tags: [
      'Fiction',
      'Historical fiction',
      'War stories',
      'Napoleonic Wars',
      'Russia'
    ],
    price: 999,
    quantity: 1
  },
  {
    name: 'Don Quixote',
    description: `Don Quixote is a Spanish novel by Miguel de Cervantes. Published in two parts, in 1605 and 1615, Don Quixote is the most influential work of literature from the Spanish Golden Age and the entire Spanish literary canon. A founding work of Western literature, it is often labeled "the first modern novel" and many authors consider it to be the best literary work ever written.`,
    authorName: 'Miguel de Cervantes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png/500px-Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png',
    tags: [
      'Fiction',
      'Historical fiction',
      'Romance',
      'Knights and knighthood',
      'Spain'
    ],
    price: 599,
    quantity: 1
  },
  {
    name: 'Frankenstein; or, The Modern Prometheus',
    description: `Frankenstein; or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a hideous sapient creature in an unorthodox scientific experiment.`,
    authorName: 'Mary Shelley',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg',
    tags: ['Fiction', 'Gothic fiction', 'Romance', 'Monsters', 'England'],
    price: 1199,
    quantity: 1
  }
]

let seededAuthors = [
  {
    name: 'Herman Melville',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Herman_Melville_by_Joseph_O_Eaton.jpg/440px-Herman_Melville_by_Joseph_O_Eaton.jpg',
    bio:
      'Herman Melville was an American novelist, short story writer and poet of the American Renaissance period.'
  },
  {
    name: 'Leo Tolstoy',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg/440px-L.N.Tolstoy_Prokudin-Gorsky.jpg',
    bio:
      'Count Lev Nikolayevich Tolstoy, usually referred to in English as Leo Tolstoy, was a Russian writer who is regarded as one of the greatest authors of all time.'
  },
  {
    name: 'Miguel de Cervantes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cervantes_J%C3%A1uregui.jpg/440px-Cervantes_J%C3%A1uregui.jpg',
    bio: `Miguel de Cervantes Saavedra, also Cervantes, was a Spanish writer widely regarded as the greatest writer in the Spanish language, and one of the world's pre-eminent novelists.`
  },
  {
    name: 'Mary Shelley',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/RothwellMaryShelley.jpg/440px-RothwellMaryShelley.jpg',
    bio: `Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus.`
  }
]

let seededUsers = [
  {
    email: 'cody@email.com',
    password: '12345'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    const author1 = await Author.create(seededAuthors[0])
    const author2 = await Author.create(seededAuthors[1])
    const author3 = await Author.create(seededAuthors[2])
    const author4 = await Author.create(seededAuthors[3])

    const book1 = await Book.create(seededBooks[0])
    const book2 = await Book.create(seededBooks[1])
    const book3 = await Book.create(seededBooks[2])
    const book4 = await Book.create(seededBooks[3])
    const book5 = await Book.create(seededBooks[4])
    const order = await Order.create({})
    order.addBook(book1, {through: {savedPrice: book1.price}})
    order.addBook(book2)
    await order.save()

    const user1 = await User.create(seededUsers[0])
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh no! Error with our seed file'))
      console.error(err)
      db.close()
    })
}
