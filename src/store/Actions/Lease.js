import { Lease } from "../../api/api";
import {
    ADD_LEASE,
    GET_LEASE,
    GET_SINGLE_LEASE,
    DELETE_LEASE
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addLease = (data) => {
    return async (dispatch) => {
        await Lease.addLease(data)
        .then(res => {
            console.log("leaseres:",res)
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_LEASE,
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

export const getLease = (data) => {
    return async (dispatch) => {
        await Lease.getLease(data)
        .then(res => {
            if(res && (res.status === 200  || res.status === 404 || res.status === 422)) {
                var data = {
                    type: GET_LEASE,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getSingleLease = (data) => {
    return async (dispatch) => {
        await Lease.getSingleLease(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_LEASE,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export const deleteLease = (data) => {
    return async (dispatch) => {
        await Lease.deleteLease(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_LEASE,
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
