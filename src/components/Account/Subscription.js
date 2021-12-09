import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Util } from "../../Datamanipulation/Util";
import { getAccount, updateAccount } from "../../store/Actions/Account";
import "../../style/account.css";
import { getUserReference } from "../../store/Actions/Reference";
import NumberFormat from "react-number-format";

const Subscription = (props) => {
  const [id, setId] = useState("");
  const [user, setUser] = useState(Util.getLoggedinUser());
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [datediff, setDatediff] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [refferedby, setRefferedby] = useState("");
  const [maxProperty, setMaxProperty] = useState("");
  const [substartdate, setSubstartdate] = useState(Util.getCurrentDate("-"));
  const [subenddate, setSubenddate] = useState(Util.getCurrentDate("-"));
  const [mono, setMono] = useState("");
  const [payment_date, setPayment_date] = useState(Util.getCurrentDate("-"));
  const [payment_amount, setPayment_amount] = useState("");
  const [account_status, setAccount_status] = useState("");

  const diff_months = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  };

  useEffect(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (props.accountDetails && props.accountDetails.length > 0) {
      console.log("propsA", props.accountDetails);
      let d1 = new Date(props.accountDetails[0].substartdate);
      let day = d1.getDate();
      let month = monthNames[d1.getMonth()];
      let year = d1.getFullYear();
      setStart(day + " " + month + " " + year);

      let d2 = new Date(props.accountDetails[0].subenddate);
      day = d2.getDate();
      month = monthNames[d2.getMonth()];
      year = d2.getFullYear();
      setEnd(day + " " + month + " " + year);

      let curr = new Date();
      let exp = new Date(props.accountDetails[0].subenddate);
      exp = Math.floor(exp.getTime() / 86400000);
      curr = Math.floor(curr.getTime() / 86400000);

      if (curr > exp) {
        setAccount_status("Expired");
      } else {
        setAccount_status("Active");
      }
      setDatediff(diff_months(d1, d2));
      setId(props.accountDetails[0].id);
      setName(props.accountDetails[0].name);
      setEmail(props.accountDetails[0].email);
      setUsername(props.accountDetails[0].username);
      setAddress(props.accountDetails[0].address);
      setZipcode(props.accountDetails[0].zipcode);
      setRefferedby(props.accountDetails[0].refferedby);
      setMaxProperty(props.accountDetails[0].maxProperty);
      setSubstartdate(props.accountDetails[0].substartdate);
      setSubenddate(props.accountDetails[0].subenddate);
      setMono(props.accountDetails[0].mono);
      // setAccount_status(props.accountDetails[0].account_status);
      setPayment_date(props.accountDetails[0].payment_date);
      setPayment_amount(props.accountDetails[0].payment_amount);
    } else {
      let data = {
        id: user["id"],
      };
      props.getAccount(data);
    }
  }, [props.accountDetails]);

  const handleTabs = (tab) => {
    if (tab === "personal") {
      props.history.push("/personal");
    } else if (tab === "referral") {
      let data = {
        owner_id: user["id"],
      };
      props.getUserReference(data);
      props.history.push("/referral");
    } else if (tab === "subs") {
      props.history.push("/subscription");
    }
  };
  const handleAccount_status = (e) => {
    setAccount_status(e.target.value);
  };

  const handleSubmit = () => {
    let data = {
      id: id,
      name: name,
      email: email,
      username: username,
      address: address,
      zipcode: zipcode,
      refferedby: refferedby,
      maxProperty: maxProperty,
      substartdate: substartdate,
      subenddate: subenddate,
      mono: mono,
      payment_date: payment_date,
      payment_amount: payment_amount,
      account_status: account_status,
    };

    // let valid = validate();
    // if(valid) {
    //     props.updateAccount(data);
    //     console.log("data2::",props.updateAccount(data))
    // }
    props.updateAccount(data);
    console.log("datasub", data);
  };
  return (
    <div className="container-fluid contact">
      <h4>Account Details</h4>
      <div className="contact-form">
        <div className="row top-bar">
          <div className="col-md-12">
            <span className="mr-50" onClick={(e) => handleTabs("personal")}>
              Personal Information
            </span>
            <span className="mr-50" onClick={(e) => handleTabs("referral")}>
              Referrals
            </span>
            <span
              className="mr-50 active-bar"
              onClick={(e) => handleTabs("subs")}
            >
              Subscription
            </span>
          </div>
        </div>
        <div className="row pb-2">
          <div className="col-md-4"></div>
          <div className="col-md-4 house-form pt-25">
            <div className="row pt-pb-10">
              <div className="col-md-12">
                <p className="">
                  Your account is due for renewal in {datediff} month.
                </p>
              </div>
            </div>
            <div className="row pt-pb-10">
              <div className="col-md-6">
                <p>Subscribed on</p>
                <p>{start}</p>
              </div>
              <div className="col-md-6">
                <p>Subscription valid till</p>
                <p>{end}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="row pt-25">
              <div className="col-md-6">
                <div className="form-group inputGroup">
                  <label htmlFor="payment_date">Payment Date</label>
                  <input
                    type="date"
                    value={payment_date}
                    onChange={(e) => setPayment_date(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="form-group">
                  <label htmlFor="payment_amount">Payment Amount</label>
                  <NumberFormat
                    placeholder="Payment Amount"
                    thousandsGroupStyle="thousand"
                    className="form-control alignRight"
                    value={payment_amount}
                    decimalSeparator="."
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowEmptyFormatting={true}
                    allowLeadingZeros={false}
                    onChange={(e) => setPayment_amount(e.target.value)}
                    isNumericString={true}
                  />
                  {/* <input type="text" value={payment_amount} onChange={e =>setPayment_amount(e.target.value)} placeholder="Payment Amount" className="form-control" /> */}
                </div>
              </div>
            </div>
            <div className="row pt-25">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="account_status">Account Status</label>
                  <select
                    className="form-control"
                    value={account_status}
                    onChange={(e) => handleAccount_status(e)}
                    disabled
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Trial">Trial</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 "></div>
            </div>
            <div className="row pt-pb-10">
              <div className="col-md-4"></div>
              <div className="col-md-4" align="center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountDetails: state.Account.accountDetails.data,
});

const mapDispatchToProps = {
  getAccount,
  updateAccount,
  getUserReference,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
