import { USER_SIGNUP, 
	FORGET_PASSWORD, 
	RESPONSE_ERROR,
	LOGIN_USER,
	RESET_PASSWORD,
	RESPONSE_SUCCESS, 
	ROLE_OF_USER,
	GET_USER_All,
	DELETE_USER,
	DEACTIVE_USER,
	ACTIVE_USER,
	GET_SINGLE_USER,
	ADMIN_USER} from "../actionTypes";

const initialState = {
	user: {},
	admin:{},
	responseError: {},
	responseSuccess: {},
	userList:{}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case USER_SIGNUP:
			return {
				...state,
				user: action.payload
			};
		case ROLE_OF_USER:
			return {
				...state,
				user: action.payload
			};
		case DELETE_USER:
			return {
				...state,
				userList: action.payload
			};
		case DEACTIVE_USER:
			return {
				...state,
				userList: action.payload
			};
		case ACTIVE_USER:
			return {
				...state,
				userList: action.payload
			};
		case ADMIN_USER:
			return {
				...state,
				userList: action.payload
			};
		case GET_SINGLE_USER:
			return {
				...state,
				admin: action.payload
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
		case GET_USER_All:
			return {
				...state,
				userList: action.payload
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
