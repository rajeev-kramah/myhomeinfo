import React, { useEffect,useState } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import {getSingleLoan,addLoanAmortization } from "../../store/Actions/Loan";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";
import { getContact, getGroup} from "../../store/Actions/contact";


const Homecost = (props) => {
    const [purchaseprice, setPurchaseprice] =  useState();
    const [homecost, setHomecost] = useState(); 
    const [tableData, setTableData] = useState([]);
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Type", "Lender Name", "Loan Number", "Loan Amount", "Interest Rate(%)", "Term", "Escrow", "Property Tax","Start Date", "End Date","Status"];
    var columns = [
        { name: 'Transaction Date', selector: 'transactiondate', sortable: true,cell: row => Util.dateFormat(row.transactiondate)},
        { name: 'Category', selector: 'category', sortable: true, },
        { name: 'Payee', selector: 'payee', sortable: true, },
        { name: 'Description', selector: 'description', sortable: true,},
        { name: 'Expenses', selector: 'credit', sortable: true,},
        { name: 'Income', selector: 'debit', sortable: true, },
        { name: 'Home Cost', selector: 'homecost', sortable: true },
      ];
    
    useEffect(()=>{
        if(props.houseDetails && props.houseDetails.house.length > 0){
            setPurchaseprice(Util.addCommasList(props.houseDetails.house[0]['purchaseamount']))
            setHomecost(Util.addCommasList(props.houseDetails.house[0]['purchaseamount']))
        }
        let tableData = [];
        if(props.transactions && props.transactions.length > 0){           
            for(let i=0; i<props.transactions.length; i++){
                let homecost = 0;
                if(i==0){
                    homecost = Util.removeCommas(props.houseDetails.house[0]['purchaseamount'] ? props.houseDetails.house[0]['purchaseamount'] : 0);  
                }else{
                    homecost =  Util.removeCommas(tableData[i-1]['homecost'] ? tableData[i-1]['homecost'] : 0);
                }
                let amount = Util.removeCommas(props.transactions[i]['amount'] ? props.transactions[i]['amount'] : 0)
                
                if(props.transactions[i]['type'] == "Payment"){
                    homecost = parseFloat(homecost) + parseFloat(amount);
                }else if(props.transactions[i]['type'] == "Receipt"){
                    homecost = parseFloat(homecost) - parseFloat(amount);
                }

                let paymentdate = new Date(props.transactions[i]['date']);
                let day = paymentdate.getDay();
                let month = paymentdate.getMonth();
                let year = paymentdate.getFullYear();
                
                paymentdate = month+"-"+day+"-"+year;
                let category =  props.transactions[i]['groupname'].split("&");
                let data = {
                    transactiondate : props.transactions[i]['date'],
                    category : category[category.length-1],
                    payee : props.transactions[i]['companyname'],
                    description : props.transactions[i]['comments'],
                    credit : props.transactions[i]['type'] == "Payment" ? Util.addCommasList(amount) : "",
                    debit :  props.transactions[i]['type'] == "Receipt" ? Util.addCommasList(amount) : "",
                    homecost : Util.addCommasList(parseFloat(homecost).toFixed(2))
                }
                tableData.push(data);
            }


            if(props.loanTransactions && props.loanTransactions.length > 0){
                for(let i=0; i<props.loanTransactions.length; i++){
                    let homecost = 0;
                    if(i==0 && tableData.length == 0){
                        homecost = Util.removeCommas(props.houseDetails.house[0]['purchaseamount'] ? props.houseDetails.house[0]['purchaseamount'] : 0);  
                    }else{
                        homecost = Util.removeCommas(tableData[tableData.length-1]['homecost'] ? tableData[tableData.length-1]['homecost'] : 0);
                    }
                    let amount = Util.removeCommas(props.loanTransactions[i]['interest'] ? props.loanTransactions[i]['interest'] : 0)
                    homecost = parseFloat(homecost) + parseFloat(amount);
                    let loanTD = props.loanTransactions[i]['paymentdate'].split(" ");
                    let category = props.loanTransactions[i]['groupname'].split("&");
                    let data = {
                        transactiondate :loanTD[0],
                        category :category[category.length-1],
                        payee : props.loanTransactions[i]['companyname'],
                        description : "",
                        credit :Util.addCommasList(parseFloat(amount).toFixed(2)) ,
                        debit : "",
                        homecost : Util.addCommasList(parseFloat(homecost).toFixed(2))
                    }
                    tableData.push(data);
                }
            }
            setHomecost(tableData[tableData.length -1]['homecost'])
        }
        setTableData(tableData)

    },[props.houseDetails])

    return (
        <div className="container-fluid loan">
            <h4>Home Cost Details</h4>
            <div className="loan-inner mt-25">
                <div className="purchagePrice">
                    <h2>Purchase Price : {purchaseprice}</h2>
                    <h2>Home Cost: {homecost}</h2>
                </div>
            <Table header={header} url={"/loan-lender"} columns={columns} getSingleData={props.getSingleLoan} tableId="amortization" data={tableData}  house_id={house_id}/>
                <div className="row footer"></div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    contacts: state.Contact.contacts.data,
    loanDetails : state.Loan.loanDetails.data,
    houseDetails : state.House.houseDetail.data,
    transactions : state.Transaction.transactions.data,
    loanTransactions : state.Loan.mortgageTransaction.data
    
});

const mapDispatchToProps = {
    getSingleLoan,
    addLoanAmortization,
    getContact
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Homecost);