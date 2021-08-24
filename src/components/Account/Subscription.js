import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Util } from "../../Datamanipulation/Util";
import { getAccount } from "../../store/Actions/Account";
import "../../style/account.css";
import { getUserReference } from "../../store/Actions/Reference";

const Subscription = (props) => {

    const [user, setUser] = useState(Util.getLoggedinUser());
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [datediff, setDatediff] = useState(0);

    const diff_months = (dt2, dt1) => {
        var diff =(dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        return Math.abs(Math.round(diff));
    }

    useEffect(()=> {

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        if(props.accountDetails && props.accountDetails.length > 0) {
            let d1 = new Date(props.accountDetails[0].substartdate);
            let day = d1.getDate();
            let month = monthNames[d1.getMonth()];
            let year = d1.getFullYear();
            setStart(day + " " + month + " " + year);

            let d2 = new Date(props.accountDetails[0].subenddate);
            day = d2.getDate();
            month = monthNames[d2.getMonth()];
            year = d2.getFullYear();
            setEnd(day + " " + month + " " + year);
            setDatediff(diff_months(d1,d2));
        } else {
            let data = {
                id: user['id']
            }
            props.getAccount(data);
        }
    }, [props.accountDetails])

    const handleTabs = (tab) => {
        if(tab === 'personal') {
            props.history.push("/personal");
        } else if(tab === 'referral') {
            let data = {
                "owner_id": user['id']
            }
            props.getUserReference(data);
            props.history.push("/referral");
        } else if(tab === 'subs') {
            props.history.push("/subscription");
        }
    }

    return (
        <div className="container-fluid contact">
            <h4>Account Details</h4>
            <div className="contact-form">
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className="mr-50" onClick={(e)=> handleTabs("personal")}>Personal Information</span>
                        <span className="mr-50" onClick={(e)=> handleTabs("referral")}>Referrals</span>
                        <span className="mr-50 active-bar" onClick={(e) => handleTabs("subs")}>Subscription</span>
                    </div>
                </div>
                <div className="row pb-2">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 house-form pt-25">
                        <div className="row pt-pb-10">
                            <div className="col-md-12">
                                <p className="">Your account is due for renewal in {datediff} month.</p>
                            </div>
                        </div>
                        <div className="row pt-pb-10">
                            <div className="col-md-5">
                                <p>Subscribed on</p>
                                <p>{start}</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-6">
                                <p>Subscription valid till</p>
                                <p>{end}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    accountDetails : state.Account.accountDetails.data
});

const mapDispatchToProps = {
    getAccount,
    getUserReference
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
