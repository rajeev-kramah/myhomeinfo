import React, { useEffect,useState } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import {getSingleLoan,addLoanAmortization } from "../../store/Actions/Loan";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";

const Amortization = (props) => {
    //const [tableData, setTableData] =  useState([]);
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Type", "Lender Name", "Loan Number", "Loan Amount", "Interest Rate(%)", "Term", "Escrow", "Property Tax","Start Date", "End Date","Status"];
    var columns = [
        { name: 'PMT NO', selector: 'month', sortable: true,},
        { name: 'Payment Date', selector: 'paymentdate', sortable: true, },
        { name: 'Begining Balance', selector: 'loanamount', sortable: true, },
        { name: 'Scheduled Payment', selector: 'scheduledpayment', sortable: true,},
        { name: 'Extra Payment', selector: 'extra', sortable: true,},
        { name: 'Total Payment', selector: 'payment', sortable: true, },
        { name: 'Principal', selector: 'principal', sortable: true },
        { name: 'Interest', selector: 'interest', sortable: true, },
        { name: 'Ending Balance', selector: 'endingloan', sortable: true, },
        { name: 'Cumulative Interest', selector: '', sortable: true, },
      ];
      

     // useEffect(()=>{
        let loanData = props.loanDetails;
        /**Calculating Amortization */
        let tableData = [];
        if(props.loanDetails){
          let totalM = parseInt(loanData[0].loanterm)*12
          var payment = "";
          let roi = parseFloat(loanData[0].rateofinterest);
          var mroi =  roi/ (12*100);
          let loa = parseInt(Util.removeCommas(loanData[0].loanamount));
          let term =  parseInt(loanData[0].loanterm * 12);
          for(let i = 0; i<totalM; i++){
              let data = {};
                  let loanamount;
                  let interest = "";
                  let principal = "";
                  let extra = "";
                  let endingloan="";
                  let scheduledpayment = "";
                  let cumulativeinterest = "";
                  let paymentdate = "";
              if(i==0){
                  payment = loa/(((Math.pow((1+mroi), term))-1)/(mroi*(Math.pow((1+mroi), term))));
                      loanamount = loa;
                      payment = payment;
                      interest = (loa * mroi);
                      principal =  (payment -  interest);
                      extra = "";
                      endingloan =  (loanamount - principal);
                      scheduledpayment = "";
                      cumulativeinterest = "";
                      paymentdate = new Date(props.loanDetails[0].loanbegindate);
              }else{
                      let previousData =  Util.removeCommas(tableData[i-1].endingloan);
                      loanamount = Util.removeCommas(previousData);
                      payment = Util.removeCommas(payment);
                      interest = previousData * mroi;
                      principal = payment -  interest;
                      extra = "";
                      endingloan = previousData - principal;
                      scheduledpayment = "";
                      cumulativeinterest = "";
                      let date =  new Date(props.loanDetails[0].loanbegindate)
                      paymentdate = new Date(date.setMonth(date.getMonth()+(i)));
              }
              data.month = i+1;
              data.loanamount = Util.addCommasList(parseFloat(loanamount).toFixed(2));
              data.payment = Util.addCommasList(parseFloat(payment).toFixed(2));
              data.interest = Util.addCommasList(parseFloat(interest).toFixed(2));
              data.principal = Util.addCommasList(parseFloat(principal).toFixed(2));
              data.extra = "";
              data.endingloan = Util.addCommasList(parseFloat(endingloan).toFixed(2));
              data.loan_id = props.loanDetails[0].id;
              data.scheduledpayment = scheduledpayment;
              data.cumulativeinterest = cumulativeinterest;
            //   let day = paymentdate.getDay();
            //   let month = paymentdate.getMonth();
            //   let year = paymentdate.getFullYear();
            //   let hour = paymentdate.getHours();
            //   let minutes = paymentdate.getMinutes();
              data.paymentdate = Util.dateFormat(paymentdate) ;
              tableData.push(data);
          }
          //setTableData(tableData)
          //props.addLoanAmortization(tableData);
        }
     // },[props.amortization])

      
     
    return (
        <div className="container-fluid loan">
            <h4>Amortization Table</h4>
            <div className="loan-inner mt-25">
            <Table header={header} url={"/loan-lender"} columns={columns} getSingleData={props.getSingleLoan} tableId="amortization" data={tableData}  house_id={house_id}/>
                <div className="row footer">
                    {/* <Link to={{
                            pathname : "/loan-lender",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right">
                        <span className="glyphicon glyphicon-plus"> </span> Add New Loan
                    </Link> */}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    loanDetails : state.Loan.loanDetails.data,
    amortization : state.Loan.amortization.data
});

const mapDispatchToProps = {
    getSingleLoan,
    addLoanAmortization
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Amortization);