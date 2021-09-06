import { nodeName } from "jquery";
import {
    ADD_TRANSACTION,
    GET_TRANSACTION,
    GET_SINGLE_TRANSACTION,
    DELETE_TRANSACTION,
    GET_TRANSACTION_All
} from "../actionTypes";

const initialState = {
    transactions : {},
    transactionDetails : {},
    transactionAllData:{}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_TRANSACTION:
            return {
				...state,
				transactions: action.payload
			};
        case GET_TRANSACTION:
            return {
                ...state,
                transactions: action.payload
            };
        case GET_SINGLE_TRANSACTION:
            return {
                ...state,
                transactionDetails: action.payload
            };
        case GET_TRANSACTION_All:
            return {
                ...state,
                transactionAllData: action.payload
            };
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions:action.payload
            }
        default:
            return state;
    }
}