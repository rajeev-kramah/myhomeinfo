import React, { useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getLease,getSingleLease } from "../../store/Actions/Lease";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const LeaseList = (props) => {
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    props.getSingleLease({id : "true"});
    
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
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "lease", state:{house_id : house_id}}}>{row.tenant_name1}</Link>
        },
        { name: 'Tenant Phono No.', selector: 'tenant_phone1', sortable: true, },
        { name: 'Tenant Email', selector: 'tenant_email1', sortable: true, },
        { name: 'Lease Begin Date', selector: 'lease_begin', sortable: true, cell: row => Util.dateFormat(row.lease_begin)},
        { name: 'Lease End Date', selector: 'lease_end', sortable: true, cell: row => Util.dateFormat(row.lease_end) },
        { name: 'Rent Due By', selector: 'rent_due_by', sortable: true },
        { name: 'Security Deposit($)', selector: 'deposit', sortable: true, cell: row => Util.addCommasList(row.deposit)},
        { name: 'Amount($)', selector: 'rent', sortable: true,  cell: row => Util.addCommasList(row.rent)},
        { name: 'Frequency', selector: 'frequency', sortable: true,},
        { name: 'Rental Insurance', selector: 'rental_insurance', sortable: true, },
        { name: 'space Name', selector: 'hmo_space', sortable: true, },
        { name: 'Space Description', selector: 'space_description', sortable: true },
        { name: 'Renewed', selector: 'renewed', sortable: true ,},
        { name: 'Lease Amount', selector: 'lease_amount', sortable: true ,},
        { name: 'Number Of People', selector: 'people', sortable: true, },
        { name: 'Number OF Pets', selector: 'pets', sortable: true },
        { name: 'Realtor Name', selector: 'realtor_name', sortable: true, },
        { name: 'Realtor Phone', selector: 'realtor_phone', sortable: true, },
        { name: 'Realtor Email', selector: 'realtor_email', sortable: true ,},
        { 
            name: 'Status', sortable: true,  selector: 'lease_end', 
            sortable: true, 
            cell: row =>{new Date(row.lease_end)}
        }
      ];
    return (
        <div className="container-fluid loan">
            <h4>Lease Details</h4>
            <div className="loan-inner mt-25">
            <Table header={header} url={"/lease"} columns={columns} getSingleData={props.getSingleLease} tableId="lease" data={props.leases}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/lease",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Lease
                    </Link>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    leases : state.Lease.leases.data
});

const mapDispatchToProps = {
    getLease,
    getSingleLease
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaseList);