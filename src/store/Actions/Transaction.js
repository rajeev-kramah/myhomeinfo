import { Transaction } from "../../api/api";
import {
    ADD_TRANSACTION,
    GET_TRANSACTION,
    GET_SINGLE_TRANSACTION,
    DELETE_TRANSACTION
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addTransaction = (data) => {
    return async (dispatch) => {
        await Transaction.addTransaction(data)
        .then(res => {
            if(res.status === 200) {
                var data = {
                    type: ADD_TRANSACTION,
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

export const getTransaction = (data) => {
    return async (dispatch) => {
        await Transaction.getTransaction(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_TRANSACTION,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getSingleTransaction = (data) => {
    return async (dispatch) => {
        await Transaction.getSingleTransaction(data)
        .then(res => {
            if(res && Object.keys(res).length > 0 && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_TRANSACTION,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export const deleteTransaction = (data) => {
    return async (dispatch) => {
        await Transaction.deleteTransaction(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_TRANSACTION,
                    payload: res
                }
                dispatch(data);
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            throw(error);
        });
    }
}
