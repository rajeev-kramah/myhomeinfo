import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { addLoan, getSingleLoan, addLoanTransaction, getLoanTransaction, deleteLoanTransaction } from "../../store/Actions/Loan";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import Table from "../../Reusable/Table";
import { NotificationManager } from "react-notifications";
import NumberFormat from "react-number-format";

const LoanTransaction = (props) => {
  console.log("loan::props",props)
  let house_id = props.location.state.house_id ? props.location.state.house_id : "";
  let loggedinUser = Util.getLoggedinUser();
  let today = new Date();
  const [id, setId] = useState('');
  const [loanamount, setLoanamount] = useState('');
  const [rateofinterest, setRateofinterest] = useState('');
  const [loanterm, setLoanterm] = useState('');
  const [loannumber, setLoannumber] = useState('');
  const [startDate, setStartDate] = useState(Util.getCurrentDate("-"))
  const [endDate, setEndDate] = useState(Util.getCurrentDate("-"))
  const [tableData, setTableData] = useState([]);
  const [loanStatus, setLoanStatus] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [loantype, setLoantype] = useState('');
  const [enteredBy, setEnteredBy] = useState(loggedinUser["name"]);

  useEffect(() => {
    if (props.loanDetails && props.loanDetails.length > 0) {
      console.log("startDateofloan12:", props.loanDetails[0])
      setLoanamount(props.loanDetails[0].loanamount);
      setRateofinterest(props.loanDetails[0].rateofinterest);
      setLoanterm(props.loanDetails[0].loanterm);
      setLoannumber(props.loanDetails[0].loannumber);
      setStartDate(props.loanDetails[0].loanbegindate);
      setEndDate(props.loanDetails[0].loanclosuredate);
      setLoantype(props.loanDetails[0].loantype);
      setId(props.loanDetails[0].id);
    }
  }, [props.loanDetails])

  useEffect(() => {
    let tableData = [];
    if (props.loanTransaction && props.loanTransaction.length > 0) {
      console.log("lDatatable", props.loanTransaction)
      for (let i = 0; i < props.loanTransaction.length; i++) {
        let data = {};
        data.month = i + 1;
        data.loanamount = props.loanTransaction[i].beginingamount;
        data.payment = props.loanTransaction[i].totalpayment;
        data.interest = props.loanTransaction[i].interest;
        data.principal = props.loanTransaction[i].principal;
        data.extra = props.loanTransaction[i].extrapayment;
        data.endingloan = props.loanTransaction[i].endingbalance;
        data.scheduledpayment = props.loanTransaction[i].scheduledpayment;
        data.cumulativeinterest = props.loanTransaction[i].cumulativeinterest;
        data.paymentdate = Util.dateFormat(props.loanTransaction[i].paymentdate);
        data.loan_id = props.loanDetails[0].loan_id;
        tableData.push(data);
      }
      setTableData(tableData)
    }
  }, [props.loanTransaction,props.loanDetails])


  const handleSubmit = () => {
    props.addLoanTransaction(tableData);
    setButtonStatus(true);

  }


  const showLoanDetails = () => {
    setLoanStatus(false);
  }
  const validate = () => {
console
    if (startDate === '') {
      NotificationManager.error("Error Message", "Start Date cannot be empty.");
      return false;
    } else if (endDate === '') {
      NotificationManager.error("Error Message", "End Date cannot be empty.");
      return false;
    }

    let start = new Date(startDate);
    let end = new Date(endDate);

    end = Math.floor(end.getTime() / 86400000);
    start = Math.floor(start.getTime() / 86400000);

    if (start > end) {
      console.log("yes")
      NotificationManager.error("Error Message", "End Date must be greater than Start Date.");
      return false;
    }
    return true;
  }
  const showTableView = () => {
    
    let valid = validate();
    console.log("dat12:::",props.loanDetails,valid)
    if (valid) {
      let loanData = props.loanDetails;
      /**Calculating Amortization */
      let tableData = [];

      if (props.loanDetails) {
    
        var months;
        let d1 = new Date(startDate);
        let d2 = new Date(endDate);
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        months = months <= 0 ? 0 : months;

        var year1 = d2.getFullYear();
        var month1 = d2.getMonth();
        var day1 = d2.getDate();
        var year2 = new Date().getFullYear();
        var month2 = new Date().getMonth();
        var day2 = new Date().getDate();

        var payment = "";
        let roi = parseFloat(loanData[0].renewal_intrest_rate ? loanData[0].renewal_intrest_rate : rateofinterest);
        var mroi = roi / (12 * 100);
        let loa = parseInt(Util.removeCommas(loanData[0].loanamount));
        let term = parseInt(loanData[0].loanterm * 12);
        for (let i = 0; i < months; i++) {
         
          let data = {};
          let loanamount;
          let interest = "";
          let principal = "";
          let extra = "";
          let endingloan = "";
          let scheduledpayment = "";
          let cumulativeinterest = "";
          let paymentdate = "";
          if (i == 0) {
            
            payment = loa / (((Math.pow((1 + mroi), term)) - 1) / (mroi * (Math.pow((1 + mroi), term))));
            loanamount = loa;
            payment = payment;
            interest = (loa * mroi);
            principal = (payment - interest);
            extra = "";
            endingloan = (loanamount - principal);

            scheduledpayment = "";
            cumulativeinterest = "";
            paymentdate = new Date(startDate);
          } else {
           
            let previousData = Util.removeCommas(tableData[i - 1].endingloan);
            loanamount = Util.removeCommas(previousData);
            payment = Util.removeCommas(payment);
            interest = previousData * mroi;
            principal = payment - interest;
            extra = "";
            endingloan = previousData - principal;
            scheduledpayment = "";
            cumulativeinterest = "";
            let date = new Date(startDate)
            paymentdate = new Date(date.setMonth(date.getMonth() + (i + 1)));
          }
         
          data.month = i + 1;
          data.loanamount = Util.addCommasList(parseFloat(loanamount).toFixed(2));
          data.payment = Util.addCommasList(parseFloat(payment).toFixed(2));
          data.interest = Util.addCommasList(parseFloat(interest).toFixed(2));
          data.principal = Util.addCommasList(parseFloat(principal).toFixed(2));
          data.extra = "";
          data.endingloan = Util.addCommasList(parseFloat(endingloan).toFixed(2));
          data.loan_id = props.loanDetails[0].id;
          data.scheduledpayment = scheduledpayment;
          data.cumulativeinterest = cumulativeinterest;
          data.entered_by = enteredBy;
          let day = paymentdate.getDay();
          let month = paymentdate.getMonth();
          let year = paymentdate.getFullYear();
          let hour = paymentdate.getHours();
          let minutes = paymentdate.getMinutes();
          data.paymentdate = Util.dateFormat(paymentdate);
          //month+"/"+day+"/"+year + " "+ hour +":"+minutes;
        
          tableData.push(data);
        
        }
        setLoanStatus(true);
        setButtonStatus(false);
      }

      if (tableData.length == 0) {
        console.log("data12::")
        let data = {};
        data.loan_id = props.loanDetails && props.loanDetails[0].id;
        data.delete = true;
        tableData.push(data);
      }
     
      setTableData(tableData)
    }

  }



  let tabs = [
    { pathname: "/loan-lender", label: "Lender Details" },
    { pathname: "/loan-details", label: "Loan Details" },
  ]

  if (loantype === 'Mortgage') {
    tabs.push({ pathname: "/loan-additionals", label: "Escrow & Property Tax" });
  }

  tabs.push({ pathname: "/loan-transaction", label: "Loan Transactions" });


  var columns = [
    { name: 'PMT NO', selector: 'month', sortable: true, },
    { name: 'Payment Date', selector: 'paymentdate', sortable: true, },
    { name: 'Begining Balance', selector: 'loanamount', sortable: true, },
    { name: 'Scheduled Payment', selector: 'scheduledpayment', sortable: true, },
    { name: 'Extra Payment', selector: 'extra', sortable: true, },
    { name: 'Total Payment', selector: 'payment', sortable: true, },
    { name: 'Principal', selector: 'principal', sortable: true },
    { name: 'Interest', selector: 'interest', sortable: true, },
    { name: 'Ending Balance', selector: 'endingloan', sortable: true, },
    { name: 'Cumulative Interest', selector: '', sortable: true, },
  ];


  const handleDelete = () => {
    props.deleteLoanTransaction({
      loan_id: props.loanDetails[0].id
    });
    setTableData([])
  }


  return (
    <div className="container-fluid house">
      {console.log("startDateofloan", startDate, "sxx", endDate)}
      <h4>Transaction Details</h4>
      <div className="house-form">
        <Tab loanPage="Loan Transactions" tabs={tabs} id={id} house_id={house_id} />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 house-form ">
            <span className="" id="text">Let's generate all the transaction for this loan you have paid till date.</span><br></br><br></br>
            <div className="row ">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="Account no">Account no</label>
                  <input type="text" placeholder="Account no" value={loannumber} onChange={e => setLoannumber(e.target.value)} className="form-control" readOnly />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="Loan Amount">Loan Amount</label>
                  <NumberFormat
                    placeholder="Loan Amount"
                    thousandsGroupStyle="thousand"
                    className="form-control alignRight"
                    value={loanamount}
                    decimalSeparator="."
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowEmptyFormatting={true}
                    allowLeadingZeros={false}
                    onChange={e => setLoanamount(e.target.value)}
                    isNumericString={true}
                    readOnly />
                  {/* <input type="text" placeholder="Loan Amount" value={loanamount} onChange={e=> setLoanamount(e.target.value)} className="form-control" readOnly/> */}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="Rate of Interest(%)">Rate of Interest(%)</label>
                  <input type="text" placeholder="Rate of Interest(%)" value={rateofinterest} onChange={e => setRateofinterest(e.target.value)} className="form-control" readOnly />
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Start Date">Start Date</label>
                  <input type="date" id="startDate" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} className="form-control" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Start Date">End Date</label>
                  <input type="date" id="endDate" placeholder="Start Date" value={endDate} onChange={e => setEndDate(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4" align="center" style={{ marginTop: "15px" }}>
                <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={showTableView}><span className="glyphicon glyphicon-arrow-left"></span>Generate Transaction</button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="loan-inner mt-25">
          <Table header={""} url={""} columns={columns} getSingleData={props.getSingleLoan} tableId="amortization" data={tableData} house_id={house_id} />
          <div className="row footer">
            <div className="col-md-4"></div>
            <div className="col-md-4 pt-pb-10" style={buttonStatus ? { display: "none" } : { display: "block" }} align="center">
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


const mapStateToProps = (state) => (
  console.log("state.Loan", state.Loan),
  {
    loanDetails: state.Loan.loanDetails.data,
    loanTransaction: state.Loan.loanTransaction.data
  });

const mapDispatchToProps = {
  addLoan,
  getSingleLoan,
  addLoanTransaction,
  getLoanTransaction,
  deleteLoanTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanTransaction);