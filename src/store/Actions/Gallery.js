import { Gallery } from "../../api/api";
import {
    ADD_GALLERY,
    GET_GALLERY,
    DELETE_GALLERY
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addGallery = (data) => {
    return async (dispatch) => {
        await Gallery.addGallery(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_GALLERY,
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

export const getGallery = (data) => {
    return async (dispatch) => {
        await Gallery.getGallery(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_GALLERY,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const deleteGallery = (data) => {
    return async (dispatch) => {
        await Gallery.deleteGallery(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_GALLERY,
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
