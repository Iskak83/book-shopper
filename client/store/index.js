import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import booksReducer from './books'
import singleBookReducer from './book'
import authorsReducer from './authors'
import singleAuthorReducer from './singleAuthor'
import orderReducer from './order'
const reducer = combineReducers({
  user,
  books: booksReducer,
  authors: authorsReducer,
  singleBook: singleBookReducer,
  singleAuthor: singleAuthorReducer,
  order: orderReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
export const store = createStore(reducer, middleware)

export default store
export * from './user'
