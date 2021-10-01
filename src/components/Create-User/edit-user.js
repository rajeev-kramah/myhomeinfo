import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { admin, getroleOfUser, getsingleUser } from "../../store/Actions/Authentication";
import { NotificationManager } from "react-notifications";
import { Util } from "../../Datamanipulation/Util";


const EditUser = (props) => {

    let houseid = props.location.state.house_id ? props.location.state.house_id : "";

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [user_name, setUser_name] = useState('');
    const [password, setPassword] = useState('');
    const [subscriptionStartDate, setSubscriptionStartDate] = useState(Util.getCurrentDate("-"));
    const [subscriptionendDate, setSubscriptionEndDate] = useState(Util.getCurrentDate("-"));
    const [spaceUsage, setSpaceUsage] = useState('');
    const [noOfHouse, setNoOfHouse] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [role, setRole] = useState('');
    const [renewalPendingDate, setRenewalPendingDate] = useState(Util.getCurrentDate("-"));
    const [country, setCountry] = useState('');
    const [id, setId] = useState('');
    const [user, setUser] = useState(Util.getLoggedinUser());

    useEffect(() => {

        if (props.userDetails && props.userDetails.length > 0) {
            console.log("props.userDetails00", props.userDetails[0])
            setId(props.userDetails[0].id);
            setFirstName(props.userDetails[0].name);
            setLastName(props.userDetails[0].lastname);
            setEmailAddress(props.userDetails[0].email);
            setPassword(props.userDetails[0].password);
            setUser_name(props.userDetails[0].username);
            setNoOfHouse(props.userDetails[0].maxproperty);
            setCountry(props.userDetails[0].country);
            setSubscriptionStartDate(props.userDetails[0].substartdate ? props.userDetails[0].substartdate : Util.getCurrentDate("-"));
            setSubscriptionEndDate(props.userDetails[0].subenddate ? props.userDetails[0].subenddate : Util.getCurrentDate("-"));
            setMobileNo(props.userDetails[0].mono);
            setUserStatus(props.userDetails[0].account_status);
            setRole(props.userDetails[0].role);
            setRenewalPendingDate(props.userDetails[0].renewalDate ? props.userDetails[0].renewalDate : Util.getCurrentDate("-"));
            setSpaceUsage(props.userDetails[0].spaceUsage);
        }
        else {
            let data = {
                id: 'id'
            }
            props.getroleOfUser(data);
            props.getsingleUser(data);
        }
    }, [props.userDetails]);

    let countries = Object.keys(Util.countryDetails());
    let state = [];
    let curr = "";
    if (Util.countryDetails()[country]) {
        state = Util.countryDetails()[country]['data'];
        curr = Util.countryDetails()[country]['currency'];
    }

    const handleSubmit = () => {

        let data = {
            'id': id,
            "name": firstName,
            "lastname": lastName,
            "username": user_name,
            "mono": mobileNo,
            "email": emailAddress,
            "password": password,
            "substartdate": subscriptionStartDate,
            "subenddate": subscriptionendDate,
            "spaceUsage": spaceUsage,
            "maxProperty": noOfHouse,
            "account_status": userStatus,
            "renewalDate": renewalPendingDate,
            "country": country,
            "role": role,
        }
        // props.admin(data);
        console.log("resposedata ", data)
        var form = new FormData();

        for (const key in data) {
            form.append(key, data[key]);
        }

        form.append("lastTab", true)
        props.admin(data);
        props.history.push({
            pathname: 'user-list',
            state: {
                id: id,
            }
        });
        // let valid = validate();

        // if(valid) {
        //      props.addInsurance(form);
        //          props.history.push({
        //            pathname: 'insurance-list',
        //         state: {
        //             house_id : house_id
        //         }
        //     }); 
        // }
    }

    const validate = () => {
        if (firstName === '') {
            NotificationManager.error("Error Message", "First Name cannot be empty.");
            return false;
        } else if (lastName === '') {
            NotificationManager.error("Error Message", "Last Name cannot be empty.");
            return false;
        } else if (user_name === '') {
            NotificationManager.error("Error Message", "Username cannot be empty.");
            return false;
        } else if (mobileNo === '') {
            NotificationManager.error("Error Message", "Mobile Number cannot be empty.");
            return false;
        } else if (emailAddress === '') {
            NotificationManager.error("Error Message", "Email Address cannot be empty.");
            return false;
        } else if (password === '') {
            NotificationManager.error("Error Message", "Password cannot be empty.");
            return false;
        } else if (spaceUsage === '') {
            NotificationManager.error("Error Message", "Space Usage cannot be empty.");
            return false;
        } else if (noOfHouse === '') {
            NotificationManager.error("Error Message", "No. of House cannot be empty.");
            return false;
        } else if (userStatus === '') {
            NotificationManager.error("Error Message", "User Status cannot be empty.");
            return false;
        } else if (role === '') {
            NotificationManager.error("Error Message", "User Role cannot be empty.");
            return false;
        }
        return true;
    }

    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };

    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if (!isNumericInput(event) && !isModifierKey(event)) {
            event.preventDefault();
        }
    };

    const formatToPhone = (event) => {
        if (isModifierKey(event)) { return; }

        // I am lazy and don't like to type things more than once
        const target = event.target;
        const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
        const zip = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);

        if (input.length > 6) { target.value = `${zip}-${middle}-${last}`; }
        else if (input.length > 3) { target.value = `${zip}-${middle}`; }
        else if (input.length > 0) { target.value = `${zip}`; }
    };

    const inputElement = document.getElementById('phoneNumberFormat');
    if (inputElement != null) {
        inputElement.addEventListener('keydown', enforceFormat);
        inputElement.addEventListener('keyup', formatToPhone);
    }
    const handleAccount_status = (e) => {
        setUserStatus(e.target.value)
        handleSetDate(subscriptionStartDate, e.target.value);
    }

    const handleSetDate = (date, accountStatus) => {
        var chooseDate = new Date(date);
        if (accountStatus === "Trial") {
            chooseDate.setDate(chooseDate.getDate() + 15);
        } else if (accountStatus === "Active") {
            chooseDate.setMonth(chooseDate.getMonth() + 12);
        } else if (accountStatus === "Expired") {
            chooseDate.setDate(chooseDate.getDate() - 1);
        } else {
            setSubscriptionEndDate(new Date());
        }
        let futureDate = chooseDate.getFullYear() + '-' + ('0' + (chooseDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (chooseDate.getDate())).slice(-2);
        subscriptionStartDate !== '' && setSubscriptionEndDate(futureDate) || setRenewalPendingDate(futureDate)
    }

    const handleLeaseSubscriptionStartDate = (e) => {
        handleSetDate(e.target.value, userStatus);
        setSubscriptionStartDate(e.target.value);
    }

    const handleLeaseSubscriptionendDate = (e) => {
        setSubscriptionEndDate(e.target.value);
        setRenewalPendingDate(e.target.value)
    }


    return (
        <div className="container-fluid house">
            <h4>Edit User</h4>
            <div className="house-form pb-2">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="First Name" className="req">First Name</label>
                            <input type="text" placeholder="First Name" value={firstName} onChange={e => {
                                setFirstName(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Last Name" className="req">Last Name</label>
                            <input type="text" placeholder="Last Name" value={lastName} onChange={e => {
                                setLastName(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="name" className="req">User Name</label>
                            <input type="text" placeholder="User Name" value={user_name} onChange={e => {
                                setUser_name(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Mobile No" className="req" >Mobile No.</label>
                            <input type="text" id="phoneNumberFormat" maxLength="12" placeholder="Mobile No" value={mobileNo} onChange={e => {
                                setMobileNo(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Email Address" className="req">Email Address</label>
                            <input type="text" id="email" placeholder="Email Addrses" value={emailAddress} onChange={e => {
                                setEmailAddress(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="name" className="req">Password</label>
                            <input type="text" placeholder="password" value={password} onChange={e => {
                                setPassword(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Subscription Start Date" className="">Subscription Start Date</label>
                            <input type="date" placeholder="Subscription Start Date" value={subscriptionStartDate} onChange={e => handleLeaseSubscriptionStartDate(e)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Subscription End Date" className="">Subscription End Date</label>
                            <input type="date" style={{ textTransform: 'uppercase' }} placeholder="Expiry Date" value={subscriptionendDate} onChange={e => handleLeaseSubscriptionendDate(e)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Space Usage" className="req">Space Usage</label>
                            <input type="text" placeholder="Space Usage" value={spaceUsage} onChange={e => {
                                setSpaceUsage(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="No. of House" className="req">No. of House</label>
                            <input type="text" placeholder="No. of House" value={noOfHouse} onChange={e => {
                                setNoOfHouse(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="User Status" className="req">User Status</label>
                            <select className="form-control" value={userStatus} onChange={e => handleAccount_status(e)}>
                                <option value="" disabled>Select</option>
                                <option value="Trial">Trial</option>
                                <option value="Active">Active</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Renewal Pending Date" className="req">Renewal Pending Date</label>
                            <input type="date" placeholder="Renewal Pending Date" value={renewalPendingDate} onChange={e => {
                                setRenewalPendingDate(e.target.value)
                            }} className="form-control" readOnly />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <label htmlFor="name" className="req">User Role</label>
                        <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                            <option value="" disabled>Select</option>
                            {
                                props.userRole ? (
                                    props.userRole.map((data) => {
                                        console.log("datauser7", data)
                                        return (
                                            <option value={data.role_id}>{data.role}</option>
                                        )
                                    })
                                ) : ""
                            }
                        </select>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select className="form-control" value={country} onChange={e => setCountry(e.target.value)} >
                                <option value="" disabled>Select</option>
                                {
                                    countries.map(country => {
                                        return (
                                            <option value={country}>{country}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row footer ">
                <div className="col-md-4 pt-pb-10" align="center">
                    <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => (
    {
        userRole: state.Authentication.user.data,
        responseError: state.responseError,
        userDetails: state.Authentication.admin.data
    });

const mapDispatchToProps = {
    admin,
    getroleOfUser,
    getsingleUser,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser);