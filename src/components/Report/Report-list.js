import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { Link } from "react-router-dom";
import {getContactById } from "../../store/Actions/contact";
import { connect } from "react-redux";
import Table from "../../Reusable/Table";
import { Util } from "../../Datamanipulation/Util";
import { NotificationManager } from "react-notifications";

const ReportList = (props) => {
    
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
    const header = ["Company", "Contact Person", "Mobile No.", "Landline", "Email", "URL", "Address", 'Group'];
    const [companyname, setCompanyname] = useState('');
    const [fromdate, setFromdate] = useState(Util.getCurrentDate("-"));
    const [todate, setTodate] = useState(Util.getCurrentDate("-"));
    const [transactionData, setTransactionData] = useState('');
    const [reportType, setReportType] = useState("group")

    var columns = [
        { name: 'Company Name', selector: 'companyname', sortable: true, },
        { name: 'Transaction Type', selector: 'type', sortable: true, },
        { name: 'Transaction Date', selector: 'created_at', sortable: true,cell: row => Util.dateFormat(row.created_at) },
        { name: 'Vender Name', selector: 'contact_person', sortable: true },
        { name: 'Transaction Amount', selector: 'amount', sortable: true },
        { name: 'Comment', selector: 'comments', sortable: true },
        { name: 'Entered By', selector: 'entered_by', sortable: true },
        { name: 'Entry Date&Time', selector: 'date', sortable: true, cell: row => Util.dateFormat(row.date)},
       
      ];
    

    const generate = () => {
        let formDate = new Date(fromdate);
        let toDate = new Date(todate);
        let tableData =[];

        let start = Math.floor(formDate.getTime() / 86400000);
        let end = Math.floor(toDate.getTime() / 86400000);

        if(start > end) {
            NotificationManager.error("Error Message", "To Date must be greater than From Date.");
            return false;
        }
       if(reportType == "company"){
            for(let i=0; i<props.transactions.length; i++){
                let filterData = props.transactions[i]['companyname'];
                let createdAT = new Date(props.transactions[i].date);
                if(companyname == filterData && (+createdAT >= +formDate) && (+createdAT <= +toDate)){
                        tableData.push(props.transactions[i]) 
                }
            } 
       }else{
            for(let i=0; i<props.transactions.length; i++){
                let filterData = props.transactions[i]['groupname'];
                if(companyname == "Expenses" || companyname == "Income" ||companyname == "Loans"){
                    filterData = filterData.split("&")[0];
                }
                let createdAT = new Date(props.transactions[i].date);
               
                if(companyname == filterData && (+createdAT >= +formDate) && (+createdAT <= +toDate)){
                        tableData.push(props.transactions[i]) 
                }
            } 
       }
       
        setTransactionData(tableData);
    }

    var groupData = ['Income', "Expenses"];
    var highLight = [];
    if(props.groupDetails){
        for(let i=0; i<props.groupDetails.length; i++){
            if(props.groupDetails[i]['subgroup'] != "Income" && props.groupDetails[i]['subgroup'] != "Expenses"){
                let item = props.groupDetails[i]['groupname']+"&"+props.groupDetails[i]['subgroup'];
                let checkItem = groupData.indexOf(props.groupDetails[i]['groupname'])
                groupData.splice(checkItem+1, 0, item );
            }
           
        }
    }

    return (
        <div className="container-fluid contact">
            <h4>Generate Reports</h4>
            <div className="contact-form pt-25">
                <div className="row report">
                    <div className="col-md-3 ">
                        <div className="form-group reportType">
                      
                            <input type="radio" id="group" name="reportType" value="group" onChange={e=>{
                                setReportType(e.target.value)
                                setCompanyname("Select");
                            }} checked={reportType== "group" ? "checked": ""}/>
                            &nbsp;<label htmlFor="group">Group</label>

                            
                            &nbsp;&nbsp; <input type="radio" id="company" name="reportType" value="company" onChange={e=>{
                                 setCompanyname("Select");
                                 setReportType(e.target.value)
                            }}  checked={reportType== "company" ? "checked": ""}/>
                            &nbsp;<label htmlFor="company">Company</label><br />



                            <select style={reportType== "group" ? {display: "block"} : {display: "none"}} className="form-control" value={companyname} onChange={e=> setCompanyname(e.target.value)}>
                                    { 
                                  
                                    groupData ? (groupData.map((data,index)=>{
                                    let space = "";
                                    let className = "";
                                    if(highLight.indexOf(index)){
                                        className="parent" 
                                    }
                                    let item = data.split("&");
                                    let itemValue = item[item.length-1]
                                    if(data.subgroup != "Income" &&  data.subgroup != "Expenses"){
                                        if(data.split("&").length == 2){
                                            space = "--"
                                        }

                                        if(data.split("&").length == 3){
                                            space = "----"
                                        }

                                        if(data.split("&").length == 4){
                                            space = "------"
                                        }
                                        if(data.split("&").length == 5){
                                            space = "--------"
                                        }
                                        if(data.split("&").length == 6){
                                            space = "----------"
                                        }
                                        if(data.split("&").length == 7){
                                            space = "------------"
                                        }
                                    }
                                  
                                    return( 
                                        <React.Fragment>
                                            <option className={className} value={data}>{space}{itemValue}
                                            </option>
                                        </React.Fragment>
                                    )
                                   
                            })):""
                                }
                                    </select>
                            {/* <select style={reportType== "group" ? {display: "block"} : {display: "none"}} className="form-control" value={companyname} onChange={e=> setCompanyname(e.target.value)}>
                                <option value="" >Select</option>
                                { 
                                        props.groupDetails ? (props.groupDetails.map((data,index)=>{
                                        if(data.groupname == "Income"){
                                            if(index == 0){
                                                return( 
                                                    <React.Fragment>
                                                        <option value="Income"  className="level1">Income</option>
                                                        <option value={data.groupname+"&"+data.subgroup}>&nbsp;&nbsp;{data.subgroup}</option>
                                                    </React.Fragment>
                                                )
                                            }
                                            return(
                                                <option value={data.groupname+"&"+data.subgroup} >&nbsp;&nbsp;{data.subgroup}</option>
                                            )
                                        }else if(data.subgroup == "Loans" || data.groupname == "Loans"){
                                            if(index == 2){
                                                return(
                                                    <React.Fragment>
                                                        <option value="Expenses" className="level1"  >Expenses</option>
                                                        <option value="Loans" className="level1"  >&nbsp;&nbsp;Loans</option>
                                                    </React.Fragment>
                                                ) 
                                            }else{
                                                return(
                                                    <option value={data.groupname+"&"+data.subgroup}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.subgroup}</option>
                                                ) 
                                            }
                                            
                                        }else if(data.groupname == "Expenses"){
                                            return(
                                                <option  value={data.groupname+"&"+data.subgroup}>&nbsp;&nbsp;&nbsp;&nbsp;{data.subgroup}</option>
                                            ) 
                                        }
                                    })):""
                                }
                            </select> */}

                            <select style={reportType== "company" ? {display: "block"} : {display: "none"}} className="form-control" value={companyname} onChange={e=> setCompanyname(e.target.value)}>
                              <option value="" disabled>Select</option>
                               { 
                                      props.contacts ? (props.contacts.map((data)=>{
                                        return(
                                            <option vlaue={data.companyname}>{data.companyname}</option>
                                        )
                                    })): ""
                                 }   
                            </select>


                        </div>
                    </div>

                    <div className="col-md-3 ">
                        <div className="form-group">
                            <label htmlFor="From Date" className="">From Date</label>
                            <input type="date" placeholder="From Date" value={fromdate} onChange={e=> setFromdate(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-3 ">
                        <div className="form-group">
                            <label htmlFor="To Date" className="">To Date</label>
                            <input type="date" placeholder="To Date" value={todate} onChange={e=> setTodate(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-3" style={{marginTop:"15px"}}>
                        <Link onClick={generate} to={{
                            pathname : "/report-list",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        Generate
                      </Link>
                    
                        <Link to={{
                                pathname : "/report-list",
                                state : {house_id : house_id}
                            }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                        Clear
                        </Link>

                    </div>
                </div>
            </div>


            <h4>Reports</h4>
            <div className="contact-form pt-25">
                <Table url={"/contact-form"} data={transactionData} columns={columns} header={header} getSingleData={props.getContactById} tableId={"contact"+house_id}  house_id={house_id}/>
                {/* <div className="row footer">
                    <Link to={{
                            pathname : "/report-list",
                            state : {house_id : house_id}
                        }} className="btn btn-primary btn-sm addNewItem pull-right" role="button">
                     Export
                    </Link>
                </div> */}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    contacts : state.Contact.contacts.data,
    transactions : state.Transaction.transactions.data,
    groupDetails: state.Contact.groups.data,
});

const mapDispatchToProps = {
    getContactById
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
