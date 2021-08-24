import { Authentication, House } from "../../api/api";
import {
    USER_SIGNUP, 
    FORGET_PASSWORD,
    RESPONSE_ERROR,
    LOGIN_USER,
    RESET_PASSWORD,
    GET_HOUSES
} from "../actionTypes";
import { NotificationManager } from "react-notifications";




export const resetUser = ()=>{
    return async (dispatch) => {
        var data = {
            type: USER_SIGNUP,
            payload: []
        }
        dispatch(data);
    };
}

export const signup = (data) => {
    return async (dispatch) => {
        await Authentication.signup(data)
        .then(res => {
            if(res.status == 200) {
                NotificationManager.success("Success Message", res.statusText);
                var data = {
                    type: USER_SIGNUP,
                    payload: res
                }
                dispatch(data);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            NotificationManager.error("Error Message", "Oops something went wrong. Try later.");
            throw(error);
        });
    };
}

export const forget = (data) => {
    return async (dispatch) => {
        await Authentication.forget(data)
        .then(res => {
            if(res.status == 200) {
                NotificationManager.success('Success message', 'Kindly check your mail to reset password.');
            } else {
                NotificationManager.error('Error message', res.statusText);
            }
        })
        .catch(error => {
            NotificationManager.error('Error message', "Something went wrong. Try later.");
            throw(error);
        })
    }
}

export const login = (data) => {
    return async (dispatch) => {
        await Authentication.login(data)
        .then(res=> {
            if(res.status == 200) {
                var data = {
                    type: LOGIN_USER,
                    payload: res
                }
                dispatch(data);
                NotificationManager.success("Success Message", "Successfully Logged In.");
                // let data = {
                //     "id": res.data.id
                // }
                // House.getHouse(data)
                // .then(res=> {
                //     if(res.status == 200) {
                //         var data = {
                //             type: GET_HOUSES,
                //             payload: res
                //         }
                //     }
                // })
            } else {
                NotificationManager.error('Error message', res.statusText);
            }
        })
        .catch(error=> {
            NotificationManager.error("Error Message", "Oops something went wrong. Try later.");
            throw(error);
        })
    }
}

export const resetPassword = (data) => {
    return async (dispatch) => {
        await Authentication.resetPassword(data)
        .then(res=> {
            if(res.status == 200) {
                var data = {
                    type: RESET_PASSWORD,
                    payload: res
                }
                dispatch(data);
                NotificationManager.success("Success Message", "Password updated successfully. Redirecting to login page.");
            } else {
                NotificationManager.error('Error message', res.statusText);
            }
        })
        .catch(error=> {
            NotificationManager.error("Error Message", "Oops something went wrong. Try later.");
            throw(error);
        })
    }
}
