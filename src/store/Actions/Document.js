import { Document } from "../../api/api";
import {
    ADD_DOCUMENT,
    GET_DOCUMENT,
    GET_SINGLE_DOCUMENT,
    DELETE_DOCUMENT
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addDocument = (data) => {
    return async (dispatch) => {
        await Document.addDocument(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_DOCUMENT,
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

export const getDocument = (data) => {
    return async (dispatch) => {
        await Document.getDocument(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_DOCUMENT,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getSingleDocument = (data) => {
    return async (dispatch) => {
        await Document.getSingleDocument(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_DOCUMENT,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export const deleteDocument = (data) => {
    return async (dispatch) => {
        await Document.deleteDocument(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_DOCUMENT,
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
