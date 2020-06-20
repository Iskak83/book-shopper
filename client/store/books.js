import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_All_BOOKS = 'GET_All_BOOKS'
const ADD_BOOK = 'ADD_BOOK'

// ACTION CREATOR
const getAllBooks = allBooks => ({
  type: GET_All_BOOKS,
  allBooks
})

const addBook = book => ({
  type: ADD_BOOK,
  book
})

// THUNK
export const getAllBooksThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/books')
    dispatch(getAllBooks(data))
  } catch (err) {
    console.log('Error in my getAllBooksThunk!')
    console.log(err)
  }
}

export const addBookThunk = body => async dispatch => {
  try {
    const {data} = await axios.post('/api/books', body)
    console.log(data)
    dispatch(addBook(data))
  } catch (err) {
    console.log('Error in my addBookThunk!')
    console.log(err)
  }
}

// REDUCER
export default function booksReducer(state = [], action) {
  switch (action.type) {
    case GET_All_BOOKS:
      return action.allBooks
    case ADD_BOOK:
      return [...state, action.book]
    default:
      return state
  }
}
