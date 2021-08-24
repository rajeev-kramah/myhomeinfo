import React, { useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getInsurance,getSingleInsurance } from "../../store/Actions/insurance";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const InsuranceList = (props) => {

    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    props.getSingleInsurance({id : "true"});

    const header = ["Provider", "Insurance Number", "Effective Date", "Expiry Date", "Premium(Yearly)", "Provider URL", "Renewed","Status", "Reminder Date"]

    var columns = [
        { 
            name: 'Provider', 
            selector: 'provider', 
            sortable: true, 
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "insurance", state:{house_id : house_id}}}>{row.provider}</Link>
        },
        { name: 'Insurance Number', selector: 'insurance_number', sortable: true,},
        { name: 'Effective Date', selector: 'effective_date', sortable: true,cell: row => Util.dateFormat(row.effective_date)},
        { name: 'Expiry Date', selector: 'expiry_date', sortable: true,  cell: row => Util.dateFormat(row.expiry_date) },
        { name: 'Premium(Yearly)', selector: 'premium', sortable: true },
        { name: 'Provider URL', selector: 'provider_url', sortable: true,},
        { name: 'Renewed', selector: 'renewed', sortable: true, },
        { name: 'Status', selector: 'status', sortable: true, },
        { name: 'Reminder Date', selector: 'reminder_date', sortable: true, },
      ];
     
    return (
        <div className="container-fluid loan">
            <h4>Insurance Details List</h4>
            <div className="loan-inner mt-25">
            <Table header={header} url={"/insurance"} columns={columns} getSingleData={props.getSingleInsurance} tableId="insurance" data={props.insurances}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/insurance",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Insurance
                    </Link>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    insurances : state.Insurance.insurances.data
});

const mapDispatchToProps = {
    getInsurance,
    getSingleInsurance
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceList);