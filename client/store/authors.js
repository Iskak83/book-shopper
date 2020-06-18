import axios from 'axios'

// ACTION TYPES
const GET_All_AUTHORS = 'GET_All_AUTHORS'

// ACTION CREATOR
const getAllAuthors = allAuthors => ({
  type: GET_All_AUTHORS,
  allAuthors
})

// THUNK
export const getAllAuthorsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/authors')
    console.log(data)
    dispatch(getAllAuthors(data))
    // console.log()
  } catch (err) {
    console.log('Error in my getAllAuthorsThunk!')
  }
}

// REDUCER
export default function authorsReducer(state = [], action) {
  switch (action.type) {
    case GET_All_AUTHORS:
      return action.allAuthors
    default:
      return state
  }
}
