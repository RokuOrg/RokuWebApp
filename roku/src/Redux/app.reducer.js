import {applyMiddleware, combineReducers, createStore} from "redux";
import globalReducer from "./Global/global.reducer";
import thunk from "redux-thunk"
import authenticationReducer from "./Authentication/authentication.reducer";

let rootReducer = combineReducers({
    auth: authenticationReducer,
    global: globalReducer
})

export  default createStore(rootReducer, applyMiddleware(thunk))