import React, { useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getLoan,getSingleLoan } from "../../store/Actions/Loan";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const LoanList = (props) => {
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Type", "Lender Name", "Loan Number", "Loan Amount", "Interest Rate(%)", "Term", "Escrow", "Property Tax","Start Date", "End Date","Status"];

    var columns = [
        { 
            name: 'Type', 
            selector: 'loantype', 
            sortable: true, 
            cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "loan-lender", state:{house_id : house_id}}}>{row.loantype}</Link>
        },
        { name: 'Lender Name', selector: 'companyname', sortable: true, },
        { name: 'Loan Number', selector: 'loannumber', sortable: true, },
        { name: 'Loan Amount', selector: 'loanamount', sortable: true, cell: row => Util.addCommasList(row.loanamount)},
        { name: 'Interest Rate(%)', selector: 'rateofinterest', sortable: true },
        { name: 'Term', selector: 'loanterm', sortable: true,},
        { name: 'Escrow', selector: 'mortgage', sortable: true, },
        { name: 'Property Tax', selector: 'propertytax', sortable: true, cell: row => Util.addCommasList(row.propertytax)},
        { 
            name: 'Start Date', 
            selector: 'loanbegindate', 
            sortable: true, 
            cell: row => Util.dateFormat(row.loanbegindate)
        },
        { 
            name: 'End Date', 
            selector: 'loanclosuredate', 
            sortable: true, 
            cell : row => Util.dateFormat(row.loanclosuredate)
        },
        { name: 'Status', selector: 'status', sortable: true, },
         { 
            name: 'Amortization', 
            selector: 'amortization', 
            cell: row => <Link data-tag="allowRowEvents" className="glyphicon glyphicon-tasks" role="link" to={{pathname : "amortization", state:{id : row.id}}}></Link>
        },
      ];

    return (
        <div className="container-fluid loan">
            <h4>Loan Details List</h4>
            <div className="loan-inner mt-25">
            <Table header={header} url={"/loan-lender"} columns={columns} getSingleData={props.getSingleLoan} tableId="loan" data={props.loans}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/loan-lender",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Loan
                    </Link>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    loans : state.Loan.loans.data
});

const mapDispatchToProps = {
    getLoan,
    getSingleLoan
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanList);