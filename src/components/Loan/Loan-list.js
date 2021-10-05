import React, { useState } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { getLoan,getSingleLoan } from "../../store/Actions/Loan";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const LoanList = (props) => {
    console.log("props Loans",props.loans)
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Type", "Lender Name", "Loan Number", "Loan Amount", "Interest Rate(%)", "Term", "Escrow", "Property Tax","Start Date", "End Date","Status"];

    var columns = [
        { name: 'Lender Name', selector: 'lcontactperson', sortable: true,  cell: row => <Link data-tag="allowRowEvents" role="link" to={{pathname : "loan-lender", state:{house_id : house_id}}}>{row.lcontactperson}</Link>},
        { 
            name: 'Type', 
            selector: 'loantype', 
            sortable: true, 
           
        },
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
        {  
            name: 'Status', 
            selector: 'status', 
            sortable: true, 
            cell: (row) => row.status === "Active"? <span className="active_status">{row.status}</span> : row.status === "Renewal" ? <span className="renewed_status">{row.status}</span> :row.status === "Closed" ? <span className="expired_status">{row.status}</span>:row.status === "Foreclosed" ? <span className="foreclosed_status">{row.status}</span> :""
            
        },
         { 
            name: 'Amortization Table', 
            selector: 'amortization', 
            cell: row => <Link data-tag="allowRowEvents" className="glyphicon glyphicon-tasks" role="link" to={{pathname : "amortization", state:{id : row.id}}}></Link>
        },
      ];
      const [isOpen, setIsopen] = useState(false)

    return (
        <div className="container-fluid loan">
             <div className="list-flex">
                <h4>Loan Details List</h4>
                <i className="glyphicon glyphicon-info-sign btn-lg info-logo" data-toggle="modal" data-target="#exampleModal" onClick={() => setIsopen(true)}></i>
            </div>
            <div className="loan-inner">
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
console.log("ststedata",state),
    {
    loans : state.Loan.loans.data
});

const mapDispatchToProps = {
    getLoan,
    getSingleLoan
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanList);