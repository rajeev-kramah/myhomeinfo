import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Util } from "../../Datamanipulation/Util";
import { getSingleReference, getUserReference } from "../../store/Actions/Reference";
import "../../style/account.css";
import Table from "../../Reusable/Table";

const Referral = (props) => {

    const[user, setUser] = useState(Util.getLoggedinUser());

    const handleTabs = (tab) => {
        if(tab === 'personal') {
            props.history.push("/personal");
        } else if(tab === 'referral') {
            props.history.push("/referral");
        } else if(tab === 'subs') {
            props.history.push("/subscription");
        }
    }

    const header = ["Referred Date", "Referral Name", "Referral Phone", "Email Address", "Registered On"]
    var columns = [
        { 
            name: 'Referred Date', 
            selector: 'referred_date', 
            sortable: true, 
            // cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "add-referal"}}>{row.referred_date}</Link>
        },
        { name: 'Referral Name', selector: 'name', sortable: true, },
        { name: 'Referral Phone', selector: 'phone', sortable: true, },
        { name: 'Email Address', selector: 'email', sortable: true, },
        { name: 'Registered On', selector: 'registered_on', sortable: true }
      ];

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
                    <div className="col-md-12 house-form pt-25">
                        <div className="row pt-pb-10">
                            <div className="col-md-12">
                                <p className="ml-60">Here are the details of the people you have referred in the past.</p>
                                <Table header={header} columns={columns} url={"/add-referal"} getSingleData={props.getSingleReference} tableId="referral" data={props.references}  house_id={""}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row footer">
                    <Link to={{
                            pathname : "/add-referal"
                        }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Referral
                    </Link>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    references : state.Reference.references.data
});

const mapDispatchToProps = {
    getSingleReference,
    getUserReference
}

export default connect(mapStateToProps, mapDispatchToProps)(Referral);