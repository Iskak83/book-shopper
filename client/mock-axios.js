import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
const mock = new MockAdapter(axios)
const app = require('../server')
const agent = require('supertest')(app)

const mockBooks = [
  {
    id: 1,
    name: 'Frankenstein; or, The Modern Prometheus',
    description:
      'Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a hideous sapient creature in an unorthodox scientific experiment.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg',
    tag: 'Gothic/Horror',
    price: 1299,
    inStock: 100
  },
  {
    id: 2,
    name: 'Don Quixote',
    description:
      'Don Quixote is a Spanish novel by Miguel de Cervantes. Published in two parts, in 1605 and 1615, Don Quixote is the most influential work of literature from the Spanish Golden Age and the entire Spanish literary canon.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png/500px-Miguel_de_Cervantes_%281605%29_El_ingenioso_hidalgo_Don_Quixote_de_la_Mancha.png',
    tag: 'Romance',
    price: 1099,
    inStock: 88
  },
  {
    id: 3,
    name: 'Moby-Dick; or, The Whale',
    description: `Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge on Moby Dick, the giant white sperm whale that on the ship's previous voyage bit off Ahab's leg at the knee.`,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Moby-Dick_FE_title_page.jpg/440px-Moby-Dick_FE_title_page.jpg',
    tag: 'Adventure',
    price: 999,
    inStock: 95
  }
]

const mockAuthors = [
  {
    name: 'Mary Shelley',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/RothwellMaryShelley.jpg/440px-RothwellMaryShelley.jpg',
    bio:
      'Mary Wollstonecraft Shelley was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus.'
  },
  {
    name: 'Miguel de Cervantes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cervantes_J%C3%A1uregui.jpg/440px-Cervantes_J%C3%A1uregui.jpg',
    bio: `Miguel de Cervantes, also Cervantes, was a Spanish writer widely regarded as the greatest writer in the Spanish language, and one of the world's pre-eminent novelists.`
  },
  {
    name: 'Herman Melville',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Herman_Melville_by_Joseph_O_Eaton.jpg/440px-Herman_Melville_by_Joseph_O_Eaton.jpg',
    bio: `Herman Melville was an American novelist, short story writer and poet of the American Renaissance period.`
  }
]

beforeEach(() => {
  // Mock GET /api/books => all books
  mock.onGet('api/books').reply(200, mockBooks)

  // Mock GET /api/authors => all authors
  mock.onGet('api/authors').reply(200, mockAuthors)

  // Mock GET /api/books/:id => single book with matching id
  mock.onGet(/\/api\/books\/\d+/).reply(config => {
    const urlArr = config.url.split('/')
    const id = Number(urlArr.slice(-1)[0])
    const book = mockBooks.find(elem => elem.id === id)
    return book ? [200, book] : [404]
  })

  // Mock GET /api/authors/:id => single author with matching id
  mock.onGet(/\/api\/authors\/\d+/).reply(config => {
    const urlArr = config.url.split('/')
    const id = Number(urlArr.slice(-1)[0])
    const author = mockBooks.find(elem => elem.id === id)
    return author ? [200, author] : [404]
  })

  // If something in the tests doesn't match one of the above routes,
  // use a supertest agent to use the actual API
  mock.onAny().reply(async req => {
    const response = await agent[req.method](req.url, req.data)
    return [response.status, response.body]
  })
})

afterEach(() => mock.reset())

export default mock
