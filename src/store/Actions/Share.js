import { share } from "../../api/api";
import {
    ADD_SHARE_DETAILS,
    GET_SHARE_DETAILS,
    GET_SHARE,
    DELETE_SHARE

} from "../actionTypes";
import { NotificationManager } from "react-notifications";

export const addShare = (data) => {
    return async (dispatch) => {
        await share.addShare(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_SHARE_DETAILS,
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

export const getShare = (data) => {
    return async (dispatch) => {
        await share.getShare(data)
        .then(res => {
            
            if(res.status === 200 || res.status === 404 || res.status === 422 || res.status ===204) {
                var data = {
                    type: GET_SHARE_DETAILS,
                    payload: res
                }
                dispatch(data);
              
            }
        }).catch(error => {
            throw (error);
        });
    }
}


export const getShareById = (data) => {
    return async (dispatch) => {
        await share.getShareById(data)
        .then(res => {
            
            if(res.status === 200 || res.status === 404 || res.status === 422 || res.status ===204 ) {
                var data = {
                    type: GET_SHARE,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}


export const deleteShare = (data) => {
    return async (dispatch) => {
        await share.deleteShare(data)
        .then(res => {
            if(res.status === 200 || res.status === 404 || res.status === 422 || res.status ===204 ) {
                var data = {
                    type: DELETE_SHARE,
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