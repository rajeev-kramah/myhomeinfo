import {
    GET_ACCOUNT,
    UPDATE_ACCOUNT
} from "../actionTypes";

const initialState = {
    accountDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_ACCOUNT:
            return {
				...state,
                accountDetails: action.payload
			};
        case GET_ACCOUNT:
            return {
                ...state,
                accountDetails: action.payload
            };
        default:
            return state;
    }
}