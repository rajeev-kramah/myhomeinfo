import { House } from "../../api/api";
import {
    CREATE_HOUSE,
    ADD_TITLE_HOLDER,
	ADD_HOA_DETAILS,
	ADD_REALTOR_DETAILS,
	ADD_HMO_SPACE,
    GET_HOME_DETAIL,
    GET_OWNER_HOME,
    DELETE_HOUSE,
    DELETE_HMO,
    DELETE_HOUSE_ATTACHMENT,
    GET_HOUSE_HMO
} from "../actionTypes";
import { NotificationManager } from "react-notifications";
let houseRes = {};


export const ownerHouseDetails = (data) => {
    return async (dispatch) => {
        await House.ownerHouseDetails(data)
        .then(res => {
            var data = {
                type: GET_OWNER_HOME,
                payload: res
            }
            dispatch(data);
        }).catch(error => {
            throw (error);
        });
    }
}


export const getHouseDetail = (res) => {
    console.log(houseRes);
    if(Object.keys(res).length == 0){
        return async (dispatch) => {
            var data = {
                type: GET_HOME_DETAIL,
                payload: res
            }
            dispatch(data);
        }
    }else{
        return async (dispatch) => {
            await House.houseDetails({"id" : res.data[0]['id'], "email" : res.data[0]['email']})
            .then(res => {
                var data = {
                    type: GET_HOME_DETAIL,
                    payload: res
                }
                dispatch(data);
            }).catch(error => {
                throw (error);
            });
        }
    }
    
}


export const createHouse = (data) => {
    return async (dispatch) => {
        await House.createHouse(data)
        .then(async (res) => {
            if(res.status == 200) {
                houseRes = res;
                dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const addTitleHolder = (data) => {
    return async (dispatch) => {
        await House.addTitleHolder(data)
        .then(res => {
            if(res.status == 200) {
                dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        }).catch(error => {
            throw (error);
        });
    };
}

export const addHOADetails = (data) => {
    return async (dispatch) => {
        await House.addHOADetails(data)
        .then(res => {
            if(res.status == 200) {
                dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const addRealtorDetails = (data) => {
    return async (dispatch) => {
        await House.addRealtorDetails(data)
        .then(res => {
            if(res.status == 200) {
                dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const addHMOSpace = (data) => {
    return async (dispatch) => {
        await House.addHMOSpace(data)
        .then(res => {
            if(res.status == 200) {
                dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const deleteHouse = (data) => {
    return async (dispatch) => {
        await House.deleteHouse(data)
        .then(res => {
            if(res.status == 200) {
                var data = {
                    type: DELETE_HOUSE,
                    payload: res
                }
                dispatch(data);
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const deleteHmo = (data) => {
    return async (dispatch) => {
        await House.deleteHmo(data)
        .then(res => {
            if(res.status == 200) {
                // let houseRes = res;
               // dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const deleteHouseAttachment = (data) => {
    return async (dispatch) => {
        await House.deleteHouseAttachment(data)
        .then(res => {
            if(res.status == 200) {
                // dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const deleteRealtorImage = (data) => {
    return async (dispatch) => {
        await House.deleteRealtorImage(data)
        .then(res => {
            if(res.status == 200) {
                // dispatch(getHouseDetail(houseRes));
                NotificationManager.success("Success Message", res.statusText);
            } else {
                NotificationManager.error("Error Message", res.statusText)
            }
        })
        .catch(error => {
            throw (error);
        });
    };
}

export const getHouseHmo = (data) => {
    return async (dispatch) => {
        await House.getHouseHmo(data)
        .then(res=> {
            if(res.status === 200) {
                var data = {
                    type: GET_HOUSE_HMO,
                    payload: res
                }
                dispatch(data);
            }
        })
        .catch(error => {
            throw (error);
        });
    }
}
