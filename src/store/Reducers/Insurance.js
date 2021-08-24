import { nodeName } from "jquery";
import {
    ADD_INSURANCE,
    GET_INSURANCE,
    GET_SINGLE_INSURANCE,
    DELETE_INSURANCE
} from "../actionTypes";

const initialState = {
    insurances : {},
    insuranceDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_INSURANCE:
            if(action.payload.lastTab){
            return {
				...state,
                insurances: action.payload,
				insuranceDetails: []
			};
        }
        return {
            ...state,
            insuranceDetails: action.payload
        };
        case GET_INSURANCE:
            return {
                ...state,
                insurances: action.payload
            };
        case GET_SINGLE_INSURANCE:
            return {
                ...state,
                insuranceDetails: action.payload
            };
        case DELETE_INSURANCE:
            return {
                ...state,
                insurances: action.payload
            };
        default:
            return state;
    }
}