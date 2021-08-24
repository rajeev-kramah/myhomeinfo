import { Loan } from "../../api/api";
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
import { NotificationManager } from "react-notifications";
export const addLoanAmortization = (data) => {
    return async (dispatch) => {
        await Loan.addLoanAmortization(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_LOAN_AMORTIZATION,
                    payload: res
                }
                dispatch(data);
                //NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            throw (error);
        });
    }
}



export const addLoanTransaction = (data) => {
    return async (dispatch) => {
        await Loan.addLoanTransaction(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_LOAN_TRANSACTION,
                    payload: res
                }
                dispatch(data);
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            throw (error);
        });
    }
}




export const getLoanTransaction = (data) => {
    return async (dispatch) => {
        await Loan.getLoanTransaction(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_LOAN_TRANSACTION,
                    payload: res
                }
                dispatch(data);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getMortgageTransaction = (data) => {
    return async (dispatch) => {
        await Loan.getMortgageTransaction(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_MORTGAGE_TRANSACTION,
                    payload: res
                }
                dispatch(data);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            throw (error);
        });
    }
}



export const deleteLoanTransaction = (data) => {
    return async (dispatch) => {
        await Loan.deleteLoanTransaction(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_LOAN_TRANSACTION,
                    payload: {}
                }
                dispatch(data);
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const addLoan = (data) => {
    return async (dispatch) => {
        await Loan.addLoan(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_LOAN,
                    payload: res
                }
                dispatch(data);
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getLoan = (data) => {
    return async (dispatch) => {
        await Loan.getLoan(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_LOAN,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}


export const getSingleLoan = (data) => {
    return async (dispatch) => {
        await Loan.getsingleloan(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_LOAN,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const resetSingleLoan = () => {
    return async (dispatch) => {
        var data = {
            type: RESET_SINGLE_LOAN,
            payload: {}
        }
        dispatch(data);
    }
}

export const deleteLoan = (data) => {
    return async (dispatch) => {
        await Loan.deleteLoan(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_LOAN,
                    payload: res
                }
                dispatch(data);
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText);
            }
        }).catch(error => {
            throw (error);
        });
    }
}
