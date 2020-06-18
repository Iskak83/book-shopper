import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import booksReducer from './books'
import singleBookReducer from './book'
import authorsReducer from './authors'
import singleAuthorReducer from './singleAuthor'

const reducer = combineReducers({
  user,
  books: booksReducer,
  authors: authorsReducer,
  singleBook: singleBookReducer,
  singleAuthor: singleAuthorReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
