import {
    ADD_LINK,
    GET_LINK,
    GET_SINGLE_LINK,
    DELETE_LINK
} from "../actionTypes";

const initialState = {
    links : {},
    linkDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_LINK:
            return {
                ...state,
                links: action.payload
                
            };
        
        return {
            ...state,
            linkDetails: action.payload
        };
        case GET_LINK:
            return {
                ...state,
                links: action.payload
            };
        case GET_SINGLE_LINK:
            console.log("getSingleLink",action.payload)
            return {
                ...state,
                linkDetails: action.payload
            };
        case DELETE_LINK:
            return {
                ...state,
                links: action.payload
            };
        default:
            return state;
    }
}
