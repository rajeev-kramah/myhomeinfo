import {
    ADD_LEASE,
    GET_LEASE,
    GET_SINGLE_LEASE,
    DELETE_LEASE
} from "../actionTypes";

const initialState = {
    leases : {},
    leaseDetails : {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_LEASE:
            if(action.payload.lastTab) {
                return {
                    ...state,
                    leases: action.payload,
                    leaseDetails: []
                };
            }
            return {
                ...state,
                leaseDetails: action.payload
            };
        case GET_LEASE:
            return {
                ...state,
                leases: action.payload
            };
        case GET_SINGLE_LEASE:
            return {
                ...state,
                leaseDetails: action.payload
            };
        case DELETE_LEASE:
            return {
                ...state,
                leases: action.payload
            };
        default:
            return state;
    }
}
