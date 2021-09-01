import React, { useEffect,useState } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import { getTransaction,getSingleTransaction} from "../../store/Actions/Transaction";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";


const TransactionList = (props) => {
    let house_id = props.location.state.house_id ? props.location.state.house_id : ""; 
    const [transaction, setTransaction] = useState([])
    
    const header = ["Account Name", "Transaction Date", "Contact Person", "Type", "Amount","Comments", "Receipt","Entry Date & Time", "Entered By"]
    var columns = [
        { 
            name: 'Account Name', 
            selector: 'companyname', 
            sortable: true, 
            cell: row => row.ltransaction == "*" ? row.companyname+"*" :<Link data-tag="allowRowEvents" role="link" to={{pathname : "transaction", state:{house_id : house_id}}}>{row.companyname}</Link>
        },
        { name: 'Contact Person', selector: 'contact_person', sortable: true, },
        { name: 'Type', selector: 'type', sortable: true, },
        { name: 'Amount', selector: 'amount', sortable: true },
        { name: 'Comments', selector: 'comments', sortable: true,},
        { name: 'Receipt', selector: 'receipt', sortable: true, },
        { name: 'Entered By', selector: 'entered_by', sortable: true, },
        { name: 'Entry Date & Time', selector: 'created_at', sortable: true, cell: row => Util.dateFormat(row.created_at)},
        { name: 'Transaction Date', selector: 'date', sortable: true, cell: row => Util.dateFormat(row.date)},
      ];
    return (
        <div className="container-fluid contact">
            <h4>Transactions</h4>
            <div className="contact-form pt-25">
            <Table header={header} columns={columns} url={"/transaction"} getSingleData={props.getSingleTransaction} tableId="transaction" data={props.transactions}  house_id={house_id}/>
                <div className="row footer">
                    <Link to={{
                            pathname : "/transaction",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Transaction
                    </Link>
                   
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    transactions : state.Transaction.transactions.data,
    loanTransaction: state.Loan.mortgageTransaction.data
});

const mapDispatchToProps = {
    getTransaction,
    getSingleTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
