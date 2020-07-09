import { GET_ITEMS, BASE_URL } from '../constants'


export function dispatchListItems(listItems) {
    return {
        type: GET_ITEMS,
        listItems
    }
}

export function fetchListItems(pageNo) {
    return (dispatch) => {
        fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + pageNo)
            .then((response) => response.json())
            .then(json => {
                dispatch(dispatchListItems(json))
            })
            .catch(error => {
                console.log(error)
            })
    }
}