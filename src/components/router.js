import React, { useState,useEffect} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import notFound from "./notFound";
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { getHouseDetail } from "../store/Actions/house";
import {getGroup} from "../store/Actions/contact";
//import App from "../App";
import { connect } from "react-redux";
import Signup from "./Authentication/signup";
import Login from "./Authentication/login";
import Forgot from "./Authentication/forgot";
import ResetPassword from "./Authentication/reset-password";
import HouseDetails from "./House/House-details";
import HMOSpace from "./House/HMO-space";
import TitleHolders from "./House/Title-holders";
import Hoadetails from "./House/Hoa-details";
import Realtordetails from "./House/Realtor-details";
import Navbar from "./navbar";
import Dashboard from "./Dashboard/Dashboard";
import Contact from "./Contacts/Contact";
import LoanList from "./Loan/Loan-list";
import LoanDetails from "./Loan/Loan-details";
import LenderDetails from "./Loan/Lender-details";
import AdditionalDetails from "./Loan/Additional-details";
import ContactList from "./Contacts/Contact-list";
import Insurance from "./Insurance/Insurance";
import Agent from "./Insurance/Agent";
import Reminder from "./Insurance/Reminder";
import InsuranceList from "./Insurance/Insurance-list";
import Transaction from "./Transaction/Transaction";
import TransactionList from "./Transaction/Transaction-list";
import Amortization from "./Record/Amortization";
import Warranty from "./Warranty/Warranty";
import WarrantyList from "./Warranty/Warranty-list";
import Installation from "./Warranty/Installation";
import WarrantyDates from "./Warranty/Warranty-dates";
import Provider from "./Warranty/Provider";
import LoanTransaction from "./Loan/Loan-transaction";
import Document from "./Documents/documents";
import DocumntsList from "./Documents/documents-list";
import Link from "./Link/links";
import LinkList from "./Link/link-list";
import Galary from "./Galary/galary";
import Personal from "./Account/Personal";
import Referral from "./Account/Referral";
import Subscription from "./Account/Subscription";
import Addreferral from "./Account/Addreferral";
import Homecost from "./Homecost/homecost";
/** Lease routing */
import Lease from "./Lease/Lease";
import Tenant from "./Lease/Tenant";
import Realtor from "./Lease/Realtor-details";
import Hmo from "./Lease/HMO-space";
import Additional from "./Lease/Additional";
import LeaseList from "./Lease/Lease-list";
import ShareList from "./Shareproperty/Share-list";
import Share from "./Shareproperty/Share";
import Report from "./Report/Report";
import ReportList from "./Report/Report-list";
import ReminderCalender from "./Reminder/reminder";
import GenerateTransaction from "./Contacts/GenerateTransaction";
import CreateUser from "./Create-User/create-user";
import EditUser from "./Create-User/edit-user";
import UserList from "./Create-User/user-list";
import MailList from "./Create-User/mailList";



const Router = (props) => {
	const [buttonStatus, setButtonStatus] = useState("")
	let login  = false;
	let isAdmin = false;
	var user ={};
	var pageType = "createHouse";
	if('user' in localStorage) {
		user = JSON.parse(localStorage.getItem('user'));
		if (user['email'] != undefined && user['email'] != "") {
			login = true;
		} 
	}

	if(login && user.housecount > 0){
		pageType = "dashboard";
	}
	console.log("user.housecount:",user.housecount)

	useEffect(() => {
		props.getGroup();
	},[])


	return(
		<BrowserRouter>
			<div>
				<Switch>
					{console.log("login:",login)}
				{ login ? (
				 <React.Fragment>
					<Navbar />	
					
					<Route path="/generate-transaction" component={GenerateTransaction} />
					<Route path="/remindercalender" component={ReminderCalender} />
					<Route path="/loan-transaction" component={LoanTransaction} />
					<Route path="/house-details" component={HouseDetails} />
					<Route path="/title-holders" component={TitleHolders} />
					<Route path="/hoa-detail" component={Hoadetails} />
					<Route path="/realtor-detail" component={Realtordetails} />
					<Route path="/hmo-space" component={HMOSpace} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/contact" component={ContactList} />
					<Route path="/contact-form" component={Contact} />
					<Route path="/loan-list" component={LoanList} />
					<Route path="/loan-details" component={LoanDetails} />
					<Route path="/loan-lender" component={LenderDetails} />
					<Route path="/insurance" component={Insurance} />
					<Route path="/agent" component={Agent} />
					<Route path="/reminder" component={Reminder} />
					<Route path="/insurance-list" component={InsuranceList} />
					<Route path="/transaction" component={Transaction} />
					<Route path="/transaction-list" component={TransactionList} />
					<Route path="/warranty" component={Warranty} />
					<Route path="/warrantydates" component={WarrantyDates} />
					<Route path="/installation" component={Installation} />
					<Route path="/Warranty-list" component={WarrantyList} />
					<Route path="/provider" component={Provider} />

					<Route path="/personal" component={Personal} />
					<Route path="/referral" component={Referral} />
					<Route path="/subscription" component={Subscription} />
					<Route path="/add-referal" component={Addreferral} />
					<Route path="/document" component={Document} />
					<Route path="/document-list" component={DocumntsList} />

					<Route path="/link" component={Link} />
					<Route path="/link-list" component={LinkList} />
					<Route path="/gallary" component={Galary} />

					<Route path="/create-user" component={CreateUser} />
					<Route path="/edit-user" component={EditUser} />
					<Route path="/user-list" component={UserList} />
					<Route path="/mail-list" component={MailList} />
					
					
					<Route path="/amortization" component={Amortization} />
					<Route path="/loan-additionals" component={AdditionalDetails} />

					{/* Lease Routing */}
					{/* <Route path="/lease" component={Lease} /> */}
					<Route path="/tenant" component={Tenant} />
					<Route path="/realtor" component={Realtor} />
					<Route path="/hmo" component={Hmo} />
					<Route path="/additional" component={Additional} />
					<Route path="/lease-list" component={LeaseList} />
					<Route path="/homecost" component={Homecost} />

					<Route path="/share-list" component={ShareList} />
					<Route path="/share" component={Share} />

					<Route path="/report-list" component={ReportList} />
					<Route path="/report" component={Report} />
					
				
					{
						pageType == "dashboard" ? (<Redirect from="/" to="/dashboard" />) : (<Redirect from="/" to="/house-details" />)
					}
			 </React.Fragment>
				) : (
				<React.Fragment>
					<Route path="/" exact component={Login} />
					<Route path="/forgot" component={Forgot} />
					<Route path="/signup" component={Signup} />
					<Route path="/reset-password" component={ResetPassword} />
					{/* <Redirect from="*" to="/" /> */}
				</React.Fragment>
				)}
				<Route path="*" exact={true} component={notFound} />
				</Switch>
				<NotificationContainer />
			</div>
		</BrowserRouter>
	)
}

const mapStateToProps = state => ({
	user: state.Authentication.user,
	houseDetails : state.House.houseDetail.data,
})

const mapDispatchToProps = {
	getHouseDetail,
	getGroup
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Router);