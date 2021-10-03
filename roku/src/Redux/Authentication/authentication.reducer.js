import {Actions} from "./authentication.actions";

const initialState = {
    LoggedIn: false,
    Token: null,
    Username: null
}

export default function authenticationReducer(state = initialState, action){
    switch(action.type){
        case Actions.setLoggedIn:
            return {...state, LoggedIn: action.payload.loggedIn}
        case Actions.setToken:
            return {...state, Token: action.payload.Token}
        case Actions.setUsername:
            return {...state, Username: action.payload.Username}
        default:
            return state
    }
}