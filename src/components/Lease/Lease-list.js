import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getLease, getSingleLease } from "../../store/Actions/Lease";
import { getContact } from "../../store/Actions/contact";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const LeaseList = (props) => {
    const [leaseData, setLeaseData] = useState();

    console.log("conratcDetails", props.contactList);
    useEffect(() => {
        if (props.leases && props.leases.length > 0) {
            props.contactList.map((item1, index1) => {
                const selectedIndex = props.leases.findIndex(val => item1.id === parseInt(val.tenant_name1.split("-")[0]));
                console.log("selctedadata::",selectedIndex)
                console.log("selectedIndex", props.leases[selectedIndex]);
                if (selectedIndex > -1 && selectedIndex !== undefined) {
                    console.log("selctedadata::",selectedIndex)
                    props.leases[selectedIndex].tenant_phone1 = item1.phone1;
                    props.leases[selectedIndex].tenant_email1 = item1.email;
                }
            })
            setLeaseData(props.leases);
            console.log("selectedIndex_1", props.leases)
        }
        else {
            let data = {
                "house_id": house_id
            }
            props.getLease(data);
        }
    }, [props.userData]);

    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    props.getSingleLease({ id: "true" });

    const header = ['Lease Begin Date', 'Lease End Date', 'Rent/Month', 'Rent Due By', 'Rental Insurance'];

    // var columns = [

    //     { 
    //         name: 'Tenant Name', 
    //         selector: 'tenant_name1', 
    //         sortable: true, 
    //         cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "lease", state:{house_id : house_id}}}>{row.tenant_name1}</Link>
    //     },
    //     { name: 'Tenant Phono No.', selector: 'tenant_phone1', sortable: true, },
    //     { name: 'Lease Begin Date', selector: 'lease_begin', sortable: true, cell: row => Util.dateFormat(row.lease_begin)},
    //     { name: 'Lease End Date', selector: 'lease_end', sortable: true, cell: row => Util.dateFormat(row.lease_end) },
    //     { name: 'Security Deposit($)', selector: 'deposit', sortable: true, cell: row => Util.addCommasList(row.deposit)},
    //     { name: 'Amount($)', selector: 'rent', sortable: true,  cell: row => Util.addCommasList(row.rent)},
    //     { name: 'Frequency', selector: 'frequency', sortable: true },
    //     { name: 'Rental Insurance', selector: 'rental_insurance', sortable: true, },
    //     { name: 'space Name', selector: 'hmo_space', sortable: true, },
    //     { name: 'Space Description', selector: 'space_description', sortable: true },
    //     { 
    //         name: 'Status', sortable: true,  selector: 'lease_end', 
    //         sortable: true, 
    //         cell: row =>{new Date(row.lease_end)}
    //     }
    //   ];
    var columns = [

        {
            name: 'Tenant Name',
            selector: 'tenant_name1',
            sortable: true,
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{ pathname: "tenant", state: { house_id: house_id } }}>{row.tenant_name1.split("-")[1]}</Link>
        },
        { name: 'Tenant Phono No.', selector: 'tenant_phone1', sortable: true, },
        // { name: 'Tenant Email', selector: 'tenant_email1', sortable: true, },
        { name: 'Lease Begin Date', selector: 'lease_begin', sortable: true, cell: row => Util.dateFormat(row.lease_begin) },
        { name: 'Lease End Date', selector: 'lease_end', sortable: true, cell: row => Util.dateFormat(row.lease_end) },
        // { name: 'Rent Due By', selector: 'rent_due_by', sortable: true },
        { name: 'Security Deposit($)', selector: 'deposit', sortable: true, cell: row => Util.addCommasList(row.deposit) },
        { name: 'Amount($)', selector: 'rent', sortable: true, cell: row => Util.addCommasList(row.rent) },
        { name: 'Frequency', selector: 'frequency', sortable: true, },
        { name: 'Rental Insurance', selector: 'rental_insurance', sortable: true, },
        { name: 'space Name', selector: 'hmo_space', sortable: true, },
        { name: 'Space Description', selector: 'space_description', sortable: true },
        // { name: 'Renewed', selector: 'renewed', sortable: true, },
        // { name: 'Lease Amount', selector: 'lease_amount', sortable: true, },
        // { name: 'Number Of People', selector: 'people', sortable: true, },
        // { name: 'Number OF Pets', selector: 'pets', sortable: true },
        // { name: 'Realtor Name', selector: 'realtor_name', sortable: true, },
        // { name: 'Realtor Phone', selector: 'realtor_phone', sortable: true, },
        // { name: 'Realtor Email', selector: 'realtor_email', sortable: true, },
        { name: 'Status', selector: '', sortable: true, },
        { name: 'Lease Document', selector: '', sortable: true, },
        // {
        //     name: 'Status', sortable: true, selector: 'lease_end',
        //     sortable: true,
        //     cell: row => { new Date(row.lease_end) }
        // }
    ];
    const [isOpen, setIsopen] = React.useState(false)
    return (
        <div className="container-fluid loan">
            <div className="list-flex">
                <h4>Lease Details</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="loan-inner padding-4">
                {console.log("selectedIndex_2", props.leases)}
                {leaseData !== undefined &&

                    <Table header={header} url={"/tenant"} columns={columns} getSingleData={props.getSingleLease} tableId="lease" data={leaseData} house_id={house_id} />
                }

                <div className="row footer">
                    <Link to={{
                        pathname: "/tenant",
                        state: { house_id: house_id }
                    }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Lease
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
    leases: state.Lease.leases.data,
    contactList: state.Contact.contacts.data
});

const mapDispatchToProps = {
    getLease,
    getContact,
    getSingleLease
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaseList);