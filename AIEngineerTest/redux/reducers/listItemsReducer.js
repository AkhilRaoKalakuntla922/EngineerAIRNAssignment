import { GET_ITEMS } from '../constants'

const INITIAL_STATE = {
    listItems: [],
    pageNo: 0
}



export function listItemReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                listItems: [...state.listItems, ...action.listItems.hits],
                pageNo: action.listItems.page + 1
            }
        default:
            return {
                ...state
            }
    }

}