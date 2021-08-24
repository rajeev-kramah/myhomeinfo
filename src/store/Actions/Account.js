import { Account } from "../../api/api";
import {
    GET_ACCOUNT,
    UPDATE_ACCOUNT
} from "../actionTypes";

import { NotificationManager } from "react-notifications";

export const updateAccount = (data) => {
    return async (dispatch) => {
        await Account.updateAccount(data)
        .then(res => {
            if(res.status === 200) {
                var data = {
                    type: UPDATE_ACCOUNT,
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

export const getAccount = (data) => {
    return async (dispatch) => {
        await Account.getAccount(data)
        .then(res => {
            if(res && res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_ACCOUNT,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}
