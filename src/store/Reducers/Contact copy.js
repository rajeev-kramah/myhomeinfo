import { 
    ADD_SHARE_DETAILS,
    GET_SHARE_DETAILS,
    GET_SHARE,
    DELETE_SHARE
	
} from "../actionTypes";

const initialState = {
    shares: {},
    shareDetails: {},

};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_SHARE_DETAILS:
			return {
				...state,
				shares: action.payload
			};
        case GET_SHARE_DETAILS:
            return {
                ...state,
                shares: action.payload
            };
        case GET_SHARE:
            return {
                ...state,
                shareDetails: action.payload
            };

        case DELETE_SHARE:
            return {
                ...state,
                shares: action.payload
            };
        default:
            return state;
    }
}
    