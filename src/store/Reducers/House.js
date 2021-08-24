import { 
	GET_HOUSES, 
	CREATE_HOUSE,
	ADD_TITLE_HOLDER,
	ADD_HOA_DETAILS,
	ADD_REALTOR_DETAILS,
	ADD_HMO_SPACE,
	GET_HOME_DETAIL,
	GET_OWNER_HOME,
	DELETE_HOUSE,
	DELETE_HMO,
	DELETE_HOUSE_ATTACHMENT,
	DELETE_REALTOR,
	GET_HOUSE_HMO

} from "../actionTypes";

const initialState = {
    houses: {},
	houseDetail: {},
	houseHmo: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_HOUSES:
			return {
				...state,
				houses: action.payload
			};
		case CREATE_HOUSE:
			return {
				...state,
				houseDetail: action.payload
			};
		case ADD_TITLE_HOLDER:
			return {
				...state,
				titleHolders: action.payload
			};
		case ADD_HOA_DETAILS:
			return {
				...state,
				hoaDetails: action.payload
			};
		case ADD_REALTOR_DETAILS:
			return {
				...state,
				realtorDetails: action.payload
			};
		case ADD_HMO_SPACE:
			return {
				...state,
				hmoSpace: action.payload
			};

		case GET_HOME_DETAIL:
			console.log(action.payload)
			return {
				...state,
				houseDetail: action.payload
			};

		case GET_OWNER_HOME:
			return {
				...state,
				houses: action.payload
			};
		case DELETE_HOUSE:
			return {
				...state,
				houseDetail: {}
			}
		case DELETE_HMO: 
			return {
				...state,
				houseDetail: action.payload
			}
		case DELETE_HOUSE_ATTACHMENT:
			return {
				...state,
				houseDetail: action.payload
			}
		case DELETE_REALTOR:
			return {
				...state,
				houseDetail: action.payload
			}
		case GET_HOUSE_HMO:
			return {
				...state,
				houseHmo: action.payload
			}
        default:
            return state;
    }
}
