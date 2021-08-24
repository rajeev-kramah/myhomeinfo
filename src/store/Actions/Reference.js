import { Reference } from "../../api/api";
import {
    ADD_REFERENCE,
    GET_REFERENCES,
    GET_SINGLE_REFERENCE
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addReference = (data) => {
    return async (dispatch) => {
        await Reference.addReference(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_REFERENCES,
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

export const getUserReference = (data) => {
    return async (dispatch) => {
        await Reference.getUserReference(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_REFERENCES,
                    payload: res
                }
                dispatch(data);
                var data = {
                    type: GET_SINGLE_REFERENCE,
                    payload: {}
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getSingleReference = (data) => {
    return async (dispatch) => {
        await Reference.getSingleReference(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_SINGLE_REFERENCE,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw(error);
        });
    }
}
