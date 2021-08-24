import React, { useEffect } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import {getShareById } from "../../store/Actions/Share";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";

const ShareList = (props) => {
    
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Company", "Contact Person", "Mobile No.", "Landline", "Email", "URL", "Address", 'Group'];
   
    var columns = [
        { 
            name: 'First Name', 
            selector: 'fname', 
            sortable: true, 
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "share", state:{house_id : house_id}}}>{row.fname}</Link>
        },
        { name: 'Last Name', selector: 'lname', sortable: true, },
        { name: 'Phone Number', selector: 'phono', sortable: true, },
        { name: 'email', selector: 'email', sortable: true, },
        { name: 'Access Level', selector: 'accesslevel', sortable: true },
        { name: 'Action', selector: 'action', sortable: true },
       
      ];
     
    return (
        <div className="container-fluid contact">
            <h4>Share Property Details</h4>
            <div className="contact-form pt-25">
                <Table url={"/share"} data={props.share} columns={columns} header={header} getSingleData={props.getShareById} tableId={"contact"+house_id}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/share",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        <span className="glyphicon glyphicon-plus"> </span> Share Property
                    </Link>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    share : state.Share.shares.data
});

const mapDispatchToProps = {
    getShareById
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareList);
