import { USER_SIGNUP, 
	FORGET_PASSWORD, 
	RESPONSE_ERROR,
	LOGIN_USER,
	RESET_PASSWORD,
	RESPONSE_SUCCESS } from "../actionTypes";

const initialState = {
	user: {},
	responseError: {},
	responseSuccess: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case USER_SIGNUP:
			return {
				...state,
				user: action.payload
			};
		case FORGET_PASSWORD:
			return {
				...state,
				user: action.payload
			}
		case RESPONSE_ERROR:
			return {
				...state,
				responseError: action.payload
			}
		case RESPONSE_SUCCESS:
			return {
				...state,
				responseSuccess: action.payload
			}
		case LOGIN_USER:
			document.cookie = "jwt=" + action.payload.data[0] + ";path=/" ;
			localStorage.setItem('user', JSON.stringify(action.payload.data[0]));
			return {
				...state,
				user: action.payload.data[0]
			}
		case RESET_PASSWORD:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}
