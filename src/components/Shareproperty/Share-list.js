import React, { useState } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import { getShareById } from "../../store/Actions/Share";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";
// import Modal from '@material-ui/core/Modal';


const ShareList = (props) => {

    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Company", "Contact Person", "Mobile No.", "Landline", "Email", "URL", "Address", 'Group'];

    var columns = [
        {
            name: 'Shared Name',
            selector: 'fname',
            sortable: true,
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{ pathname: "share", state: { house_id: house_id } }}>{row.fname} {row.lname}</Link>
        },
        // { name: 'Last Name', selector: 'lname', sortable: true, },
        { name: 'Phone Number', selector: 'phono', sortable: true, },
        { name: 'Email Id', selector: 'email', sortable: true, },
        { name: 'Access Level', selector: 'accesslevel', sortable: true },
        { name: 'Action', selector: 'action', sortable: true },

    ];

    const[isOpen, setIsopen] = React.useState(false)
    return (
        <div className="container-fluid contact">
            <div className="list-flex">
                <h4>Share Property Details</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="contact-form pt-25 mt-10">
                <Table url={"/share"} data={props.share} columns={columns} header={header} getSingleData={props.getShareById} tableId={"contact" + house_id} house_id={house_id} />
                <div className="row footer">
                    <Link to={{
                        pathname: "/share",
                        state: { house_id: house_id }
                    }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        <span className="glyphicon glyphicon-plus"> </span> Share Property
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
    share: state.Share.shares.data
});

const mapDispatchToProps = {
    getShareById
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareList);
