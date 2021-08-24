import { Reminder } from "../../api/api";
import {
    ADD_EVENT,
    GET_EVENT,
    DELETE_EVENT
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const addEvent = (data) => {
    return async (dispatch) => {
        await Reminder.addEvent(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_EVENT,
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

export const getEvent = (data) => {
    return async (dispatch) => {
        await Reminder.getEvent(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_EVENT,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const deleteEvent = (data) => {
    return async (dispatch) => {
        await Reminder.deleteEvent(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: DELETE_EVENT,
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
