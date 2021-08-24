import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Util } from "../../Datamanipulation/Util";
import { addReference } from "../../store/Actions/Reference";
import "../../style/account.css";
import { NotificationManager } from "react-notifications";

const Addreferral = (props) => {

    const[user, setUser] = useState(Util.getLoggedinUser());

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [owner_id, setOwner_id] = useState(user['id']);

    const handleTabs = (tab) => {
        if(tab === 'personal') {
            props.history.push("/personal");
        } else if(tab === 'referral') {
            props.history.push("/referral");
        } else if(tab === 'subs') {
            props.history.push("/subscription");
        }
    }

    const handleSubmit = () => {

        let data = {
            "name": name,
            "email": email,
            "phone" : phone,
            "owner_id": owner_id
        }
        
        let valid = validate();
        if(valid) {
            props.addReference(data);
            props.history.push("/referral");
        }
    }

    const validate = () => {
        if(name === "" || name === undefined) {
            NotificationManager.error("Error Message", "Name cannot be empty.");
            return false;
        } else if(email === "" || email === undefined) {
            NotificationManager.error("Error Message", "Email cannot be empty.");
            return false;
        } else if(phone === "" || phone === undefined) {
            NotificationManager.error("Error Message", "Phone cannot be empty.");
            return false;
        }
        return true;
    }

    return (
        <div className="container-fluid contact">
            <h4>Account Details</h4>
            <div className="contact-form">
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className="mr-50" onClick={(e)=> handleTabs("personal")}>Personal Information</span>
                        <span className="mr-50 active-bar" onClick={(e)=> handleTabs("referral")}>Referrals</span>
                        <span className="mr-50" onClick={(e) => handleTabs("subs")}>Subscription</span>
                    </div>
                </div>
                <div className="row pb-2">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 house-form pt-25">
                        <div className="row pt-pb-10">
                            <div className="col-md-12 pb-30">
                                <p><label className="pt-pb-10">Refer a friend</label></p>
                                <span className="pt-pb-10 ">Please enter the details of the referral. When your referral registers with us, you will receive 2 months free subscription.</span>
                            </div>
                        </div>
                        <div className="row pt-25">
                            <div className="col-md-12">
                                <div className="form-group inputGroup">
                                    <label htmlFor="name" className="req">Name</label>
                                    <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={e=> setName(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-25">
                            <div className="col-md-12 ">
                                <div className="form-group inputGroup">
                                    <label htmlFor="phone" className="req">Phone</label>
                                    <input type="phone" placeholder="Enter Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-25">
                            <div className="col-md-12 ">
                                <div className="form-group inputGroup">
                                    <label htmlFor="email" className="req">Email Address</label>
                                    <input type="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-pb-10">
                            <div className="col-md-4"></div>
                            <div className="col-md-4 " align="center">
                                <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    referenceDetail : state.Reference.referenceDetails.data
});

const mapDispatchToProps = {
    addReference
}

export default connect(mapStateToProps, mapDispatchToProps)(Addreferral);