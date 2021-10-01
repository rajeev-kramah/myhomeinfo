import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getInsurance, getSingleInsurance } from "../../store/Actions/insurance";
import { getContact } from "../../store/Actions/contact";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const InsuranceList = (props) => {

    useEffect(() => {
        if (props.insurances && props.insurances.length > 0) {
            props.contactList.map((item1, index1) => {
                const selectedIndex = props.insurances.findIndex(val => item1.id === parseInt(val.provider.split("-")[0]));

                console.log("selectedIndex", props.insurances[selectedIndex]);
                if (selectedIndex > -1 && selectedIndex !== undefined) {

                    props.insurances[selectedIndex].provider_url = item1.url;
                }
            })
        }
    }, [props.insurances])
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    props.getSingleInsurance({ id: "true" });

    const header = ["Provider", "Insurance Number", "Effective Date", "Expiry Date", "Premium(Yearly)", "Provider URL", "Renewed", "Status", "Reminder Date"]

    var columns = [
        {
            name: 'Provider',
            selector: 'provider',
            sortable: true,
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{ pathname: "insurance", state: { house_id: house_id } }}>{row.provider.split("-")[1]}</Link>
        },
        { name: 'Insurance Number', selector: 'insurance_number', sortable: true, },
        { name: 'Effective Date', selector: 'effective_date', sortable: true, cell: row => Util.dateFormat(row.effective_date) },
        { name: 'Expiry Date', selector: 'expiry_date', sortable: true, cell: row => Util.dateFormat(row.expiry_date) },
        { name: 'Premium(Yearly)', selector: 'premium', sortable: true },
        {
            name: 'Provider URL', selector: 'provider_url', sortable: true,
            // cell: row => <a href={row.provider_url} target="_blank" to={{ pathname: "insurance", state: { house_id: house_id } }}>{row.provider_url}</a>
        },
        { name: 'Renewed', selector: 'renewed', sortable: true, },
        {  
            name: 'Status', 
            selector: 'status', 
            sortable: true, 
            cell: (row) => row.status === "Active"? <span className="active_status">{row.status}</span> : <span className="expired_status">{row.status}</span>
            
        },
        { name: 'Reminder Date', selector: 'reminder_date', sortable: true, },
    ];
    const [isOpen, setIsopen] = useState(false)
    return (
        <div className="container-fluid loan">
            <div className="list-flex">
                <h4>Insurance Details List</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="loan-inner">
                <Table header={header} url={"/insurance"} columns={columns} getSingleData={props.getSingleInsurance} tableId="insurance" data={props.insurances} house_id={house_id} />
                <div className="row footer">
                    <Link to={{
                        pathname: "/insurance",
                        state: { house_id: house_id }
                    }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Insurance
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


const mapStateToProps = (state) => (

    {
        insurances: state.Insurance.insurances.data,
        contactList: state.Contact.contacts.data
    }
);

const mapDispatchToProps = {
    getInsurance,
    getSingleInsurance,
    getContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceList);