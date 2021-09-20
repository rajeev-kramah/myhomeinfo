import React, { useState } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import { getContactById } from "../../store/Actions/contact";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";

const ContactList = (props) => {
    console.log("userlist11:",props)
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Company", "Contact Person", "Mobile No.", "Landline", "Email", "URL", "Address", 'Group'];

    var columns = [
        {
            name: 'Company',
            selector: 'companyname',
            sortable: true,
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{ pathname: "contact-form", state: { house_id: house_id } }}>{row.companyname}</Link>
        },
        { name: 'Contact Person', selector: 'contactperson', sortable: true, },
        { name: 'Phone 1', selector: 'phone1', sortable: true, },
        { name: 'Phone 2', selector: 'phone2', sortable: true, },
        { name: 'Email', selector: 'email', sortable: true },
        { name: 'URL', selector: 'url', sortable: true, },
        { name: 'Address', selector: 'address', sortable: true, },
        {
            name: 'Group',
            selector: 'groupname',
            sortable: true,
            cell: row => row.groupname.split("&")[1]
        }
    ];
    var data = [];
    if (props.contacts) {
        data = props.contacts;
    }
    const [isOpen, setIsopen] = useState(false)

    return (
        <div className="container-fluid contact">
            {console.log("isOpen ::", isOpen)}
            <div className="list-flex">
                <h4 >Contact Details</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="contact-form pt-25">
                <Table url={"/contact-form"} data={data} columns={columns} header={header} getSingleData={props.getContactById} tableId={"contact" + house_id} house_id={house_id} />
                <div className="row footer">
                    <Link to={{
                        pathname: "/contact-form",
                        state: { house_id: house_id }
                    }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Contact
                    </Link>
                </div>
            </div>
            {isOpen === true &&
                <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" den="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" className="close" onClick={() => setIsopen(false)}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    contacts: state.Contact.contacts.data
});

const mapDispatchToProps = {
    getContactById
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
