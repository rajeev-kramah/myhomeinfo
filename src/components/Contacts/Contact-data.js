import React, { useEffect } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import {getContactById } from "../../store/Actions/contact";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";

const ContactData = (props) => {
   // let house_id = props.location.state.house_id ? props.location.state.house_id : "";
   let house_id = 80;
    return (
        <div className="container-fluid contact">
            <h4>Contact Details</h4>
            <div className="contact-form pt-25">
                <div className="row footer">
                    <Link to={{
                            pathname : "/contact-form",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Contact
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    contacts : state.Contact.contacts.data
});

const mapDispatchToProps = {
    getContactById
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
