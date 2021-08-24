import { 
    ADD_CONTACT_DETAILS,
    GET_CONTACT_DETAILS,
    ADD_GROUP,
    GET_GROUP,
    GET_CONTACT,
    DELETE_CONTACT
	
} from "../actionTypes";

const initialState = {
    contacts: {},
    contactDetails: {},
    groups: {},
    groupDetails: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_CONTACT_DETAILS:
			return {
				...state,
				contacts: action.payload
			};
        case GET_CONTACT_DETAILS:
            return {
                ...state,
                contacts: action.payload
            };
        case GET_CONTACT:
            return {
                ...state,
                contactDetails: action.payload
            };
        case ADD_GROUP:
			return {
				...state,
				groupDetails: action.payload
			};
        case GET_GROUP:
            return {
                ...state,
                groups: action.payload
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: action.payload
            };
        default:
            return state;
    }
}
    