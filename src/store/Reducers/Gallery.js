import {
    ADD_GALLERY,
    GET_GALLERY,
    DELETE_GALLERY
} from "../actionTypes";

const initialState = {
    galleries : {},
    galleryDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_GALLERY:
            return {
				...state,
                galleries: action.payload,
				galleryDetails: []
			};
        case GET_GALLERY:
            return {
                ...state,
                galleries: action.payload
            };
        case DELETE_GALLERY:
            return {
                ...state,
                galleries: action.payload
            };
        default:
            return state;
    }
}
