import {
    ADD_DOCUMENT,
    GET_DOCUMENT,
    GET_SINGLE_DOCUMENT,
    DELETE_DOCUMENT
} from "../actionTypes";

const initialState = {
    documents : {},
    documentDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_DOCUMENT:
          
            return {
				...state,
                documents: action.payload,
				documentDetails: []
			};
       
        return {
            ...state,
            documentDetails: action.payload
        };
        case GET_DOCUMENT:
            return {
                ...state,
                documents: action.payload
            };
        case GET_SINGLE_DOCUMENT:
            return {
                ...state,
                documentDetails: action.payload
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                documents: action.payload
            };
        default:
            return state;
    }
}
