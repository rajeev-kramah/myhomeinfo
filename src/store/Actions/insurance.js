import { Insurance } from "../../api/api";
import {
    ADD_INSURANCE,
    GET_INSURANCE,
    GET_SINGLE_INSURANCE,
    DELETE_INSURANCE
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addInsurance = (data) => {
    return async (dispatch) => {
        await Insurance.addInsurance(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_INSURANCE,
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

export const getInsurance = (data) => {
    return async (dispatch) => {
        await Insurance.getInsurance(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_INSURANCE,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getSingleInsurance = (data) => {
    return async (dispatch) => {
        await Insurance.getSingleInsurance(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_INSURANCE,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export const deleteInsurance = (data) => {
    return async (dispatch) => {
        await Insurance.deleteInsurance(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_INSURANCE,
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
