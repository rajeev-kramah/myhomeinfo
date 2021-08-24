import {
    ADD_REFERENCE,
    GET_REFERENCES,
    GET_SINGLE_REFERENCE
} from "../actionTypes";

const initialState = {
    references: {},
    referenceDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_REFERENCE:
            return {
				...state,
                referenceDetails: action.payload
			};
        case GET_REFERENCES:
            return {
                ...state,
                references: action.payload
            };
        case GET_SINGLE_REFERENCE:
            return {
                ...state,
                referenceDetails: action.payload
            }
        default:
            return state;
    }
}