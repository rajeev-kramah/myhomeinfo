import React, { useEffect } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import {getContactById } from "../../store/Actions/contact";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";

const ContactList = (props) => {
    
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Company", "Contact Person", "Mobile No.", "Landline", "Email", "URL", "Address", 'Group'];
   
    var columns = [
        { 
            name: 'Company', 
            selector: 'companyname', 
            sortable: true, 
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "contact-form", state:{house_id : house_id}}}>{row.companyname}</Link>
        },
        { name: 'Contact Person', selector: 'contactperson', sortable: true, },
        { name: 'Mobile No.', selector: 'mono', sortable: true, },
        { name: 'Landline', selector: 'landline', sortable: true, },
        { name: 'Email', selector: 'email', sortable: true },
        { name: 'URL', selector: 'url', sortable: true,},
        { name: 'Address', selector: 'address', sortable: true, },
        { 
            name: 'Group', 
            selector: 'groupname', 
            sortable: true, 
            cell: row => row.groupname.split("&")[1]
        }
      ];
      var data = [];
      if(props.contacts){
        data = props.contacts;
      }
     
    return (
        <div className="container-fluid contact">
            {console.log("data ::",data)}
            <h4>Contact Details</h4>
            <div className="contact-form pt-25">
                <Table url={"/contact-form"} data={data} columns={columns} header={header} getSingleData={props.getContactById} tableId={"contact"+house_id}  house_id={house_id}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
