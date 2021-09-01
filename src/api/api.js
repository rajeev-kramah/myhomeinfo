var axios = require("axios");
var ES6Promise = require("es6-promise");
const url = "http://localhost:4600/";
ES6Promise.polyfill();

const ApiService = {
	get(apiurl) {
		return axios
			.get(apiurl)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(err));
	},

post(apiurl, bodyFormData) {
		return axios
			.post(apiurl, bodyFormData)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(err));
	},

	put(apiurl, bodyFormData) {
		return axios
			.put(apiurl, bodyFormData)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(err));
	},

	delete(apiurl, bodyFormData) {
		return axios
			.delete(apiurl)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(err));
	}
};
export default ApiService;

export const Authentication = {
	signup(data) {
		return ApiService.post(url+"users/", data);
	},

	forget(data) {
		return ApiService.post(url + "users/forget", data);
	},

	login(data) {
		return ApiService.post(url + "users/login", data);
	},

	resetPassword(data) {
		return ApiService.post(url + "users/reset", data);
	}
};


export const House = {
	createHouse(data) {
	  return ApiService.post(url + "home/", data);
	},
	addTitleHolder(data) {
		return ApiService.post(url + "home/titleholders", data);
	},
	addHOADetails(data) {
		return ApiService.post(url + "home/hoadetails", data);
	},
	addRealtorDetails(data) {
		return ApiService.post(url + "home/realtor", data);
	},
	deleteRealtorImage(data) {
		return ApiService.post(url + "home/deleterealtorimg", data);
	},

	addHMOSpace(data) {
		return ApiService.post(url + "home/hmodetails", data);
	},
	
	houseDetails(data){
		return ApiService.post(url + "home/housedetail/", data);
	},

	ownerHouseDetails(data){
		return ApiService.post(url + "home/ownerhouselist/", data);
	},

	deleteHouse(data) {
		return ApiService.post(url + "home/deletehouse", data);
	},

	deleteHmo(data) {
		return ApiService.post(url + "home/deletehmo", data);
	},

	deleteHouseAttachment(data) {
		return ApiService.post(url + "home/deletehouseattachment", data);
	},

	getHouseHmo(data) {
		return ApiService.post(url + "home/gethousehmo", data);
	}
};



export const Reminder = {
	addEvent(data) {
		return ApiService.post(url + "event", data);
	},

	getEvent(data) {
		return ApiService.post(url + "event/getevent", data);
	},

	deleteEvent(data) {
		return ApiService.post(url + "event/delete", data);
	},
}


export const Contact = {
	
	addContact(data) {
		return ApiService.post(url + "contact", data);
	},

	getContact(data) {
		return ApiService.post(url + "contact/gethomecontacts", data);
	},

	getContactById(data) {
		return ApiService.post(url + "contact/getsinglecontact", data);
	},

	addGroup(data) {
		return ApiService.post(url + "contact/addgroup", data);
	},

	getContactGroup(data) {
		return ApiService.get(url + "contact/group");
	},

	getContactForTransaction(data) {
		return ApiService.post(url + "contact/gethomecontactsfortransaction", data);
	},

	deleteContact(data) {
		return ApiService.post(url + "contact/delete", data);
	},

	getGroup(data) {
		return ApiService.post(url + "contact/getgroup", data);
	}

}


export const share = {
	
	addShare(data) {
		return ApiService.post(url + "share", data);
	},

	getShare(data) {
		return ApiService.post(url + "share/gethomeshare", data);
	},

	getShareById(data) {
		return ApiService.post(url + "share/getsingleshare", data);
	},


	deleteShare(data) {
		return ApiService.post(url + "share/delete", data);
	}

}


export const Loan = {
	addLoan(data) {
		return ApiService.post(url + "loan", data);
	},

	getLoan(data) {
		return ApiService.post(url + "loan/gethomeloans", data);
	},
	getsingleloan(data){
		return ApiService.post(url + "loan/getsingleloan", data);
	},

	deleteLoan(data) {
		return ApiService.post(url + "loan/delete", data);
	},

	addLoanTransaction(data) {
		return ApiService.post(url + "loan/transaction", data);
	},

	addLoanAmortization(data) {
		return ApiService.post(url + "loan/amortization", data);
	},

	getLoanTransaction(data) {
		return ApiService.post(url + "loan/gettransaction", data);
	},

	getMortgageTransaction(data) {
		return ApiService.post(url + "loan/getMortgageTransaction", data);
	},

	deleteLoanTransaction(data) {
		return ApiService.post(url + "loan/deletetransaction", data);
	}


	
}

export const Insurance = {
	addInsurance(data) {
		return ApiService.post(url + "insurance", data);
	},

	getInsurance(data) {
		return ApiService.post(url + "insurance/gethomeinsurances", data);
	},

	getSingleInsurance(data) {
		return ApiService.post(url + "insurance/getsingleinsurance", data);
	},

	deleteInsurance(data) {
		return ApiService.post(url + "insurance/deletesingleinsurance", data);
	}
}

export const Transaction = {
	addTransaction(data) {
		return ApiService.post(url + "transaction", data);
	},

	getTransaction(data) {
		return ApiService.post(url + "transaction/gethometransactions", data);
	},

	getSingleTransaction(data) {
		return ApiService.post(url + "transaction/getsingletransaction", data);
	},

	deleteTransaction(data) {
		return ApiService.post(url + "transaction/delete", data);
	}
}

export const Warranty = {
	addWarranty(data) {
		return ApiService.post(url + "warranty", data);
	},

	getWarranty(data) {
		return ApiService.post(url + "warranty/gethomewarranty", data);
	},

	getSingleWarranty(data) {
		return ApiService.post(url + "warranty/getsinglewarranty", data);
	},

	deleteWarranty(data) {
		return ApiService.post(url + "warranty/deletesinglewarranty", data);
	}
}

export const Account = {
	updateAccount(data) {
		return ApiService.post(url + "users/updateuser", data);
	},

	getAccount(data){
		return ApiService.post(url + "users/userdeatils", data);
	}
}

export const Reference = {
	addReference(data) {
		return ApiService.post(url + "reference", data);
	},

	getSingleReference(data) {
		return ApiService.post(url + "reference/getsinglereference", data);
	},

	getUserReference(data) {
		return ApiService.post(url + "reference/getuserreferneces", data)
	}
}

export const Document = {
	addDocument(data){
		return ApiService.post(url + "document", data);
	},

	getDocument(data) {
		return ApiService.post(url + "document/gethomedocument", data);
	},

	getSingleDocument(data) {
		return ApiService.post(url + "document/getsingledocument", data);
	},

	deleteDocument(data) {
		return ApiService.post(url + "document/deletesingledocument", data);
	}

}

export const Link = {
	addLink(data){
		return ApiService.post(url + "link", data);
	},

	getLink(data) {
		return ApiService.post(url + "link/gethomelink", data);
	},

	getSingleLink(data) {
		return ApiService.post(url + "link/getsinglelink", data);
	},

	deleteLink(data) {
		return ApiService.post(url + "link/deletesinglelink", data);
	}

}

export const Gallery = {
	addGallery(data){
		return ApiService.post(url + "gallery", data);
	},

	getGallery(data) {
		return ApiService.post(url + "gallery/gethomegallery", data);
	},

	deleteGallery(data) {
		return ApiService.post(url + "gallery/deletesinglegallery", data);
	}
}

export const Lease = {
	addLease(data) {
		return ApiService.post(url + "lease", data);
	},

	getLease(data) {
		return ApiService.post(url + "lease/gethomelease", data);
	},

	getSingleLease(data) {
		return ApiService.post(url + "lease/getsinglelease", data);
	},

	deleteLease(data) {
		return ApiService.post(url + "lease/delete", data);
	}
}
