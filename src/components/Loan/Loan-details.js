import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLoan, getLoanTransaction } from "../../store/Actions/Loan";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import NumberFormat from "react-number-format";

const LoanDetails = (props) => {

  const [loantype, setLoantype] = useState('');
  const [lname, setLname] = useState('');
  const [lcontactperson, setLcontactperson] = useState('');
  const [laddress, setLaddress] = useState('');
  const [lphno, setLphno] = useState('');
  const [lemail, setLemail] = useState('');
  const [lurl, setLurl] = useState('');
  const [purchaseprice, setPurchaseprice] = useState('');
  const [downpayment, setDownpayment] = useState('');
  const [loanamount, setLoanamount] = useState('');
  const [rateofinterest, setRateofinterest] = useState('');
  const [loanterm, setLoanterm] = useState('');
  const [loannumber, setLoannumber] = useState('');
  const [escrow, setEscrow] = useState('');
  const [escrowpayee, setEscrowPayee] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [loanbegindate, setLoanbegindate] = useState(Util.getCurrentDate("-"));
  const [propertytax, setPropertytax] = useState('');
  const [ptaxpayee, setPropertytaxPayee] = useState('');
  const [additionaldetails, setAdditionaldetails] = useState('');
  const [loanclosuredate, setLoanclosuredate] = useState(Util.getCurrentDate("-"));
  const [status, setStatus] = useState('Active');
  const [house_id, setHouse_id] = useState('');
  const [id, setId] = useState('');
  const [escrowstatus, setEscrowstatus] = useState('');
  const [doc_path, setDoc_path] = useState('');
  const [escrowamount, setEscrowAmount] = useState('');
  const [renewal_maturity_date, setRenewal_maturity_date] = useState(Util.getCurrentDate("-"));
  const [renewal_intrest_rate, setRenewal_intrest_rate] = useState('');

  useEffect(() => {
    if (props.loanDetails && props.loanDetails.length > 0) {
      setLoantype(props.loanDetails[0].loantype);
      setLname(props.loanDetails[0].lname);
      setLcontactperson(props.loanDetails[0].lcontactperson);
      setLaddress(props.loanDetails[0].laddress);
      setLphno(props.loanDetails[0].lphno);
      setLemail(props.loanDetails[0].lemail);
      setLurl(props.loanDetails[0].lurl);
      setPurchaseprice(props.loanDetails[0].purchaseprice);
      setDownpayment(props.loanDetails[0].downpayment);
      setLoanamount(props.loanDetails[0].loanamount);
      setRateofinterest(props.loanDetails[0].rateofinterest);
      setLoanterm(props.loanDetails[0].loanterm);
      setLoannumber(props.loanDetails[0].loannumber);
      setEscrow(props.loanDetails[0].escrow);
      setEscrowPayee(props.loanDetails[0].escrowPayee)
      setMortgage(props.loanDetails[0].mortgage);
      setLoanbegindate(props.loanDetails[0].loanbegindate ? props.loanDetails[0].loanbegindate : Util.getCurrentDate("-"));
      setPropertytax(props.loanDetails[0].propertytax);
      setPropertytaxPayee(props.loanDetails[0].propertytaxPayee);
      setAdditionaldetails(props.loanDetails[0].additionaldetails);
      setLoanclosuredate(props.loanDetails[0].loanclosuredate ? props.loanDetails[0].loanclosuredate : Util.getCurrentDate('-'));
      setStatus(props.loanDetails[0].status ? props.loanDetails[0].status : "Active");
      setHouse_id(props.loanDetails[0].house_id);
      setId(props.loanDetails[0].id);
      setEscrowstatus(props.loanDetails[0].escrowstatus);
      setDoc_path(props.loanDetails[0].doc_path);
      setEscrowAmount(props.loanDetails[0].escrowamount);
      setRenewal_maturity_date(props.loanDetails[0].renewal_maturity_date ? props.loanDetails[0].renewal_maturity_date :Util.getCurrentDate('-'));
      setRenewal_intrest_rate(props.loanDetails[0].renewal_intrest_rate);
    }
  }, [props.loanDetails])

  const handleSubmit = () => {

    let data = {
      "loantype": loantype,
      "lname": lname,
      "lcontactperson": lcontactperson,
      "laddress": laddress,
      "lphno": lphno,
      "lemail": lemail,
      "lurl": lurl,
      "purchaseprice": purchaseprice,
      "downpayment": downpayment,
      // "loanamount" : Util.loanAmount(purchaseprice,downpayment),
      "loanamount": loantype === "Mortgage" ? Util.loanAmount(purchaseprice, downpayment) : loanamount,
      "rateofinterest": rateofinterest,
      "loanterm": loanterm,
      "loannumber": loannumber,
      "escrow": escrow,
      "mortgage": mortgage,
      "escrowPayee": escrowpayee,
      "loanbegindate": loanbegindate,
      "propertytax": propertytax,
      "propertytaxPayee": ptaxpayee,
      "additionaldetails": additionaldetails,
      "loanclosuredate": loanclosuredate,
      "status": status,
      "house_id": house_id,
      'id': id,
      'escrowstatus': escrowstatus,
      "doc_path": doc_path,
      'escrowamount': escrowamount,
      'renewal_maturity_date': renewal_maturity_date,
      'renewal_intrest_rate': renewal_intrest_rate
    }
    var form = new FormData();
   

    for (const key in data) {
      form.append(key, data[key]);
    }

    form.append("doc_path", doc_path);

    let valid = validate();
    if (valid) {
      props.addLoan(form)
      if (loantype === 'Mortgage') {
        props.history.push({
          pathname: 'loan-additionals',
          state: {
            house_id: house_id
          }
        });
      } else {
        props.history.push({
          pathname: 'loan-transaction',
          state: {
            house_id: house_id
          }
        });
      }
    }
  }

  const validate = () => {
    if (rateofinterest === '') {
      NotificationManager.error("Error Message", "Rate of Interest cannot be empty.");
      return false;
    } else if (loanterm === '') {
      NotificationManager.error("Error Message", "Loan Term cannot be empty.");
      return false;
    } else if (loanbegindate === '') {
      NotificationManager.error("Error Message", "Loan Begin Date cannot be empty.");
      return false;
    } else if (loannumber === '') {
      NotificationManager.error("Error Message", "Loan Number cannot be empty.");
      return false;
    }

    if (loantype === 'Mortgage') {
      if (purchaseprice === '') {
        NotificationManager.error("Error Message", "Purchase Price cannot be empty.");
        return false;
      } else if (downpayment === '') {
        NotificationManager.error("Error Message", "Down Payment cannot be empty.");
        return false;
      }
    } else {
      if (loanamount === '') {
        NotificationManager.error("Error Message", "Loan Amount cannot be empty.");
        return false;
      }
    }

    if (loanclosuredate != '') {

      let start = new Date(loanbegindate);
      let end = new Date(loanclosuredate);

      end = Math.floor(end.getTime() / 86400000);
      start = Math.floor(start.getTime() / 86400000);

      if (start > end) {
        NotificationManager.error("Error Message", "Loan Closure Date must be greater than Loan Begin Date.");
        return false;
      }
    }
    return true;
  }

  const handlePrevious = () => {
    props.history.push({
      pathname: 'loan-lender',
      state: {
        house_id: house_id
      }
    });
  }


  const generateTransaction = () => {
    console.log(loanamount);
  }

  let tabs = [
    { pathname: "/loan-lender", label: "Lender Details" },
    { pathname: "/loan-details", label: "Loan Details" }
  ]

  if (loantype === 'Mortgage') {
    tabs.push({ pathname: "/loan-additionals", label: "Escrow & Property Tax" });
  }

  tabs.push({ pathname: "/loan-transaction", label: "Loan Transactions" });

  return (
    <div className="container-fluid house">
      <h4>Add Loan Details</h4>
      <div className="house-form">
        <Tab loanPage="Loan Details" tabs={tabs} id={id} house_id={house_id} />
        <div className="row">
          <div className="col-md-2 imgTop"></div>
          <div className="col-md-8 house-form pt-25">
            <div className="row pt-25">
              {loantype === 'Mortgage' ?
                (
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="price" className="req">Purchase Price</label>
                      <NumberFormat
                        thousandsGroupStyle="thousand"
                        className="form-control"
                        value={purchaseprice}
                        decimalSeparator="."
                        type="text"
                        thousandSeparator={true}
                        allowNegative={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        allowEmptyFormatting={true}
                        allowLeadingZeros={false}
                        onChange={e => setPurchaseprice(e.target.value)}
                        isNumericString={true} />
                      {/* <input type="text" placeholder="Purchase Price" value={Util.addCommas(purchaseprice)} onChange={e=> {
                                         setPurchaseprice(e.target.value)
                                    }} className="form-control" /> */}
                    </div>
                  </div>
                ) : ''
              }
              {loantype === 'Mortgage' ?
                (
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="down" className="req">Down Payment</label>
                      <NumberFormat
                        placeholder="Down Payment"
                        thousandsGroupStyle="thousand"
                        className="form-control"
                        value={downpayment}
                        decimalSeparator="."
                        type="text"
                        thousandSeparator={true}
                        allowNegative={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        allowEmptyFormatting={true}
                        allowLeadingZeros={false}
                        onChange={e => setDownpayment(e.target.value)}
                        isNumericString={true} />
                      {/* <input type="text" placeholder="Down Payment" value={ Util.addCommas(downpayment)} onChange={e=>{setDownpayment(e.target.value)}} className="form-control" /> */}
                    </div>
                  </div>
                ) : ''
              }
              <div className="col-md-4">
                <div className="form-group">

                  {loantype === 'Mortgage' ?
                    (
                      <React.Fragment>
                        <label htmlFor="amount">Loan Amount</label>
                        <NumberFormat
                          placeholder="Loan Amount"
                          thousandsGroupStyle="thousand"
                          className="form-control"
                          value={purchaseprice, downpayment}
                          decimalSeparator="."
                          type="text"
                          thousandSeparator={true}
                          allowNegative={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          allowEmptyFormatting={true}
                          allowLeadingZeros={false}
                          onChange={e => setLoanamount(e.target.value)}
                          isNumericString={true} />
                        {/* <input type="text" placeholder="Loan Amount" value={Util.loanAmount(purchaseprice, downpayment)} onChange={e => {setLoanamount(e.target.value)}} className="form-control" readOnly /> */}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <label htmlFor="amount" className="req">Loan Amount</label>
                        <NumberFormat
                          placeholder="Loan Amount"
                          thousandsGroupStyle="thousand"
                          className="form-control"
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
                          isNumericString={true} />
                        {/* <input type="text" placeholder="Loan Amount" value={loanamount} onChange={e => { setLoanamount(e.target.value) }} className="form-control" /> */}
                      </React.Fragment>
                    )
                  }

                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="interest" className="req">Rate of Interest(%)</label>
                    <input type="text" placeholder="Rate of Interest(%)" value={Util.addCommas(rateofinterest)} onChange={e => setRateofinterest(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="term" className="req">Loan Term (Years)</label>
                  <input type="text" placeholder="Loan Term" value={loanterm} onChange={e => {
                    setLoanterm(e.target.value)
                    let laonC = loanbegindate.split("-");
                    console.log(parseInt(laonC[0]))
                    laonC[0] = parseInt(laonC[0]) + parseInt(e.target.value);
                    setLoanclosuredate(laonC.join("-"))
                  }} className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="begindate" className="req">Loan Start Date</label>
                  <input type="date" value={loanbegindate} onChange={e => {
                    setLoanbegindate(e.target.value);
                    let laonC = e.target.value.split("-");
                    console.log(parseInt(laonC[0]))
                    laonC[0] = parseInt(laonC[0]) + parseInt(loanterm);
                    setLoanclosuredate(laonC.join("-"))

                  }} className="form-control" />
                </div>
              </div>
              {console.log("loandate", loanclosuredate, loanbegindate)}
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="begindate" className="req">Loan Maturity Date </label>
                  <input type="date" value={loanclosuredate} onChange={e => {
                    setLoanbegindate(e.target.value);
                    let laonC = e.target.value.split("-");
                    console.log(parseInt(laonC[0]))
                    laonC[0] = parseInt(laonC[0]) + parseInt(loanterm);
                    setLoanclosuredate(laonC.join("-"))

                  }} className="form-control" />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="closure">Loan Maturity Date</label>
                  <input type="date" value={loanclosuredate} onChange={e=> {
                      setLoanclosuredate(e.target.value)
                      var past_date = new Date(e.target.value);
                      var current_date = new Date();
                      var difference = (past_date.getFullYear() - current_date.getFullYear()) * 12 + (past_date.getMonth() - current_date.getMonth());
                      if(difference <= 0) {
                          setStatus('Closed');
                      }else{
                          setStatus('Active');
                      }

                  }
                  } className="form-control" />
                  {/* <input type="date" value={loanclosuredate} onChange={e=> setLoanclosuredate(e.target.value)} className="form-control" /> */}
                {/* </div> */}
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="closure">Loan Closure Date</label>
                  <input type="date" value={loanclosuredate} onChange={e => {
                    setLoanclosuredate(e.target.value)
                    var past_date = new Date(e.target.value);
                    var current_date = new Date();
                    var difference = (past_date.getFullYear() - current_date.getFullYear()) * 12 + (past_date.getMonth() - current_date.getMonth());
                    if (difference <= 0) {
                      setStatus('Closed');
                    } else {
                      setStatus('Active');
                    }
                  }
                  } className="form-control" />
                  {/* <input type="date" value={loanclosuredate} onChange={e=> setLoanclosuredate(e.target.value)} className="form-control" />  */}
                </div>
              </div>
            </div>


            <div className="row pt-25">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="number" className="req">Loan Number</label>
                  <input type="text" placeholder="Loan Number" value={loannumber} onChange={e => setLoannumber(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="status" className="req">Status</label>
                  <select className="form-control" value={status} onChange={e => setStatus(e.target.value)} >
                    <option value="" disabled>Select</option>
                    <option value="Active">Active</option>
                    <option value="Foreclosed">Foreclosed</option>
                    <option value="Closed">Closed</option>
                    <option value="Renewal">Renewal</option>
                  </select>
                </div>
              </div>
            </div>



            {
              status == "Renewal" ? (
                <div className="row pt-25">
                  <div className="row ">
                    <hr />
                    <span className="section">Loan Renewal Details</span><br></br><br></br>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="closure">New Maturity Date</label>
                      <input type="date" value={renewal_maturity_date} onChange={e => setRenewal_maturity_date(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="interest">New Interest Rate</label>
                      <input type="text" placeholder="Rate of Interest(%)" value={Util.addCommas(renewal_intrest_rate)} onChange={e => setRenewal_intrest_rate(e.target.value)} className="form-control" />
                    </div>
                  </div>
                </div>

              ) : ""
            }




          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row footer ">
          <div className="col-md-3"></div>
          <div className="col-md-4 pt-pb-10" align="center">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
          </div>
          <div className="col-md-5">
            <div className="btn-group pull-right" role="group" aria-label="...">

              <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
              <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  loanDetails: state.Loan.loanDetails.data
});

const mapDispatchToProps = {
  addLoan,
  getLoanTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetails);