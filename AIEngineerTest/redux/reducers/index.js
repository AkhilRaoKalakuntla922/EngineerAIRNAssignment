import React from 'react'

import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import {listItemReducer} from './listItemsReducer'



const RootReducer = combineReducers({
    listItems: listItemReducer
})


export default RootReducer
