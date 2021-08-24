import { Link } from "../../api/api";
import {
    ADD_LINK,
    GET_LINK,
    GET_SINGLE_LINK,
    DELETE_LINK
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addLink = (data) => {
    return async (dispatch) => {
        await Link.addLink(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_LINK,
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

export const getLink = (data) => {
    return async (dispatch) => {
        await Link.getLink(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_LINK,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getSingleLink = (data) => {
    return async (dispatch) => {
        await Link.getSingleLink(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_LINK,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export const deleteLink = (data) => {
    return async (dispatch) => {
        await Link.deleteLink(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_LINK,
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
