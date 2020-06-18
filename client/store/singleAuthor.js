import axios from 'axios'

// ACTION TYPE
const GET_SINGLE_AUTHOR = 'GET_SINGLE_AUTHOR'

// ACTION CREATOR
const getSingleAuthor = singleAuthor => ({
  type: GET_SINGLE_AUTHOR,
  singleAuthor
})

// THUNK
export const getSingleAuthorThunk = authorId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/authors/${authorId}`)
    dispatch(getSingleAuthor(data))
  } catch (err) {
    console.log('Error in my getSingleAuthorThunk!')
    console.error(err)
  }
}

// REDUCER
export default function singleAuthorReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_AUTHOR:
      return action.singleAuthor
    default:
      return state
  }
}
