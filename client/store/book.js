import axios from 'axios'
import history from '../history'

// ACTION TYPE
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'

// ACTION CREATOR
const getSingleBook = singleBook => ({
  type: GET_SINGLE_BOOK,
  singleBook
})

// THUNK
export const getSingleBookThunk = bookId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/books/${bookId}`)
    dispatch(getSingleBook(data))
  } catch (err) {
    console.log('Error in my getSingleBookThunk!')
    console.error(err)
  }
}
export const updateBook = (bookId, bookChanges) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/books/${bookId}`, bookChanges)
    dispatch(getSingleBook(data))
  } catch (error) {
    console.log('Error in updating this Book!')
  }
}

// REDUCER
export default function singleBookReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return action.singleBook
    default:
      return state
  }
}
