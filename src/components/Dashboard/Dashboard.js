import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import "../../style/Dashboard.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { ownerHouseDetails } from "../../store/Actions/house";
import { getHouseDetail } from "../../store/Actions/house";
import { getInsurance} from "../../store/Actions/insurance";
import { getLoan} from "../../store/Actions/Loan";
import { getWarranty} from "../../store/Actions/Warranty";
import { getGroup} from "../../store/Actions/contact";
import { getLease } from "../../store/Actions/Lease";
import { getShare } from "../../store/Actions/Share";
import { getTransaction} from "../../store/Actions/Transaction";
import { getLoanTransaction, getMortgageTransaction} from "../../store/Actions/Loan";
import { getContact} from "../../store/Actions/contact";
import { Chart } from "react-google-charts";
var commaNumber = require('comma-number')


const Dashboard = (props) => {
    const [owner_id, setOwner_id] = useState(JSON.parse(localStorage.getItem('user')).id);
    const [active_house, setActive_house] = useState("");
    const [active_house_name, setActive_house_name] = useState("");
    const [warranty_data, setWarranty_data] = useState([]);
    const [purchaseprice, setPurchaseprice] =  useState();
    const [homecost, setHomecost] = useState(); 
    const [loanData, setLoanData] = useState([]);

    
    localStorage.setItem('house_id', JSON.stringify(""));

    useEffect(() => {
        props.ownerHouseDetails({"owner_id":JSON.parse(localStorage.getItem('user')).email});
    }, []);

    useEffect(()=> {
        if(props.house && props.house.length > 0 && active_house === "") {
            setActive_house(props.house[0].house.id);
            setActive_house_name(props.house[0].house.streetname);
            let data = {
                "house_id": props.house[0].house.id
            }
            props.getInsurance(data);
            props.getLoan(data);
            props.getWarranty(data);
            props.getLease(data);
            props.getShare(data);
        }
    });

    useEffect(()=> {
        if(props.warranties && props.warranties.length > 0) {
            let data = [['Warranty Duration Type', 'Items']];
            let m1 = 0;
            let m2 = 0;
            let m3 = 0;
            props.warranties.forEach(element => {
                var past_date = new Date(element.extended_warranty_end_date);
                var current_date = new Date();
                var difference = (past_date.getFullYear() - current_date.getFullYear()) * 12 + (past_date.getMonth() - current_date.getMonth());
                if(difference < 3) {
                    m1 = m1 + 1;
                } else if(difference <= 6) {
                    m2 = m2 + 1;
                } else if(difference > 6) {
                    m3 = m3 + 1;
                }
            });
            data.push(["More than 1 year ("+m3+")", m3]);
            data.push(["6 Months ("+m2+")", m2]);
            data.push(["Less than 3 months ("+m1+")", m1]);
            setWarranty_data(data);
        } else {
            setWarranty_data([['Warranty Duration Type', 'Items']]);
        }
    }, [props.warranties]);

    const updateHouse = (id, streetname) => {
        console.log("id")
        setActive_house(id);
        setActive_house_name(streetname);
        let data = {
            "house_id": id
        }
        props.getInsurance(data);
        props.getLoan(data)
        props.getWarranty(data);
        props.getLease(data);
        props.getShare(data);

        var param = {
            data : [
                {"id":id, email:JSON.parse(localStorage.getItem('user')).email},
            ]
        };
        props.getHouseDetail(param);
        props.getContact(data)
        props.getTransaction(data);
        props.getLoan(data);
        props.getMortgageTransaction(data);
    }

    let percent = .5;
    let width = 80;
    let progress = percent * width;

    const handleAddproperty = () => {
        props.getHouseDetail({})
        props.history.push("house-details");
    }

    const handleUpdate = (id) =>{
        var param = {
            data : [
                {"id":id, email:JSON.parse(localStorage.getItem('user')).email},
            ]
        };

        let data = {
            "house_id": id,
			"email":JSON.parse(localStorage.getItem('user')).email
        }
		props.getGroup(data);
        props.getHouseDetail(param)
        props.history.push("house-details");
    }

    const handleHomePages = (page) => {
        let path = '';
        if(page === 'insurance') {
            path = '/insurance-list';
        } else if(page === 'loan') {
            path = '/loan-list';
        } else if(page === 'warranty') {
            path = '/warranty-list';
        } else if(page === 'homecost') {
            path = '/homecost';
        } else if(page === 'lease') {
            path = '/lease-list';
        } else if(page === 'share') {
            path = '/share-list';
        }
        props.history.push({
            pathname : path,
            state : {house_id : active_house}
        });
    }


    const addCommas = (nStr) =>{
        nStr = nStr.toString()
        var data = nStr.split(",")
        data = data.join("")
        nStr = data;
        var result1 = commaNumber(nStr)
        return result1;
    }

    const removeCommas = (nStr) =>{
        nStr = nStr.toString()
        var data = nStr.split(",") 
        data = data.join("")
        return data;
    }

    const dateFormat = (date) => {
        const options = { day: 'numeric',  year: 'numeric', month: 'short' };
        let d1 = new Date(date).toLocaleDateString(undefined,options);
        let d2 = d1.split(" ");
        let result = d2[1].split(",")[0] + " "+ d2[0] +" "+ d2[2]
        return result;
    }

   useEffect(()=>{
        let tableData = [];
            if(props.transactions && props.transactions.length > 0){
                let contacts = props.contacts;
                let contactsGroup = {};
                if(contacts){
                    for(var i=0; i<contacts.length; i++){
                        let groupname = contacts[i]["companyname"]
                        contactsGroup[groupname] = contacts[i]["groupname"].split("&")[1];
                    }
                }
            if(props.houseDetails){
                for(let i=0; i<props.transactions.length; i++){
                    let homecost = 0;
                    if(i==0){
                        homecost = removeCommas(props.houseDetails.house[0]['purchaseamount']);  
                    }else{
                        homecost =  removeCommas(tableData[i-1]['homecost']);
                    }
                    let amount = removeCommas(props.transactions[i]['amount'])
                    
                    if(props.transactions[i]['type'] == "Payment"){
                        homecost = parseFloat(homecost) + parseFloat(amount);
                    }else if(props.transactions[i]['type'] == "Receipt"){
                        homecost = parseFloat(homecost) - parseFloat(amount);
                    }
    
                    let paymentdate = new Date(props.transactions[i]['date']);
                    let day = paymentdate.getDay();
                    let month = paymentdate.getMonth();
                    let year = paymentdate.getFullYear();
                    let hour = paymentdate.getHours();
                    let minutes = paymentdate.getMinutes();
                    paymentdate = month+"-"+day+"-"+year;
                   // paymentdate = month+"/"+day+"/"+year + " "+ hour +":"+minutes;
                   
                    let data = {
                        transactiondate : props.transactions[i]['date'],
                        category : contactsGroup[props.transactions[i]['account_name']],
                        payee : props.transactions[i]['account_name'],
                        description : props.transactions[i]['comments'],
                        credit : props.transactions[i]['type'] == "Payment" ? addCommas(amount) : "",
                        debit :  props.transactions[i]['type'] == "Receipt" ? addCommas(amount) : "",
                        homecost : addCommas(parseFloat(homecost).toFixed(2))
                    }
                    tableData.push(data);
                }
    
    
                if(props.loanTransactions && props.loanTransactions.length > 0){
                    for(let i=0; i<props.loanTransactions.length; i++){
                        let homecost = 0;
                        if(i==0 && tableData.length == 0){
                            homecost = removeCommas(props.houseDetails.house[0]['purchaseamount']);  
                        }else{
                            homecost = removeCommas(tableData[tableData.length-1]['homecost']);
                        }
                        let amount = removeCommas(props.loanTransactions[i]['interest'])
                        homecost = parseFloat(homecost) + parseFloat(amount);
                        
                        let loanTD = props.loanTransactions[i]['paymentdate'].split(" ");
                        let data = {
                            transactiondate :loanTD[0],
                            category : contactsGroup[props.loanTransactions[i]['lname']],
                            payee : props.loanTransactions[i]['lname'],
                            description : "",
                            credit :addCommas(parseFloat(amount).toFixed(2)) ,
                            debit : "",
                            homecost : addCommas(parseFloat(homecost).toFixed(2))
                        }
                        tableData.push(data);
                    }
                }
                setHomecost(tableData[tableData.length -1]['homecost'])
                if(props.houseDetails && props.houseDetails.house.length > 0){
                    setPurchaseprice(addCommas(props.houseDetails.house[0]['purchaseamount']))
                    if(!homecost){
                        setHomecost(addCommas(props.houseDetails.house[0]['purchaseamount']))
                   } 
                } 
            }    
        }

    },[props.houseDetails,props.transactions,props.loanTransactions])


    useEffect(()=>{
        let loanData = props.loans;
        let loanDetails = [];
        if(loanData){
          for(let j=0; j<loanData.length; j++){
            let tableData = [];
            let totalM = parseInt(loanData[j].loanterm)*12
            var payment = "";
            let roi = parseFloat(loanData[j].rateofinterest);
            var mroi =  roi/ (12*100);
            let loa = parseInt(removeCommas(loanData[j].loanamount));
            let term =  parseInt(loanData[j].loanterm * 12);
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
                        paymentdate = new Date(props.loans[j].loanbegindate);
                }else{
                    let previousData =  removeCommas(tableData[i-1].endingloan);
                        loanamount = removeCommas(previousData);
                        payment = removeCommas(payment);
                        interest = previousData * mroi;
                        principal = payment -  interest;
                        extra = "";
                        endingloan = previousData - principal;
                        scheduledpayment = "";
                        cumulativeinterest = "";
                        let date =  new Date(props.loans[j].loanbegindate)
                        paymentdate = new Date(date.setMonth(date.getMonth()+(i+1)));
                }
                data.month = i+1;
                data.loanamount = addCommas(parseFloat(loanamount).toFixed(2));
                data.payment = addCommas(parseFloat(payment).toFixed(2));
                data.interest = addCommas(parseFloat(interest).toFixed(2));
                data.principal = addCommas(parseFloat(principal).toFixed(2));
                data.extra = "";
                data.endingloan = addCommas(parseFloat(endingloan).toFixed(2));
                data.loan_id = props.loans[j].id;
                data.scheduledpayment = scheduledpayment;
                data.cumulativeinterest = cumulativeinterest;
                let day = paymentdate.getDay();
                let month = paymentdate.getMonth();
                let year = paymentdate.getFullYear();
                let hour = paymentdate.getHours();
                let minutes = paymentdate.getMinutes();
                data.paymentdate = month+"/"+day+"/"+year + " "+ hour +":"+minutes;
  
                let loanData = {};
                if(month == new Date().getMonth() && year == new Date().getFullYear()){
                    loanData.loantype = props.loans[j].loantype;
                    loanData.endingloan = addCommas(parseFloat(endingloan).toFixed(2));
                    loanData.totalInstallment = totalM;
                    loanData.paidInstallment = i+1; 
                    loanData.lname = props.loans[j].lname
                    loanDetails.push(loanData);
                    break;
                }
                tableData.push(data);
            }
            setLoanData(loanDetails);
          }  

        }else{
            setLoanData([]);
        }

    },[props.loans,props.houseDetails])


    const nextMortgagePayment = (loanDetails) => {
        let loanData = loanDetails;
        let tableData = [];
        if(loanData.length > 0){
          let totalM = parseInt(loanData[0].loanterm)*12
          var payment = "";
          let roi = parseFloat(loanData[0].rateofinterest);
          var mroi =  roi/ (12*100);
          let loa = parseInt(removeCommas(loanData[0].loanamount));
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
                      paymentdate = new Date(loanData[0].loanbegindate);
              }else{
                  let previousData =  removeCommas(tableData[i-1].endingloan);
                      loanamount = removeCommas(previousData);
                      payment = removeCommas(payment);
                      interest = previousData * mroi;
                      principal = payment -  interest;
                      extra = "";
                      endingloan = previousData - principal;
                      scheduledpayment = "";
                      cumulativeinterest = "";
                      let date =  new Date(loanData[0].loanbegindate)
                      paymentdate = new Date(date.setMonth(date.getMonth()+(i+1)));
              }
              data.month = i+1;
              data.loanamount = addCommas(parseFloat(loanamount).toFixed(2));
              data.payment = addCommas(parseFloat(payment).toFixed(2));
              data.interest = addCommas(parseFloat(interest).toFixed(2));
              data.principal = addCommas(parseFloat(principal).toFixed(2));
              data.extra = "";
              data.endingloan = addCommas(parseFloat(endingloan).toFixed(2));
              data.loan_id = loanData[0].id;
              data.scheduledpayment = scheduledpayment;
              data.cumulativeinterest = cumulativeinterest;
              let day = paymentdate.getDay();
              let month = paymentdate.getMonth();
              let year = paymentdate.getFullYear();
              let hour = paymentdate.getHours();
              let minutes = paymentdate.getMinutes();
              data.paymentdate = month+"/"+day+"/"+year + " "+ hour +":"+minutes;

              let loanMortgage = {};
              if(month == new Date().getMonth() && year == new Date().getFullYear()){
                  loanMortgage.totalInstallment = totalM;
                  loanMortgage.paidInstallment = i+1; 
                  let date =  new Date(loanData[0].loanbegindate)
                  paymentdate = new Date(date.setMonth(date.getMonth()+(i+2)));
                  loanMortgage.nextMortgagePayment = paymentdate;
                 return loanMortgage;
              }
              tableData.push(data);
          }
        }
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
    return (
        
        <div className="container-fluid dashboard">
            <div className="row m-l-0">
                <div className="col-md-2">
                    <label className="dashboard-title">Dashboard</label>
                </div>
                <div className="col-md-2 ml--5">
                    <button className="btn btn-primary btn-sm" onClick={handleAddproperty}>
                        <span className="glyphicon glyphicon-plus"></span> Add a property
                    </button>
                </div>
                <div className="col-md-8"></div>
            </div>

            {
                props.house && props.house.length <= 3 && 
                <div className="row card-deck">
                    {console.log("props.house",props.house)}
                {
                    props.house ? 
                    (props.house.map((data)=>{
                        let mortgageData = nextMortgagePayment(data.loan);
                        let nextMortgage = mortgageData ? dateFormat(mortgageData.nextMortgagePayment) : "NA";
                        let totalInstallment = mortgageData ?  mortgageData.totalInstallment: "NA";
                        let paidInstallment  = mortgageData ? mortgageData.paidInstallment : "NA";
                    return(
                    <div className="col-md-3 card" key={data.house.id}>
                        <div className="imageArea" onClick={(e)=> updateHouse(data.house.id, data.house.streetname)}>
                        <img
                            src={data.house.img_path ? "../files/" + data.house.img_path.substr(11) : "../assets/image/dummy.png"}
                            alt="Upload house image !"
                            id="img-upload"
                        />
                        </div>
                        <div className="card-body">
                            <div className="h35">
                                <div className="fl">
                                    <span className="card-title">{data.house.houseno}  {data.house.streetname}</span>
                                    <small className="card-text">{data.house.city}, {data.house.zip} {data.house.state}</small>
                                </div>
                                <div className="fr">
                                    <small className="text-muted">Mortgage</small>
                                    <div className="progress-div" style={{width: width}}>
                                        <div style={{width: `${progress}px`}}className="progress"/>
                                            <span className="progressBar">{paidInstallment}/{totalInstallment}</span>
                                        </div>
                                    </div>
                            </div>
                            <div className="pt-10 h35">
                                <div className="title">
                                    <small className="text-muted card-text w30">Mortgage Maturity</small>
                                    <small className="text-muted card-text w30 pl-10">Insurance Expiry</small>
                                    <small className="text-muted card-text w40 pl-10">Lease Expiry</small>
                                </div>
                                
                                <div className="title-body">
                                    <span className="card-text w30">{data.loan.length > 0 ? dateFormat(data.loan[0]['loanclosuredate']) : "NA"}</span>
                                    <span className="card-text w30 pl-10">{data.insurance.length > 0 ? dateFormat(data.insurance[0]['expiry_date']) : "NA"}</span>
                                    <span className="card-text w40 pl-10">{nextMortgage}</span>
                                
                                </div>
                            </div>
                            <div className="pt-10">
                                <button className="btn dashboard-btn" onClick={()=>handleUpdate(data.house.id)}>Property Details <span className="glyphicon glyphicon-arrow-right"></span></button>
                            </div>
                        </div>
                    </div>
                    )
                })):""
                }
                </div>
           }

           {
                props.house && props.house.length > 3 && 
                <React.Fragment>
                <div className="row">
                <div>
            <Slider {...settings}>
            {
                props.house  ? 
                (props.house.map((data)=>{
                    let mortgageData = nextMortgagePayment(data.loan);
                    let nextMortgage = mortgageData ? dateFormat(mortgageData.nextMortgagePayment) : "NA";
                    let totalInstallment = mortgageData ?  mortgageData.totalInstallment: "NA";
                    let paidInstallment  = mortgageData ? mortgageData.paidInstallment : "NA";
                return(
                    <React.Fragment>
                   
                    <div className={`sliderCard card ${data.house.id === active_house && "selectedCard"}`} key={data.house.id}>
                    <div className="imageArea" onClick={(e)=> updateHouse(data.house.id, data.house.streetname)}>
                    <img
                        src={data.house.img_path ? "../files/" + data.house.img_path.substr(11) : "../assets/image/dummy.png"}
                        alt="Upload house image !"
                        id="img-upload"
                    />
                    </div>
                    <div className="card-body">
                        <div className="h35">
                            <div className="fl">
                                <span className="card-title">{data.house.houseno}  {data.house.streetname}</span>
                                <small className="card-text">{data.house.city}, {data.house.zip} {data.house.state}</small>
                            </div>
                            <div className="fr">
                                <small className="text-muted">Mortgage</small>
                                <div className="progress-div" style={{width: width}}>
                                    <div style={{width: `${progress}px`}}className="progress"/>
                                        <span className="progressBar">{paidInstallment}/{totalInstallment}</span>
                                    </div>
                                </div>
                        </div>
                        <div className="pt-10 h35">
                            <div className="title">
                                <small className="text-muted card-text w30">Mortgage Maturity</small>
                                <small className="text-muted card-text w30 pl-10">Insurance Expiry</small>
                                <small className="text-muted card-text w40 pl-10">Lease Expiry</small>
                            </div>
                            
                            <div className="title-body">
                                <span className="card-text w30">{data.loan.length > 0 ? dateFormat(data.loan[0]['loanclosuredate']) : "NA"}</span>
                                <span className="card-text w30 pl-10">{data.insurance.length > 0 ? dateFormat(data.insurance[0]['expiry_date']) : "NA"}</span>
                                <span className="card-text w40 pl-10">{nextMortgage}</span>
                            
                            </div>
                        </div>
                        <div className="pt-10">
                            <button className="btn dashboard-btn" onClick={()=>handleUpdate(data.house.id)}>Property Details <span className="glyphicon glyphicon-arrow-right"></span></button>
                        </div>
                    </div>
                </div>
                
               </React.Fragment>
                )
            })):""
            }
             </Slider>
            
             </div>
            </div>
            </React.Fragment>
           }
            
            <div className="pt-10">
                <div className="row m-l-0">
                    <hr className="propertyCard"></hr>
                    <h4 className="">Property Summary - {active_house_name}</h4>
                </div>

                <div className="row m-l-0 pt-10">
                    <div className="col-md-3 plr-0">
                        <div className="small-card">
                            <span className="card-title">Home Cost</span>
                            <small className="text-muted card-text w30">Market value</small>
                            <small className="text-muted card-text w30">Purchase Price</small>
                            <small className="text-muted card-text w30">Home Cost</small>
                            <span className="card-text w30">NA</span>
                            <span className="card-text w30">{purchaseprice}</span>
                            <span className="card-text w30">{homecost}</span>
                            <button className="small-card-btn" onClick={(e)=> handleHomePages('homecost')}><span className="glyphicon glyphicon-arrow-right m-l-4"></span></button>
                        </div>
                        <div className="small-card">
                            <span className="card-title">Lease</span>
                            <small className="text-muted card-text w30">Tenant Name</small>
                            <small className="text-muted card-text w30">Rent Due On</small>
                            <small className="text-muted card-text w30">Amount</small>
                        {
                            props.leases && props.leases.length > 0 ? 
                            <React.Fragment>
                                <span className="card-text w30">{props.leases[0].tenant_name1}</span>
                                <span className="card-text w30">{props.leases[0].lease_begin}</span>
                                <span className="card-text w30">{props.leases[0].rent}</span>
                            </React.Fragment> : 
                            <React.Fragment>
                                <span className="card-text w30">N/A</span>
                                <span className="card-text w30">N/A</span>
                                <span className="card-text w30">N/A</span>
                            </React.Fragment>   
                        }
                            <button className="small-card-btn" onClick={(e)=>handleHomePages('lease')}><span className="glyphicon glyphicon-arrow-right m-l-4"></span></button>
                        </div>
                        <div className="small-card">
                            <span   className="card-title">Share Property</span>
                        {
                            props.shares && props.shares.length > 0 ? 
                            <React.Fragment>
                                <small  className="text-muted card-text w30">{props.shares[0].fname} {props.shares[0].lname}</small>
                                <small  className="text-muted card-text w30">{props.shares[0].phono}</small>
                                <small  className="text-muted card-text w30">{props.shares[0].email}</small>
                            </React.Fragment>
                            : <React.Fragment>
                                <small  className="text-muted card-text w30">N/A</small>
                                <small  className="text-muted card-text w30">N/A</small>
                                <small  className="text-muted card-text w30">N/A</small>
                            </React.Fragment>
                        }
                            <button className="small-card-btn" onClick={(e)=>handleHomePages('share')}><span className="glyphicon glyphicon-arrow-right m-l-4"></span></button>
                        </div>
                    </div>
                    <div className="col-md-3 plr-0">
                        <div className="small-card">
                            <span className="card-title">Insurance</span>
                            <small className="text-muted card-text w30">Vendor Name</small>
                            <small className="text-muted card-text w30">Expiry Date</small>
                            <small className="text-muted card-text w30">Premium Amount</small>
                            {
                                props.insurances && props.insurances.length > 0 ? (
                                    <React.Fragment>
                                    <span className="card-text w30">{props.insurances[0].provider}</span>
                                    <span className="card-text w30">{props.insurances[0].expiry_date}</span>
                                    <span className="card-text w30">{props.insurances[0].premium}</span>
                                    </React.Fragment>
                                ): (
                                    <React.Fragment>
                                    <span className="card-text w30">NA</span>
                                    <span className="card-text w30">NA</span>
                                    <span className="card-text w30">NA</span>
                                    </React.Fragment>
                                )
                            }
                            <button className="small-card-btn" onClick={(e)=>handleHomePages('insurance')}><span className="glyphicon glyphicon-arrow-right m-l-4"></span></button>
                        </div>

                        <div className="small-card">
                          <span className="card-title">Loans</span>
                         
                            {
                                 loanData.length > 0 ? (
                                loanData.map((loanData)=>{
                                    return (
                                        <React.Fragment>
                                            <small className="text-muted card-text w30">{loanData.loantype}</small>
                                            <small className="text-muted card-text w30">Loan balance</small>
                                            <small className="text-muted card-text w30">Installments</small>
                                            <span className="card-text w30">{loanData.lname}</span>
                                            <span className="card-text w30">{loanData.endingloan}</span>
                                            <span className="card-text w30">{loanData.paidInstallment}/{loanData.totalInstallment}</span>
                                        </React.Fragment>
                                    )
                                })
                                ): (
                                    <React.Fragment>
                                        <small className="text-muted card-text w30">Mortgage</small>
                                        <small className="text-muted card-text w30">Loan balance</small>
                                        <small className="text-muted card-text w30">Installments</small>
                                        <span className="card-text w30">NA</span>
                                        <span className="card-text w30">NA</span>
                                        <span className="card-text w30">NA</span>
                                    </React.Fragment>
                                )
                            }
                         
                            <button className="small-card-btn pt-10" onClick={(e)=>handleHomePages('loan')}><span className="glyphicon glyphicon-arrow-right m-l-4"></span></button>
                        </div>

                    </div>
                    <div className="col-md-6 plr-0">
                        <div className="small-card">
                            <span className="card-title">Warranty Summary</span>
                            <div className="ml-25">
                            {
                                warranty_data && warranty_data.length > 0 ?
                                    <Chart
                                        width={'400px'}
                                        height={'250px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={warranty_data}
                                        options={{
                                            title: 'Warranty Details',
                                            pieHole: 0.4,
                                        }}
                                        rootProps={{ 'data-testid': '3' }}
                                    /> : ""
                            }
                                
                            </div>
                            <div className="row">
                                {
                                    props.warranties && props.warranties.length > 0 ? 
                                        props.warranties.map( (element, index) => {
                                            if(index < 4) {
                                                let ext_date = new Date(element.extended_warranty_end_date);
                                                let install_date = new Date(element.installation_date);
                                                let current_date = new Date();
                                                let diff1 = (current_date.getFullYear() - install_date.getFullYear());
                                                let diff2 = (ext_date.getFullYear() - current_date.getFullYear());
                                                let diff3 = ext_date.getFullYear() - install_date.getFullYear();
                                                if(diff2 === 0) {
                                                    diff1 = 1;
                                                }
                                                diff1 = diff1 < 0 ? 0 : diff1;
                                                diff2 = diff2 < 0 ? 0 : diff2;
                                                diff3 = diff3 < 0 ? 0 : diff3;
                                                return (
                                                <div className="col-md-6 min-chat">
                                                    <Chart
                                                        width={'300px'}
                                                        height={'240px'}
                                                        chartType="PieChart"
                                                        loader={<div>Loading Chart</div>}
                                                        data={[
                                                                ['Product Name', 'Warranty'],
                                                                ['Covered', diff1],
                                                                [element.product_name, diff2]
                                                            ]}
                                                        options={{
                                                            title: '',
                                                            // Just add this option
                                                            pieHole: 0.4,
                                                        }}
                                                        rootProps={{ 'data-testid': '3' }}
                                                    />
                                                    <span className=""><strong>{element.product_name}</strong></span>
                                                    <br></br>
                                                    <span className="">{diff3} year warranty</span>
                                                    <br></br>
                                                    <span className="">Expires {element.extended_warranty_end_date}</span>
                                                </div>
                                            )
                                            }
                                        }) : ""
                                }   
                            </div>
                            <div className="row">
                                <div className="col-md-10"></div>
                                <div className="col-md-2">
                                    <button className="small-card-btn fr" onClick={(e)=>handleHomePages('warranty')}><span className="glyphicon glyphicon-arrow-right m-l-4"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    house : state.House.houses.data,
    houseDetails : state.House.houseDetail.data,
    insurances : state.Insurance.insurances.data,
    loans : state.Loan.loans.data,
    warranties : state.Warranty.warranties.data,
    leases : state.Lease.leases.data,
    shares : state.Share.shares.data,
    transactions : state.Transaction.transactions.data,
    loanTransactions : state.Loan.mortgageTransaction.data,
    contacts: state.Contact.contacts.data,
    loanDetails : state.Loan.loanDetails.data,
});

const mapDispatchToProps = {
    ownerHouseDetails,
    getHouseDetail,
    getInsurance,
    getLoan,
    getWarranty,
    getGroup,
    getLease,
    getShare,
    getLoanTransaction,
	getMortgageTransaction,
    getTransaction,
    getContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
