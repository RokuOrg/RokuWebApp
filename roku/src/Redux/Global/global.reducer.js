import {Actions} from "./global.actions";

const initialState = {
    api: undefined,
    darkmode: true
}

export default function globalReducer(state = initialState, action){
    switch (action.type){
        case Actions.setApi:
            return {...state, api: action.payload.api}
        case Actions.setDarkmode:
            return {...state, darkmode: action.payload.darkmode}
        default:
            return state;
    }
}