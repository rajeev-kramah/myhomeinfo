import { Warranty } from "../../api/api";
import {
    ADD_WARRANTY,
    GET_WARRANTY,
    GET_SINGLE_WARRANTY,
    DELETE_WARRANTY
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addWarranty = (data) => {
    return async (dispatch) => {
        await Warranty.addWarranty(data)
        .then(res => {
            console.log(res);
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_WARRANTY,
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

export const getWarranty = (data) => {
    return async (dispatch) => {
        await Warranty.getWarranty(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_WARRANTY,
                    payload: res
                }
                dispatch(data);
                var data = {
                    type: GET_SINGLE_WARRANTY,
                    payload: {}
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getSingleWarranty = (data) => {
    return async (dispatch) => {
        await Warranty.getSingleWarranty(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_WARRANTY,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export const deleteWarranty = (data) => {
    return async (dispatch) => {
        await Warranty.deleteWarranty(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_WARRANTY,
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
