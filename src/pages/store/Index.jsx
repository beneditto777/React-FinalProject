import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const initialStae = {
    loader: true,
    movies: [],
    searchPage: [],
    totalResults: ""
}

const reducer = (state = initialStae, action) => {
    switch (action.type) {
        case "SET_LOADER":
            return {...state, loader: true}
            
        case "SET_MOVIES":
            let data = action.payload ? action.payload : []
            return {...state, movies: data, loader: action.loader}

        case "SET_MOVIES_SEARCH":
            return {...state, searchPage: action.payload, loader: action.loader, totalResults: action.result}

        default:
            return state;
    }
}

let store = createStore(reducer, applyMiddleware(thunk, logger))

export default store