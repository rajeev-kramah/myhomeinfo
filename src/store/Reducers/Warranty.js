import { nodeName } from "jquery";
import {
    ADD_WARRANTY,
    GET_WARRANTY,
    GET_SINGLE_WARRANTY,
    DELETE_WARRANTY
} from "../actionTypes";

const initialState = {
    warranties : {},
    warrantyDetails : {},
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_WARRANTY:
            if(action.payload.lastTab){
                return {
                    ...state,
                    warranties: action.payload,
                    warrantyDetails: []
                };
            }
            return {
                ...state,
                warrantyDetails: action.payload
            };
        case GET_WARRANTY:
            return {
                ...state,
                warranties: action.payload
            };
        case GET_SINGLE_WARRANTY:
            return {
                ...state,
                warrantyDetails: action.payload
            };
        case DELETE_WARRANTY:
            return {
                ...state,
                warranties: action.payload
            }
        default:
            return state;
    }
}
