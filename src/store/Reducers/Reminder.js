import {
    ADD_EVENT,
    GET_EVENT,
    DELETE_EVENT
} from "../actionTypes";

const initialState = {
    events : {},
    eventDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_EVENT:
            return {
                ...state,
                events: action.payload
            
            };
           
        case GET_EVENT:
            return {
                ...state,
                events: action.payload
            };
     
        case DELETE_EVENT:
            return {
                ...state,
                events: action.payload
            };
        default:
            return state;
           
    }
}
