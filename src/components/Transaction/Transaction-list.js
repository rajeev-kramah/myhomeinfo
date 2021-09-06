import React, { useEffect,useState } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import { getTransaction,getSingleTransaction,getTransactionAllData} from "../../store/Actions/Transaction";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

    
    
    const TransactionList = (props) => {
        console.log("props::22",props)
        let house_id = props.location.state.house_id ? props.location.state.house_id : ""; 
        props.getSingleTransaction({id : "true"});
        // props.getTransactionAllData();
        
        const [active, setActive] = useState("Transactions");
        const [transaction, setTransaction] = useState(false);
        const [deletedTransaction, setDeletedTransaction] = useState(true);
        const [deletedTransactionArry, setDeletedTransactionArry] = useState([]);
        const [loanclosuredate, setLoanclosuredate] = useState('')
        const [loanHouse_id, setLoanHouse_id] = useState('')
        const [endDate, setEndDate] = useState('')
        const [date, setDate] = useState(Util.getCurrentDate("-"));
        
        useEffect(()=> {
            if(props.transactionAllData && props.transactionAllData.length > 0) {
               
                let transactionsArr = [];
                transactionsArr = props.transactionAllData !== undefined && props.transactionAllData.filter(item => item.is_deleted === 1);
                setDeletedTransactionArry(transactionsArr);
                console.log("props.transactionAllData:::",props.transactionAllData,transactionsArr)
            }
          else {
                let data = {
                    "house_id":house_id
                }
                props.getTransactionAllData(data);
            }
        },[props.transactionAllData]);

        useEffect(()=> {
            let current = new Date();
            console.log("current;;",current)
            if(props.loanDetails && props.loanDetails.length > 0) {
                setLoanclosuredate(props.loanDetails[0].loanclosuredate);
                console.log("props.loanDetails[0].loanclosuredate",props.loanDetails[0].loanclosuredate)
                setLoanHouse_id(props.loanDetails[0].house_id);
                
                let enddate = new Date(props.loanDetails[0].loanclosuredate);
                enddate = Math.floor(enddate.getTime() / 86400000);
                        current = Math.floor(current.getTime() / 86400000);
                        console.log(current +">"+ enddate)
    
                        setEndDate(enddate);
                        setDate(current);
                // setId(props.loanDetails[0].id);
            
            }
        }, [props.loanDetails])
        const handleDocType = (type) => {
            setActive(type);
            setTransaction(false ? true :false)
            setDeletedTransaction(true)
        }
        const handleDocType2 = (type) => {
            setActive(type);
            setTransaction(true)
            setDeletedTransaction(false ? true :false)
        }

        const header = ["Account Name", "Transaction Date", "Contact Person", "Type", "Amount","Comments", "Receipt","Entry Date & Time", "Entered By"]
        var columns = [
            { 
                name: 'Account Name', 
                selector: 'companyname', 
                sortable: true, 
                cell: row =>
                row.ltransaction == "*" ? row.companyname+"*" :
                    <Link data-tag="allowRowEvents" role="link" to={{pathname : "transaction", state:{house_id : house_id}}}>{row.account_name}</Link>
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

        const headerOfDel_Data = ["Account Name", "Transaction Date", "Contact Person", "Type", "Amount","Comments", "Receipt","Entry Date & Time", "Entered By"]

        var columnsOfDel_Data = [
            // { 
            //     name: 'Account Name', 
            //     selector: 'companyname', 
            //     sortable: true, 
            //     cell: row =>
            //     row.ltransaction == "*" ? row.companyname+"*" :
            //         <Link data-tag="allowRowEvents" role="link" to={{pathname : "transaction", state:{house_id : house_id}}}>{row.account_name}
            //         </Link>
                   
            //     },
          
            { name: 'Account Name', selector: 'companyname', sortable: true, },
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
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className={active === "Transactions"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType("Transactions")}>Transactions</span>
                        <span className={active === "Deleted Transactions"? "active-bar mr-50": "mr-50"} onClick={(e)=> handleDocType2("Deleted Transactions")}>Deleted Transactions</span>
                    </div>
                </div>
               {!transaction ?
                    <>
                        <Table header={header} columns={columns} url={"/transaction"} getSingleData={props.getSingleTransaction} tableId="transaction" data={props.transactions} house_id={house_id} />
                        <div className="row footer">
                            {/* <Link to={{
                                pathname: "/transaction",
                                state: { house_id: house_id }
                            }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                                <span className="glyphicon glyphicon-plus"> </span> Add New Transaction
                            </Link> */}
                               {
                       loanHouse_id === house_id && endDate < date 
                        ? <Link to={{
                            pathname : "/transaction",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        <span className="glyphicon glyphicon-plus"> </span> Loan Transaction
                    </Link> :<>You are not allowed for New Transaction Because Your Loan is Closed </>
                   }
                        </div>
                    </>
               : null}
               {!deletedTransaction ?
               
                      <Table header={headerOfDel_Data} columns={columnsOfDel_Data}  getSingleData={props.getSingleTransaction} url={"/transaction"} 
                       tableId="transactionid" data={deletedTransactionArry}  />
               : null}
               {/* {console.log("stateTrans12::",props.transactionDeletedData[0].is_deleted)} */}
               
                   
                </div>
            </div>
        )
    }


    const mapStateToProps = (state) => (
        // console.log('state::',state)
        console.log("statetr::",state),
        {
        transactions : state.Transaction.transactions.data,
        transactionAllData: state.Transaction.transactionAllData && state.Transaction.transactionAllData.data !== undefined && state.Transaction.transactionAllData.data,
        // transactionAllData: state.Transaction.transactionAllData.data,
        loanTransaction: state.Loan.mortgageTransaction.data,
        loanDetails : state.Loan.loans.data
        }
    );

    const mapDispatchToProps = {
        getTransaction,
        getSingleTransaction,
        getTransactionAllData
    }

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
