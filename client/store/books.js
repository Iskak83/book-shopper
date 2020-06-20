import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_All_BOOKS = 'GET_All_BOOKS'

// ACTION CREATOR
const getAllBooks = allBooks => ({
  type: GET_All_BOOKS,
  allBooks
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

// REDUCER
export default function booksReducer(state = [], action) {
  switch (action.type) {
    case GET_All_BOOKS:
      return action.allBooks
    default:
      return state
  }
}
