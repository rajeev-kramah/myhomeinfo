import { 
    ADD_LOAN,
    GET_LOAN,
    GET_SINGLE_LOAN,
    RESET_SINGLE_LOAN,
    DELETE_LOAN,
    ADD_LOAN_TRANSACTION,
    GET_LOAN_TRANSACTION,
    ADD_LOAN_AMORTIZATION,
    GET_MORTGAGE_TRANSACTION
	
} from "../actionTypes";

const initialState = {
    loans: {},
    loanDetails: {},
    loanTransaction :{},
    amortization : {},
    mortgageTransaction : {},
};

export default function(state = initialState, action) {
	switch (action.type) {
        case ADD_LOAN:
         
            if(action.payload.lastTab){
                console.log("loan:1",action)
                return {
                    ...state,
                    loans: action.payload,
                    loanDetails : action.payload
                };
            }
			return {
				...state,
				loanDetails: action.payload
			};
        case GET_LOAN:
            return {
                ...state,
                loans: action.payload
            }

        case GET_SINGLE_LOAN:
             console.log("loan:2",action)
            return {
                ...state,
                loanDetails: action.payload
            }

        case RESET_SINGLE_LOAN:
            console.log("loan:3")
            return {
                ...state,
                loanDetails: action.payload
            }
        
        case DELETE_LOAN:
            return {
                ...state,
                loans: action.payload
            }

        case ADD_LOAN_TRANSACTION:
            return {
                ...state,
                loanTransaction: action.payload
            }

        case ADD_LOAN_AMORTIZATION:
            return {
                ...state,
                amortization: action.payload
            }

            
        case GET_LOAN_TRANSACTION:
            return {
                ...state,
                loanTransaction: action.payload
            }

        case GET_MORTGAGE_TRANSACTION:
            return {
                ...state,
                mortgageTransaction: action.payload
            }
            
        default:
            return state;
    }
}
    