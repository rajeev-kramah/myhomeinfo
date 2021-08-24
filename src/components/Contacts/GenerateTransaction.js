import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { addLoan,getSingleLoan,addLoanTransaction,getLoanTransaction,deleteLoanTransaction} from "../../store/Actions/Loan";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import Table from "../../Reusable/Table";
import { NotificationManager } from "react-notifications";


const GenerateTransaction = (props) => {
   
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const [buttonStatus, setButtonStatus] = useState(true);
    const [escrowDeposit, setEscrowDeposit] = useState(0)
    const [transactionAmount, setTransationAmount] = useState(props.contactDetails && props.contactDetails != undefined && props.contactDetails.length > 0 ? props.contactDetails[0].transaction_amount : 0)
    const [startDate,setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [tableData, setTableData] =  useState([]);
    const [loan_id, setLoan_id] =  useState();
    const [contacts_id,setContacts_id] = useState(props.contactDetails && props.contactDetails != undefined && props.contactDetails.length > 0 ? props.contactDetails[0].id : "");
   
   
   
    let tabs = [
        {pathname : "/contact-form", label : "Contact Details"},
        {pathname : "/generate-transaction", label : "Generate Transaction"}
    ]
   
    const handleSubmit = () => {
        props.addLoanTransaction(tableData);
        setButtonStatus(true);
    }

    useEffect(()=>{
     if((props.loans && props.loans != undefined && props.loans.length > 0) && (props.contactDetails && props.contactDetails !=undefined && props.contactDetails.length > 0)){
        for(let i=0; i<props.loans.length; i++){
            if(props.loans[i].escrowPayee == props.contactDetails[0].contactperson){
               setEscrowDeposit(props.loans[i].mortgage);
               setLoan_id(props.loans[i].id);
                break;
            }
        }
     }
    
    },[props.loans,props.contactDetails])


    useEffect(()=>{
        if(props.contactDetails && props.contactDetails != undefined && Object.keys(props.contactDetails).length > 0){
            setTransationAmount( props.contactDetails[0].transaction_amount ? props.contactDetails[0].transaction_amount : 0)
        }
    },[props.contactDetails])

    useEffect(()=> {
        let tableData = [];
        if(props.loanTransaction && props.loanTransaction != undefined && Object.keys(props.loanTransaction).length > 0) {
            for(let i = 0; i < props.loanTransaction.length; i++){
                let data = {};
                data.month = props.loanTransaction[i].pmtno;
                data.loanamount = props.loanTransaction[i].beginingamount;
                data.payment = props.loanTransaction[i].totalpayment;
                data.interest = props.loanTransaction[i].interest;
                data.principal = props.loanTransaction[i].principal;
                data.extra = props.loanTransaction[i].extrapayment;
                data.endingloan = props.loanTransaction[i].endingbalance;
                data.scheduledpayment = props.loanTransaction[i].scheduledpayment;
                data.cumulativeinterest = props.loanTransaction[i].cumulativeinterest;
                data.paymentdate = Util.dateFormat(props.loanTransaction[i].paymentdate);
                data.loan_id = props.loanTransaction[i].loan_id;
                data.account_name = props.loanTransaction[i].account_name
                data.comment = props.loanTransaction[i].comment
                data.entered_by =  props.loanTransaction[i].entered_by
                data.contacts_id =  props.loanTransaction[i].contacts_id
                tableData.push(data);
            }
            setTableData(tableData)
        }
    }, [props.loanTransaction])


    const monthDiff = (d1, d2) => {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    const showTableView = () => {
        /**Insurance Transaction */
        /**Property Tax Transaction*/
        let transactionData = [];
        if(props.contacts &&  props.contacts != undefined && props.contacts.length > 0){
            for(let i=0; i< props.contacts.length; i++){
                if(props.contacts[i].groupname == "Expenses&Insurance" || props.contacts[i].groupname == "Expenses&Property-tax"){
                    if(props.transactions && props.transactions.length > 0){
                        for(let j=0; j<props.transactions.length; j++){
                            if(props.contacts[i].contactperson == props.transactions[j].contact_person){
                                transactionData.push(props.transactions[j]);
                            }
                        }
                    }
                }
            }
        }
    
        let tableData = [];
        let d1 = new Date(startDate);
        let d2 = new Date(endDate);
        let diff = monthDiff(d1,d2);
        let transactionAmount = props.contactDetails && props.contactDetails.length > 0 ? props.contactDetails[0].transaction_amount : 0;
        var year1 = d2.getFullYear();
        var year2 = new Date().getFullYear();
        var payment = "";
        if(year1 <= year2){
              for(let i=0; i <= diff; i++){
                let data = {};
                let interest = "";
                let loanamount = "";
                let principal = "";
                let extra = "";
                let endingloan="";
                let scheduledpayment = "";
                let cumulativeinterest = "";
                let paymentdate = "";
                transactionAmount = transactionAmount ? Util.removeCommas(transactionAmount) : 0;
                if(i==0){
                    payment = transactionAmount;
                    loanamount = escrowDeposit;
                    interest = "";
                    principal =  "";
                    extra = "";
                    endingloan =  parseInt(escrowDeposit) + parseInt(transactionAmount);;
                    scheduledpayment = "";
                    cumulativeinterest = "";
                    paymentdate = new Date(startDate);
                }else{
                    let previousData =  Util.removeCommas(tableData[i-1].endingloan);
                    loanamount = Util.removeCommas(previousData);
                    payment = transactionAmount;
                    interest = "";
                    principal =  "";
                    extra = "";
                    endingloan =  parseInt(previousData) + parseInt(transactionAmount);
                    scheduledpayment = "";
                    cumulativeinterest = "";
                    let date =  new Date(startDate)
                    paymentdate = new Date(date.setMonth(date.getMonth()+(i)));
                }
                data.loanamount = Util.addCommasList(parseFloat(loanamount).toFixed(2));
                data.month = i+1;
                data.payment = Util.addCommasList(parseFloat(payment).toFixed(2));
                data.interest = "";
                data.principal = "";
                data.extra = "";
                data.endingloan = Util.addCommasList(parseFloat(endingloan).toFixed(2));
                data.loan_id = "";
                data.scheduledpayment = "";
                data.cumulativeinterest = "";
                data.paymentdate =  Util.dateFormat(paymentdate);
                data.account_name = props.contactDetails && props.contactDetails.length > 0 ? props.contactDetails[0].contactperson : ""
                data.comment = props.contactDetails && props.contactDetails.length > 0 ? props.contactDetails[0].comment : ""
                data.entered_by =  JSON.parse(localStorage.getItem('user')).name;
                data.contacts_id =  props.contactDetails && props.contactDetails.length > 0 ? props.contactDetails[0].id :0
                data.loan_id = loan_id;
                tableData.push(data);
              }



              
            /**Pushing Insurance & property-tax transaction*/
            for(let k=0; k < transactionData.length; k++){
                let trnDate = new Date(transactionData[k].date);
                var trnDateyear1 = trnDate.getFullYear();
                var trnDatemonth1 = trnDate.getMonth();
                var trnDateday1 = trnDate.getDate();
                let pos = 0;
                let data1 = {};
                let status = true;
                    for(let j=0; j< tableData.length; j++){
                        if(tableData.length){
                            let prvDate = new Date(tableData[j].paymentdate);
                            var prvDateyear2 = prvDate.getFullYear();
                            var prvDatemonth2 = prvDate.getMonth();
                            var prvDateday2 = prvDate.getDate();
                            if(prvDatemonth2 == trnDatemonth1 && prvDateyear2 == trnDateyear1 && (prvDateday2 < trnDateday1 || prvDateday2 == trnDateday1)){
                                pos++;
                                status = false;
                            }else{
                                if(status){
                                    pos++;
                                }
                               
                            }       
                        }
                    }
   
                    
                    let previousData =  tableData[pos-1].endingloan ? Util.removeCommas(tableData[pos-1].endingloan) : 0;
                    let transactionAmount = transactionData[k].amount ? Util.removeCommas(transactionData[k].amount) : 0;
                    let endingloan = parseInt(previousData) - parseInt(transactionAmount);
                    data1.month = "";
                    data1.loanamount = previousData;
                    data1.payment = Util.addCommasList(parseFloat(transactionAmount).toFixed(2));
                    data1.interest = "";
                    data1.principal = "";
                    data1.extra = "";
                    data1.endingloan = Util.addCommasList(parseFloat(endingloan).toFixed(2));
                    data1.loan_id = "";
                    data1.scheduledpayment = "";
                    data1.cumulativeinterest = "";
                    data1.paymentdate =  Util.dateFormat(transactionData[k].date);
                    data1.account_name = transactionData[k].contact_person;
                    data1.comment = transactionData[k].comments
                    data1.entered_by = transactionData[k].entered_by;
                    data1.contacts_id =  contacts_id;
                    data1.loan_id = "";
                    tableData.splice(pos,0,data1);
                   
                    for(let m = pos+1; m<tableData.length; m++){
                        tableData[m]["endingloan"] = parseInt(Util.removeCommas(tableData[m-1]["endingloan"]))  + parseInt(Util.removeCommas(tableData[m]["payment"]))
                    }
                    
                   
  
            }
            console.log(tableData)
            setButtonStatus(false);
            setTableData(tableData)
        }
           
    }


    var columns = [
        { name: 'Date', selector: 'paymentdate', sortable: true,},
        { name: 'Account Name', selector: 'account_name', sortable: true, },
        { name: 'Comments', selector: 'comment', sortable: true, },
        { name: 'Begining Balance', selector: 'loanamount', sortable: true, },
        { name: 'Transaction Amount', selector: 'payment', sortable: true,},
        { name: 'Balance', selector: 'endingloan', sortable: true,},
        { name: 'Entered By', selector: 'entered_by', sortable: true, },
      ];

    return (
        <div className="container-fluid house">
            <h4>Transaction Details</h4>
            <div className="house-form">
               <Tab loanPage="Generate Transaction" tabs={tabs}  house_id={house_id}/>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 house-form ">
                            <span className="" id="text">Let's generate escrow transaction for this contact you have paid till date.</span><br></br><br></br>
                            <div className="row ">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Escrow Deposit">Begining Amount</label>
                                        <input type="text" placeholder="Begining Amount" value={escrowDeposit} onChange={e=> setEscrowDeposit(e.target.value)} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Amount">Amount</label>
                                        <input type="text" placeholder="Amount" value={transactionAmount} onChange={e=> setTransationAmount(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="row ">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Start Date">Start Date</label>
                                         <input type="date" placeholder="Start Date" value={startDate} onChange={e=> setStartDate(e.target.value)} className="form-control" /> 
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Start Date">End Date</label>
                                        <input type="date" id="endDate" placeholder="End Date" value={endDate} onChange={e=> setEndDate(e.target.value)} className="form-control" /> 
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4"></div>
                                    <div className="col-md-4" align="center" style={{marginTop: "15px"}}>
                                        <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={showTableView}><span className="glyphicon glyphicon-arrow-left"></span>Generate Transaction</button>
                                    </div>
                                <div className="col-md-4"></div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                <div className="loan-inner mt-25">
                    <Table header={""} url={""} columns={columns} getSingleData={props.getSingleLoan} tableId="generateTransaction" data={tableData}  house_id={house_id}/>
                    <div className="row footer">
                        <div className="col-md-4"></div>
                            <div className="col-md-4 pt-pb-10" style={buttonStatus ?    {display:"none"} : {display:"block"}} align="center">
                                <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Confirm And Save</button>
                            </div>

                            {/* <div className="col-md-4 pt-pb-10" style={buttonStatus ?    {display:"block"} : {display:"none"}} align="center">
                                <button className="btn btn-primary btn-sm" onClick={handleDelete}>Delete</button>
                            </div> */}
                        </div>
                    </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    loans : state.Loan.loans.data,
    contactDetails: state.Contact.contactDetails.data,
    loanTransaction: state.Loan.loanTransaction.data,
    contacts : state.Contact.contacts.data,
    transactions : state.Transaction.transactions.data,
});

const mapDispatchToProps = {
    addLoan,
    getSingleLoan,
    addLoanTransaction,
    getLoanTransaction,
    deleteLoanTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateTransaction);