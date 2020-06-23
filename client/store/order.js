import axios from 'axios'
import history from '../history'

// ACTION TYPE
const GET_ORDER = 'GET_ORDER'
const REMOVE_BOOK_FROM_ORDER = 'REMOVE_BOOK_FROM_ORDER'

// ACTION CREATOR
const BookInCart = collection => ({
  type: GET_ORDER,
  collection
})

const retrieveCart = collection => ({
  type: GET_ORDER,
  collection
})
const removedBook = id => ({
  type: REMOVE_BOOK_FROM_ORDER,
  id
})

// THUNK
export const putBookInCart = orderReq => async dispatch => {
  try {
    const {data} = await axios.put('../api/orders', orderReq)
    dispatch(BookInCart(data))
  } catch (err) {
    console.log('Error in my Order Thunk!')
    console.error(err)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('../api/orders')
    dispatch(retrieveCart(data))
  } catch (error) {
    console.log("Error Where's the cart?")
    console.error(error)
  }
}
export const removeBook = id => async dispatch => {
  try {
    const data = await axios.delete(`/api/orders/${id}`)
    dispatch(removedBook(id))
  } catch (error) {
    console.log("Error, the Book wasn't removed from the cart")
  }
}
export const placedOrder = finalOrder => async dispatch => {
  try {
    const {data} = await axios.put('../api/orders/checkout', finalOrder)
    console.log(data)
    dispatch(retrieveCart(data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDER:
      return action.collection
    case REMOVE_BOOK_FROM_ORDER:
      return state.filter(book => book.bookId !== action.id)
    default:
      return state
  }
}
