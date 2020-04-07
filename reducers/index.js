import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  tags: []
}


const reducer = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    default:
      return state
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags.filter(tag => tag !== action.tag), action.tag]
      }
    case 'REMOVE_TAG':
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.tag),
      }
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}