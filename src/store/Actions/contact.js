import { Contact } from "../../api/api";
import {
    ADD_CONTACT_DETAILS,
    GET_CONTACT_DETAILS,
    ADD_GROUP,
    GET_GROUP,
    GET_CONTACT,
    DELETE_CONTACT

} from "../actionTypes";
import { NotificationManager } from "react-notifications";

export const addContact = (data) => {
    console.log("data123::",data)
    return async (dispatch) => {
        await Contact.addContact(data)
            .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_CONTACT,
                    payload: res
                }
                dispatch(data);
                console.log("response",data)
                NotificationManager.success("Success Message", res.statusText);
            } else {
                console.log("response",res)
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            console.log("response",error)
            throw (error);
        });
    }
}

export const getContact = (data) => {
    return async (dispatch) => {
        await Contact.getContact(data)
        .then(res => {
            
            if(res.status === 200 || res.status === 404 || res.status === 422 || res.status ===204) {
                var data = {
                    type: GET_CONTACT_DETAILS,
                    payload: res
                }
                dispatch(data);
              
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const addGroup = (data) => {
    return async (dispatch) => {
        await Contact.addGroup(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: ADD_GROUP,
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

export const getGroup = (data) => {
    return async (dispatch) => {
        await Contact.getGroup(data)
        .then(res => {
            if(res && res.status && (res.status === 200  || res.status === 404 || res.status === 422)) {
                var data = {
                    type: GET_GROUP,
                    payload: res
                }
                dispatch(data);
                // NotificationManager.success("Success Message", res.statusText);
            } else if(res && res.statusText) {
                NotificationManager.error("Error Message to fetch group details", res.statusText)
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getContactById = (data) => {
    return async (dispatch) => {
        await Contact.getContactById(data)
        .then(res => {
            
            if(res.status === 200 || res.status === 404 || res.status === 422 || res.status ===204 ) {
                var data = {
                    type: GET_CONTACT,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const getContactForTransaction = (data) => {
    return async (dispatch) => {
        await Contact.getContactForTransaction(data)
        .then(res => {
            if(res.status === 200  || res.status === 404 || res.status === 422) {
                var data = {
                    type: GET_CONTACT_DETAILS,
                    payload: res
                }
                dispatch(data);
            }
        }).catch(error => {
            throw (error);
        });
    }
}

export const deleteContact = (data) => {
    return async (dispatch) => {
        await Contact.deleteContact(data)
        .then(res => {
            if(res.status === 200 || res.status === 404 || res.status === 422 || res.status ===204 ) {
                var data = {
                    type: DELETE_CONTACT,
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